<!-- LibraryCardAuth.vue - Reusable Library Card Authentication Component -->
<template>
  <v-card flat>
    <v-card-title class="mb-2" v-if="title">
      <h3>{{ title }}</h3>
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field 
            v-model="localBarcode" 
            label="Library Card Number" 
            :rules="[rules.required]"
            density="compact"
            variant="outlined"
            @input="handleInput('barcode', $event.target.value)"
          />
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field 
            v-model="localPin" 
            label="Password" 
            :rules="[rules.required]"
            density="compact"
            variant="outlined"
            type="password"
            @input="handleInput('pin', $event.target.value)"
          />
        </v-col>
        <v-col cols="12" v-if="errorMessage" class="mt-n10">
          <span class="text-red font-italic font-weight-medium">
            {{ errorMessage }}
          </span>
        </v-col>
      </v-row>
      <v-row v-if="!loading && isAuthenticated && !errorMessage">
        <v-col cols="12">
          <span class="text-green-darken-4 font-italic font-weight-medium">{{ successMessage }}</span>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions class="d-flex flex-column align-start justify-start">
      <v-btn 
        variant="flat" 
        color="primary" 
        :disabled="isDisabled"
        :loading="loading"
        :text="isAuthenticated && !errorMessage ? 'Saved' : buttonText"
        @click="handleAuthentication"
        class="ml-2"
        prepend-icon="mdi-content-save"
      />
    </v-card-actions>
    <v-alert
      v-if="showAlert"
      density="compact"
      :text="alertText"
      type="warning"
      class="mt-5 mx-4"
    />
  </v-card>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { apiService } from '../services/api-service';

interface Props {
  barcode?: string;
  pin?: string;
  rules: any;
  title?: string;
  successMessage?: string;
  buttonText?: string;
  alertText?: string;
  showAlert?: boolean;
  disabled?: boolean;
  minAge?: number; // Minimum age requirement for guardian
  allowedProfiles?: string[]; // Allowed library profiles
}

interface Emits {
  (e: 'update:barcode', value: string): void;
  (e: 'update:pin', value: string): void;
  (e: 'authentication-success', data: any): void;
  (e: 'authentication-error', error: string): void;
}

const props = withDefaults(defineProps<Props>(), {
  barcode: '',
  pin: '',
  title: 'Library Card Authentication',
  successMessage: 'Authentication successful!',
  buttonText: 'Authenticate',
  alertText: '',
  showAlert: false,
  disabled: false,
  minAge: 18,
  allowedProfiles: () => [
    'EPL_ADULT', 
    'EPL_ACCESS', 
    'EPL_ADU01', 
    'EPL_ADU05', 
    'EPL_ADU10',
    'EPL_CORP',
    'EPL_NOVIDG',
    'EPL_ONLIN',
    'EPL_SELF',
    'EPL_VISITR',
    'EPL_TRESID'
  ] // Default allowed profiles
});

const emit = defineEmits<Emits>();

// Local reactive state
const loading = ref(false);
const isAuthenticated = ref(false);
const errorMessage = ref('');
const localBarcode = ref(props.barcode);
const localPin = ref(props.pin);
const authData = ref<any>(null);

// Computed properties
const isDisabled = computed(() => {
  return loading.value || 
         localBarcode.value === '' || 
         localPin.value === '' || 
         props.disabled;
});

// Methods
const handleInput = (field: 'barcode' | 'pin', value: string) => {
  if (field === 'barcode') {
    localBarcode.value = value;
    emit('update:barcode', value);
  } else {
    localPin.value = value;
    emit('update:pin', value);
  }
  
  // Reset authentication state when inputs change
  if (isAuthenticated.value) {
    isAuthenticated.value = false;
    errorMessage.value = '';
  }
};

const validateAge = (dateOfBirth: string): boolean => {
  const today = new Date();
  const dob = new Date(dateOfBirth);
  const age = today.getFullYear() - dob.getFullYear();
  const monthDiff = today.getMonth() - dob.getMonth();
  
  // Adjust age if birthday hasn't occurred this year
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
    return (age - 1) >= props.minAge;
  }
  
  return age >= props.minAge;
};

const validateProfile = (profile: string): boolean => {
  // Normalize the profile (trim whitespace and convert to uppercase)
  const normalizedProfile = profile?.toString().trim().toUpperCase();
  
  // Normalize allowed profiles for comparison
  const normalizedAllowedProfiles = props.allowedProfiles.map(p => p.trim().toUpperCase());
  
  return normalizedAllowedProfiles.includes(normalizedProfile);
};

const handleAuthentication = async () => {
  loading.value = true;
  errorMessage.value = '';
  isAuthenticated.value = false;
  

  try {
    // Prepare request body
    const body = {
      barcode: localBarcode.value,
      password: localPin.value,
    };

    // Authenticate the user
    const data = await apiService.authenticate(body);
    // Check if authentication failed
    if (data?.original?.message) {
      errorMessage.value = 'Invalid library card number or password!';
      loading.value = false;
      emit('authentication-error', errorMessage.value);
      return;
    }

    // Validate age requirement
    if (data?.dateofbirth && !validateAge(data.dateofbirth)) {
      errorMessage.value = `Guardian must be at least ${props.minAge} years old!`;
      loading.value = false;
      emit('authentication-error', errorMessage.value);
      return;
    }

    // Validate profile requirement
    if (data?.profile && !validateProfile(data.profile)) {
      errorMessage.value = 'This library profile is not eligible to be a guardian!';
      loading.value = false;
      emit('authentication-error', errorMessage.value);
      return;
    }
    // validate network error 500
    if (data?.error) {
      errorMessage.value = 'There was an error with the authentication process. Please try again.';
      loading.value = false;
      emit('authentication-error', errorMessage.value);
      return;
    }
    console.log(data);
    // Authentication successful
    errorMessage.value = '';
    isAuthenticated.value = true;
    authData.value = data;
    loading.value = false;
    
    emit('authentication-success', data);
    
    return data;
  } catch (err) {
    loading.value = false;
    isAuthenticated.value = false;
    errorMessage.value = `An error occurred: ${(err as any).message}`;
    emit('authentication-error', errorMessage.value);
    return (err as any).message;
  }
};

// Reset component state
const reset = () => {
  loading.value = false;
  isAuthenticated.value = false;
  errorMessage.value = '';
  authData.value = null;
  localBarcode.value = '';
  localPin.value = '';
};

// Watch for prop changes
watch(() => props.barcode, (newValue) => {
  localBarcode.value = newValue;
});

watch(() => props.pin, (newValue) => {
  localPin.value = newValue;
});

// Expose methods for parent component
defineExpose({
  authenticate: handleAuthentication,
  reset,
  isAuthenticated: computed(() => isAuthenticated.value),
  authData: computed(() => authData.value),
  loading: computed(() => loading.value),
  errorMessage: computed(() => errorMessage.value)
});
</script>

<style scoped>
/* Component-specific styles if needed */
</style>
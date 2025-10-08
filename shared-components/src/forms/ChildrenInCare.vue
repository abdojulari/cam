<template>
  <v-container fluid="true">
    <v-row>
      <v-col cols="12">
        <h1 class="text-h3 font-weight-bold">Children in Care</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="3">
        <div class="bg-primary h-100 w-100"></div>
      </v-col>
      <v-col cols="9">
        <v-stepper v-model="currentStep" class="mt-4" flat>
      <v-stepper-header>
        <v-stepper-item
          :complete="currentStep > 1"
          :value="1"
          title="Login"
          subtitle="Authenticate with your library card"
        ></v-stepper-item>
        <v-divider></v-divider>
        <v-stepper-item
          :complete="currentStep > 2"
          :value="2"
          title="Adult Details"
          subtitle="Personal information"
        ></v-stepper-item>
        <v-divider></v-divider>
        <v-stepper-item
          :value="3"
          title="Child Details"
          subtitle="Add children information"
        ></v-stepper-item>
      </v-stepper-header>

      <v-stepper-window>
        <!-- Step 1: Login -->
        <v-stepper-window-item :value="1">
          <v-card flat>
            <v-card-text>
              <v-row>
                <v-col cols="12" md="6">
                  <img src="https://media.istockphoto.com/id/544351338/photo/storytime-at-nursery.jpg?s=612x612&w=0&k=20&c=g7K9wv5eh7wsbFq1mxX1X_es-m7oNsiJuQnpkImi1zY=" alt="Children in Care" class="img-fluid" />
                </v-col>
                <v-col cols="12" md="6">
                  <LibraryCardAuth
                    v-model:barcode="cardNumber"
                    v-model:pin="password"
                    :rules="validationRules"
                    title="Login to your EPL account"
                    success-message="Authentication successful!"
                    @authentication-success="handleSuccess"
                    @authentication-error="handleError"
                  />
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-stepper-window-item>

        <!-- Step 2: Adult Details -->
        <v-stepper-window-item :value="2">
          <v-card flat>
            <v-card-title>
              <h4>Details of Adult responsible for the child(ren)</h4>
              <span class="text-body-1 font-weight-light">Fields marked with an asterisk (*) are required</span>
            </v-card-title>
            <v-card-text>
              <v-row>
                <v-col cols="12" md="4" sm="6">
                  <v-text-field 
                    v-model="formData.firstname" 
                    label="First Name *" 
                    :rules="[props.rules.required, props.rules.firstname]"
                    density="compact"
                    variant="outlined"
                    :maxlength="25"
                  />
                </v-col>
                <v-col cols="12" md="4" sm="6">
                  <v-text-field 
                    v-model="formData.lastname" 
                    label="Last Name *" 
                    :rules="[props.rules.required, props.rules.lastname]"
                    density="compact"
                    variant="outlined"
                    :maxlength="25"
                  />
                </v-col>
                <v-col cols="12" md="4" sm="6">
                  <v-text-field 
                    v-model="formData.email" 
                    label="Email *" 
                    :rules="[props.rules.required, props.rules.email]"
                    density="compact"
                    variant="outlined"
                  />
                </v-col>
                <v-col cols="12" md="4" sm="6">
                  <v-text-field 
                    v-model="formData.phone" 
                    label="Phone Number *" 
                    v-maska="'###-###-####'"
                    :rules="[props.rules.required, props.rules.phone]"
                    density="compact"
                    variant="outlined"
                  />
                </v-col>
                <v-col cols="12" md="4" sm="6">
                  <v-combobox 
                    label="Address *" 
                    variant="outlined" 
                    hide-details="auto"
                    v-model="address"
                    :items="primaryAddressSuggestions"
                    item-title="text"
                    item-value="id"
                    density="compact" 
                    append-inner-icon="mdi-map-marker"
                    :loading="primaryAddressLoading"
                    @update:search=" (q: string) => searchPrimaryAddresses(q, city)"
                    @update:modelValue="selectPrimaryAddress"
                    @focus="openPrimaryMenu"
                    @blur="closePrimaryMenu"
                    :rules="[(v: any) => !!v || 'Address is required']"
                    required 
                    :menu-props="{
                      closeOnContentClick: true,
                      persistent: false
                    }"
                    v-model:menu="primaryAddressMenuOpen"
                  />
                </v-col>
        
                <v-col cols="12" md="4" sm="6">
                  <v-select
                    label="City *"
                    :items="['Edmonton', 'Enoch']"
                    v-model="city" 
                    variant="outlined"
                    :rules="[props.rules.city]"
                    required
                    density="compact"
                    prepend-inner-icon="mdi-city"
                  />
                </v-col>
                <v-col cols="12" md="4" sm="6">
                  <v-text-field 
                    v-model="province" 
                    label="Province *" 
                    :rules="[props.rules.required, props.rules.province]"
                    density="compact"
                    variant="outlined"
                    readonly
                  />
                </v-col>
                <v-col cols="12" md="4" sm="6">
                  <v-text-field 
                    v-model="postalCode" 
                    label="Postal Code *" 
                    :rules="[props.rules.required, props.rules.postalCode]"
                    density="compact"
                    variant="outlined"
                    :maxLength="7"
                  />
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-stepper-window-item>

        <!-- Step 3: Child Details -->
        <v-stepper-window-item :value="3">
          <v-card flat>
            <v-card-title>
              <h4>Child Details</h4>
              <span class="text-body-1 font-weight-light">Fields marked with an asterisk (*) are required</span>
            </v-card-title>
            <v-card-text>
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field 
                    v-model="formData.minorFirstname" 
                    label="First Name *" 
                    :rules="[props.rules.required, props.rules.firstname]"
                    density="compact"
                    variant="outlined"
                    :maxlength="25"
                  />
                </v-col>  
                <v-col cols="12" md="6">
                  <v-text-field 
                    v-model="formData.minorLastname" 
                    label="Last Name *" 
                    density="compact"
                    :rules="[props.rules.required, props.rules.lastname]"
                    variant="outlined"
                    :maxlength="25"
                  />
                </v-col>    
                <v-col cols="12" md="6">
                  <v-text-field 
                    v-model="formData.minorMiddlename" 
                    label="Middle Name"
                    density="compact"
                    :rules="[(v: string) => /^[a-zA-Z]*$/.test(v) || 'Only alphabetic characters are allowed']"
                    variant="outlined"
                    :maxlength="25"
                  />
                </v-col>      
                <v-col cols="12" md="6">
                  <v-menu v-model="isMenuOpen" :close-on-content-click="false">
                    <template v-slot:activator="{ props }">
                      <v-text-field
                        :model-value="formattedDate"
                        v-bind="props"
                        variant="outlined"
                        rounded-0
                        density="compact"
                        label="Date of Birth *"
                        prepend-inner-icon="mdi-calendar"
                        required
                        :readonly="isReadonly"
                      />
                    </template>
                    <v-date-picker
                      v-model="formData.minorDateOfBirth"
                      @update:model-value="isMenuOpen = false"
                      hide-actions
                      :min="minDate"
                      :max="new Date().toISOString().split('T')[0]"
                    ></v-date-picker>
                  </v-menu>
                </v-col> 
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="formData.minorPassword"
                    label="Password *"        
                    variant="outlined"
                    :rules="[props.rules.required, props.rules.password]"
                    type="password"
                    density="compact"
                    hint="Password must be 6-20 characters long, no space or special characters allowed."
                    persistent-hint
                    :minlength="6"
                    :maxlength="20"
                  />
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="formData.minorConfirmPassword"
                    label="Confirm Password *"
                    variant="outlined"
                    :rules="[props.rules.required, props.rules.password, confirmPinRules]"
                    type="password"
                    hint="Password must be 6-20 characters long, no space or special characters allowed."
                    persistent-hint
                    density="compact"
                    :minlength="6"
                    :maxlength="20"   
                  />
                </v-col>   
                <v-col cols="12" md="6">
                  <v-btn
                    v-if="minors.length < 3"  
                    variant="flat" 
                    color="primary" 
                    :disabled=" isMinorInvalid "
                    text="Add another child"
                    @click="addMinor"
                    size="small"      
                    prepend-icon="mdi-plus-circle" 
                    class="btn-add-minor w-100 w-sm-75" 
                  >
                  </v-btn>
                </v-col>
                <v-col cols="12" md="6" v-if="minors.length > 0">
                  <v-btn 
                    variant="flat"
                    :disabled="disabled" 
                    color="red" 
                    text="Cancel"
                    size="small"
                    prepend-icon="mdi-minus-circle"
                    @click="resetMinorForm"
                    class="btn-add-minor w-100 w-sm-75"
                  />
                </v-col>
                <!-- End of add minor button-->
                <v-col cols="12" class="my-5" v-if="minors.length > 0">
                  <h3 class="text-uppercase font-weight-black">List of Added Child(ren)</h3>
                </v-col>
                <v-card 
                  color="primary" 
                  variant="outline" 
                  elevated border 
                  v-if="minors.length > 0"
                  class="w-100 mx-3 my-5"
                >
                  <v-card-text>
                    <v-data-table
                      :headers="headers"
                      :items="minors"
                      item-key="id"
                      :hide-default-footer="true"
                      color="primary"
                    > 
                      <template v-slot:headers="{ columns,toggleSort }">
                        <tr>
                          <template v-for="column in columns" :key="column.key">
                            <th>
                              <span class="mr-2 cursor-pointer font-weight-bold text-sm" @click="() => toggleSort(column)">{{ column.title }}</span>
                            </th>
                          </template>
                        </tr>
                      </template>
                      <template v-slot:item.actions="{ item }">
                        <v-btn 
                          color="red"
                          :disabled=" isClicked" 
                          @click="deleteMinor(item.id)" 
                          text="Delete" 
                          size="small" 
                          density="compact" 
                          icon="mdi-delete"
                        />
                      </template>
                    </v-data-table>
                  </v-card-text>
                </v-card>
              </v-row>
            </v-card-text>
            <v-row v-if="showSuccessMessage" class="mt-2">
              <v-col cols="12">
                <span class="text-green-darken-4 font-italic font-weight-medium">Record saved successfully!</span>
              </v-col>
            </v-row>  
            <v-alert
              density="compact"
              text="Please click the 'SAVE CHANGES' button to save your progress before proceeding to the 'SUBMIT' button."
              type="warning"
              class="mt-5 mx-3"
            >
            </v-alert>
          </v-card>
        </v-stepper-window-item>
      </v-stepper-window>

      <!-- Custom Navigation Buttons -->
      <v-card-actions class="d-flex justify-space-between pa-4">
        <v-btn
          v-if="currentStep > 1"
          variant="outlined"
          @click="goToPreviousStep"
          prepend-icon="mdi-arrow-left"
        >
          Previous
        </v-btn>
        <v-spacer v-else></v-spacer>
        
        <v-btn
          v-if="currentStep < 3"
          color="primary"
          variant="flat"
          @click="goToNextStep"
          :disabled="!canProceedToNextStep"
          append-icon="mdi-arrow-right"
        >
          Next
        </v-btn>
        
        <v-btn
          v-if="currentStep === 3"
          color="success"
          variant="flat"
          :loading="loader"
          prepend-icon="mdi-content-save"
          @click="submitForm"
        >
          Submit
        </v-btn>
      </v-card-actions>
        </v-stepper>
      </v-col>
    </v-row>
    
  </v-container>
</template>

<script setup lang="ts">
import LibraryCardAuth from './LibraryCardAuth.vue';
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import { vMaska } from "maska/vue";
import { minDate } from '../composables/minDate';
import { dateFormat } from '../composables/dateFormat';
import { useRegistrationStore } from '../store/registration-store';
import { useAddressLookup } from '../composables/useAddressLookup';
import { apiService } from '../services/api-service';

interface Minor {
    id: number;
    firstname: string;
    lastname: string;
    middlename: string;
    dateOfBirth: string;
    password: string;
    confirmPassword: string;
    address: string;
    city: string;
    province: string;
    postalCode: string;
    email: string;
    phone: string;
    careof: string;
  }

const userRegistration = useRegistrationStore();
let minorId = 0;
const props = defineProps({
  formData: {
    type: Object,
    default: () => ({
      firstname: '',
      lastname: '',
      email: '',
      phone: '',
      minorFirstname: '',
      minorLastname: '',
      minorMiddlename: '',
      minorDateOfBirth: '',
      minorPassword: '',
      minorConfirmPassword: '',
    })
  },
  rules: {
    type: Object,
    default: () => ({
      required: (value: any) => !!value || 'This field is required',
      firstname: (value: string) => !value || /^[a-zA-Z\s\-\']+$/.test(value) || 'Invalid characters in first name',
      lastname: (value: string) => !value || /^[a-zA-Z\s\-\']+$/.test(value) || 'Invalid characters in last name',
      email: (value: string) => !value || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || 'Invalid email format',
      phone: (value: string) => !value || /^\d{3}-\d{3}-\d{4}$/.test(value) || 'Phone number must be in format XXX-XXX-XXXX',
      alphanumericRule: (value: string) => !value || /^[a-zA-Z0-9\s\-\'\/#]*$/.test(value) || 'Invalid characters',
      city: (value: any) => !!value || 'City is required',
      province: (value: any) => !!value || 'Province is required',
      postalCode: (value: string) => !value || /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/.test(value) || 'Invalid postal code format',
      password: (value: string) => !value || /^[a-zA-Z0-9]{6,20}$/.test(value) || 'Password must be 6-20 characters long, no space or special characters allowed'
    })
  }
});

const cardNumber = ref('');
const password = ref('');
const validationRules = ref([]);
const loader = ref(false);
const showSuccessMessage = ref(false);
const loggedIn = ref(false);
const minors = ref<Minor[]>([]);
const minorsContact = ref(false);
const disabled = ref(false);
const currentStep = ref(1);

const address = ref('');
const city = ref('Edmonton');
const province = ref('Alberta');
const postalCode = ref('');

// Use props.formData directly instead of creating a separate ref
const formData = ref(props.formData);

const handleSuccess = (data: any) => {
  if(data.error) {
    loggedIn.value = false;
    return;
  }
  
  loggedIn.value = true;
  currentStep.value = 2; // Automatically advance to step 2 after successful login
  
};

const handleError = (error: any) => {
  console.log(error);
};

// Initialize tokens on component mount
onMounted(async () => {
  try {
    await apiService.initializeToken();
    await apiService.sanctumToken();
    console.log('Tokens initialized successfully');
  } catch (error) {
    console.error('Failed to initialize tokens:', error);
  }
});
onUnmounted(() => {
  // Cleanup timeouts when component is destroyed
  primaryAddressCleanup();
});

// Navigation methods
const goToNextStep = () => {
  console.log('goToNextStep called');
  console.log('canProceedToNextStep:', canProceedToNextStep.value);
  console.log('currentStep:', currentStep.value);
  
  if (canProceedToNextStep.value && currentStep.value < 3) {
    currentStep.value++;
    console.log('Advanced to step:', currentStep.value);
  }
};

const goToPreviousStep = () => {
  console.log('goToPreviousStep called');
  console.log('currentStep:', currentStep.value);
  
  if (currentStep.value > 1) {
    currentStep.value--;
    console.log('Went back to step:', currentStep.value);
  }
};
const isMinorInvalid = ref(true);

// Watch for changes in minor form fields to validate them
watch(
  [
    () => formData.value.minorFirstname,
    () => formData.value.minorLastname,
    () => formData.value.minorDateOfBirth,
    () => formData.value.minorPassword,
    () => formData.value.minorConfirmPassword
  ],
  () => {
    // Check if all required fields are valid
    const isFirstNameValid = formData.value.minorFirstname && props.rules.firstname(formData.value.minorFirstname) === true;
    const isLastNameValid = formData.value.minorLastname && props.rules.lastname(formData.value.minorLastname) === true;
    const isDateOfBirthValid = !!formData.value.minorDateOfBirth;
    const isPasswordValid = formData.value.minorPassword && props.rules.password(formData.value.minorPassword) === true;
    const isConfirmPasswordValid = formData.value.minorConfirmPassword && 
      props.rules.password(formData.value.minorConfirmPassword) === true &&
      formData.value.minorConfirmPassword === formData.value.minorPassword;

    // Set isMinorInvalid to false only when all fields are valid
    isMinorInvalid.value = !(isFirstNameValid && isLastNameValid && isDateOfBirthValid && isPasswordValid && isConfirmPasswordValid);
  },
  { immediate: true }
);

const formattedDate = computed(() => {
    if (!formData.value.minorDateOfBirth) return '';
    const date = new Date(formData.value.minorDateOfBirth);
    return new Intl.DateTimeFormat('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    }).format(date);
});

 // Define headers for the data table
 const headers = [
      { title: 'First Name', value: 'firstname' },
      { title: 'Last Name', value: 'lastname' },
      { title: 'Middle Name', value: 'middlename' },
      { title: 'Date of Birth', value: 'dateOfBirth' },
      { title: 'Actions', value: 'actions', sortable: false },
    ];
const isClicked = ref(false);
const isReadonly = ref(true);
const isMenuOpen = ref(false);
const confirmPinRules = computed(() => {
  return formData.value.minorConfirmPassword !== formData.value.minorPassword ? 'Pins do not match' : true;
});

// Validation for stepper navigation
const canProceedToNextStep = computed(() => {
  console.log('Validating step:', currentStep.value);
  
  switch (currentStep.value) {
    case 1:
      const step1Valid = loggedIn.value;
      console.log('Step 1 - loggedIn:', loggedIn.value, 'valid:', step1Valid);
      return step1Valid;
    case 2:
      // Check if all required fields are filled
      const step2Valid = !!(
        formData.value.firstname && 
        formData.value.lastname && 
        formData.value.email && 
        formData.value.phone && 
        address.value && 
        city.value && 
        province.value && 
        postalCode.value
      );
      console.log('Step 2 validation:', {
        firstname: formData.value.firstname,
        lastname: formData.value.lastname,
        email: formData.value.email,
        phone: formData.value.phone,
        street: address.value,
        city: city.value,
        province: province.value,
        postal: postalCode.value,
        valid: step2Valid
      });
      return step2Valid;
    case 3:
      // For step 3, we don't need to validate as it's the final step
      console.log('Step 3 - always valid');
      return true;
    default:
      console.log('Default case - not valid');
      return false;
  }
});
const addMinor = () => {
      if (isMinorInvalid.value) {
          return;
      }
      minors.value.push({
        id: ++minorId,
        firstname: formData.value.minorFirstname,
        lastname: formData.value.minorLastname,
        middlename: formData.value.minorMiddlename,
        dateOfBirth: dateFormat(formData.value.minorDateOfBirth?.toString() || ''),
        password: formData.value.minorPassword,
        confirmPassword: formData.value.minorConfirmPassword,
        address: address.value,
        city: city.value,
        province: province.value,
        postalCode: postalCode.value,
        email: formData.value.email,
        phone: formData.value.phone,
        careof: formData.value.firstname + ' ' + formData.value.lastname,
      });

      userRegistration.setAdditionalMinor(true);
    
      formData.value.minorFirstname = '';
      formData.value.minorLastname = '';
      formData.value.minorMiddlename = '';
      formData.value.minorDateOfBirth = null;
      formData.value.minorPassword = '';
      formData.value.minorConfirmPassword = '';
      minorsContact.value = false;
      isClicked.value = false;
  };
 // Delete minor from the list
 const deleteMinor = (id: any) => {
    minors.value = minors.value.filter(minor => minor.id !== id);
  };
  const resetMinorForm = () => {
      // Check if minors array is not empty
    isReadonly.value = false;
    if (minors.value.length > 0) {
      // Get the last minor record
      const lastMinor = minors.value[minors.value.length - 1];

      // Populate the form with the last minor's details
      formData.value.minorFirstname = lastMinor.firstname;
      formData.value.minorLastname = lastMinor.lastname;
      formData.value.minorMiddlename = lastMinor.middlename;
      formData.value.minorDateOfBirth = new Date(lastMinor.dateOfBirth);
      formData.value.minorPassword = lastMinor.password;
      formData.value.minorConfirmPassword = lastMinor.confirmPassword;

      // Delete the last minor from the list
      deleteMinor(lastMinor.id);
      isReadonly.value = true;
    }
  };

  const submitForm = async () => {
    loader.value = true;
    try {

      await new Promise(resolve => setTimeout(resolve, 1000));
      showSuccessMessage.value = true;
      const payload = {
        firstname: formData.value.firstname,
        lastname: formData.value.lastname,
        middlename: formData.value.middlename,
        dateofbirth: dateFormat(formData.value.minorDateOfBirth?.toString() || ''),
        library: formData.value.library,
        address: address.value,
        city: city.value,
        province: province.value,
        postalCode: postalCode.value,
        email: formData.value.email,
        phone: formData.value.phone,
        careof: formData.value.firstname + ' ' + formData.value.lastname,
        password: formData.value.password,
        confirmPassword: formData.value.confirmPassword,
       
      }
      // iterate over minors and submit each minor
      if(minors.value.length > 0) {
        minors.value.forEach(async (minor) => {
          console.log('Minor submitted:', minor);
        });
      }
      const response = await apiService.postUserData(payload);
      console.log('Form submitted:', response);
   
      setTimeout(() => {
        showSuccessMessage.value = false;
      }, 3000);
    } catch (error) {
      console.error('Error saving changes:', error);
    } finally {
      loader.value = false;
    }
  };
  const { 
    suggestions: primaryAddressSuggestions, 
    loading: primaryAddressLoading, 
    isMenuOpen: primaryAddressMenuOpen,
    selectAddress: selectPrimaryAddress, 
    searchAddresses: searchPrimaryAddresses, 
    cleanup: primaryAddressCleanup,
    openMenu: openPrimaryMenu,
    closeMenu: closePrimaryMenu
} = useAddressLookup({
  addressFields: {
    address,
    city,
    province,
    postalCode
  },
});
</script>
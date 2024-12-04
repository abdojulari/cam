<template>
    <v-container class="pt-8">
      <div v-if="formData.radios === 'Adult'">
        <v-text-field
          v-model="formData.password"
          label="Password"        
          variant="outlined"
          :rules="[rules.required, rules.password]"
          hint="Password must be 6-20 characters long, alphanumeric, and cannot contain spaces or special characters."
          persistent-hint
          type="password"
          density="compact"
          required
        />
        <v-text-field
          v-model="formData.confirmPassword"
          label="Confirm Password"
          variant="outlined"
          :rules="[rules.required, confirmPinRules]"
          type="password"
          density="compact"
          required
          class="mt-5"
        />
      </div>
      <NuxtTurnstile
        v-model="token"
        ref="turnstile"
      />
      <v-checkbox
        label="I accept the terms and conditions"
        v-model="formData.acceptTerms"
        :rules="[rules.required]"
        @change="onCheckboxChange"
        @click="onNativeSubmit"
        required
      ></v-checkbox>
      
      <v-checkbox
        v-if="formData.radios !== 'Minor'"
        label="Do you want to add minor(s) to your account?"
        v-model="formData.addMinor"
      >
      </v-checkbox>
      <TermAndCondition v-model="dialogVisible" />
    </v-container>
</template>
  
<script setup lang="ts">
  import { computed, onMounted, ref } from 'vue';
  import TermAndCondition from './TermAndCondition.vue';
  import { useRegistrationStore } from '../store/registration-store';
  import { apiService } from '../services/api-service';

  const turnstile = ref()
  const token = ref('')
  const response = ref()

  const props = defineProps(['formData', 'rules']);
  const barcode = ref('');
  const userRegistration = useRegistrationStore();
  const dialogVisible = ref(false);
  // create a local formData and set it to the props
  const formData = ref(props.formData);
  const confirmPinRules = computed(() => {
    return props.formData.confirmPassword !== props.formData.password ? 'Pins do not match' : true;
  });
  onMounted(() => {
    apiService.fetchBarcode().then((item) => {
      barcode.value = item;
    });
  });

  // Submit the token to your server for validation
  const onNativeSubmit = async () => {
    response.value = await $fetch('/api/validate-turnstile', {
      method: 'POST',
      body: {
        token: token.value,
      }
    })
  }

  // Ensure widget is rendered on component mount
  const onCheckboxChange = (value: boolean) => {
    if (value) {
      dialogVisible.value = true;
      if (
        userRegistration.getRadioSelection === 'Adult' && 
            userRegistration.getAdditionalMinor === true 
            && props.formData.addMinor === true) {
        userRegistration.adult.profile = 'EPL_SELF'
        userRegistration.addRegistration({data:userRegistration.minor})
      }
      if (userRegistration.getRadioSelection === 'Adult') {
        userRegistration.addRegistration({data:userRegistration.adult})
        console.log(userRegistration.getConsent)
      }
      
      // Check if the pins match before setting the password
      if (props.formData.password === props.formData.confirmPassword) {
        if (props.formData.radios === 'Adult') {
          userRegistration.adult.password = props.formData.password;
          userRegistration.adult.confirmPassword = props.formData.confirmPassword;
          userRegistration.adult.profile = 'EPL_SELF'
          userRegistration.adult.barcode = barcode.value
          userRegistration.adult.consent = userRegistration.getConsent
        }
      } else {
        // Optionally, handle the case where pinpins do not match
        console.error("Pins do not match");
      }
    } else {
      dialogVisible.value = false;
      formData.value.acceptTerms = false;
    }
  };
</script>
  
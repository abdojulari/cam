<template>
    <v-container class="pt-8">
      <div v-if="formData.radios === 'Adult'">
        <v-text-field
          v-model="formData.password"
          label="Pin/Password"        
          variant="outlined"
          :rules="[rules.required]"
          type="password"
          required
        ></v-text-field>
        <v-text-field
          v-model="formData.confirmPassword"
          label="Confirm Pin/Password"
          variant="outlined"
          :rules="[rules.required, confirmPinRules]"
          type="password"
          required
        ></v-text-field>
      </div>
      <v-checkbox
        label="I accept the terms and conditions"
        v-model="formData.acceptTerms"
        :rules="[rules.required]"
        @change="onCheckboxChange"
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
  import { computed, ref } from 'vue';
  import TermAndCondition from './TermAndCondition.vue';
  import { useRegistrationStore } from '../store/registration-store';

  const props = defineProps(['formData', 'rules']);

  const userRegistration = useRegistrationStore();
  const dialogVisible = ref(false);
  const confirmPinRules = computed(() => {
    return props.formData.confirmPassword !== props.formData.password ? 'Pins do not match' : true;
  });
  const onCheckboxChange = (value: boolean) => {
    if (value) {
      dialogVisible.value = true;
      if (
        userRegistration.getRadioSelection === 'Adult' && 
            userRegistration.getAdditionalMinor === true 
            && props.formData.addMinor === true) {
        userRegistration.addRegistration({data:userRegistration.minor})
      }
      if (userRegistration.getRadioSelection === 'Adult') {
        userRegistration.addRegistration({data:userRegistration.adult})
      }
      
      // Check if the pins match before setting the password
      if (props.formData.password === props.formData.confirmPassword) {
        if (props.formData.radios === 'Adult') {
          userRegistration.adult.password = props.formData.password;
          userRegistration.adult.confirmPassword = props.formData.confirmPassword;
          userRegistration.adult.barcode = props.formData.barcode
        }
      } else {
        // Optionally, handle the case where pinpins do not match
        console.error("Pins do not match");
      }
    } else {
      dialogVisible.value = false;
      props.formData.acceptTerms = false;
    }
  };
</script>
  
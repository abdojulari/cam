<template>
    <v-container class="pt-8">
      <v-row v-if="formData.radios === 'Adult'">
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="formData.password"
            label="Password *"        
            variant="outlined"
            :rules="[rules.required, rules.password]"
            hint="Password must be 6-20 characters long, no space or special characters allowed."
            persistent-hint
            type="password"
            density="compact"
            required
            :minLength="6"
            :maxLength="20"
          />
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="formData.confirmPassword"
            label="Confirm Password *"
            variant="outlined"
            :rules="[rules.required, confirmPinRules]"
            type="password"
            density="compact"
            required
            :minLength="6"
            :maxLength="20"
          />
        </v-col>
      </v-row>
      <v-checkbox
        v-if="formData.radios !== 'Minor'"
        label="I want to create a card for a youth under my care"
        v-model="formData.addMinor"
        color="primary"
      >
      </v-checkbox>
   </v-container>
</template>
  
<script setup lang="ts">
  import { computed, onMounted, ref, watch } from 'vue';
  import { useRegistrationStore } from '../store/registration-store';

  const disabled = ref(false);
  const props = defineProps(['formData', 'rules']);
  const userRegistration = useRegistrationStore();
  // create a local formData and set it to the props
  const formData = ref(props.formData);
  const confirmPinRules = computed(() => {
    return props.formData.confirmPassword !== props.formData.password ? 'Pins do not match' : true;
  });

  // Ensure widget is rendered on component mount
  const onPasswordConfirmation = (value: boolean) => {
    if (value) {
      disabled.value = true;    
      // Check if the pins match before setting the password
      if (props.formData.password === props.formData.confirmPassword) {
        if (props.formData.radios === 'Adult') {
          userRegistration.adult.password = props.formData.password;
          userRegistration.adult.confirmPassword = props.formData.confirmPassword;
          userRegistration.adult.profile = 'EPL_SELF'
          userRegistration.adult.consent = userRegistration.getConsent
        }
    
        if (userRegistration.getRadioSelection === 'Adult') {
          userRegistration.addRegistration({data:userRegistration.adult})
        }
      } else {
        // Optionally, handle the case where pinpins do not match
        console.error("Pins do not match");
      }
    } 
  };
  watch(formData.value.addMinor, (newVal) => {
    if (newVal) {
      userRegistration.addMinor = true;
    } else {
      userRegistration.addMinor = false;
    }
  });

  watch(
    () => [formData.value.password, formData.value.confirmPassword],
    ([newPassword, newConfirmPassword]) => {
      if (newPassword && newConfirmPassword && newPassword === newConfirmPassword) {
        onPasswordConfirmation(true);
      }
    }
  );
</script>
  
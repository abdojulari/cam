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
            :rules="[rules.required, confirmPinRules, rules.password]"
            hint="Password must be 6-20 characters long, no space or special characters allowed."
            persistent-hint
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
  import { computed, ref, watch } from 'vue';
  import { useRegistrationStore } from '../store/registration-store';
  import { useReproducibleData } from '../composables/reproducible-data';
  import { apiService } from '../services/api-service';

  const disabled = ref(false);
  const props = defineProps(['formData', 'rules']);
  const userRegistration = useRegistrationStore();
  const postedAlready = ref(false);
  // create a local formData and set it to the props
  const formData = ref(props.formData);
  const confirmPinRules = computed(() => {
    return props.formData.confirmPassword !== props.formData.password ? 'Pins do not match' : true;
  });


  const onPasswordConfirmation = async (value: boolean) => {
    if (value) {
      disabled.value = true;
      
      // Check if the pins match before setting the password
      if (props.formData.password === props.formData.confirmPassword) {
        if (props.formData.radios === 'Adult') {
          userRegistration.adult.password = props.formData.password;
          userRegistration.adult.confirmPassword = props.formData.confirmPassword;
          userRegistration.adult.profile = 'EPL_SELF';
          userRegistration.adult.consent = userRegistration.getConsent;
        }

        // Check if 'userRegistration.getRegistration' contains 'userRegistration.adult'
        const existingRegistration = userRegistration.getRegistration.find(reg => reg?.data?.profile === 'EPL_SELF');
        if (existingRegistration) {
          // Delete or clear the existing registration
          const index = userRegistration.getRegistration.indexOf(existingRegistration);
          if (index !== -1) {
            userRegistration.getRegistration.splice(index, 1);  // Remove the existing entry
          }
        }
      
        // Add new registration
        if (userRegistration.getRadioSelection === 'Adult') {
          await userRegistration.addRegistration({ data: userRegistration.adult });
        }
        
      } else {
        // Optionally, handle the case where the pins do not match
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

  watch(() => [formData.value.password, formData.value.confirmPassword],
    ([newPassword, newConfirmPassword]) => {
      if (newPassword && newConfirmPassword && newPassword === newConfirmPassword) {
        onPasswordConfirmation(true);
        // send the reproducible data to the api
        const reproducibleData = useReproducibleData({
          eventCategory: 'EPL_SELF',
          eventLabel: '',
          screenName: 'Choose Your Password',
          registrationType: 'EPL_SELF',
          step: 4,
        });
        if (!postedAlready.value) {
          apiService.reproducibleData(reproducibleData).then((response: any) => {
            if (response?.message === 'Data received for statistics') {
              postedAlready.value = true;
            }
            return response.message;
          });
        }
      }
    }
  );
</script>
  
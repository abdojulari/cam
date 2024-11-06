<template>
    <v-container class="pt-8">
      <div>
        <v-text-field
          label="Pin/Password"        
          variant="outlined"
          :rules="[rules.required]"
          type="password"
          required
        ></v-text-field>
        <v-text-field
          label="Confirm Pin/Password"

          variant="outlined"
          :rules="[rules.required]"
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
  import { ref } from 'vue';
  import TermAndCondition from './TermAndCondition.vue';
  import { useRegistrationStore } from '../store/registration-store';

  const props = defineProps(['formData', 'rules']);
  const accepted = ref(false);
  const userRegistration = useRegistrationStore();

  const dialogVisible = ref(false);

const onCheckboxChange = (value: boolean) => {
  if (value) {
    dialogVisible.value = true;
    if (props.formData.acceptTerms && !userRegistration.getAdditionalMinor ) {
      userRegistration.addRegistration({data:userRegistration.minor})
    }
    if (userRegistration.getRadioSelection === 'Adult') {
      userRegistration.addRegistration({data:userRegistration.adult})
      console.log(userRegistration.getAdult)
    }
    
  } else {
    dialogVisible.value = false;
    props.formData.acceptTerms = false;
  }
};
</script>
  
<template>
    <CustomerRegistration 
        profileType="Adult" 
        @submit="onSubmit" 
        :isClient="isClient"
        @clearForm="clearForm"
    />
</template>
<script setup lang="ts">
import { apiService } from '@cam/shared-components/services/api-service';
import CustomerRegistration from '../share-form-components/CustomerRegistration.vue';
import { ref } from 'vue';
import { useRegistrationStore } from '@cam/shared-components/store/registration-store';

const userRegistration = useRegistrationStore();
const isClient = ref(true);

const clearForm = () => {
  console.log('clearForm');
}

const onSubmit = async(payload: any) => {
  // Handle adult form submission here  
    try {
      const response = await apiService.postUserData(payload.form);
      console.log('response', response);
      if (response?.message === "Record added successfully.") {
        userRegistration.setSuccessResponse({
            name: response?.data?.firstName + ' ' + response?.data?.lastName,
            barcode: response?.data?.barcode,
        });
        // after success, clear the form
        clearForm();
      }
      else if (response?.error === "Posting to ILS failed 409") {
        userRegistration.setFailedResponse({
          message: response?.message,
        });
      }
    } catch (error) {
      if( error.message === 'HTTP error! status: 409') {
        userRegistration.setFailedResponse({
          message: error.message,
        });
      }
      else {
        userRegistration.setFailedResponse({
          message: error.message,
        });
      }
    }

}
</script>

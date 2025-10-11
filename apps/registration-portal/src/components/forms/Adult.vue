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
            programType: 'CRP',
        });
        // after success, clear the form
        clearForm();
      }
      else if (response?.conflict && response?.status === 409) {
        userRegistration.setFailedResponse({
          message: 'User already exists!',
          duplicate: response?.data?.duplicate,
        });
      }
      
    } catch (error) {
      if( error.message === 'HTTP error! status: 409' || error.message === 'Posting to ILS failed 409') {
        userRegistration.setFailedResponse({
          message: 'User already exists!',
        });
      }
      else if( error.message === 'Posting to ILS failed 422' || error.message === 'HTTP error! status: 422') {
        userRegistration.setFailedResponse({
          message: 'Error posting to ILS! Please contact the helpdesk.',
        });
      }
      else {
        userRegistration.setFailedResponse({
          message: error.message,
        });
      }
    } finally {
      // Set loading to false when submission is complete
      userRegistration.setIsLoading(false);
    }
}
</script>

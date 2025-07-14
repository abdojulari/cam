<template>
    <CustomerRegistration 
        profileType="Child" 
        @submit="onSubmit" 
        :isClient="isClient"
    />
</template>
<script setup lang="ts">
import { apiService } from '@cam/shared-components/services/api-service';
import CustomerRegistration from '../share-form-components/CustomerRegistration.vue';
import { ref } from 'vue';
import { useRegistrationStore } from '@cam/shared-components/store/registration-store';
const userRegistration = useRegistrationStore();
const isClient = ref(true);

const onSubmit = async (payload: any) => {
  if (payload) {
    if (payload.form.minors.length > 0) {
      payload.form.minors.forEach(async (minor: any) => {
        const response = await apiService.postUserData(minor);
        try {
          if (response?.message === "Record added successfully.") {
            console.log('Child form submitted successfully', response);
            userRegistration.setSuccessResponse({
              name: response?.data?.firstName + ' ' + response?.data?.lastName,
              barcode: response?.data?.barcode,
            });
          }
          else if (response?.error === "Posting to ILS failed 409") {
            userRegistration.setFailedResponse({
              message: 'User already exists! Fuzzy matching is enabled.',
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
      });
    }
    const response = await apiService.postUserData(payload.form);
    try {
      if (response?.message === "Record added successfully.") {
        console.log('Child form submitted successfully', response);
        userRegistration.setSuccessResponse({
          name: response?.data?.firstName + ' ' + response?.data?.lastName,
          barcode: response?.data?.barcode,
        });
      }
      else if (response?.error === "Posting to ILS failed 409") {
        userRegistration.setFailedResponse({
          message: 'User already exists! Fuzzy matching is enabled.',
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
 
}
</script>

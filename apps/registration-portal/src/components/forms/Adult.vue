<template>
    <CustomerRegistration 
        profileType="Adult" 
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

const onSubmit = async(payload: any) => {
  // Handle adult form submission here  
    try {
      const response = await apiService.postUserData(payload.form);
      console.log('response', response);
      if (response.status === 200) {
        userRegistration.setSuccessResponse({
            name: response?.data?.firstName + ' ' + response?.data?.lastName,
            barcode: response?.data?.barcode,
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

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

const isClient = ref(true);

const onSubmit = async(payload: any) => {
  // Handle adult form submission here

  if (payload) {
    const response = await apiService.postUserData(payload.form);
    if (response.status === 200) {
      console.log('Adult form submitted successfully', response);
    } else {
      console.log('Adult form submitted failed', response);
    }
  }

}
</script>

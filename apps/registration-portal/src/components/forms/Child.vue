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
const isClient = ref(true);

const onSubmit = async (payload: any) => {
  if (payload) {
    if (payload.form.minors.length > 0) {
      payload.form.minors.forEach(async (minor: any) => {
        const response = await apiService.postUserData(minor);
        if (response.status === 200) {
          console.log('Child form submitted successfully', response);
        } else {
          console.log('Child form submitted failed', response);
        }
      });
    }
    const response = await apiService.postUserData(payload.form);
    if (response.status === 200) {
      console.log('Child form submitted successfully', response);
    } else {
      console.log('Child form submitted failed', response);
    }
  }
 
}
</script>

<template>
    <CustomerRegistration 
        profileType="Adult" 
        @submit="onSubmit" 
        :isClient="isClient"
    />
</template>
<script setup lang="ts">
import CustomerRegistration from '../share-form-components/CustomerRegistration.vue';
import { ref } from 'vue';

const isClient = ref(true);

const onSubmit = (payload: any) => {
  // Handle adult form submission here
  // payload.profile === 'Adult'
  // payload.form contains the form data
  console.log('Adult form submitted:', payload);
}
</script>

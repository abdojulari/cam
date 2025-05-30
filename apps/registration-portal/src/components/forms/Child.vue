<template>
    <NewRegistration 
        profileType="Child" 
        @submit="onSubmit" 
        :isClient="isClient"
    />
</template>
<script setup lang="ts">
import NewRegistration from '../share-components/NewRegistration.vue';
import { ref } from 'vue';
const isClient = ref(true);

const onSubmit = (payload: any) => {
  // Handle adult form submission here
  // payload.profile === 'Adult'
  // payload.form contains the form data
  console.log('Child form submitted:', payload);
}
</script>

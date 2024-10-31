<template>
    <v-container class="pt-8">
      <div class="d-flex ga-5">
         <v-text-field
        label="Street"
        v-model="formData.street"
        variant="outlined"
        :rules="[rules.required]"
        required
        width="60"
        density="compact"
      ></v-text-field>
      <v-text-field
        label="City"
        v-model="formData.city"
        variant="outlined"
        :rules="[rules.required]"
        required
        width="40"
        density="compact"
      ></v-text-field>
      </div>
     
      <div class="d-flex ga-5">
        <v-text-field
          label="Province"
          v-model="formData.province"
          variant="outlined"
          :rules="[rules.required]"
          required
          density="compact"
        ></v-text-field>
        <v-text-field
        label="Postal Code"
        v-model="formData.postalCode"
        variant="outlined"
        :rules="[rules.required, rules.postalCode]"
        required
        density="compact"
      ></v-text-field>
        
      </div>
      <div class="d-flex ga-5">
        <v-text-field
          label="Phone Number"
          v-model="formData.phone"
          variant="outlined"
          :rules="[rules.required, rules.phone]"
          required
          density="compact"
          width="30"
        ></v-text-field>
      <v-text-field
        label="Email"
        v-model="formData.email"
        variant="outlined"
        :rules="[rules.required, rules.email]"
        required
        width="70"
        density="compact"
      ></v-text-field>
      </div>
      
     
    </v-container>
  </template>
  
  <script setup>
  const props = defineProps(['formData', 'rules']);
  </script>
  
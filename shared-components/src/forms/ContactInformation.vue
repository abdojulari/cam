<template>
    <v-container class="pt-8">
      <div class="d-flex ga-5">
         <v-text-field
        label="Address"
        v-model="formData.street"
        variant="outlined"
        :rules="[rules.required]"
        required
        density="compact"
        prepend-inner-icon="mdi-home"
      ></v-text-field>
      <v-select
        label="City"
        :items="['Edmonton', 'Enoch']"
        v-model="formData.city"
        variant="outlined"
        :rules="[rules.required, rules.city]"
        required
        density="compact"
        prepend-inner-icon="mdi-city"
      ></v-select>
      </div>
     
      <div class="d-flex ga-5">
        <v-combobox
          label="Province"
          v-model="formData.province"
          variant="outlined"
          :rules="[rules.required, rules.province]"
          required
          density="compact"
          prepend-inner-icon="mdi-home-group"
          :items="['Alberta']"
        >
        </v-combobox>
        <v-text-field
          label="Postal Code"
          v-model="formData.postalCode"
          variant="outlined"
          :rules="[rules.required, rules.postalCode]"
          required
          density="compact"
          prepend-inner-icon="mdi-map-marker"
      ></v-text-field>
        
      </div>
      <div class="d-flex ga-5">
        <v-text-field
          label="Phone Number"
          v-model="formData.phone"
          v-maska="'(###) ###-####'"
          variant="outlined"
          :rules="[rules.required, rules.phone]"
          required
          density="compact"
          prepend-inner-icon="mdi-phone"
        ></v-text-field>
      <v-text-field
        label="Email"
        v-model="formData.email"
        variant="outlined"
        :rules="[rules.required, rules.email]"
        required
        density="compact"
        prepend-inner-icon="mdi-email"
      ></v-text-field>
      </div>
    </v-container>
  </template>
  
  <script setup>
    import { vMaska } from "maska/vue"
    const props = defineProps(['formData', 'rules']);
  </script>
  
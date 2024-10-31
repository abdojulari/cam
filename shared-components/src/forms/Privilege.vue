<template>
    <v-container class="pt-8" v-if="page === 'registration-portal'">
      <div class="d-flex ga-5">
        <v-combobox
          label="Privilege Expires"
          :items="['Never', '6 Months', '3 Years']"
           variant="outlined"
           density="compact"
        >
        </v-combobox>
        <v-combobox
          label="Category 1"
          :items="[ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K']"
            variant="outlined"
           density="compact"
          >
        </v-combobox>
        <v-combobox
          label="Category 2"
          :items="[ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K']"
           variant="outlined"
           density="compact"
          >
        </v-combobox>
      </div>
      <div class="d-flex ga-5">
        <v-text-field
        label="Pin"
        type="password"
        v-model="formData.pin"
        variant="outlined"
         
        density="compact"
        :rules="[rules.required]"
        required
      ></v-text-field>
      <v-text-field
        label="Confirm Pin"
        type="password"
        v-model="formData.confirmPin"
        variant="outlined"
        :rules="[rules.required]"
          density="compact"
        required
        ></v-text-field>
      </div>
    
    </v-container>
</template>
  
<script setup lang="ts">
import { ref } from 'vue';
  const props = defineProps(['formData', 'rules', 'page']);
  
</script>
  
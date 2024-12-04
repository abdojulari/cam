<template>
    <v-container class="pt-8">
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field
            label="Address"
            v-model="formData.street"
            variant="outlined"
            :rules="[rules.required]"
            required
            density="compact"
            prepend-inner-icon="mdi-home"
          />
        </v-col>
        <v-col cols="12" sm="6">
          <v-select
            label="City"
            :items="['Edmonton', 'Enoch']"
            v-model="formData.city"
            variant="outlined"
            :rules="[rules.required, rules.city]"
            required
            density="compact"
            prepend-inner-icon="mdi-city"
          />
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            label="Province"
            v-model="formData.province"
            variant="outlined"
            readonly
            density="compact"
            hint="You cannot change the province"
            hint-persistent
            prepend-inner-icon="mdi-home-group"
          />
        </v-col>
        <v-col cols="12" sm="6">
           <v-text-field
            label="Postal Code"
            v-model="formData.postalCode"
            variant="outlined"
            :rules="[rules.required, rules.postalCode]"
            required
            density="compact"
            @input="onPostalCodeInput" 
            prepend-inner-icon="mdi-map-marker"
          />
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            label="Phone Number"
            v-model="formData.phone"
            v-maska="'###-###-####'"
            variant="outlined"
            :rules="[rules.required, rules.phone]"
            required
            density="compact"
            prepend-inner-icon="mdi-phone"
          />
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            label="Email"
            v-model="formData.email"
            variant="outlined"
            :rules="[rules.required, rules.email]"
            required
            density="compact"
            prepend-inner-icon="mdi-email"
          />
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script setup>
    import { vMaska } from "maska/vue"
    const props = defineProps(['formData', 'rules']);

    // create local formData and set it to the props
    const formData = ref(props.formData);

    const onPostalCodeInput = (event) => {
     // Get the current postal code value
      let value = event.target.value || '';
      value = value.toUpperCase();
      if (value.length === 6) {
        value = value.slice(0, 3) + ' ' + value.slice(3);
      }
      formData.value.postalCode = value;
    };
  </script>
  
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
            :maxLength="7"
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
      let value = event.target.value || '';

      // Convert the value to uppercase and remove spaces
      value = value.replace(/\s/g, '').toUpperCase();

      // If the first character is not 'T', reject the input
      if (value.length > 0 && value[0] !== 'T') {
          // If the input doesn't start with 'T', clear the input (reject it)
          formData.postalCode = ''; // Optionally reset the form data
          event.target.value = ''; // Clear the input field
          return;
      }

      // Only accept up to 6 characters (postal code length)
      if (value.length > 6) {
          value = value.slice(0, 6);
      }

      // Add space after the first 3 characters for formatting (e.g., T1A 1A1)
      if (value.length > 3) {
          value = value.slice(0, 3) + ' ' + value.slice(3, 6);
      }

      formData.postalCode = value.trim();
      event.target.value = value;
    };

  </script>
  
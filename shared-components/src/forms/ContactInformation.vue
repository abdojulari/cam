<template>
    <v-container class="pt-8">
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field
            label="Building Number *"
            v-model="formData.buildingNumber"
            variant="outlined"
            density="compact"
            :rules="[rules.required, alphanumericRule]"
            required
            prepend-inner-icon="mdi-home"
            @input="updateStreet"
          />
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            label="Street *"
            v-model="formData.streetName"
            variant="outlined"
            required
            density="compact"
            prepend-inner-icon="mdi-road"
            @input="updateStreet"
            :rules="[
              value => !!value || 'Street name is required',
              value => /^[a-zA-Z0-9\s\-\'\/#]+$/.test(value) || 'Invalid characters in street name'
            ]"
          />
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            label="Apt/Unit"
            v-model="formData.aptUnit"
            variant="outlined"
            density="compact"
            prepend-inner-icon="mdi-office-building"
            :rules="[
              value => !value || /^[a-zA-Z0-9\s\-\'\/#]*$/.test(value) || 'Invalid characters in Apt/Unit'
            ]"
            @input="updateStreet"
          />
        </v-col>
        <v-col cols="12" sm="6">
          <v-select
            label="City *"
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
            label="Province *"
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
            label="Postal Code *"
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
            label="Phone Number *"
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
            label="Email *"
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
    import { ref } from 'vue';
    import { rules } from "../composables/rules";
    const props = defineProps(['formData', 'rules']);

    // create local formData and set it to the props
    const formData = ref(props.formData);
    // create a rule for aptUnit and buildingNumber fields to only accept alphanumeric characters
    const alphanumericRule = value => /^[a-zA-Z0-9\s\-\'\/#]+$/.test(value) || 'Invalid characters';

    const abbreviationMap = {
      'St': 'Street',
      'Str': 'Street',
      'Ave': 'Avenue',
      'NW': 'Northwest',
      'NE': 'Northeast',
      'SW': 'Southwest',
      'Blvd': 'Boulevard',
      'Dr': 'Drive',
      'Rd': 'Road'
    };
    // Function to update formData.street
    const updateStreet = () => {
      const aptUnit = formData.value.aptUnit ? `${formData.value.aptUnit} -` : '';
         // Replace abbreviations with full names
      let streetName = formData.value.streetName;
      Object.keys(abbreviationMap).forEach(abbr => {
        const regex = new RegExp(`\\b${abbr}\\b`, 'gi'); // Match the abbreviation as a whole word
        streetName = streetName.replace(regex, abbreviationMap[abbr]);
      });

      // Update the streetName in formData after replacement
      formData.value.streetName = streetName;
      
      const parts = [
        aptUnit,
        formData.value.buildingNumber,
        formData.value.streetName
      ].filter(Boolean);
      formData.value.street = parts.join(' ');
    };

    const onPostalCodeInput = (event) => {
      let value = event.target.value || '';
      // Convert the value to uppercase and remove spaces
      value = value.replace(/\s/g, '').toUpperCase();

      // Automatically prepend 'T' if it's not already there
      if (value.length === 0 || value[0] !== 'T') {
          value = 'T' + value;
      }

      // Only accept up to 6 characters (postal code length)
      if (value.length > 6) {
          value = value.slice(0, 6);
      }

      // Add space after the first 3 characters for formatting (e.g., T1A 1A1)
      if (value.length > 3) {
          value = value.slice(0, 3) + ' ' + value.slice(3, 6);
      }

      formData.value.postalCode = value.trim().toUpperCase();
      event.target.value = value;
    };

  </script>
  
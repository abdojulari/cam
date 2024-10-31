<template>
  <v-container>
    <v-card :style="{ backgroundColor: color }">
      <v-card-title>
        <h1 class="text-red-500">{{ formTitle }}</h1>
      </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid" @submit.prevent="submitForm">
          <v-text-field
            v-model="formData.firstname"
            label="First name"
            :rules="[rules.required]"
            required
            variant="outlined" 
          >
          </v-text-field>
          <v-text-field
            v-model="formData.lastname"
            label="Last name"
            :rules="[rules.required]"
            required
            variant="outlined" 
          >
          </v-text-field>
          <v-text-field
            v-model="formData.middlename"
            label="Middle name"
            :rules="[rules.required]"
            required
            variant="outlined" 
          >
          </v-text-field>
          <v-text-field
            v-model="formData.email"
            label="Email"
            :rules="[rules.required, rules.email]"
            required
            variant="outlined"
          ></v-text-field>
          
          <v-btn type="submit" class="text-lg text-capitalize text-red-500">Submit</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, defineProps } from 'vue';

const props = defineProps({
  color: {
    type: String,
    default: 'white',
  },
  formTitle: {
    type: String,
    default: 'Welcome to the Portal',
  },
});

const valid = ref(false);
const formData = ref({
  firstname: '',
  lastname: '',
  middlename: '',
  email: '',
  message: '',
});

const rules = {
  required: (value) => !!value || 'Required.',
  email: (value) => {
    const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    return emailPattern.test(value) || 'Invalid e-mail.';
  },
};

const form = ref(null);

const submitForm = () => {
  if (form.value.validate()) {
    console.log('Form data:', formData.value);
    formData.value = { firstname: '', middlename: '', lastname: '', email: '', message: '' }; 
  }
};
</script>

<style scoped>
.text-red-500 {
  color: #f44336; /* Example color */
}
.text-blue-90 {
  color: #2196f3; /* Example color */
}
.text-xlg {
  font-size: 1.5rem; /* Example size */
}
</style>
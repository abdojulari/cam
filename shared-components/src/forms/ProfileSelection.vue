<template>
  <v-container fluid>
    <p class="my-5 text-h6"> Create your account and enjoy the endless possibilities!</p>
    <p class="my-5 text-body-1"> Have any questions about signing up? Check out our <NuxtLink  to="https://www.epl.ca/faq/library-cards/"> frequently asked questions. </NuxtLink> </p>
    <p>Selected Button: {{ formData.radios }}</p>
    
    <v-radio-group v-model="formData.radios" @change="emitRadios">
      <v-radio label="Adult" value="Adult"></v-radio>
      <v-radio label="Minor" value="Minor"></v-radio>
    </v-radio-group>

    <v-checkbox
        label=""
        v-model="accepted"
        required
      >
      <template v-slot:label>
        <div class="text-body-2 ">
          I agree to receive email from the Edmonton Public Library <br>about EPL news and events. I may unsubscribe at any time.
        </div>
      </template>
    </v-checkbox>
  </v-container>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue';
import { useRegistrationStore } from '../store/registration-store';

const accepted = ref(false);
const radioSelection = useRegistrationStore();
const props = defineProps(['formData', 'rules', 'page']);
const emit = defineEmits(['update:radios']);
const emitRadios = () => {
  emit('update:radios', props.formData.radios.value );
  radioSelection.setRadioSelection(props.formData.radios);
};


</script>

<template>
  <v-container fluid class="pa-4">
    <p class="my-5 text-h6 font-weight-bold">Create your account and enjoy the endless possibilities!</p>

    <p class="my-5 text-body-1">
      Have any questions about signing up? Check out our 
      <NuxtLink class="text-decoration-underline text-primary" to="https://www.epl.ca/faq/library-cards/"> 
        frequently asked questions.
      </NuxtLink>
    </p>

    <v-radio-group v-model="formData.radios" @change="emitRadios" class="mb-5">
      <v-radio label="Adult" value="Adult" class="my-2"></v-radio>
      <v-radio label="Minor" value="Minor" class="my-2"></v-radio>
    </v-radio-group>

    <v-checkbox 
      v-if="formData.radios === 'Adult'" 
      label=""
      v-model="accepted"
      required
      class="my-4"
    >
      <template v-slot:label>
        <div class="text-body-2 text-justify">
          I agree to receive emails from the Edmonton Public Library <br>about EPL news and events. I may unsubscribe at any time.
        </div>
      </template>
    </v-checkbox>
  </v-container>
</template>

<script setup lang="ts">
  import { ref, defineProps, defineEmits, watch } from 'vue';
  import { useRegistrationStore } from '../store/registration-store';

  const accepted = ref(false);
  const radioSelection = useRegistrationStore();
  const props = defineProps(['formData', 'rules', 'page']);
  const emit = defineEmits(['update:radios']);
  
  const emitRadios = () => {
    emit('update:radios', props.formData.radios.value );
    radioSelection.setRadioSelection(props.formData.radios);
  };

  watch(accepted, (newVal) => {
    console.log(newVal);
    if (newVal) {
      radioSelection.setConsent('ECONSENT');
    }
  });
</script>

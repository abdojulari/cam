<template>
  <v-container fluid class="pa-4">
    <p class="my-5 text-h6 font-weight-bold">
      Create your account and enjoy the endless possibilities!
    </p>
    <p class="my-5 text-body-1">
      Have any questions about signing up? Check out our 
      <NuxtLink class="text-decoration-underline text-primary" to="https://www.epl.ca/faq/library-cards/"> 
        frequently asked questions.
      </NuxtLink>
    </p>

    <v-radio-group v-model="formData.radios" @change="emitRadios" class="mb-5">
      <v-radio label="Adult" value="Adult" class="my-2" />
      <v-radio label="Minor" value="Minor" class="my-2" />
    </v-radio-group>

    <div 
      v-if="formData.radios === 'Adult'"
      class="d-flex align-start"
    >
      <v-checkbox  
        v-model="accepted"
        required
        class="mr-3"
      />
      <span class="text-body-1 ma-3">
        I agree to receive emails from the Edmonton Public Library about EPL news and events. I may unsubscribe at any time.
      </span>
    </div>
  </v-container>
</template>

<script setup lang="ts">
  import { ref, watch } from 'vue';
  import { useRegistrationStore } from '../store/registration-store';

  const accepted = ref(false);
  const radioSelection = useRegistrationStore();
  const props = defineProps(['formData', 'rules', 'page']);
  const emit = defineEmits(['update:radios']);
  
  // declare a local formData and set it to the props
  const formData = ref(props.formData);
  const emitRadios = () => {
    emit('update:radios', props.formData.radios.value );
    radioSelection.setRadioSelection(props.formData.radios);
  };

  watch(accepted, (newVal) => {
    if (newVal) {
      radioSelection.setConsent('ECONSENT');
    }
  });
</script>

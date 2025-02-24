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
    <div>
      <p class="mb-5 text-body-1 font-weight-bold">Verifying human user *</p>
      <div id="container" class="cf-turnstile"></div>
    </div>

    <v-radio-group 
      v-model="formData.radios" 
      @change="emitRadios" 
      class="mb-5"
      v-if="tokenResponse"
    >
      <v-radio color="primary" label="Adult" value="Adult" class="my-2" />
      <v-radio color="primary" label="Child" value="Minor" class="my-2" />
    </v-radio-group>

    <div 
      v-if="tokenResponse && (formData.radios === 'Adult' || formData.radios === 'Minor')"
      class="d-flex flex-column align-start"
    >
      <TermsAndConditions />
      <v-checkbox
          label="I accept the terms and conditions *"
          color="primary"
          v-model="formData.acceptTerms"
          @click="onNativeSubmit"
          required
      />
      <v-checkbox  
        v-model="accepted"
        required
        class="mr-3"
        color="primary"
        label="I agree to receive emails from the Edmonton Public Library about EPL news and events. I may unsubscribe at any time."
      />
    </div>
  </v-container>
</template>

<script setup lang="ts">
  import { onMounted, ref, watch } from 'vue';
  import { useRegistrationStore } from '../store/registration-store';
  import TermsAndConditions from './TermsAndConditions.vue';
import { Registration } from '../types/online.dt.types';
  const accepted = ref(false);
  const userRegistration = useRegistrationStore();
  const props = defineProps(['formData', 'rules', 'page']);
  const emit = defineEmits(['update:radios']);
  const tokenResponse = ref();
  const config = useRuntimeConfig()
  const siteKey = `${config.public.site_key}`
  // declare a local formData and set it to the props
  const formData = ref(props.formData);
  const emitRadios = () => {
    emit('update:radios', props.formData.radios.value );
    userRegistration.setRadioSelection(props.formData.radios);
  };

  onMounted(() => {
    // if using synchronous loading, will be called once the DOM is ready
    turnstile.ready(function () {
      turnstile.render("#container", {
        sitekey: siteKey,
        callback: function (token: unknown) {
          tokenResponse.value = token;
        },
      });
    });
  });

  watch(accepted, (newVal) => {
    if (newVal) {
      userRegistration.setConsent('ECONSENT');
    } else {
      userRegistration.setConsent('ENOCONSENT');
    }
  });

  // Submit the token to your server for validation
  const onNativeSubmit = async () => {
    const config = useRuntimeConfig();
    const response = await $fetch(`${config.public.baseUrl}/validate-turnstile`, {
      method: 'POST',
      body: {
        token: tokenResponse.value,
      }
    })
    userRegistration.setTurnstile((response as any).success)
    //console.log((response as any).success)
  }

</script>

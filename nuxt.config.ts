// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@pinia/nuxt",
    "@nuxtjs/turnstile",
    "@nuxtjs/tailwindcss",
    "@nuxt/scripts",
    "nuxt-gtag",
    "@nuxt/image"
  ],
  alias: {
    '@cam/shared-components': './shared-components/src',
    '@cam/shared-services': './shared-services/src'
  }
})
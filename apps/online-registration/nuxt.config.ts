import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { defineNuxtConfig } from 'nuxt/config';
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      script: [
        {
          src: '',
          async: true,
          defer: true,
        },
      ],
    },
  },
  workspaceDir: '../../',
  build: {
    transpile: ['vuetify','@nuxt/types'],
  },
  srcDir: 'src',
  devtools: { enabled: true },
  runtimeConfig:{
    turnstile: {
      // This can be overridden at runtime via the NUXT_TURNSTILE_SECRET_KEY
      // environment variable.
      secretKey: '0x4AAAAAAA0-MZhr0hHUmpk6sBToSES7Jvs',
    },
    public:{
      apiBase: process?.env.NUXT_PUBLIC_ILS_URL,
      SYMWS_USER: process?.env.SYMWS_USER,
      SYMWS_PASS: process?.env.SYMWS_PASS,
      SYMWSCLIENTID: process.env.SYMWSCLIENTID,
      APPS_ID: process?.env.APPS_ID,
      ENDPOINT: process?.env.ENDPOINT,
      user: process?.env.USER_ENDPOINT,
      PATRON_USER: process?.env.PATRON_USER,
      LOGIN_USER: process?.env.LOGIN_USER,
      CRE_BASE_URL: process?.env.CRE_BASE_URL,
      CLIENT_ID: process?.env.CLIENT_ID,
      CLIENT_SECRET: process?.env.CLIENT_SECRET,
      tokenUrl: process.env.NUXT_CRE_TOKEN,
      CRE_BARCODE_URL: process?.env.CRE_BARCODE_URL,
      CRE_DUPLICATE_URL: process?.env.CRE_DUPLICATE_URL,
    }
  },
  modules:[
    '@nuxtjs/tailwindcss',
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
    '@nuxtjs/turnstile'
  ],
  turnstile: {
    siteKey: '0x4AAAAAAA0-MfbU2F9tiUGq',
    appearance: 'execute',
    mode: 'visible',
    autoResetOnSuccess: true,
    scriptOptions: {
      async: true,
      defer: true
    }
  },
  css: ['~/assets/css/styles.scss'],
  devServer: {
    host: 'localhost',
    port: 4500,
  },

  typescript: {
    typeCheck: true,
    tsConfig: {
      extends: '../tsconfig.app.json', // Nuxt copies this string as-is to the `./.nuxt/tsconfig.json`, therefore it needs to be relative to that directory
    },
  },

  imports: {
    autoImport: true,
  },
  vite: {
    plugins: [nxViteTsPaths()],
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },

  compatibilityDate: '2024-04-03',
});
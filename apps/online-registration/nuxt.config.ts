import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { defineNuxtConfig } from 'nuxt/config';
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  workspaceDir: '../../',
  build: {
    transpile: ['vuetify','@nuxt/types'],
  },
  srcDir: 'src',
  devtools: { enabled: true },
  runtimeConfig:{
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
  ],
  css: ['~/assets/css/styles.scss'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
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

  compatibilityDate: '2024-09-14',
});
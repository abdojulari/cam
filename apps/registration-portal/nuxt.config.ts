import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { defineNuxtConfig } from 'nuxt/config';
import { fileURLToPath  } from 'url';
import { resolve } from 'path';
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  workspaceDir: '../../',
  srcDir: 'src',
  build: {
    transpile: ['vuetify'],
  },
  devtools: { enabled: true },
  alias: {
    '@cam/shared-components': resolve(__dirname, '../../shared-components/src'),
    '@cam/shared-services': resolve(__dirname, '../../shared-services/src'),
    '@shared': resolve(__dirname, '../../'),
  },
  runtimeConfig:{
    public:{
      NODE_ENV: process?.env.NODE_ENV,
      site_key: process?.env.NUXT_PUBLIC_TURNSTILE_SITE_KEY,
      turnstile_url: process?.env.NUXT_TURNSTILE_VERIFY_URL,
      gtagId: process?.env.NUXT_PUBLIC_GA_ID,
      CRE_QUICK_DUPLICATE_URL: process?.env.CRE_QUICK_DUPLICATE_URL,
      CRE_BACKCODE_LOOKUP: process?.env.CRE_BACKCODE_LOOKUP,
    },
  },
  $development: {
    runtimeConfig: {
      public: {
        NODE_ENV: 'development',
        CRE_QUICK_DUPLICATE_URL: process?.env.CRE_QUICK_DUPLICATE_URL,
        CRE_BACKCODE_LOOKUP: process?.env.CRE_BACKCODE_LOOKUP,
        CANADA_POST_API_KEY: process?.env.CANADA_POST_API_KEY,
        CANADA_POST_API_FIND_URL: process?.env.CANADA_POST_API_FIND_URL,
        CANADA_POST_API_RETRIEVE_URL: process?.env.CANADA_POST_API_RETRIEVE_URL,
      },
    },
  },
  $production: {
    runtimeConfig: {
      public: {
        NODE_ENV: 'production',
        CRE_QUICK_DUPLICATE_URL: process?.env.CRE_QUICK_DUPLICATE_URL,
        CRE_BACKCODE_LOOKUP: process?.env.CRE_BACKCODE_LOOKUP,
      },
    },
  },
  modules:[
    '@nuxtjs/tailwindcss',
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
    '@pinia/nuxt'
  ],
  css: ['~/assets/css/styles.scss'],
  devServer: {
    host: 'localhost',
    port: 4200,
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
  },

  compatibilityDate: '2024-09-14',
});
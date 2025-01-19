import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { defineNuxtConfig } from 'nuxt/config';
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
// https://nuxt.com/docs/api/configuration/nuxt-config
const hostname = typeof window !== 'undefined' ? window.location.hostname : '';

export default defineNuxtConfig({
  app: {
    head: {
      title: 'EPL | Online Registration',
      script: [
        {
          src: 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit',
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
    public:{
      NODE_ENV: process?.env.NODE_ENV,
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
      secret_key: process?.env.NUXT_PUBLIC_TURNSTILE_SECRET_KEY,
      site_key: process?.env.NUXT_PUBLIC_TURNSTILE_SITE_KEY,
      turnstile_url: process?.env.NUXT_TURNSTILE_VERIFY_URL,
      gtagId: process?.env.NUXT_PUBLIC_GA_ID,
    }
  },
  $development: {
    runtimeConfig: {
      public: {
        baseUrl: 'http://localhost:4500/api',
      },
    },
  },
  $production: {
    runtimeConfig: {
      public: {
        baseUrl: hostname === 'cam.epl.ca' ? 'https://cam.epl.ca/api' : 'https://epl-cam.epl.ca/api',
      },
    },
    routeRules: {
      '/**': { isr: true }
    }
  },
  $env: {
    stagging: {
      runtimeConfig: {
        public: {
          baseUrl: 'https://cam-dev.epl.ca/api',
        },
      },
    },

  },
  modules:[
    '@nuxtjs/tailwindcss',
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error Description of why the error is expected
        config.plugins.push(vuetify({ autoImport: true }))
      })
    }
  ],
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
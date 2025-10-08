import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { config } from 'dotenv';
import { defineNuxtConfig } from 'nuxt/config';
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  app: {
    head: {
      title: 'EPL | Get Your FREE Library Card',
      script: [
        {
          src: 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit',
        },
        {
          // Meta Pixel Script
          type: 'text/javascript',
          innerHTML: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window,document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '330295490736920');
            fbq('track', 'PageView');
          `,
        }
      ],
      noscript: [
        {
          innerHTML: `
            <img height="1" width="1" 
            src="https://www.facebook.com/tr?id=330295490736920&ev=PageView&noscript=1"/>
          `,
        }
      ]
    },
    
  },
  nitro: {
    storage: {
      redis: {
        driver: 'redis',
        port: 6379,
        host: "127.0.0.1",
        username: "",
        password: "",
        db: 0
      }
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
      site_key: process?.env.NUXT_PUBLIC_TURNSTILE_SITE_KEY,
      turnstile_url: process?.env.NUXT_TURNSTILE_VERIFY_URL,
      gtagId: process?.env.NUXT_PUBLIC_GA_ID,
      IS_MAINTENANCE: process?.env.IS_MAINTENANCE,
    },
    private: {
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
      VITE_CUSTOM_SECURITY_TOKEN: process?.env.VITE_CUSTOM_SECURITY_TOKEN,
      VITE_CRE_LOGIN: process?.env.VITE_CRE_LOGIN,
      VITE_CRE_PASSWORD: process?.env.VITE_CRE_PASSWORD,
      VITE_CRE_AUTH_URL: process?.env.VITE_CRE_AUTH_URL,
      CRE_CUSTOMER_AUTH_URL: process?.env.CRE_CUSTOMER_AUTH_URL,
      CRE_STATISTICS_URL: process?.env.CRE_STATISTICS_URL,
      LPASS_URL: process?.env.LPASS_URL,
      JWT_SECRET: process.env.JWT_SECRET,
      userSeed: process.env.USER_SEED,
      IS_MAINTENANCE: process?.env.IS_MAINTENANCE,
    },
  },
  $development: {
    runtimeConfig: {
      public: {
        baseUrl: 'http://localhost:4500/api',
        tokenUrl: process.env.NUXT_CRE_TOKEN,
        CLIENT_ID: process?.env.CLIENT_ID,
        CLIENT_SECRET: process?.env.CLIENT_SECRET,
        IS_MAINTENANCE: process?.env.IS_MAINTENANCE,
      },
    },
  },
  $production: {
    runtimeConfig: {
      public: {
        baseUrl: 'https://cam.epl.ca/api',
        IS_MAINTENANCE: process?.env.IS_MAINTENANCE,
      }
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
          IS_MAINTENANCE: process?.env.IS_MAINTENANCE,
        },
      },
    },
  },
  modules:[
    '@nuxtjs/tailwindcss',
    'nuxt-gtag',
    
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
  gtag: {
    id: process.env.NUXT_PUBLIC_GA_ID,
    initCommands: [
      // Setup up consent mode
      ['consent', 'default', {
        ad_user_data: 'granted',
        ad_personalization: 'granted',
        ad_storage: 'granted',
        analytics_storage: 'granted',
        wait_for_update: 500,
      }]
    ],
    config:{},
    event_name:'epl_card_reg'
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
module.exports = {
    apps: [
      {
        name: 'online-registration',
        port: '3000',
        exec_mode: 'cluster',
        instances: 'max',
        script: './.output/server/index.mjs',
        env: {
          NODE_ENV: 'production',
          NUXT_PUBLIC_ILS_URL: process.env.NUXT_PUBLIC_ILS_URL, // Ensure these are set in the environment or .env
          SYMWS_USER: process.env.SYMWS_USER,
          SYMWS_PASS: process.env.SYMWS_PASS,
          SYMWSCLIENTID: process.env.SYMWSCLIENTID,
          APPS_ID: process.env.APPS_ID,
          ENDPOINT: process.env.ENDPOINT,
          USER_ENDPOINT: process.env.USER_ENDPOINT,
          PATRON_USER: process.env.PATRON_USER,
          LOGIN_USER: process.env.LOGIN_USER,
          CRE_BASE_URL: process.env.CRE_BASE_URL,
          CLIENT_ID: process.env.CLIENT_ID,
          CLIENT_SECRET: process.env.CLIENT_SECRET,
          NUXT_CRE_TOKEN: process.env.NUXT_CRE_TOKEN,
          CRE_BARCODE_URL: process.env.CRE_BARCODE_URL,
          CRE_DUPLICATE_URL: process.env.CRE_DUPLICATE_URL,
          NUXT_PUBLIC_TURNSTILE_SECRET_KEY: process.env.NUXT_PUBLIC_TURNSTILE_SECRET_KEY,
          NUXT_PUBLIC_TURNSTILE_SITE_KEY: process.env.NUXT_PUBLIC_TURNSTILE_SITE_KEY,
          NUXT_TURNSTILE_VERIFY_URL: process.env.NUXT_TURNSTILE_VERIFY_URL,
          gtagId: process.env.NUXT_PUBLIC_GA_ID,
        },
        env_file: '/var/www/cam/.env'
      }
    ]
  }

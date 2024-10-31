import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import { createPinia } from 'pinia'

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: {
          mdi,
        },
      },
  })
  const pinia = createPinia()
  app.vueApp.use(pinia)
  app.vueApp.use(vuetify)
})

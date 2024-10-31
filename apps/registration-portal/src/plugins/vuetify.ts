import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { mdi } from 'vuetify/iconsets/mdi'
import { aliases, fa } from 'vuetify/iconsets/fa-svg'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'


export default defineNuxtPlugin((app) => {
  
  app.vueApp.component('font-awesome-icon', FontAwesomeIcon)
  library.add(fas)
  library.add(far)

  const vuetify = createVuetify({
    icons: {
        defaultSet: 'fa',
        aliases,
        sets: {
          fa,
          mdi,
        },
      },
  })
  
  app.vueApp.use(vuetify)
})

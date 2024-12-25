import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify, type ThemeDefinition} from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import { createPinia } from 'pinia'

const lightTheme: ThemeDefinition = {
  dark: false,
  colors: {
    background: '#FFFFFF',
    surface: '#FFFFFF',
    primary: '#1765a6',
    'primary-darken-1': '#1765a6',
    'green-darken-4': '#237b00',
    blue: '#ecf9fe',
    secondary: '#03DAC6',
    'secondary-darken-1': '#018786',
    error: '#B00020',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',
  },
}
export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: {
          mdi,
        },
    },
    theme: {
      defaultTheme: 'lightTheme',
      themes: {
        lightTheme,
      } 
    }
  })
  const pinia = createPinia()
  app.vueApp.use(pinia)
  app.vueApp.use(vuetify)
})

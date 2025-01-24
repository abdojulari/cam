import VueGtag from 'vue-gtag-next'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueGtag, {
    property: {
      id: 'G-XXXXXXXXXX' // Replace with your GA4 measurement ID
    },
    isEnabled: true,
    useDebugger: process.env.NODE_ENV !== 'production'
  })
})
import VueGtag from 'vue-gtag-next'

export default defineNuxtPlugin((nuxtApp) => {
  const  gtagId  = useRuntimeConfig().public;
  nuxtApp.vueApp.use(VueGtag, {
    property: {
      id: gtagId.gtagId
    },
    isEnabled: true,
    useDebugger: process.env.NODE_ENV !== 'production'
  })
})
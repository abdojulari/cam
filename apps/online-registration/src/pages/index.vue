<template>
  <Stepper :page="'online-registration'" />
</template>

<script setup lang="ts">
import Stepper from 'shared-components/src/forms/Stepper.vue'
import { ref, watchEffect } from 'vue'
import { useRouter } from 'vue-router'

const config = useRuntimeConfig()

const router = useRouter()
const isMaintenance = ref(config.public.IS_MAINTENANCE)

watchEffect(() => {
  if (isMaintenance.value) {
    router.push('/maintenance')
  }
})

// Add Google Tag Manager scripts specifically for this page
useHead({
  script: [
    {
      type: 'text/javascript',
      innerHTML: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','GTM-WQQQLN2V');`,
      tagPosition: 'head',
      tagPriority: 'high'
    },
    {
      type: 'text/javascript',
      innerHTML: `!function(f,b,e,v,n,t,s) 
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod? 
      n.callMethod.apply(n,arguments):n.queue.push(arguments)}; 
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0'; 
      n.queue=[];t=b.createElement(e);t.async=!0; 
      t.src=v;s=b.getElementsByTagName(e)[0]; 
      s.parentNode.insertBefore(t,s)}(window,document,'script', 
      'https://connect.facebook.net/en_US/fbevents.js'); 
      fbq('init', '330295490736920');  
      fbq('track', 'PageView');`,
      tagPosition: 'head',
      tagPriority: 'high'
    },
  ],
  // Add the noscript iframe as a custom head tag
  // This will be added to the body via Nuxt's handling
  noscript: [
    {
      innerHTML: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WQQQLN2V"
      height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
      tag: 'noscript',
      tagPosition: 'bodyOpen'
    },
    {
      innerHTML: `<img height="1" width="1"
      src="https://www.facebook.com/tr?id=330295490736920&ev=PageView&noscript=1"/>`,
      tag: 'noscript',
      tagPriority: 'high',
      tagPosition: 'bodyOpen'
    }
  ]
});

</script>
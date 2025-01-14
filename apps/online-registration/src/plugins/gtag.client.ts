export default defineNuxtPlugin(() => {
    const { gtagId } = useRuntimeConfig().public;
    
    // Using rest parameters for gtag function
    function gtag(...args: unknown[]) {
      window.dataLayer.push(args);
    }
    
    window.dataLayer = window.dataLayer || [];
    
    gtag("js", new Date());
    gtag("config", gtagId);
    
    useHead({
      script: [
        {
          src: `https://www.googletagmanager.com/gtag/js?id=${gtagId}`,
          async: true,
        },
      ],
    });
  });
  
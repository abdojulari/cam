<!-- eslint-disable vue/no-v-text-v-html-on-component -->
<template>
   <v-defaults-provider :defaults="{ VContainer: { style: 'font-family: Arial, Helvetica, sans-serif'}}">
  <v-container class="py-10">
    <v-row class="row-top">
      <v-col cols="12">
        <h1 class="text-h4 font-weight-bold">{{ content.introSection.title }}</h1>
        <hr class="title-divider  w-100 bg-orange">
        <v-img
          class="mb-5 "
          :src="`/images/${content.introSection.image}`"
          alt="Person holding phone showing digital library"
        />
      </v-col>
    </v-row>

    <v-row class="row-uniform">
      <v-col cols="12" sm="8">
        <h2 class="text-h4 mb-4 font-weight-bold">{{ content.introSection.intro.heading }}</h2>
        <p class="mb-4 text-body-1 lh-lg">{{ content.introSection?.intro?.paragraph }}</p>
        <p class="mb-4 text-body-1 lh-lg">{{ content.introSection?.intro?.second_paragraph }}</p>
      </v-col>
      <v-col cols="12" sm="4">
        <div class="d-flex flex-column">
          <v-hover v-slot="{ isHovering, props }">
            <a 
              :href="`${content.introSection.links.getCard}?${secondPart}`" 
              target="_self" rel="noopener noreferrer"
              v-bind="props"
              :class="{ 
                'bg-white text-light-blue-darken-4': isHovering, 
                'bg-primary text-white': !isHovering 
              }" 
              v-if="content.introSection.links.getCard" 
              class="mt-5 text-center text-decoration-none link py-2 rounded border-sm border-primary border-opacity-100"
              @click="handleClick(content.introSection.buttons.getCard, content.introSection.intro.heading)"
            >
              {{ content.introSection.buttons.getCard }}
            </a>
          </v-hover>  
          <v-hover v-slot="{ isHovering, props }">
            <a 
              :href="`${content.introSection.links.startStreaming}`"
              variant="outlined" 
              target="_self" rel="noopener noreferrer"
              v-bind="props"
              :class="{ 'bg-primary': isHovering, 'text-white': isHovering }" 
              v-if="content.introSection.links.startStreaming" 
              class="mt-5 text-center text-decoration-none link text-primary border-sm border-primary py-2 rounded border-opacity-100"
            >
              {{ content.introSection.buttons.startStreaming }}
            </a>
          </v-hover>
        </div>
      </v-col>    
    </v-row>

    <v-row class="row-uniform">
      <v-col cols="12">
        <h2 class="text-h5 font-weight-bold">{{ content.access.heading }}</h2>
        <hr class="title-divider my-4 w-100 bg-green">
      </v-col>
      <v-col cols="12" sm="8">
        <p class="text-body-1 lh-lg mb-4">{{ content.access.paragraph }}</p>
        <ul class="ps-10 text-body-1 lh-lg gap-2 ">
          <li v-for="(item, index) in content.access.list" :key="index" class="d-list-item" v-html = "item"> </li>
        </ul> 
        <p class="text-body-1 lh-lg mb-4">{{ content.access.paragraph2 }}</p>
      </v-col>
      <v-col cols="12" sm="4">
        <v-sheet color="purple-darken-1" rounded class="pa-3 position-relative">
          <div class="quote-container">
            <v-icon class="quote-icon text-white" size="40">mdi-format-quote-open</v-icon>
            <p class="text-body-1 lh-lg text-white" v-html="content.customerStories.quote"></p>
            
          </div>
          <div class="d-flex justify-end align-center">
            <span class="text-body-2 lh-lg text-white pe-2">- {{ content.customerStories.author }}</span>
            <v-icon class="text-white" size="40">mdi-format-quote-close</v-icon>
          </div>
        </v-sheet>
      </v-col>
      <v-col cols="12">
        <div class="w-100 d-flex flex-column flex-md-row justify-space-around my-5">
          <v-hover v-slot="{ isHovering, props }">
            <a 
              :href="`${content.access.links.signUpButton}?${secondPart}`" 
              target="_blank" rel="noopener noreferrer"
              v-bind="props"
              :class="{ 
                'bg-white text-light-blue-darken-4': isHovering, 
                'bg-primary text-white': !isHovering 
              }" 
              class="mt-5 text-center text-decoration-none link py-2 px-5 rounded border-sm border-primary border-opacity-100"
              @click="handleClick(content.access.buttons.signUpButton, content.access.heading)"
            >
              {{ content.access.buttons.signUpButton }}
            </a>
          </v-hover>
          <v-hover v-slot="{ isHovering, props }">
            <a 
              :href="content.access.links.browseButton" 
              target="_blank" rel="noopener noreferrer"
              v-bind="props"
              :class="{ 'bg-primary': isHovering, 'text-white': isHovering }"  
              class="mt-5 text-center text-decoration-none link text-primary border-sm border-primary py-2 px-5 rounded border-opacity-100"
            >
              {{ content.access.buttons.browseButton }}
            </a>
          </v-hover>
        </div>
      </v-col>
    </v-row>

    <v-row class="row-uniform">
      <v-col cols="12">
        <h2 class="text-h5 font-weight-bold">{{ content.whyGetEPLCard.heading }}</h2>
        <hr class="title-divider my-4 w-100 bg-pink-darken-1">
        <p>{{ content.whyGetEPLCard.paragraph }}</p>
      </v-col>
      <v-col v-for="(item, index) in [content.whyGetEPLCard.card1, content.whyGetEPLCard.card2, content.whyGetEPLCard.card3, content.whyGetEPLCard.card4]" :key="index" cols="12" md="3">
        <!-- @ts-ignore -->
        <v-card variant="outlined" class="mx-auto" :height="$vuetify.display.xs ? 635 : 510" >
          <a :href="`${item.link}?${secondPart}`" target="_blank" rel="noopener noreferrer">
            <v-img
              :src="`/images/${item.image}`"
              :alt="item.heading"
            />
          </a>
          <v-card-title class="text-h6 text-center">
            <span class="text-body-2 text-primary ">{{ item.heading }}</span>
          </v-card-title>
          <v-card-subtitle class="text-body-1 text-center text-wrap font-weight-medium">
            <a :href="item.link" target="_blank" rel="noopener noreferrer">
              {{ item.subheading }} 
            </a>
          </v-card-subtitle>
          <v-card-text>
            {{ item.content }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="row-uniform">
      <v-col cols="12" class="text-h6">
        <h2 class="text-h5 font-weight-bold">{{ content.eplSection.heading }}</h2>
        <hr class="title-divider my-4 w-100 bg-purple-darken-1">
      </v-col>
      <v-col cols="12" md="6">
        <h3 class="mb-4 font-weight-bold">{{ content.eplSection.needCard.title }}</h3>
        <p class="text-body-1 lh-lg mb-6">{{ content.eplSection.needCard.description }}</p>
        <v-hover v-slot="{ isHovering, props }">
          <a 
            :href="`${content.eplSection.needCard.link}?${secondPart}`" 
            target="_self"
            v-bind="props"
            :class="{ 'bg-white text-light-blue-darken-4 border-sm border-primary border-opacity-100': isHovering, 'text-white': isHovering }" 
            rel="noopener noreferrer" 
            class="text-decoration-none link lh-lg bg-primary py-2 px-5 rounded mt-5 d-inline-block"
            @click="handleClick(content.eplSection.needCard.buttonText,content.eplSection.needCard.title)"
          >
            {{ content.eplSection.needCard.buttonText }}
          </a>
        </v-hover>
      </v-col>
      <v-col cols="12" md="6">
        <h3 class="mb-4 font-weight-bold">{{ content.eplSection.haveCard.title }}</h3>
        <p class="text-body-1 lh-lg mb-6">{{ content.eplSection.haveCard.description }}</p>
        <v-hover v-slot="{ isHovering, props }">
        <a 
          :href="`${content.eplSection.haveCard.link}`"
          target="_blank"
          v-bind="props"
          :class="{ 'bg-primary': isHovering, 'text-white': isHovering }"
          rel="noopener noreferrer"
          class="mt-5 text-center link text-decoration-none text-primary border-sm border-primary py-2 px-5 d-inline-block rounded border-opacity-100"
        >
          {{ content.eplSection.haveCard.buttonText }} 
        </a>
        </v-hover>
      </v-col>
    </v-row>

    <v-row class="row-uniform mb-16">
      <v-col cols="12">
        <h2 class="text-h5 font-weight-bold">{{ content.faq.heading }}</h2>
        <hr class="title-divider my-4 w-100 bg-light-blue darken-2">
        <v-expansion-panels variant="accordion" flat>
          <v-expansion-panel v-for="(question, index) in content.faq.questions" :key="index" class="border-bottom">
            <v-expansion-panel-title class="text-body-1 lh-lg font-weight-bold">{{ question.title }}</v-expansion-panel-title>
            <v-expansion-panel-text  v-html="question.text" class="mx-7 py-2">
              
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
      <v-col cols="12">
        <a 
          href="https://www.epl.ca/faq/library-cards/ " 
          target="_blank"
          rel="noopener noreferrer"
          class="text-decoration-none text-body-1 font-weight-bold lh-lg text-primary "
        >
        View more >
        </a>
      </v-col>
    </v-row>
  </v-container>
</v-defaults-provider>
</template>

<script setup lang="ts">
import { useUtmParams } from '../composables/useUtmParams';
import { useReproducibleData } from '../composables/reproducible-data';
import { apiService } from '../services/api-service';
import { onMounted, ref } from 'vue';
import { useHead } from 'nuxt/app';

const { utmParams, urlWithoutBase } = useUtmParams();
// @ts-ignore
const { gtag } = useGtag()
const props = defineProps({
  content: {
    type: Object,
    required: true
  }
});
const firstPart = ref<string | undefined>(undefined);
const secondPart = ref<string | undefined>(undefined);

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

onMounted(async () => {
  const urlParts = urlWithoutBase?.split('?');
 
  firstPart.value = urlParts?.[0];
  secondPart.value = urlParts?.[1];
  
  const reproducibleData = useReproducibleData({
    eventCategory: props.content.pageName,
    eventLabel: 'Landing Page',
    screenName: props.content.pageName,
    registrationType: 'Campaign Acquisition',
    step: 0,
    ...utmParams
  });
  await apiService.reproducibleData(reproducibleData);
  gtag('event', 'page_view', {
    app_name: 'EPL | Online Registration | Landing Page',
    method: 'Campaign Acquisition',
    screen_name: props.content.pageName,
    event_category: 'Landing Page',
    event_label: 'Landing Page',
    event_name: 'Landing Page',
    registration_type: 'Campaign Acquisition',
    ...utmParams
  });
  
 console.log('firstPart', firstPart.value)
 console.log('secondPart', '?' + secondPart.value)

 localStorage.setItem('firstPart', firstPart.value as string);

 
});

const handleClick = async (buttonName: string, title: string) => {

  const reproducibleData = useReproducibleData({
    eventCategory: title,
    eventLabel: `${buttonName} button clicked`,
    screenName: props.content.pageName,
    registrationType: '',
    step: 0,
    ...utmParams
  });
  await apiService.reproducibleData(reproducibleData);
  gtag('event', `button_click_landing_page ${props.content.pageName}` , {
    app_name: 'EPL | Online Registration | Landing Page',
    method: 'Campaign Acquisition',
    screen_name: props.content.pageName,
    event_category: 'Landing Page',
    event_name: 'Landing Page',
    event_label: `${buttonName} button clicked`,
    registration_type: 'Campaign Acquisition',
    ...utmParams
  });
}

</script>

<style scoped>
.text-center {
  text-align: center;
}

.link {
  font-size: 16px;
  font-weight: 600;
}

.title-divider {
  border: none;
  height: 4px;
  margin: 16px 0;
  width: 100px;
}

.d-list-item {
  list-style-type: disc;
  margin-bottom: 8px;
}

.border-bottom {
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
}

/* Added for uniform row width and spacing */
.row-uniform {
  width: 100%;
  margin-left: 0;
  margin-right: 0;
  margin-bottom: 48px;
}

.row-top {
  width: 100%;
  margin-left: 0;
  margin-right: 0;
  margin-bottom: 18px;
}

.quote-container {
  position: relative;
  padding: 0 4px;
}

.quote-icon {
  position: absolute;
  top: -10px;
  left: 0;
}

.quote-container p {
  text-indent: 48px; /* This creates space just for the first line */
} 


@media screen and (max-width: 680px) {
  .v-container {
    padding: 16px;
  }
  
  .text-h4 {
    font-size: 24px !important;
  }
  
  .v-btn {
    width: 100%;
  }
  
  .row-uniform {
    margin-bottom: 32px;
  }
}

@media screen and (min-width: 681px) and (max-width: 1024px) {
  .v-container {
    padding: 20px !important;
  }

}

@media screen and (min-width: 1024px) {
  .v-container {
    max-width: 1024px;
    margin: 0 auto;
  }
}

</style>
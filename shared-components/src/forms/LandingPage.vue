<template>
  <v-container class="pa-10">
    <v-row >
      <v-col cols="12">
        <h1 class="text-h4 font-weight-bold">{{ content.introSection.title }}</h1>
        <hr class="title-divider  w-100 bg-orange">
        <v-img
          class="mb-5"
          src="https://images.unsplash.com/photo-1611162618758-2a29a995354b"
          alt="Person holding phone showing digital library"
          height="400"
          cover
        />
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" sm="8">
        <h2 class="text-h4 mb-4 font-weight-bold">{{ content.introSection.intro.heading }}</h2>
        <p class="mb-4 text-body-1 lh-lg">{{ content.introSection?.intro?.paragraph }}</p>
        <p class="mb-4 text-body-1 lh-lg">{{ content.introSection?.intro?.second_paragraph }}</p>
      </v-col>
      <v-col cols="12" sm="4">
        <div class="d-flex flex-column">
          <a 
            :href="`${content.introSection.links.getCard}`" 
            target="_blank" rel="noopener noreferrer" 
            v-if="content.introSection.links.getCard" 
            class="mt-5 text-center text-decoration-none text-body-1 bg-primary py-2 rounded"
          >
            {{ content.introSection.buttons.getCard }}
          </a>
          <a 
            :href="`${content.introSection.links.startStreaming}`"
            variant="outlined" 
            target="_blank" rel="noopener noreferrer" 
            v-if="content.introSection.links.startStreaming" 
            class="mt-5 text-center text-decoration-none text-body-1 text-primary border-sm border-primary py-2 rounded border-opacity-100"
          >
            {{ content.introSection.buttons.startStreaming }}
          </a>
        </div>
      </v-col>    
    </v-row>

    <v-row class="mx-1">
      <h2 class="text-h5">{{ content.access.heading }}</h2>
      <hr class="title-divider my-4 w-100 bg-green">
      <v-col cols="12" sm="12">
        <p class="text-body-1 lh-lg mb-4">{{ content.access.paragraph }}</p>
        <ul class="ps-4 text-body-1 lh-lg gap-2">
          <li v-for="(item, index) in content.access.list" :key="index" class="d-list-item">{{ item }}</li>
        </ul> 
      </v-col>
      <div class="w-100 d-flex flex-column flex-md-row justify-space-around my-4">
        <a 
          :href="content.access.links.signUpButton" 
          target="_blank" rel="noopener noreferrer" 
          class="mt-5 text-center text-decoration-none text-body-1 bg-primary py-2 px-5 rounded"
        >
          {{ content.access.buttons.signUpButton }}
        </a>
        <a 
          :href="content.access.links.browseButton" 
          target="_blank" rel="noopener noreferrer" 
          class="mt-5 text-center text-decoration-none text-body-1 text-primary border-sm border-primary py-2 px-5 rounded border-opacity-100"
        >
          {{ content.access.buttons.browseButton }}
        </a>
      </div>
    </v-row>

    <v-row>
      <v-col cols="12">
        <h2 class="text-h5">{{ content.customerStories.heading }}</h2>
        <hr class="title-divider my-4 w-100 bg-pink-darken-1">
        <p class="text-body-1 lh-lg">{{ content.customerStories.quote }}</p>
        <span class="text-body-1 lh-lg">- {{ content.customerStories.author }}</span>     
      </v-col>
    </v-row>

    <v-row class="mx-1">
      <h2 class="text-h5">{{ content.whyGetEPLCard.heading }}</h2>
      <hr class="title-divider my-4 w-100 bg-primary">
      <v-col v-for="(item, index) in [content.whyGetEPLCard.linkedIn, content.whyGetEPLCard.galeCourses, content.whyGetEPLCard.overDrive, content.whyGetEPLCard.job]" :key="index" cols="12" md="3">
        <v-card variant="outlined" class="mx-auto" height="450" >
          <img :src="`_nuxt/assets/images/${item.image}`" height="280" cover>
          <v-card-title class="text-h6">
            <span class="text-body-2 text-primary">{{ item.heading }}</span>
          </v-card-title>
          <v-card-subtitle class="text-body-1">
            {{ item.subheading }}
          </v-card-subtitle>
          <v-card-text>
            {{ item.content }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>


    <v-row class="mt-8 mx-1">
      <v-col cols="12" class="text-h6">
        <h2 class="text-h5">{{ content.eplSection.heading }}</h2>
        <hr class="title-divider my-4 w-100 bg-orange">
      </v-col>
      <v-col cols="12" md="6">
        <h3 class="mb-4">{{ content.eplSection.needCard.title }}</h3>
        <p class="text-body-1 lh-lg mb-6">{{ content.eplSection.needCard.description }}</p>
        <a 
          :href="content.eplSection.needCard.link" 
          target="_blank" 
          rel="noopener noreferrer" 
          class="text-decoration-none text-body-1 lh-lg bg-pink-darken-1 py-2 px-5 rounded mt-5 d-inline-block"
        >
          {{ content.eplSection.needCard.buttonText }}
        </a>
      </v-col>
      <v-col cols="12" md="6">
        <h3 class="mb-4">{{ content.eplSection.haveCard.title }}</h3>
        <p class="text-body-1 lh-lg mb-6">{{ content.eplSection.haveCard.description }}</p>
      
        <a 
          :href="content.eplSection.haveCard.link"
          target="_blank"
          rel="noopener noreferrer"
          class="mt-5 text-center text-decoration-none text-body-1 text-primary border-sm border-primary py-2 px-5 d-inline-block rounded border-opacity-100"
        >
          {{ content.eplSection.haveCard.buttonText }}
        </a>
      </v-col>
    </v-row>

    <v-row class="mb-16 mx-1">
      <v-col cols="12">
        <h2>{{ content.faq.heading }}</h2>
        <hr class="title-divider my-4 w-100 bg-light-blue darken-2">
        <v-expansion-panels variant="accordion" flat>
          <v-expansion-panel v-for="(question, index) in content.faq.questions" :key="index" class="border-bottom">
            <v-expansion-panel-title>{{ question.title }}</v-expansion-panel-title>
            <v-expansion-panel-text>{{ question.text }}</v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">

defineProps({
  content: {
    type: Object,
    required: true
  }
});

const startStreaming = () => {
  console.log('Start streaming adventures!');
};

const signUp = () => {
  console.log('Sign up and stream anywhere');
};

const getCard = () => {
  console.log('Get your card now');
};

const getImageUrl = (name) => {
  if (!name) return '';
  return `~/assets/images/${name}`;
}
</script>

<style scoped>
.text-center {
  text-align: center;
}

.title-divider {
  border: none;
  height: 4px;
  /* background: linear-gradient(90deg, #4CAF50, #8BC34A); */
  margin: 16px 0;
  width: 100px;
}
.hr-divider {
  border: none;
  height: 4px;
  background: linear-gradient(90deg, #da7e1b, #e29e31);
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

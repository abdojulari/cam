<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1 class="text-h4">{{ content.introSection.title }}</h1>
        <hr class="hr-divider my-4 w-100">
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-img
          src="https://images.unsplash.com/photo-1611162618758-2a29a995354b"
          alt="Person holding phone showing digital library"
          height="400"
          cover
        />
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" sm="6">
        <h2>{{ content.introSection.intro.heading }}</h2>
        <p class="mb-4 text-body-1 lh-lg">{{ content.introSection.intro.paragraph }}</p>
      </v-col>
      <v-col cols="12" sm="6">
        <div class="d-flex flex-column">
          <v-btn class="mt-4" color="primary" @click="getCard">{{ content.introSection.buttons.getCard }}</v-btn>
          <v-btn class="mt-4" color="primary" variant="outlined" @click="startStreaming">{{ content.introSection.buttons.startStreaming }}</v-btn>
        </div>
      </v-col>
    </v-row>

    <v-row class="mx-1">
      <h1>{{ content.access.heading }}</h1>
      <hr class="title-divider my-4 w-100">
      <v-col cols="12" sm="6">
        <p>{{ content.access.paragraph }}</p>
        <ul class="ps-4 text-body-1 lh-lg gap-2">
          <li v-for="(item, index) in content.access.list" :key="index" class="d-list-item">{{ item }}</li>
        </ul>
        <div class="d-flex flex-column flex-md-row justify-space-between my-4">
          <v-btn color="primary" @click="signUp" class="mb-2 mb-md-0">{{ content.access.signUpButton }}</v-btn>
          <v-btn color="primary" variant="outlined" @click="startStreaming">{{ content.access.browseButton }}</v-btn>
        </div>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <h2>{{ content.customerStories.heading }}</h2>
        <hr class="title-divider my-4 w-100">
        <p>{{ content.customerStories.quote }}</p>
        <span>{{ content.customerStories.author }}</span>     
      </v-col>
    </v-row>

    <v-row class="mt-8">
      <v-col cols="12" class="text-h6">
        <h2>{{ content.eplSection.heading }}</h2>
        <hr class="title-divider my-4 w-100">
      </v-col>
      <v-col cols="12" md="6">
        <h3 class="mb-4">{{ content.eplSection.needCard.title }}</h3>
        <p class="text-body-1 lh-lg mb-6">{{ content.eplSection.needCard.description }}</p>
        <v-btn color="error" size="large" @click="getCard">{{ content.eplSection.needCard.buttonText }}</v-btn>
      </v-col>
      <v-col cols="12" md="6">
        <h3 class="mb-4">{{ content.eplSection.haveCard.title }}</h3>
        <p class="text-body-1 lh-lg mb-6">{{ content.eplSection.haveCard.description }}</p>
        <v-btn variant="outlined" color="primary" size="large" @click="startStreaming">{{ content.eplSection.haveCard.buttonText }}</v-btn>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <h2>{{ content.faq.heading }}</h2>
        <hr class="title-divider my-4 w-100">
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
import content from '../constants/content.json';

const startStreaming = () => {
  console.log('Start streaming adventures!');
};

const signUp = () => {
  console.log('Sign up and stream anywhere');
};

const getCard = () => {
  console.log('Get your card now');
};
</script>

<style scoped>
.text-center {
  text-align: center;
}

.title-divider {
  border: none;
  height: 4px;
  background: linear-gradient(90deg, #4CAF50, #8BC34A);
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
    padding: 20px;
  }
}

@media screen and (min-width: 1024px) {
  .v-container {
    max-width: 1024px;
    margin: 0 auto;
  }
}
</style>

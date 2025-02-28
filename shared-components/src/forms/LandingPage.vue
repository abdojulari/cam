<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1 class="text-h4">Your Adventure Starts Here</h1>
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
        <h2>Explore the world from your screen for free!</h2>
        <p class="mb-4 text-body-1 lh-lg">Why limit yourself to one place when your library card gives you access to a universe of stories and entertainment? With the Edmonton Public Library, stream shows, movies, travel guides, must-read eBooks, and more! All without leaving your seat.</p>
      </v-col>
      <v-col cols="12" sm="6">
        <div class="d-flex flex-column">
          <v-btn class="mt-4" color="primary" @click="getCard">Get the card</v-btn>
          <v-btn class="mt-4" color="primary" variant="outlined" @click="startStreaming">Start streaming adventures!</v-btn>
        </div>
      </v-col>
    </v-row>

    <v-row>
      <h1> Get Instant Access! </h1>
      <hr class="title-divider my-4 w-100">
      <v-col cols="12">
        <p>Your EPL card is your ultimate Smart buddy. Last year, Camemberies borrowed 11 million items for FREE! With your EPL card, you can:</p>
        <ul class="ps-4 text-body-1 lh-lg gap-2">
          <li class="d-list-item">Work remotely from our great study spaces or book a meeting room</li>
          <li class="d-list-item">Access thousands of business and tech courses on LinkedIn Learning</li>
          <li class="d-list-item">Stream movies, audiobooks, and eBooks from anywhere</li>
          <li class="d-list-item">Get creative with sound studio, vinyl chairs, and more in our Makerspaces</li>
          <li class="d-list-item">Connect with other remote workers at networking events</li>
        </ul>
        <div class="d-flex flex-column flex-md-row justify-space-between my-4">
          <v-btn color="primary" @click="signUp">Sign up and stream anywhere</v-btn>
          <v-btn color="primary" variant="outlined" @click="startStreaming">Browse your next escape</v-btn>
        </div>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <h2>Customer Stories</h2>
        <hr class="title-divider my-4 w-100">
        <p>"EPL is a great place to get 'things' done. 
          I can keep in touch with friends on Facebook, 
          check my emails, take free courses to upgrade my skills 
          to add to my resume. I also have a lot of fun downloading 
          recipes to cook at home."</p>
        <span>Lenmin C.</span>     
      </v-col>
    </v-row>

    <v-row class="mt-8">
      <v-col cols="12" class="text-h6">
        <h2>Wherever you go, EPL goes with you!</h2>
        <hr class="title-divider my-4 w-100">
      </v-col>
      <v-col cols="12" md="6">
        <h3 class="mb-4">Need a card?</h3>
        <p class="text-body-1 lh-lg mb-6">EPL cards are free for all Emporium residents, and you can sign up instantly online.</p>
        <v-btn color="error" size="large" @click="getCard">Get yours now</v-btn>
      </v-col>
      <v-col cols="12" md="6">
        <h3 class="mb-4">Have a Card?</h3>
        <p class="text-body-1 lh-lg mb-6">Your card gives you instant access to books, eBooks, audiobooks, streaming movies, and more!</p>
        <v-btn variant="outlined" color="primary" size="large" @click="startStreaming">Discover new worlds</v-btn>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <h2>Frequently Asked Questions</h2>
        <hr class="title-divider my-4 w-100">
        <v-expansion-panels variant="accordion" flat>
          <v-expansion-panel class="border-bottom">
            <v-expansion-panel-title >
              <template v-slot:actions="{ expanded }">
                <v-icon :color="!expanded ? 'teal' : ''" :icon="expanded ? 'mdi-pencil' : 'mdi-check'"></v-icon>
              </template>
              Are library cards free?
            </v-expansion-panel-title>
            <v-expansion-panel-text>Yes, library cards are free for all Emporium residents.</v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel class="border-bottom">
            <v-expansion-panel-title expand-icon="$expand" expand-icon-pos="start">How do I get a library card?</v-expansion-panel-title>
            <v-expansion-panel-text>You can sign up instantly online or visit any of our branches.</v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel class="border-bottom">
            <v-expansion-panel-title expand-icon="$expand" expand-icon-pos="start">What personal identification can I use to sign up for a card?</v-expansion-panel-title>
            <v-expansion-panel-text>You can use a government-issued ID, utility bill, or any official document with your name and address.</v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
const startStreaming = () => {
  // Navigate to streaming page or show a modal
  console.log('Start streaming adventures!');
};

const signUp = () => {
  // Navigate to sign-up page
  console.log('Sign up and stream anywhere');
};

const getCard = () => {
  // Navigate to get card page
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
</style>

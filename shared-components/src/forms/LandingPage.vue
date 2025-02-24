<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="text-center">
        <h1>Your Adventure Starts Here</h1>
        <p>Explore the world from your screen for free!</p>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="6">
        <h2>Why limit yourself to one place when your library card gives you access to a universe of stories and entertainment?</h2>
        <p>With the Emporium Public Library, stream shows, movies, travel guides, must-read eBooks, and more! All without leaving your seat.</p>
        <v-btn color="primary" @click="startStreaming">Start streaming adventures!</v-btn>
      </v-col>
      <v-col cols="12" md="6">
        <v-img src="/path/to/your/image.jpg" alt="Library Adventure" />
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" class="text-center">
        <h2>Your EPL card is your ultimate Smart buddy</h2>
        <p>Last year, Camemberies borrowed 11 million items for FREE! With your EPL card, you can:</p>
        <v-list>
          <v-list-item>Work remotely from our great study spaces or book a meeting room</v-list-item>
          <v-list-item>Access thousands of business and tech courses on LinkedIn Learning</v-list-item>
          <v-list-item>Stream movies, audiobooks, and eBooks from anywhere</v-list-item>
          <v-list-item>Get creative with sound studio, vinyl chairs, and more in our Makerspaces</v-list-item>
          <v-list-item>Connect with other remote workers at networking events</v-list-item>
        </v-list>
        <v-btn color="primary" @click="signUp">Sign up and stream anywhere</v-btn>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <h2>Customer Stories</h2>
        <v-card>
          <v-card-text>
            “EPL is a great place to get ‘things’ done. I can keep in touch with friends on Facebook, check my emails, take free courses to upgrade my skills to add to my resume. I also have a list of fun downloading recipes to cook at home.”
            <br>
            - Lenmin C.
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="6">
        <h2>Need a card?</h2>
        <p>EPL cards are free for all Emporium residents, and you can sign up instantly online.</p>
        <v-btn color="primary" @click="getCard">Get yours now</v-btn>
      </v-col>
      <v-col cols="12" md="6">
        <h2>Have a Card?</h2>
        <p>Your card gives you instant access to books, eBooks, audiobooks, streaming movies, and more!</p>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <h2>Frequently Asked Questions</h2>
        <v-expansion-panels>
          <v-expansion-panel>
            <v-expansion-panel-title>Are library cards free?</v-expansion-panel-title>
            <v-expansion-panel-text>Yes, library cards are free for all Emporium residents.</v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-title>How do I get a library card?</v-expansion-panel-title>
            <v-expansion-panel-text>You can sign up instantly online or visit any of our branches.</v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-title>What personal identification can I use to sign up for a card?</v-expansion-panel-title>
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
</style>

<template>
    <v-layout class="rounded rounded-md">
      <v-app-bar prominet title="Customer Account Management">
        <template v-slot:extension>
          <v-btn icon>
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
      </v-app-bar>
      <v-navigation-drawer
        expand-on-hover
        rail
        src="https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg"
      >
        <v-list>
          <v-list-item
            prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
            subtitle="sandra_a88@gmailcom"
            title="Sandra Adams"
          ></v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <v-list-item prepend-icon="fa-solid fa-house" value="myfiles">
            <NuxtLink  to="/"> Home </NuxtLink> 
          </v-list-item>
          <v-list-item prepend-icon="fa-solid fa-people-group" value="shared">
            <NuxtLink to="/registration"> Registration</NuxtLink>
          </v-list-item>
          <v-list-item prepend-icon="fas fa-star" title="Starred" value="starred"></v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-main class="d-flex align-center justify-center tw-p-8" style="min-height: 300px;">
        <nuxt-page />
      </v-main>
    </v-layout>
</template>
<script setup>
    import { ref } from 'vue';


</script>
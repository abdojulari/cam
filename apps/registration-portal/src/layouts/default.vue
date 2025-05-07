<template>
  <v-card>
    <v-layout>
      <v-app-bar
        app    
        height="60"
        scroll-behavior="elevate"
      >
        <v-app-bar-title>
          <img src="~/assets/images/logo.png" alt="logo" class="logo" width="140" height="140">
        </v-app-bar-title>

        <template v-slot:append>
          <v-btn icon="mdi-dots-vertical"></v-btn>
        </template>
      </v-app-bar>
      <v-navigation-drawer
        location="left"
        permanent
        color="primary"
      >
        <template #prepend>
          <div class="d-flex justify-space-between align-center pa-5">
            <p class="text-body-1 text-weight-bold mx-auto">New Customer Registration</p>
          </div>
        </template>

        <v-divider />

        <v-list
          density="compact"
          nav
        >

        <v-list-group value="add-new-customer">
          <template v-slot:activator="{ props }">
            <v-list-item
              v-bind="props"
              title="New Customer"
              prepend-icon="mdi-view-dashboard" 
            ></v-list-item>
          </template>

          <v-list-item
            v-for="([title, icon], i) in admins"
            :key="i"
            :prepend-icon="icon"
            :title="title"
            :value="title"
          ></v-list-item>
        </v-list-group>
          <v-list-item
            prepend-icon="mdi-laptop"
            title="Computer Pass"
            value="computer-pass"
          />
          <v-list-item
            prepend-icon="mdi-book-open-page-variant"
            title="Guides and Resources"
            value="guides-and-resources"
          />
        </v-list>
      </v-navigation-drawer>
      <v-main />
    </v-layout>
  </v-card>
</template>
<script setup>
    import { ref } from 'vue';

    const admins = ref([
      ['Adult', 'mdi-account-plus'],
      ['Child', 'mdi-account-group-outline']
      
    ]);

</script>
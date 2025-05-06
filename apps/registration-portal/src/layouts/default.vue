<template>
  <v-card>
    <v-layout>
      <v-app-bar
        app
        color="primary"
        
        height="30"
        variant="flat"
      >
        <v-app-bar-nav-icon />
      </v-app-bar>
      <v-navigation-drawer
        location="left"
        permanent
      >
        <template #prepend>
          <v-list-item
            lines="two"
            prepend-avatar="https://randomuser.me/api/portraits/women/81.jpg"
            subtitle="Logged in"
            title="Jane Smith"
          />
        </template>

        <v-divider />

        <v-list
          density="compact"
          nav
        >
          <v-list-item 
            prepend-icon="mdi-view-dashboard" 
            title="New Registration" 
            value="New Registration"
          />
          <v-list-item
            prepend-icon="mdi-home-city"
            title="Home"
            value="home"
          />
          <v-list-item
            prepend-icon="mdi-account"
            title="My Account"
            value="account"
          />
          <v-list-item
            prepend-icon="mdi-account-group-outline"
            title="Users"
            value="users"
          />
        </v-list>
      </v-navigation-drawer>
      <v-main />
    </v-layout>
  </v-card>
</template>
<script setup>
    import { ref } from 'vue';


</script>
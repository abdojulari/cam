<template>
    <v-navigation-drawer
        location="left"
        permanent
        color="primary"
        class="custom-drawer-height ma-5 rounded-lg"
        :width="320"
      >
        <template #prepend>
          <div class="d-flex justify-space-between align-center pa-5">
            <p class="text-h6 text-weight-bold mx-auto">New Customer Registration</p>
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
            v-for="([title, value, icon], i) in admins"
            :key="i"
            :prepend-icon="icon"
          >
            <template #title>
              <router-link
                v-if="value.startsWith('/')"
                :to="value"
                class="text-decoration-none"
              >
                {{ title }}
              </router-link>
              <a
                v-else
                :href="value"
                rel="noopener"
                class="text-decoration-none"
              >
                {{ title }}
              </a>
            </template>
          </v-list-item>
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
          <v-divider />
          <v-list-group value="add-quick-links">
          <template v-slot:activator="{ props }">
            <v-list-item
              v-bind="props"
              title="Quick Links"
              prepend-icon="mdi-link" 
            ></v-list-item>
          </template>

          <v-list-item
            v-for="([title, value, icon], i) in links"
            :key="i"
            :prepend-icon="icon"
          >
            <template #title>
              <a :href="value" target="_blank" rel="noopener" class="text-decoration-none">
                {{ title }}
              </a>
            </template>
          </v-list-item>
        </v-list-group>
       
        </v-list>
    </v-navigation-drawer>
</template>
<script setup>
import { ref } from 'vue';
const admins = ref([
      ['Adult', '/adult', 'mdi-account-plus'],
      ['Juvenile', '/child', 'mdi-account-group-outline']  
    ]);

    const links = ref([
      ['Staff Web', 'https://staff.epl.ca', 'mdi-account-group-outline'],
      ['AV Incomplete', 'https://av.epl.ca', 'mdi-library'],
      ['Staff Apps', 'https://appsng.epl.ca/', 'mdi-application-brackets'],
      ['Dayforce', 'https://appsng.epl.ca/', 'mdi-application-brackets']
    ]);
</script>
<style scoped>

:deep(.custom-drawer-height) {
  height: calc(100% - 100px) !important;
  top: 60px !important;
}

:deep(.v-list-item--nav .v-list-item-title) {
  font-size: 1rem !important;
}
</style>
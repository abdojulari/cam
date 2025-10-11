<template>
  <div v-if="!isClient">
    <v-skeleton-loader type="card" class="-mt-20 mx-5 rounded-lg" :width="320" height="600" />
  </div>
  <div v-else>
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
      <v-list-item prepend-icon="mdi-home">
        <template #title>
          <router-link to="/" class="text-decoration-none">
            Home
          </router-link>
        </template>
      </v-list-item>
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
        <v-list-group value="guides-and-resources">
          <template v-slot:activator="{ props }">
            <v-list-item
              v-bind="props"
              prepend-icon="mdi-book-open-page-variant"
              title="Guides and Resources"
              value="guides-and-resources"
            />
          </template>
          <v-list-item
            v-for="([title, value, icon], i) in resources"
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
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
const isClient = ref(false);
onMounted(() => { isClient.value = true; });

const admins = ref([
      ['Adult', '/adult', 'mdi-account-plus'],
      ['Juvenile', '/child', 'mdi-account-group-outline']  
    ]);

const links = ref([
  ['Staff Web', 'https://staffweb.epl.ca/', 'mdi-account-group-outline'],
  ['Staff Apps', 'https://appsng.epl.ca/', 'mdi-application-brackets'],
  ['Dayforce', 'https://www.dayforcehcm.com/MyDayforce/MyDayforce.aspx#SG9tZT8maXNGaXJzdEZlYXR1cmU9dHJ1ZQ%3D%3D', 'mdi-application-brackets']
]);

const resources = ref([
  ['Vacancy Shift', 'https://appsng.epl.ca/vacant-shifts', 'mdi-calendar-check'],
  
]);
</script>
<style scoped>

:deep(.custom-drawer-height) {
  height: calc(100% - 100px) !important;
  top: -60px !important;
}

:deep(.v-list-item--nav .v-list-item-title) {
  font-size: 1rem !important;
}
</style>
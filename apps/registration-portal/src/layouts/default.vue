<template>
  <v-card variant="flat">
    <v-layout>
      <v-app-bar
        app    
        height="60"
        scroll-behavior="elevate"
        :elevation="1"
      >
        <v-app-bar-title>
          <img src="~/assets/images/logo.png" alt="logo" class="logo" width="140" height="140">
        </v-app-bar-title>

        <template v-slot:append>
          <div class="mr-4">
            <small class="text-body-2 text-weight-bold"> Branch: {{ ipAddress }}</small>
          </div>
          <v-btn icon="mdi-dots-vertical"></v-btn>
        </template>
      </v-app-bar>
      <v-navigation-drawer
        location="left"
        permanent
        color="primary"
        class="custom-drawer-height ma-5 rounded-lg"
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
      <v-main class="position-relative" style="height: calc(100vh - 60px);">
        <v-container>
          <slot />
        </v-container>
      </v-main>
    </v-layout>
  </v-card>
  <v-footer
    class="d-flex justify-center align-center py-3 bg-transparent mb-5"
    style="position: fixed; left: 256px; bottom: 0; width: calc(100vw - 256px); z-index: 1000;"
  >
    <div class="text-center w-100">
      © {{ new Date().getFullYear() }} — <strong>Edmonton Public Library</strong>
    </div>
  </v-footer>
</template>
<script setup>
    import { ref, onMounted } from 'vue';

    const admins = ref([
      ['Adult', '/adult', 'mdi-account-plus'],
      ['Child', '/child', 'mdi-account-group-outline']  
    ]);

    const links = ref([
      ['Staff Web', 'https://staff.epl.ca', 'mdi-account-group-outline'],
      ['AV Incomplete', 'https://av.epl.ca', 'mdi-library'],
      ['Staff Apps', 'https://appsng.epl.ca/', 'mdi-application-brackets'],
      ['Dayforce', 'https://appsng.epl.ca/', 'mdi-application-brackets']
    ]);

    const ipAddress = ref('');

    onMounted(async () => {
      try {
        const res = await fetch('https://api.ipify.org?format=json');
        const data = await res.json();
        console.log(data);
        ipAddress.value = data.ip;
      } catch (e) {
        ipAddress.value = 'Unavailable';
      }
    });

</script>

<style scoped>

:deep(.custom-drawer-height) {
  height: calc(100% - 100px) !important;
  top: 60px !important;

}
</style>
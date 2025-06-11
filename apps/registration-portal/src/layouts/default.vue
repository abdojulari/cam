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
            <small class="text-body-2 text-weight-bold"> Branch: {{ networkName }}</small>
          </div>
          <v-btn icon="mdi-dots-vertical"></v-btn>
        </template>
      </v-app-bar>
      <Sidebar />
      <v-main class="position-relative main-scrollable " style="height: calc(100vh - 60px);">
          <slot />
      </v-main>
    </v-layout>
  </v-card>
  <Footer />
</template>
<script setup>
  import { ref, onMounted, computed } from 'vue';
  import Footer from '@/components/Footer.vue';
  import Sidebar from '@/components/Sidebar.vue';
  import { getNameByIpRange } from '@/constants/ipRangeMatching';
  
  const ipAddress = ref('');
  const networkName = ref('');

  onMounted(async () => {
    try {
      const res = await fetch('https://api.ipify.org?format=json');
      const data = await res.json();
      ipAddress.value = data.ip;
      const name = await getNameByIpRange(data.ip);
      console.log(`IP ${data.ip} belongs to: ${name}`);
      networkName.value = name;
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

.main-scrollable {
  overflow-y: auto;
}
</style>
<template>
  <LandingPage :content="content" />
</template>
<script setup lang="ts">
    import LandingPage from 'shared-components/src/forms/LandingPage.vue';
    import content from '~/assets/data/connects.json';
</script>
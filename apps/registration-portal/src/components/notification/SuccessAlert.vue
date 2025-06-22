<template>
    <v-alert
      text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima, at placeat totam, magni doloremque veniam neque porro libero rerum unde voluptatem!"
      title="Alert title"
      type="success"
    ></v-alert>
</template>
<script setup lang="ts">
const props = defineProps({
    message: {
        type: String,
        required: true
    }
})
</script>
<template>
  <Stepper :page="'online-registration'" />
</template>

<script setup lang="ts">
import Stepper from 'shared-components/src/forms/Stepper.vue'
import { ref, watchEffect } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isMaintenance = ref(true)


watchEffect(() => {
  if (isMaintenance.value) {
    router.push('/maintenance')
  }
})
</script>
<template>
    <div class="">
        <InstitutionConnect />
    </div>
</template>

<script setup lang="ts">
import InstitutionConnect from '/shared-components/src/forms/InstitutionConnect.vue'
definePageMeta({
    middleware: 'auth'
})

</script>
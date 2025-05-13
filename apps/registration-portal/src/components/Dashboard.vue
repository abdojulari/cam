<template>
    
    <v-container>
        <v-row>
            <v-col cols="12">
                <h1>Dashboard</h1>

            </v-col>
        </v-row>
        <RegistrationStats />
    </v-container>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import RegistrationStats from './RegistrationStats.vue';

    const items = ref([
        {
            title: 'Dashboard',
            icon: 'mdi-home',
            to: '/dashboard'
        }
    ])
</script>
<template>
    <div v-for="(entry, index) in failedData" :key="index" class="mb-2">
        <v-alert
            :key="index"
            title="Error"
            type="error"
            @click="closeAlert(index)"
        >
            <p v-if="entry?.message" class="text-body-2">{{ entry?.message }}</p>
            <span v-if="entry?.name && entry?.barcode" class="text-body-2"><strong>{{ entry?.name }}</strong>: {{ entry?.barcode }}</span>
        </v-alert>
    </div>
</template>
<script setup lang="ts">
const props = defineProps({
    failedData: {
        type: Array,
        required: true
    }
})

const failedData = props.failedData as any;

// add close button to each alert
const closeAlert = (index: number) => {
    failedData.splice(index, 1);
}
// put a timer to close the alert after 10 seconds
setTimeout(() => {
    failedData.splice(0, 1);
}, 100000);
console.log('failedData', failedData);
</script>
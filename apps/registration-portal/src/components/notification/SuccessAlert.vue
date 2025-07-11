<template>
    <div v-for="(entry, index) in successData" :key="index" class="mb-2">
        <v-alert
            :key="index"
            title="Success"
            type="success"
            @click="closeAlert(index)"
        >
            <span class=text-body-2><strong>{{ entry?.name }}</strong>: {{ entry?.barcode }}</span>
        </v-alert>
    </div>
    
</template>
<script setup lang="ts">
const props = defineProps({
    data: {
        type: Array,
        required: true
    }
})

const successData = props.data as any;
// add close button to each alert
const closeAlert = (index: number) => {
    successData.splice(index, 1);
}
// put a timer to close the alert after 10 seconds
setTimeout(() => {
    successData.splice(0, 1);
}, 100000);
console.log('successData', successData);
</script>
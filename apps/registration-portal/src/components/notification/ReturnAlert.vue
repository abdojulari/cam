<template>
     <!-- Main Dialog -->
     <v-dialog
        v-model="showDialog"
        max-width="600"
        persistent
      >
        <v-card
          title="Notification"
          subtitle="Please check the following customer(s)."
          class="pa-5"
          flat
          width="100%"
        >
        <div v-if="successData.length > 0" class="w-100">
            <div v-for="(entry, index) in successData" :key="index" class="mb-1 text-success ml-5">
                <span class="text-body-2 bg-success pa-2 w-100">
                  <v-icon class="mr-3">mdi-check-circle</v-icon>
                  <strong>{{ entry?.name }}</strong> - {{ entry?.barcode }}
                </span>
            </div>
        </div>
        <div v-if="failedData.length > 0" class="w-100">
            <div v-for="(entry, index) in failedData" :key="index" class="mb-1 text-error ml-5">
                <span class="text-body-2 bg-error pa-2 w-100">
                  <v-icon class="mr-3">mdi-close-circle</v-icon>
                  <strong>{{ entry?.message }}</strong>
                </span>
            </div>
        </div>
         
          <template v-slot:actions>
            <v-spacer></v-spacer>
            <v-btn 
              class="text-capitalize bg-orange text-white rounded-pill" 
              @click="closeDialog"
            > 
              <v-icon>mdi-close-circle</v-icon>Close 
            </v-btn>
          </template>
        </v-card>
      </v-dialog>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();

const props = defineProps({
    data: {
        type: Array,
        required: true
    },
    failedData: {
        type: Array,
        required: true
    }
})

const successData = props.data as any;
const failedData = props.failedData as any;
// Computed property to control dialog visibility
const showDialog = ref(successData.length > 0 || failedData.length > 0);
// add close button to the dialog
const closeDialog = () => {
    showDialog.value = false; 
    // clear the data
    successData.splice(0, successData.length);
    failedData.splice(0, failedData.length);
    // redirect to the home page
    router.push('/');
}

</script>
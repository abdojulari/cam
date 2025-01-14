<template>
    <v-dialog  v-model="localIsActive" @update:model-value="handleClose" class="pa-5">
        <v-sheet
        class="d-flex align-self-start align-center justify-center flex-wrap text-center my-5 mx-auto pa-10"
        elevation="4"
        height="350"
        max-width="800"
        width="100%"
        rounded
        >
        <div>
            <h2 class="text-h4 font-weight-black text-orange">Oops, something went wrong!</h2>
    
            <div class="text-h5 font-weight-medium mb-2">
                Please visit any library branch that is closer to you to resolve the issue
            </div>
    
            <p class="text-body-2 mb-4">
                If you have any questions, please contact us at <a href="tel:780-496-7000">780-496-7000</a>
            </p>
    
            <v-btn 
                color="orange" 
                variant="text"
                @click="handleClose"
            >
                Return
            </v-btn>
        </div>
        </v-sheet>
    </v-dialog>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';

    const router = useRouter(); 
    const props = defineProps({
        isActive: Boolean
    });
    
    const emit = defineEmits(['close']);
    const localIsActive = computed({
        get: () => props.isActive,
        set: (value) => emit('close', value)
    });

    const handleClose = async () => {
        emit('close');
        //return router.push('https://epl.bibliocommons.com/locations');
    }
</script>
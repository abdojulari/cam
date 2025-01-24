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
            <h2 class="text-h4 font-weight-black text-orange">
                Oops – something isn’t working on our end.
            </h2>
            <div class="text-body-1 font-weight-medium mb-2">
                Try again in a few minutes or <a class="text-decoration-underline text-blue font-weight-bold" href="https://www2.epl.ca/ContactEPL/">contact us</a>. 
            </div>
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
    }
</script>
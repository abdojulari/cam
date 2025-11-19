<template>
    <div class="text-center pa-4">
      
      <!-- Main Dialog -->
      <v-dialog
        v-model="modelValue"
        max-width="700"
        persistent
        @update:modelValue="emit('update:dialog', $event)"
      >
        <v-card
          title="No Duplicate Customer Found"
          class="pa-5"
          flat
          >
           <v-card-text>
            <div class="d-flex align-center justify-center">
                <v-icon class="mr-3 happy-blink" size="30" color="green-darken-1">mdi-emoticon-happy</v-icon>
                <p class="text-body-1 text-green-darken-1">
                    No duplicate customer found! Please continue with the registration.
                </p>
            </div>
           </v-card-text>
         
          <template v-slot:actions>
            <v-spacer></v-spacer>
            <v-btn 
              color="green-darken-1"
              @click="emit('update:dialog', false)"
              text="Continue"
              variant="flat"
              class="text-capitalize mr-5"
            
            />
          </template>
        </v-card>
      </v-dialog>
    </div>
  </template>
  <script setup>
    import { computed, onMounted } from 'vue'
   
    onMounted(() => {
      console.log('NoDuplicateAlert mounted');
    })
    const props = defineProps({
      dialog: {
        type: Boolean,
        required: true
      }
    })
    const emit = defineEmits(['update:dialog'])
    const modelValue = computed({
      get: () => props.dialog,
      set: (val) => emit('update:dialog', val)
    })

  </script>
  <style scoped>
    .happy-blink {
      animation: happyBlink 2s ease-in-out infinite;
    }
    
    @keyframes happyBlink {
      0%, 100% {
        opacity: 1;
        transform: scale(1);
      }
      10%, 20% {
        opacity: 0.3;
        transform: scale(0.95);
      }
      15% {
        opacity: 0.1;
        transform: scale(0.9);
      }
      50% {
        opacity: 1;
        transform: scale(1.05);
      }
    }
  </style>
 
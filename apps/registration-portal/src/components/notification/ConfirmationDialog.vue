<template>
  <v-dialog
    v-model="modelValue"
    max-width="500"
    persistent
  >
    <v-card>
      <v-card-title class="text-h5">
        {{ title }}
      </v-card-title>
      <v-card-text>
        {{ message }}
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          :color="cancelColor"
          variant="text"
          @click="handleCancel"
          :text="cancelText"
          class="text-capitalize"
        />
        <v-btn
          :color="confirmColor"
          variant="flat"
          @click="handleConfirm"
          :text="confirmText"
          class="text-capitalize"
        />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps({
  dialog: {
    type: Boolean,
    required: true
  },
  title: {
    type: String,
    default: 'Confirm Action'
  },
  message: {
    type: String,
    default: 'Are you sure you want to proceed?'
  },
  confirmText: {
    type: String,
    default: 'Confirm'
  },
  cancelText: {
    type: String,
    default: 'Cancel'
  },
  confirmColor: {
    type: String,
    default: 'primary'
  },
  cancelColor: {
    type: String,
    default: 'grey'
  }
})

const emit = defineEmits(['update:dialog', 'confirm', 'cancel'])

const modelValue = computed({
  get: () => props.dialog,
  set: (val) => emit('update:dialog', val)
})

const handleConfirm = () => {
  emit('confirm')
  emit('update:dialog', false)
  router.push('/')
}

const handleCancel = () => {
  emit('cancel')
  emit('update:dialog', false)
}
</script> 
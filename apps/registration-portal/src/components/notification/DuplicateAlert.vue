<template>
    <div class="text-center pa-4">
      <!-- Confirmation Dialog -->
      <ConfirmationDialog
        :dialog="showConfirmDialog"
        @update:dialog="(val) => showConfirmDialog = val"
        @confirm="handleConfirmCancel"
        title="Confirm Cancellation"
        message="Are you sure you want to cancel the registration? All entered information will be lost."
        confirm-text="Yes"
        cancel-text="No"
        confirm-color="error"
        cancel-color="grey"
      />

      <!-- Main Dialog -->
      <v-dialog
        v-model="modelValue"
        max-width="1400"
        persistent
        @update:modelValue="emit('update:dialog', $event)"
      >
        <v-card
          title="Duplicate Customer"
          subtitle="Please verify the customer's information to ensure there is no duplicate."
          class="pa-5"
          flat
          >
            <template v-slot:text>
            <v-text-field
              v-model="search"
              label="Search"
              prepend-inner-icon="mdi-magnify"
              variant="outlined"
              density="compact"
              class="w-25 ml-auto"
              hide-details
              single-line
            />
          </template>
          <v-data-table
            v-model="selected"
            item-value="name"
            :headers="headers"
            :items="itemsWithFullname"
            :search="search"
            :items-per-page="5"
            class="ma-6 bg-blue-grey-lighten-5"
            density="compact"
            :hide-default-footer="(items && items.length < 5)"
            select-strategy="single"
          >
          </v-data-table>
          <template v-slot:actions>
            <v-spacer></v-spacer>
  
            <v-btn 
              color="error"
              @click="showConfirmDialog = true"
              text="Cancel Registration"
              variant="flat"
              class="text-capitalize"
            />
            <!-- <v-btn 
              color="primary"
              @click="emit('update:dialog', false)"
              text="Create Temporary Pass"
              class="text-capitalize"
              variant="flat"
              :disabled="selected.length === 0"
            /> -->
            <v-btn 
              color="green-darken-1"
              @click="emit('update:dialog', false)"
              text="Continue"
              variant="flat"
              class="text-capitalize mr-5"
              :disabled="selected.length >= 1"
            />
          </template>
        </v-card>
      </v-dialog>
    </div>
  </template>
  <script setup>
    import { computed } from 'vue'
    import ConfirmationDialog from './ConfirmationDialog.vue'
    
    const search = ref('')
    const selected = ref([])
    const showConfirmDialog = ref(false)
    
    const props = defineProps({
      dialog: {
        type: Boolean,
        required: true
      },
      duplicateRecord: {
        type: Array,
        required: false,
        default: undefined
      }
    })
    const emit = defineEmits(['update:dialog'])
    const modelValue = computed({
      get: () => props.dialog,
      set: (val) => emit('update:dialog', val)
    })

    const handleConfirmCancel = () => {
      showConfirmDialog.value = false
      emit('update:dialog', false)
    }

    const headers = [
      { key: 'barcode', title: 'Barcode' },
      { key: 'fullname', title: 'Full Name' },
      { key: 'dateofbirth', title: 'DOB' },
      { key: 'careof', title: 'Care/Of' },
      { key: 'email', title: 'Email' },
      { key: 'phone', title: 'Phone Number' },
      { key: 'address', title: 'Address' },
      { key: 'city', title: 'City' },
      { key: 'province', title: 'Province' },
      { key: 'postalcode', title: 'Postal Code' },
      { key: 'status', title: 'Status' },
      { key: 'profile', title: 'Profile' },
    ]
   
    // Use duplicateRecord if provided, otherwise fallback to desserts
    const items = computed(() => props.duplicateRecord && props.duplicateRecord.length ? props.duplicateRecord : [])

    const itemsWithFullname = computed(() =>
      items.value.map(item => ({
        ...item,
        fullname: [item.firstname, item.middlename, item.lastname].filter(Boolean).join(' ')
      }))
    );
  </script>
  <style scoped>
    .v-data-table {
      max-width: 96.4% !important;
    }
</style>
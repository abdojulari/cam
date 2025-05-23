<template>
    <div class="text-center pa-4">
      <v-dialog
        v-model="modelValue"
        max-width="1400"
        persistent
        @update:modelValue="emit('update:dialog', $event)"
      >
        <v-card
          title="Duplicate Customer"
          subtitle="Please select the customer you want to create a temporary pass for."
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
            class="ma-6 bg-grey-lighten-5"
            density="compact"
            :hide-default-footer="(items && items.length < 5)"
            show-select
          >
          </v-data-table>
          <template v-slot:actions>
            <v-spacer></v-spacer>
  
            <v-btn 
              color="error"
              @click="emit('update:dialog', false)"
              text="Abort Registration"
              variant="flat"
              class="text-capitalize"
            />
            <v-btn 
              color="primary"
              @click="emit('update:dialog', false)"
              text="Create Temporary Pass"
              class="text-capitalize"
              variant="flat"
            />
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
    import { computed } from 'vue'
    const search = ref('')
    const selected = ref([])
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

    const headers = [
      { key: 'fullname', title: 'Full Name' },
      { key: 'dateofbirth', title: 'DOB' },
      { key: 'email', title: 'Email' },
      { key: 'phone', title: 'Phone Number' },
      { key: 'address', title: 'Address' },
      { key: 'city', title: 'City' },
      { key: 'province', title: 'Province' },
      { key: 'postalcode', title: 'Postal Code' },
      { key: 'status', title: 'Status' },
      { key: 'profile', title: 'Profile' },
    ]
    // const desserts = [
      
    //   {
    //     name: 'Frozen Yogurt',
    //     calories: 159,
    //     fat: 6,
    //     carbs: 24,
    //     protein: 4,
    //     iron: 1,
    //   },
    //   {
    //     name: 'Ice cream sandwich',
    //     calories: 237,
    //     fat: 9,
    //     carbs: 37,
    //     protein: 4.3,
    //     iron: 1,
    //   },
    //   {
    //     name: 'Eclair',
    //     calories: 262,
    //     fat: 16,
    //     carbs: 23,
    //     protein: 6,
    //     iron: 7,
    //   },
    //   {
    //     name: 'Cupcake',
    //     calories: 305,
    //     fat: 3.7,
    //     carbs: 67,
    //     protein: 4.3,
    //     iron: 8,
    //   },
    //   {
    //     name: 'Gingerbread',
    //     calories: 356,
    //     fat: 16,
    //     carbs: 49,
    //     protein: 3.9,
    //     iron: 16,
    //   },
    //   {
    //     name: 'Jelly bean',
    //     calories: 375,
    //     fat: 0,
    //     carbs: 94,
    //     protein: 0,
    //     iron: 0,
    //   },
    //   {
    //     name: 'Lollipop',
    //     calories: 392,
    //     fat: 0.2,
    //     carbs: 98,
    //     protein: 0,
    //     iron: 2,
    //   },
    //   {
    //     name: 'Honeycomb',
    //     calories: 408,
    //     fat: 3.2,
    //     carbs: 87,
    //     protein: 6.5,
    //     iron: 45,
    //   },
    //   {
    //     name: 'Donut',
    //     calories: 452,
    //     fat: 25,
    //     carbs: 51,
    //     protein: 4.9,
    //     iron: 22,
    //   },
    //   {
    //     name: 'KitKat',
    //     calories: 518,
    //     fat: 26,
    //     carbs: 65,
    //     protein: 7,
    //     iron: 6,
    //   },
    // ]

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
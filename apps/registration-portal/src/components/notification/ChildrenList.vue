<template>
    <v-row>
        <v-col cols="12" sm="12" md="8">
            <v-card color="primary" variant="outlined" v-if="minors.length > 0" class="w-100">
                <v-card-title>
                    <h3 class="text-uppercase font-weight-black">List of Added Child(ren)</h3>
                    <span class="text-body-2 text-wrap"> For each child, please generate a barcode by scanning the card or click on the generate barcode button for digital card!</span>
                </v-card-title>
                <v-card-text class="d-flex justify-center">
                    <v-data-table
                        :headers="headers"
                        :items="props.minors"
                        item-key="id"
                        :items-per-page="5"
                        class="ma-1 bg-blue-grey-lighten-5"
                        density="compact"
                        :hide-default-footer="(props.minors && props.minors.length < 5)"
                        color="primary"
                    > 
                        <template v-slot:headers="{ columns,toggleSort }">
                        <tr>
                            <template v-for="column in columns" :key="column.key">
                            <th>
                                <span class="mr-2 cursor-pointer font-weight-bold text-sm" @click="() => toggleSort(column)">{{ column.title }}</span>
                            </th>
                            </template>
                        </tr>
                        </template>
                        <template v-slot:item.actions="{ item }: { item: any }">
                            <div class="d-flex align-center justify-center mt-2">
                                <v-btn 
                                    color="red"
                                    :disabled="isClicked" 
                                    @click="requestDelete(item.id)"
                                    text="Delete" 
                                    size="small" 
                                    density="compact" 
                                    icon="mdi-delete"
                                />
                            </div>             
                        </template>
                    </v-data-table>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
    <v-dialog v-model="confirmDialog" max-width="400">
      <v-card>
        <v-card-title>Confirm Delete</v-card-title>
        <v-card-text>Are you sure you want to delete this minor?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey" text @click="cancelDelete">Cancel</v-btn>
          <v-btn color="red" text @click="confirmDelete">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>
<script setup lang="ts">
import { ref } from 'vue';
const props = defineProps({
    minors: {
        type: Array,
        required: true
    },
    deleteMinor: {
        type: Function,
        required: true
    },
   
})

const pendingDeleteId = ref(null);
const confirmDialog = ref(false);

const requestDelete = (id) => {
  pendingDeleteId.value = id;
  confirmDialog.value = true;
};

const confirmDelete = () => {
  if (pendingDeleteId.value !== null) {
    props.deleteMinor(pendingDeleteId.value);
    pendingDeleteId.value = null;
  }
  confirmDialog.value = false;
};

const cancelDelete = () => {
  pendingDeleteId.value = null;
  confirmDialog.value = false;
};

const headers = [
    { title: 'Barcode', key: 'libraryCardBarcode' },
    { title: 'First Name', key: 'firstName' },
    { title: 'Last Name', key: 'lastName' },
    { title: 'Date of Birth', key: 'dateOfBirth' },
    { title: 'Actions', key: 'actions' }
]
const isClicked = ref(false)
</script>
<style scoped>
.small-text :deep(input) {
    font-size: 13px !important;
}
</style>
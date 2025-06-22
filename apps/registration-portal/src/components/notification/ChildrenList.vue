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
                        class="ma-1 bg-grey-lighten-5"
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
                                <v-text-field
                                    v-model="item.libraryCardBarcode"
                                    label="Barcode"
                                    density="compact"
                                    variant="outlined"
                                    color="primary"
                                    hide-details="auto"
                                    class="small-text"
                                />
                                <v-btn 
                                    color="primary"
                                    @click="props.generateBarcode(item.id)"
                                    text="Generate Barcode"
                                    size="small"
                                    density="compact"
                                    icon="mdi-barcode"
                                    class="mx-2"
                                    :hint="item.libraryCardBarcode"
                                    persistent-hint
                                />
                                <v-btn 
                                    color="red"
                                    :disabled="isClicked" 
                                    @click="props.deleteMinor(item.id)"
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
</template>
<script setup lang="ts">
const props = defineProps({
    minors: {
        type: Array,
        required: true
    },
    deleteMinor: {
        type: Function,
        required: true
    },
    generateBarcode: {
        type: Function,
        required: true
    }
})
const headers = [
    { title: 'First Name', key: 'firstName' },
    { title: 'Last Name', key: 'lastName' },
    { title: 'DOB', key: 'dateOfBirth' },
    { title: 'Actions [Barcode, Delete]', key: 'actions' }
]
const isClicked = ref(false)
</script>
<style scoped>
.small-text :deep(input) {
    font-size: 13px !important;
}
</style>
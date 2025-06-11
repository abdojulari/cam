<template>
    <v-row>
        <v-col cols="12" sm="12" md="8">
            <v-card color="primary" variant="outlined" v-if="minors.length > 0" class="w-100">
                <v-card-title>
                    <h3 class="text-uppercase font-weight-black">List of Added Child(ren)</h3>
                </v-card-title>
                <v-card-text class="d-flex justify-center">
                    <v-data-table
                        :headers="headers"
                        :items="props.minors"
                        item-key="id"
                        :items-per-page="5"
                        class="ma-6 bg-grey-lighten-5"
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
                        <v-btn 
                            color="red"
                            :disabled="isClicked" 
                            @click="props.deleteMinor(item.id)"
                            text="Delete" 
                            size="small" 
                            density="compact" 
                            icon="mdi-delete"
                        />
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
    }
})
const headers = [
    { title: 'First Name', key: 'firstName' },
    { title: 'Last Name', key: 'lastName' },
    { title: 'Middle Name', key: 'middleName' },
    { title: 'Date of Birth', key: 'dateOfBirth' },
    { title: 'Actions', key: 'actions' }
]
const isClicked = ref(false)
</script>
<style scoped>

</style>
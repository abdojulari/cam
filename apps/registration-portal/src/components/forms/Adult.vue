<template>
    <v-container>          
        <v-form>
            <v-row>
                <v-col cols="12" sm="6" md="4">
                    <h1>Add New Adult Customer</h1>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" sm="6" md="4">
                    <v-combobox 
                        label="Profile" 
                        :items="customers" 
                        v-model="selectedCustomer"
                        density="compact"
                        variant="outlined"
                        required 
                    />
                </v-col>
                <v-col cols="12" sm="6" md="4">
                    <v-combobox 
                        label="Home Branch" 
                        :items="customers" 
                        v-model="selectedCustomer"
                        variant="outlined"
                        density="compact"  
                        required 
                    />
                </v-col>
            </v-row>
            <v-divider class="my-2" elevation="4" color="grey-darken-1"/>
            <v-row>
                <v-col cols="12" sm="6" md="4">
                    <v-text-field 
                        label="First Name" 
                        v-model="firstName" 
                        variant="outlined" 
                        density="compact" 
                        required />
                </v-col>
                <v-col cols="12" sm="6" md="4">
                    <v-text-field 
                        label="Last Name" 
                        v-model="lastName" 
                        variant="outlined" 
                        density="compact" 
                        required 
                    />
                </v-col>
            </v-row>
            <v-divider class="my-4"></v-divider>
            
        </v-form>
    </v-container>
</template>
<script setup lang="ts">
import { ref } from 'vue';

const firstName = ref('');
const lastName = ref('');
const customers = ref(['John Doe', 'Jane Smith', 'Alice Johnson']);
const selectedCustomer = ref('');
</script>
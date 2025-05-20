<template>
    <v-form>
        <!-- Add New Adult Customer -->
        <v-row>
            <v-col cols="12" sm="6" md="4">
                <h1>Add New Adult Customer</h1>
            </v-col>
        </v-row>
        <!-- Profile and Home Branch -->
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
        <!-- Library Card Barcode/Provide a digital card Number -->
        <v-row>
            <v-col cols="12" sm="6" md="4">
                <v-text-field 
                    label="Library Card Barcode" 
                    v-model="libraryCardBarcode" 
                    variant="outlined" 
                    density="compact" 
                    required 
                />
            </v-col>
            <v-col cols="12" sm="6" md="4">
                <v-btn 
                    color="primary" 
                    prepend-icon="mdi-card-account-details"
                    class="text-capitalize"
                    text="Provide a digital card Number"
                />   
            </v-col>
        </v-row>
        <v-divider class="my-2" elevation="4" color="grey-darken-1"/>
        <v-row>
            <v-col cols="12" sm="6" md="4">
                <h2>Customer Information</h2>
            </v-col>
        </v-row>
        <!-- Title/First Name -->
        <v-row>
            <v-col cols="12" sm="6" md="4">
                <v-text-field 
                    label="Title"
                    v-model="title"
                    variant="outlined"
                    density="compact"
                    required
                />
            </v-col>
            <v-col cols="12" sm="6" md="4">
                <v-text-field 
                    label="First Name" 
                    v-model="firstName" 
                    variant="outlined" 
                    density="compact" 
                    required />
            </v-col>
        </v-row>
        <!-- Middle/Last Names -->
        <v-row>
            <v-col cols="12" sm="6" md="4">
                <v-text-field 
                    label="Middle Name" 
                    v-model="middleName" 
                    variant="outlined" 
                    density="compact" 
                    required 
                />
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
        <!-- Preferred Name/Use Preferred Name -->
        <v-row>
            <v-col cols="12" sm="6" md="4">
                <v-text-field 
                    label="Preferred Name" 
                    v-model="preferredName" 
                    variant="outlined" 
                    density="compact" 
                    required 
                />
            </v-col>
            <v-col cols="12" sm="6" md="4">
                <v-checkbox 
                    label="Use Preferred Name" 
                    v-model="usePreferredName" 
                />
            </v-col>
        </v-row>
        <!-- Date of Birth/Indigenous Status -->
        <v-row>
            <v-col cols="12" sm="6" md="4">
                <v-text-field 
                    label="Date of Birth" 
                    v-model="dateOfBirth" 
                    variant="outlined" 
                    density="compact" 
                    required 
                />
            </v-col>
            <v-col cols="12" sm="6" md="4">
                <v-checkbox 
                    label="Indigenous Status"
                    v-model="indigenousStatus"
                    hint="Living on-reserve or on-settlement"
                    persistent-hint
                />
            </v-col>
        </v-row>   
        <!-- Email/Phone Number -->
        <v-row>
            <v-col cols="12" sm="6" md="4">
                <v-text-field 
                    label="Email" 
                    v-model="email" 
                    variant="outlined" 
                    density="compact" 
                    required 
                />
            </v-col>
            <v-col cols="12" sm="6" md="4">
                <v-text-field 
                    label="Phone Number" 
                    v-model="phoneNumber" 
                    variant="outlined" 
                    density="compact" 
                    required 
                />
            </v-col>
        </v-row>
         
        <v-divider class="my-2" elevation="4" color="grey-darken-1"/>
        <!-- Customer Contact Information -->
        <v-row>
            <v-col cols="12" sm="6" md="4">
                <h2>Customer Contact Information</h2>
            </v-col>
        </v-row>
        <!-- Barcode to copy address information form-->
        <v-row>
            <v-col cols="12" sm="6" md="4">
                <v-text-field 
                    hint="Enter barcode to copy care/of contact & address information"
                    persistent-hint
                    label="Barcode (Scan or Type)"
                    v-model="barcode" 
                    variant="outlined" 
                    density="compact" 
                    required 
                />
            </v-col>
        </v-row>
        <!-- Care/Of field -->
        <v-row>
            <v-col cols="12" sm="6" md="4">
                <v-text-field 
                    label="Care/Of" 
                    v-model="careOf" 
                    variant="outlined"   
                    density="compact" 
                    required 
                />
            </v-col>
        </v-row>        
        <!-- Primary Address -->
        <v-row>
            <v-col cols="12" sm="6" md="4">
                <h3>Primary Address</h3>
            </v-col>
        </v-row>
        <!-- Address1 / City -->
        <v-row>
            <v-col cols="12" sm="6" md="4">
                <v-text-field 
                    label="Address Line 1" 
                    variant="outlined" 
                    density="compact" 
                    append-inner-icon="mdi-map-marker"
                    required 
                />
            </v-col>
            <v-col cols="12" sm="6" md="4">
                <v-text-field 
                    label="City" 
                    append-inner-icon="mdi-city"
                    variant="outlined"
                    density="compact" 
                    required 
                />
            </v-col>
        </v-row>
        <!-- Province, Postal Code -->
        <v-row>
            <v-col cols="12" sm="6" md="4">
                <v-text-field 
                    label="Province" 
                    variant="outlined"
                    density="compact"
                    required 
                />
            </v-col>
            <v-col cols="12" sm="6" md="4">
                <v-text-field 
                    label="Postal Code" 
                    variant="outlined"
                    density="compact"
                    required 
                />
            </v-col>
        </v-row>
        <!-- Secondary Address -->
        <v-row>
            <v-col cols="12" sm="6" md="4">
                <h3>Secondary Address</h3>
            </v-col>
        </v-row>
        <!-- Address2 / Country -->
        <v-row>
            <v-col cols="12" sm="6" md="4">
                <v-text-field 
                    label="Address Line 2" 
                    append-inner-icon="mdi-map-marker"
                    variant="outlined"
                    density="compact"
                    required 
                />
            </v-col>
            <v-col cols="12" sm="6" md="4">
                <v-text-field 
                    label="City" 
                    append-inner-icon="mdi-city"
                    variant="outlined"
                    density="compact"
                    required 
                />
            </v-col>
        </v-row>
        <!-- Province, Postal Code -->
        <v-row>
            <v-col cols="12" sm="6" md="4">
                <v-text-field 
                    label="Province" 
                    variant="outlined"
                    density="compact"
                    required 
                />
            </v-col>
            <v-col cols="12" sm="6" md="4">
                <v-text-field 
                    label="Postal Code" 
                    variant="outlined"
                    density="compact"
                    required 
                />
            </v-col>
        </v-row>
        <!-- Marketing Consent -->
        <v-row>
            <v-col cols="12" sm="6" md="4">
                <h2>Privacy & Consent</h2>
            </v-col>
        </v-row>
        <!-- E-mail consent dropdown -->
        <v-row>
            <v-col cols="12" sm="6" md="4">
                <v-select 
                    label="Choose e-mail consent" 
                    :items="emailConsent" 
                    item-title="text"
                    item-value="value"
                    v-model="selectedEmailConsent"
                    variant="outlined"
                    density="compact"
                    required 
                />
            </v-col>
        </v-row>
        <!-- Submit Button   -->
        <v-row>
            <v-spacer />
            <v-col cols="12" sm="6" md="4">
                <v-btn 
                    color="primary" 
                    prepend-icon="mdi-check"
                    class="text-capitalize"
                    text="Submit"
                />
            </v-col>
            <v-spacer />
        </v-row>
    </v-form>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';

const firstName = ref('');
const lastName = ref('');
const customers = ref(['John Doe', 'Jane Smith', 'Alice Johnson']);
const selectedCustomer = ref('');
const emailConsent = ref([
    { value: 'Consent Not Given', text: 'Consent Not Given' },
    { value: 'Consent Withheld', text: 'Consent Withheld' },
    { value: 'Consent Given', text: 'Consent Given' },
]);

const selectedEmailConsent = ref(null);

onMounted(() => {
    // Default to first option's value
    if (emailConsent.value.length > 0) {
        selectedEmailConsent.value = emailConsent.value[0].value;  
    }
});

const indigenousStatus = ref('false');
</script>


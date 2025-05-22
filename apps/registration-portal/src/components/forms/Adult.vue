<template>
    <v-form >
        <!-- Add New Adult Customer -->
        <v-row>
            <v-col cols="12" sm="12" md="12">
                <h1 class="text-h5">Add New Adult Customer</h1>
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
                    hide-details="auto"
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
                    hide-details="auto"
                    density="compact"  
                    required 
                />
            </v-col>
        </v-row>
        
        <v-divider class="my-2" elevation="4" color="grey-darken-1"/>
        <v-row>
            <v-col cols="12" sm="12" md="12">
                <h2 class="text-h6">Customer Information</h2>
            </v-col>
        </v-row>
        <!-- Title/First Name -->
        <v-row>
            <v-col cols="12" sm="6" md="4">
                <v-combobox 
                    label="Title" 
                    :items="title" 
                    v-model="selectedTitle"
                    variant="outlined"
                    hide-details="auto"
                    density="compact"  
                    required 
                />
            </v-col>
        </v-row>
        <!-- Middle/Last Names -->
        <v-row>
            <v-col cols="12" sm="6" md="4">
                <v-text-field 
                    label="First Name" 
                    v-model="firstName" 
                    variant="outlined"
                    hide-details="auto"
                    density="compact" 
                    required />
            </v-col>
            <v-col cols="12" sm="6" md="4">
                <v-text-field 
                    label="Middle Name" 
                    v-model="middleName" 
                    variant="outlined" 
                    hide-details="auto"
                    density="compact" 
                    required 
                />
            </v-col>
            
        </v-row>
        <!-- Last Name/Date of Birth -->
        <v-row>
            <v-col cols="12" sm="6" md="4">
                <v-text-field 
                    label="Last Name" 
                    v-model="lastName" 
                    variant="outlined" 
                    hide-details="auto"
                    density="compact" 
                    required 
                />
            </v-col>
            <v-col cols="12" sm="6" md="4">
                <v-date-input
                    label="Date of Birth" 
                    v-model="dateOfBirth" 
                    :max="maxAdultDate"
                    prepend-icon=""
                    prepend-inner-icon="$calendar"
                    hide-details="auto"
                    variant="outlined" 
                    density="compact" 
                    required 
                />
            </v-col>
        </v-row>  
        <!-- Duplicate found-->
        <v-btn color="primary" @click="dialog = true">Open Dialog</v-btn>
        <DuplicateAlert :dialog="dialog" @update:dialog="(val: boolean) => dialog = val" />
        <!-- Preferred Name/Use Preferred Name -->
        <v-row>
            <v-col cols="12" sm="6" md="4">
                <v-text-field 
                    label="Preferred Name" 
                    v-model="preferredName" 
                    variant="outlined" 
                    hide-details="auto"
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
       
        <!-- Email/Phone Number -->
        <v-row>
            <v-col cols="12" sm="6" md="4">
                <v-text-field 
                    label="Email" 
                    v-model="email" 
                    variant="outlined" 
                    hide-details="auto"
                    density="compact" 
                    required 
                />
            </v-col>
            <v-col cols="12" sm="6" md="4">
                <v-text-field 
                    label="Phone Number" 
                    v-model="phoneNumber" 
                    variant="outlined" 
                    hide-details="auto"
                    density="compact"
                    append-inner-icon="mdi-phone"
                    required 
                />
            </v-col>
        </v-row>
         
        <v-divider class="my-2" elevation="4" color="grey-darken-1"/>
        <!-- Customer Contact Information -->
        <v-row>
            <v-col cols="12" sm="12" md="12">
                <h2 class="text-h6">Contact Information</h2>
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
                    append-inner-icon="mdi-barcode-scan"
                    hide-details="auto"
                    density="compact" 
                    required 
                />
            </v-col>
            <v-col cols="12" sm="6" md="4">
                <v-btn 
                    color="primary" 
                    prepend-icon="mdi-check"
                    class="text-capitalize"
                    text="Lookup Information"
                />  
            </v-col>
        </v-row>
        <!-- Care/Of field -->
        <v-row>
            <v-col cols="12" sm="6" md="4">
                <v-text-field 
                    label="Care/Of" 
                    v-model="careOf"
                    append-inner-icon="mdi-account-supervisor"
                    variant="outlined"   
                    hide-details="auto"
                    density="compact" 
                    required
                    readonly
                />
            </v-col>
        </v-row>        
        <!-- Primary Address -->
        <v-row>
            <v-col cols="12" sm="12" md="12">
                <h3 class="text-body-1">Primary Address</h3>
            </v-col>
        </v-row>
        <!-- Address1 / City -->
        <v-row>
            <v-col cols="12" sm="6" md="4">
                <v-text-field 
                    label="Address Line 1" 
                    variant="outlined" 
                    hide-details="auto"
                    v-model="address"
                    density="compact" 
                    append-inner-icon="mdi-map-marker"
                    required 
                />
            </v-col>
            <v-col cols="12" sm="6" md="4">
                <v-text-field 
                    label="City" 
                    v-model="city"
                    append-inner-icon="mdi-city"
                    variant="outlined"
                    hide-details="auto"
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
                    hide-details="auto"
                    v-model="province"
                    density="compact"
                    append-inner-icon="mdi-map-marker"
                    required 
                />
            </v-col>
            <v-col cols="12" sm="6" md="4">
                <v-text-field 
                    label="Postal Code" 
                    variant="outlined"
                    v-model="postalCode"
                    hide-details="auto"
                    density="compact"
                    append-inner-icon="mdi-mailbox"
                    required 
                />
            </v-col>
        </v-row>
        <!-- Secondary Address -->
        <v-row>
            <v-col cols="12" sm="12" md="12">
                <h3 class="text-body-1">Secondary Address</h3>
            </v-col>
        </v-row>
        <!-- Address2 / Country -->
        <v-row>
            <v-col cols="12" sm="6" md="4">
                <v-text-field 
                    label="Address Line 2" 
                    v-model="address2"
                    append-inner-icon="mdi-map-marker"
                    variant="outlined"
                    hide-details="auto"
                    density="compact"
                    required 
                />
            </v-col>
            <v-col cols="12" sm="6" md="4">
                <v-text-field 
                    label="City" 
                    v-model="city2"
                    append-inner-icon="mdi-city"
                    variant="outlined"
                    hide-details="auto"
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
                    v-model="province2"
                    variant="outlined"
                    hide-details="auto"
                    density="compact"
                    required 
                />
            </v-col>
            <v-col cols="12" sm="6" md="4">
                <v-text-field 
                    label="Postal Code" 
                    v-model="postalCode2"
                    variant="outlined"
                    hide-details="auto"
                    density="compact"
                    required 
                />
            </v-col>
        </v-row>
        <!-- Marketing Consent -->
        <v-row>
            <v-col cols="12" sm="12" md="12">
                <h2 class="text-h6">Privacy & Consent</h2>
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
                    hide-details="auto"
                    required 
                />
            </v-col>
            <v-col cols="12" sm="6" md="4">
                <v-checkbox 
                    label="Indigenous Status"
                    v-model="indigenousStatus"
                    hint="Living on-reserve or on-settlement"
                    persistent-hint
                    density="compact"
                    hide-details="auto"
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
                    append-inner-icon="mdi-barcode-scan"
                    hide-details="auto"
                    required 
                />
            </v-col>
            <v-col cols="12" sm="6" md="4">
                <v-btn 
                    color="primary" 
                    prepend-icon="mdi-barcode"
                    class="text-capitalize"
                    text="Generate a digital card Number"
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
           
        </v-row>
    </v-form>
</template>
<script setup lang="ts">
import { ref, onMounted, shallowRef, computed } from 'vue';
import DuplicateAlert from '../notification/DuplicateAlert.vue';

const firstName = ref('');
const lastName = ref('');
const middleName = ref('');
const preferredName = ref('');
const usePreferredName = ref(false);
const dateOfBirth = shallowRef<Date | null>(null);
const barcode = ref('');
const careOf = ref('');
const address = ref('');
const city = ref('');
const province = ref('');
const postalCode = ref('');
const address2 = ref('');
const city2 = ref('');
const province2 = ref('');
const postalCode2 = ref('');
const email = ref('');
const phoneNumber = ref('');
const libraryCardBarcode = ref('');
const dialog = ref(false);
const customers = ref(['John Doe', 'Jane Smith', 'Alice Johnson']);
const selectedCustomer = ref('');
const emailConsent = ref([
    { value: 'Consent Not Given', text: 'Consent Not Given' },
    { value: 'Consent Withheld', text: 'Consent Withheld' },
    { value: 'Consent Given', text: 'Consent Given' },
]);
const title = ref([ 'Mr.', 'Mrs.', 'Ms.', 'Dr.', 'Prof.', 'Rev.', 'Hon.', 'Hon. Prof.', 'Hon. Dr.', 'Hon. Prof. Dr.', 'Hon. Dr.']);
const selectedTitle = ref(null);
const selectedEmailConsent = ref(null);
const selectedHomeBranch = ref(null);

const indigenousStatus = ref('false');

const isClient = ref(false);
onMounted(() => { isClient.value = true });

// Add computed property for max date (18 years ago)
const maxAdultDate = computed(() => {
  const today = new Date();
  today.setFullYear(today.getFullYear() - 18);
  return today.toISOString().split('T')[0];
});
</script>


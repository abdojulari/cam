<template>
    <v-form >
        <!-- Add New Customer -->
        <v-row>
            <v-col cols="12" sm="12" md="12">
                <h1 class="text-h5">Add New Customer</h1>
            </v-col>
        </v-row>
        <!-- Profile and Home Branch -->
        <v-row>
            <v-col cols="12" sm="6" md="4">
                <v-combobox 
                    label="Profile" 
                    :items="profiles" 
                    v-model="selectedProfile"
                    item-title="text"
                    item-value="value"
                    density="compact"
                    hide-details="auto"
                    variant="outlined"
                    required 
                />
            </v-col>
            <v-col cols="12" sm="6" md="4">
                <v-combobox 
                    label="Home Branch" 
                    :items="branches" 
                    v-model="selectedBranch"
                    item-title="text"
                    item-value="value"
                    variant="outlined"
                    hide-details="auto"
                    density="compact"  
                    required 
                />
            </v-col>
        </v-row>
        <!-- School -->
        <v-row>
            <v-col cols="12" sm="6" md="4">
                <v-combobox 
                    v-if="isChild"
                    label="School" 
                    :items="schools"
                    v-model="selectedSchool"
                    item-title="text"
                    item-value="value"
                    variant="outlined"
                    hide-details="auto"
                    density="compact"  
                    :required="isChild"
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
                    :min="isChild ? minChildDate : null"
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
                    v-if="!barcodeLoading"
                    color="secondary" 
                    class="text-capitalize"
                    text="Copy Barcode Information"
                    @click="loadBarcodeInformation()"
                    :disabled="barcodeLoading"
                />  
                <v-progress-circular
                    v-if="barcodeLoading"
                    indeterminate
                    color="primary"
                />
            </v-col>
        </v-row>
        <!-- Barcode lookup success/failure banner -->
        <v-row>
            <v-col cols="12" sm="6">
                <!-- Success banner for barcode lookup -->
                <v-banner
                    v-if="barcodeCopied && !barcodeLoading"
                    color="success"
                    icon="mdi-check-circle"
                    text="Barcode information copied successfully"
                    class="mb-4"
                    >
                        <template v-slot:actions>
                            <v-btn @click="barcodeCopied = false">   
                                Dismiss
                            </v-btn>
                        </template>
                </v-banner>
                <!-- Failed banner for barcode lookup -->
                <v-banner
                    v-if="!barcodeCopied && barcodeCopiedError && !barcodeLoading"
                    color="error"
                    icon="mdi-alert-circle"
                    text="Failed to copy barcode information"
                    class="mb-4"
                />
            </v-col>
        </v-row>
        <!-- Care/Of field -->
        <v-row>
            <v-col cols="12" sm="6" md="4">
                <v-text-field 
                    :label="isChild ? 'Parent/Guarantor' : 'Care/Of'" 
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
                    v-if="!digitalCardNumberLoading"
                    color="secondary" 
                    class="text-capitalize"
                    text="Generate a digital card Number"
                    @click="loadDigitalCardNumber()"
                    :disabled="digitalCardNumberLoading"
                /> 
                <v-progress-circular
                    v-if="digitalCardNumberLoading"
                    indeterminate
                    color="primary"
                />  
            </v-col>
        </v-row>
        <!-- Digital card number generated success/failure banner -->
        <v-row>
            <v-col cols="12" sm="6">
                <v-banner
                    v-if="digitalCardNumberGenerated && !digitalCardNumberLoading"
                    color="success"
                    icon="mdi-check-circle"
                    text="Digital card number generated successfully"
                    class="mb-4"
                >
                    <template v-slot:actions>
                        <v-btn @click="digitalCardNumberGenerated = false">   
                            Dismiss
                        </v-btn>
                    </template>
                </v-banner>
                <v-banner
                    v-if="!digitalCardNumberGenerated && digitalCardNumberGeneratedError && !digitalCardNumberLoading"
                    color="error"
                    icon="mdi-alert-circle"
                    text="Failed to generate digital card number"
                    class="mb-4"
                />
            </v-col>
        </v-row>
        <!-- Submit Button   -->
        <v-row>
            <v-spacer />
            <v-col cols="12" sm="6" md="4">
                <v-btn 
                    color="primary" 
                    class="text-capitalize"
                    text="Create Account"
                />
            </v-col>
            <v-spacer />
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
const barcodeCopied = ref(false);
const barcodeCopiedError = ref(false);
const barcodeLoading = ref(false);
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
const digitalCardNumber = ref('');
const digitalCardNumberGenerated = ref(false);
const digitalCardNumberGeneratedError = ref(false);
const digitalCardNumberLoading = ref(false);
const dialog = ref(false);
const profiles = ref([
    { value: 'Adult', text: 'Adult' },
    { value: 'Child', text: 'Child' },
]);
const selectedProfile = ref(null);
const isChild = ref(false);
// if selectedProfile is Child, then show the school combobox using watcher
watch(selectedProfile, (newVal) => {    
    if (newVal.value === 'Child') {
        isChild.value = true;
    } else {
        isChild.value = false;
    }
});

const selectedBranch = ref(null);
const branches = ref([
    { value: 'CAL', text: 'CAL' },
    { value: 'MNA', text: 'MNA' },
]);
const schools = ref([
    { value: 'Elementary', text: 'Elementary' },
    { value: 'Secondary', text: 'Secondary' },
    { value: 'High School', text: 'High School' },
]);
const selectedSchool = ref(null);
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

// Add computed property for min date (18 years ago)
const minChildDate = computed(() => {
  const today = new Date();
  today.setFullYear(today.getFullYear() - 18);
  return today.toISOString().split('T')[0];
});

// watch firstname, lastname, dateofbirth and trigger dialog when all are filled
watch([firstName, lastName, dateOfBirth], () => {
    if (firstName.value && lastName.value && dateOfBirth.value) {
        dialog.value = true;
    }
});

const mockApiCall = async (ms: number) => {
    await new Promise(resolve => setTimeout(resolve, ms));
}

const loadBarcodeInformation = async () => {
    barcodeLoading.value = true;
    try {
        // mock api call
        await mockApiCall(1000);
        barcodeCopied.value = true;
        barcodeCopiedError.value = false;
    } catch (error) {
        barcodeCopiedError.value = true;
        barcodeCopied.value = false;
    } finally {
        barcodeLoading.value = false;
    }
}

const loadDigitalCardNumber = async () => {
    digitalCardNumberLoading.value = true;
    try {
        // mock api call
        await mockApiCall(1000);
        digitalCardNumberGenerated.value = true;
        digitalCardNumberGeneratedError.value = false;
    } catch (error) {
        digitalCardNumberGeneratedError.value = true;
        digitalCardNumberGenerated.value = false;
    } finally {
        digitalCardNumberLoading.value = false;
    }
}

</script>

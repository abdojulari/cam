<template>
    <v-overlay :model-value="isLoading" class="d-flex align-center justify-center" persistent>
        <v-progress-circular
            color="primary"
            indeterminate
            size="48"
            width="4"
        />
    </v-overlay>
     <!-- Duplicate found-->
    <DuplicateAlert 
        :dialog="dialog" 
        @update:dialog="(val: boolean) => dialog = val" 
        :duplicateRecord="duplicateRecord"
    />
    <div v-if="!isClient">
        <v-skeleton-loader type="card" class="ma-5 rounded-lg" />
    </div>
    <v-form ref="form" v-else class="px-10">
        <!-- Add New Adult Customer -->
        <v-row>
            <v-col cols="12" sm="12" md="12">
                <h1 class="text-h5 font-weight-bold">Add New {{ profileType }} Customer</h1>
            </v-col>
        </v-row>
        <!-- Profile and Home Branch -->
        <v-row>
            <v-col cols="12" sm="6" md="4">
                <v-combobox 
                    label="Profile" 
                    :items="profileType === 'Adult' ? profileOptions.Adult : profileOptions.Child" 
                    v-model="profile"
                    density="compact"
                    hide-details="auto"
                    variant="outlined"
                    :rules="[v => !!v || 'Profile is required']"
                    required 
                />
            </v-col>
            <v-col cols="12" sm="6" md="4">
                <v-combobox 
                    label="Home Branch" 
                    :items="uniqueCustomers" 
                    v-model="selectedCustomer"
                    variant="outlined"
                    hide-details="auto"
                    density="compact"  
                    :rules="[v => !!v || 'Home Branch is required']"
                    required 
                />
            </v-col>
        </v-row>
        <!-- Customer Information -->
        <v-row class="mt-4">
            <v-col cols="12" sm="12" md="12">
                <h2 class="text-h6 font-weight-medium">Customer Information</h2>
            </v-col>
        </v-row> 

        <!-- Title/First Name -->
        <v-row v-if="profileType === 'Adult'">
            <v-col cols="12" sm="6" md="4">
                <v-combobox 
                    label="Title" 
                    :items="title" 
                    v-model="selectedTitle"
                    variant="outlined"
                    hide-details="auto"
                    density="compact"  
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
                    :rules="[v => !!v || 'First Name is required']"
                    required 
                />
            </v-col>
            <v-col cols="12" sm="6" md="4">
                <v-text-field 
                    label="Middle Name" 
                    v-model="middleName" 
                    variant="outlined" 
                    hide-details="auto"
                    density="compact" 
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
                    :rules="[v => !!v || 'Last Name is required']"
                    required 
                />
            </v-col>
            <v-col cols="12" sm="6" md="4">
                <v-date-input
                    label="Date of Birth" 
                    v-model="dateOfBirth" 
                    :max=" profileNames.Adult.includes(profile) ? maxChildDate : undefined"
                    :min="  profileNames.Child.includes(profile) ? minAdultDate : undefined"
                    prepend-icon=""
                    prepend-inner-icon="$calendar"
                    hide-details="auto"
                    variant="outlined" 
                    density="compact" 
                    :rules="[v => !!v || 'Date of Birth is required']"
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
                    hide-details="auto"
                    density="compact" 
                />
            </v-col>
            <v-col cols="12" sm="6" md="4">
                <v-checkbox 
                    label="Use Preferred Name" 
                    v-model="usePreferredName" 
                    hide-details="auto"
                    density="compact" 
                />
            </v-col>
        </v-row>
         <!-- School -->
         <v-row v-if="profileType === 'Child'">
            <v-col cols="12" sm="6" md="4">
                <v-combobox 
                    label="School" 
                    :items="schools"
                    v-model="selectedSchool"
                    item-title="text"
                    item-value="value"
                    variant="outlined"
                    hide-details="auto"
                    density="compact"  
                />  
            </v-col>
        </v-row>
        <!-- Library Card Barcode/Provide a digital card Number -->
        <v-row class="mb-6" v-if="profileType === 'Child'">
            <v-col cols="12" sm="6" md="4">
                <v-text-field 
                    label="Library Card Barcode" 
                    v-model="libraryCardBarcode" 
                    variant="outlined" 
                    density="compact"
                    append-inner-icon="mdi-barcode-scan"
                    hide-details="auto"
                    maxlength="14"
                    :rules="[v => !!v && v.length === 14 || 'Barcode must be 14 characters']"
                    required 
                />
            </v-col>
            <v-col cols="12" sm="6" md="4">
                <v-btn 
                    color="orange" 
                    prepend-icon="mdi-barcode"
                    class="text-capitalize text-white"
                    text="Generate a digital card Number"
                    @click="generateDigitalCardNumber"
                    :disabled="isGenerateBtnDisabled"
                />   
            </v-col>
        </v-row>
        <!-- Add minor button-->
        <v-row class="mb-5" v-if="profileType === 'Child'">
            <v-col cols="12">
                <div class="bg-gray w-66 pa-2 d-flex border-s-lg">
                    <v-icon color="orange">mdi-information</v-icon>
                    <p class="text-body-2 ma-2 italic font-weight-bold ">
                    If you are registering more than one child, for example two children, the first child's information will be added to the table when you click "Add another child." 
                    For the second child, you do not need to click the button again. There is always a child form available for you to fill out.
                    </p>
                </div>
                
            </v-col>
            <v-col cols="12" md="4">
                <v-btn 
                    variant="flat" 
                    color="primary" 
                    text="Add another child"
                    @click="addMinor"
                    size="small"      
                    prepend-icon="mdi-plus-circle" 
                    class="w-100 "
                >
                </v-btn>
            </v-col>
            <v-col cols="12" md="4" >
                <v-btn
                    v-if="minors.length > 0"
                    variant="flat"
                    color="red" 
                    text="Cancel"
                    size="small"
                    prepend-icon="mdi-minus-circle"
                    @click="resetMinorForm"
                    class="ml-0 w-100 "
                />
            </v-col>
        </v-row>
        <ChildrenList 
        v-if="profileType === 'Child' && minors.length > 0" 
        :minors="minors" 
        :deleteMinor="deleteMinor" 
        
        />
        <!-- Email/Phone Number -->
        <v-row>
            <v-col cols="12" sm="6" md="4">
                <v-text-field 
                    label="Email" 
                    v-model="emailAddress" 
                    variant="outlined" 
                    hide-details="auto"
                    density="compact" 
                    :rules="[
                        (v) => !!v || 'Email is required',
                        (v) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v) || 'A valid email is required'
                    ]" 
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
                    v-maska="'###-###-####'"
                    
                     
                />
            </v-col>
        </v-row>
         
        <!-- Customer Contact Information -->
        <v-row class="mt-4">
            <v-col cols="12" sm="12" md="12">
                <h2 class="text-h6 font-weight-medium">Contact Information</h2>
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
                    type="number"
                    :max-length="14"
                    :error="barcodeLengthError"
                    :error-messages="barcodeLengthError ? 'Barcode must be 14 characters' : ''"
                />
            </v-col>
            <v-col cols="12" sm="6" md="4">
                <v-text-field 
                    label="Care/Of" 
                    v-model="careOf"
                    append-inner-icon="mdi-account-supervisor"
                    variant="outlined"   
                    hide-details="auto"
                    density="compact" 
                />
            </v-col>
        </v-row>
        <!-- To display error if barcode is not found-->
        <v-row v-if="barcodeError && !barcodeErrorDismiss">
            <v-col cols="12" sm="6">
                <v-banner    
                    color="error"
                    icon="mdi-alert-circle"
                    text="Barcode not found"
                    density="compact"
                    class="border-0 shadow-md bg-red-lighten-5 pa-2 ma-0"
                    >
                        <template v-slot:actions>
                            <v-btn 
                            @click="barcodeErrorDismiss = true" 
                            class="text-capitalize mb-2">   
                                Dismiss
                            </v-btn>
                        </template>
                </v-banner>
            </v-col>
        </v-row>
                
        <!-- Primary Address -->
        <v-row class="mt-4">
            <v-col cols="12" sm="12" md="12">
                <h3 class="text-body-1">Primary Address</h3>
            </v-col>
        </v-row>
        <!-- Address1 / City -->
        <v-row>
            <v-col cols="12" sm="6" md="4">
                <v-combobox 
                    label="Address Line 1" 
                    variant="outlined" 
                    hide-details="auto"
                    v-model="address"
                    :items="primaryAddressSuggestions"
                    item-title="text"
                    item-value="id"
                    density="compact" 
                    append-inner-icon="mdi-map-marker"
                    :loading="primaryAddressLoading"
                    @update:search="searchPrimaryAddresses"
                    @update:modelValue="selectPrimaryAddress"
                    :rules="[v => !!v || 'Address is required']"
                    required 
                />
            </v-col>
            <v-col cols="12" sm="6" md="4">
                <v-select 
                    label="City" 
                    v-model="city"
                    :items="cityOptions"
                    append-inner-icon="mdi-city"
                    variant="outlined"
                    hide-details="auto"
                    density="compact"
                    item-title="text"
                    item-value="value"
                    :rules="[v => !!v || 'City is required']"
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
                    readonly
                    append-inner-icon="mdi-map-marker"
                    :rules="[v => !!v || 'Province is required']"
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
                    @input="onPostalCodeInput"
                    :max-length="7"
                    :rules="[v => !!v || 'Postal Code is required']"
                    required 
                />
            </v-col>
        </v-row>
        <!-- Secondary Address -->
        <v-row class="mt-4">
            <v-col cols="12" sm="12" md="12">
                <v-checkbox 
                    label="Use Secondary Address" 
                    v-model="useSecondaryAddress" 
                    hide-details="auto"
                    density="compact" 
                />  
            </v-col>
        </v-row>
        <v-row v-if="useSecondaryAddress">
            <v-col cols="12" sm="12" md="12">
                <h3 class="text-body-1">Secondary Address</h3>
            </v-col> 
        </v-row>
        <!-- Address2 / Country -->
        <v-row v-if="useSecondaryAddress">
            <v-col cols="12" sm="6" md="4">
                <v-combobox 
                    label="Address Line 2" 
                    variant="outlined" 
                    hide-details="auto"
                    v-model="address2"
                    :items="secondaryAddressSuggestions"
                    item-title="text"
                    item-value="id"
                    density="compact" 
                    append-inner-icon="mdi-map-marker"
                    :loading="secondaryAddressLoading"
                    @update:search="searchSecondaryAddresses"
                    @update:modelValue="selectSecondaryAddress"
                    :rules="[v => !!v || 'Address is required']"
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
                    :rules="[v => !!v || 'City is required']"
                    required 
                />
            </v-col>
        </v-row>
        <!-- Province, Postal Code -->
        <v-row v-if="useSecondaryAddress">
            <v-col cols="12" sm="6" md="4">
                <v-combobox
                    label="Province" 
                    v-model="province2"
                    :items="provinceOptions"
                    variant="outlined"
                    hide-details="auto"
                    density="compact"
                    item-title="text"
                    item-value="value"
                    :rules="[v => !!v || 'Province is required']"
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
                    @input="onPostalCodeInput"
                    :max-length="7"
                    :rules="[v => !!v || 'Postal Code is required']"
                    required 
                />
            </v-col>
        </v-row>
        <!-- Marketing Consent -->
        <v-row class="mt-4">
            <v-col cols="12" sm="12" md="12">
                <h2 class="text-h6 font-weight-medium">Privacy & Consent</h2>
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
                    :rules="[v => !!v || 'E-mail consent is required']"
                    required 
                />
            </v-col>
            <v-col cols="12" sm="6" md="4">
                <v-checkbox 
                    label="Living on-reserve or on-settlement"
                    v-model="indigenousStatus"
                    density="compact"
                    hide-details="auto"
                />
            </v-col>
        </v-row>
        <!-- Library Card Barcode/Provide a digital card Number -->
        <v-row class="mb-6" v-if="profileType === 'Adult'">
            <v-col cols="12" sm="6" md="4">
                <v-text-field 
                    label="Library Card Barcode" 
                    v-model="libraryCardBarcode" 
                    variant="outlined" 
                    density="compact"
                    append-inner-icon="mdi-barcode-scan"
                    hide-details="auto"
                    maxlength="14"
                    :rules="[v => !!v && v.length === 14 || 'Barcode must be 14 characters']"
                    required 
                />
            </v-col>
            <v-col cols="12" sm="6" md="4">
                <v-btn 
                    color="orange" 
                    prepend-icon="mdi-barcode"
                    class="text-capitalize text-white"
                    text="Generate a digital card Number"
                    @click="generateDigitalCardNumber"
                    :disabled="isGenerateBtnDisabled"
                />   
            </v-col>
        </v-row>
        <!-- Submit Button   -->
        <v-row class="mt-6">  
            <v-col cols="12" sm="6" md="4">
                <v-btn 
                    color="primary" 
                    prepend-icon="mdi-content-save"
                    class="text-capitalize mr-10"
                    text="Submit"
                    @click="handleSubmit"
                />
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" sm="12" md="12">
                <div v-if="successData.length > 0 || failedData.length > 0" class="mb-4">
                    <ReturnAlert 
                        :data="successData" 
                        :failedData="failedData"
                        :firstname="firstName"
                        :lastname="lastName"
                        :dateOfBirth="dateOfBirth.toISOString().split('T')[0]"
                        :formData="submittedFormData"
                    /> 
                </div>
            </v-col>
        </v-row>
    </v-form>
</template>
<script setup lang="ts">
import { 
    ref, 
    onMounted, 
    onUnmounted,
    shallowRef, 
    computed, 
    watch
} from 'vue';
import DuplicateAlert from '../notification/DuplicateAlert.vue';
import { apiService } from '@cam/shared-components/services/api-service';
import ChildrenList from '../notification/ChildrenList.vue';
import { useRouter } from 'vue-router';
import { useAddressLookup } from '@cam/shared-components/composables/useAddressLookup';
import { CustomerRegistration, Minors } from '../../types/customer-registration';
import { ipRanges } from '../../constants/ipRangeMatching';
import { useRegistrationStore } from '@cam/shared-components/store/registration-store';
import { vMaska } from 'maska/vue';
import { profileNames } from '../../constants/profile';
// @ts-ignore
import ReturnAlert from '../notification/ReturnAlert.vue';

const props = defineProps<{ profileType?: string, isClient?: boolean, networkName?: string }>();
const emit = defineEmits<{
  (e: 'submit', payload: CustomerRegistration): void
  (e: 'clearForm'): void
}>();
const registrationStore = useRegistrationStore();
const successData = registrationStore.getSuccessResponse;
const failedData = registrationStore.getFailedResponse;

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
const province = ref('AB');
const postalCode = ref('');
const address2 = ref('');
const city2 = ref('');
const province2 = ref('');
const postalCode2 = ref('');
const emailAddress= ref('');
const phoneNumber = ref('');
const libraryCardBarcode = ref('');
const dialog = ref(false);
const customers = ref([]);
const profileOptions = ref(profileNames);
const cityOptions = ref([
    { value: 'Edmonton', text: 'Edmonton' },
    { value: 'Epoch', text: 'Epoch' },
])
const profile = ref('');
const profileType = ref('');
const selectedCustomer = ref('');
const emailConsent = ref([
    { value: 'ECONSENT', text: 'Yes, I consent to receive e-mail from Edmonton Public Library.' },
    { value: 'ENOCONSENT', text: 'No, I do not consent to receive e-mail from Edmonton Public Library.' },
]);
const title = ref([ 'Mr.', 'Mrs.', 'Ms.', 'Dr.', 'Prof.', 'Rev.', 'Hon.']);
const selectedTitle = ref(null);
const selectedEmailConsent = ref(null);

const schools = ref([
    { value: 'EPSB', text: 'EPSB (Edmonton Public Schools)' },
    { value: 'ECSD', text: 'ECSD (Edmonton Catholic School Division)' },
    { value: 'CSCN', text: 'CSCN (Francophone)' },
    { value: 'Other', text: 'Other' },
]);
const provinceOptions = ref([
    { value: 'AB', text: 'Alberta' },
    { value: 'BC', text: 'British Columbia' },
    { value: 'MB', text: 'Manitoba' },
    { value: 'NB', text: 'New Brunswick' },
    { value: 'NL', text: 'Newfoundland and Labrador' },
    { value: 'NS', text: 'Nova Scotia' },
    { value: 'NT', text: 'Northwest Territories' },
    { value: 'NU', text: 'Nunavut' },
    { value: 'ON', text: 'Ontario' },
    { value: 'PE', text: 'Prince Edward Island' },
    { value: 'QC', text: 'Quebec' },
]);
const selectedSchool = ref(null);
const duplicateRecord = ref([]);
const isLoading = ref(false);
const barcodeError = ref(false);    
const barcodeErrorDismiss = ref(false);
const indigenousStatus = ref('false');
const isClient = ref(false);
const useSecondaryAddress = ref(false);
const minors = ref<Minors[]>([]);
const networkName = ref('')
const submittedFormData = ref({});
const router = useRouter();

// create a validation rules for the form
const form = ref(null);

const addMinor = () => {
    // check if the child is older than 18 years old
    const today = new Date();
    const dob = new Date(dateOfBirth.value);
    const age = today.getFullYear() - dob.getFullYear();
    if (age > 18) {
        return;
    }
    minors.value.push({ 
        id: minors.value.length + 1, 
        firstName: firstName.value , 
        lastName: lastName.value, 
        middleName: middleName.value,
        dateOfBirth: dateOfBirth.value
          ? (dateOfBirth.value instanceof Date
              ? dateOfBirth.value.toISOString().split('T')[0]
              : new Date(dateOfBirth.value).toISOString().split('T')[0]
            )
          : '',
        libraryCardBarcode: libraryCardBarcode.value,
        usePreferredName: usePreferredName.value,
        preferredName: preferredName.value,
        selectedSchool: selectedSchool.value,
        library: selectedCustomer.value
    });
    // clear the fields when successfully added
    firstName.value = '';
    lastName.value = '';
    middleName.value = '';
    dateOfBirth.value = null;
    libraryCardBarcode.value = '';
    usePreferredName.value = false;
    preferredName.value = '';
    selectedSchool.value = null;
}

const deleteMinor = (id: number) => {
    minors.value = minors.value.filter((minor: any) => minor.id !== id)
}  
const resetMinorForm = () => {
    if (minors.value.length > 0) {
        // Get the last minor record
        const lastMinor = minors.value[minors.value.length - 1];
        // Populate the form with the last minor's details
        firstName.value = lastMinor.firstName;
        lastName.value = lastMinor.lastName;
        dateOfBirth.value = new Date(lastMinor.dateOfBirth); // Convert string to Date
        libraryCardBarcode.value = lastMinor.libraryCardBarcode;
        usePreferredName.value = lastMinor.usePreferredName;
        preferredName.value = lastMinor.preferredName;
        selectedSchool.value = lastMinor.selectedSchool;
        deleteMinor(lastMinor.id);
    }
}


onMounted(() => {
  apiService.initializeToken();
  apiService.sanctumToken();
   
  const customersList = ipRanges.map((item) => item.name);
  customers.value = customersList.sort();
  
  if (props.profileType) {
    profileType.value = props.profileType;
  }
  if (props.isClient) {
    isClient.value = true;
  }
  
  // Ensure province is set
  province.value = 'AB';
});

const maxChildDate = computed(() => {
  const today = new Date();
  // Max date for child: must be less than 18 years old (so up to 17 years, 364 days)
  today.setFullYear(today.getFullYear() - 18);
  today.setDate(today.getDate() + 1); // allow up to the day before 18th birthday
  return today.toISOString().split('T')[0];
});

const minAdultDate = computed(() => {
  const today = new Date();
  // Min date for adult: must be at least 18 years old
  today.setFullYear(today.getFullYear() - 18);
  return today.toISOString().split('T')[0];
});

// Add computed property for barcode error
const barcodeLengthError = computed(
    () => barcode.value !== '' && barcode.value.length > 0 && barcode.value.length < 14
);

const uniqueCustomers = computed(() => {
  return [...new Set(customers.value)];
});

const handleAsyncWatch = async (
    newFirstName, oldFirstName,
    newLastName, oldLastName,
    newDateOfBirth, oldDateOfBirth,
    newBarcode, oldBarcode
) => {
    // --- Name/DOB logic ---
    if (
    (newFirstName !== oldFirstName || newLastName !== oldLastName || newDateOfBirth !== oldDateOfBirth) &&
    newFirstName && newLastName && newDateOfBirth
    ) {
    isLoading.value = true;
    const dob = typeof newDateOfBirth === 'string'
        ? newDateOfBirth
        : newDateOfBirth.toISOString().split('T')[0];

    const response = await apiService.quickDuplicate({
        firstname: newFirstName,
        lastname: newLastName,
        dateofbirth: dob,
        middlename: middleName.value,
    });

    isLoading.value = false;
    console.log('response', response);
    if (response?.data?.match) {
        duplicateRecord.value = response.data.matched_record
        ? [response.data.matched_record]
        : [];
        dialog.value = true;
    }
    }

    // --- Barcode logic ---
    if (newBarcode !== oldBarcode) {
    if (newBarcode && newBarcode.length === 14) {
        isLoading.value = true;
        try {
        const response = await apiService.lookupByBarcode({ barcode: newBarcode }) as any;
        
        let results = [];
        if (response?.result) {
            if (Array.isArray(response.result)) {
            results = response.result;
            } else if (typeof response.result === 'object' && response.result !== null) {
            results = Object.values(response.result);
            }
        }

        if (results.length > 0) {
            results.forEach((item: any) => {
            // check if dateofbirth is less than 18 years old
            const today = new Date();
            const dob = new Date(item.dateOfBirth);
            const age = today.getFullYear() - dob.getFullYear();
            if (age < 18) { 
                return;
            } else {
                careOf.value = item.firstname + ' ' + item.lastname || '';
                address.value = item.address || '';
                city.value = item.city || '';
                province.value = item.province || '';
                postalCode.value = item.postalcode || '';
                emailAddress.value = emailAddress.value? emailAddress.value : item.email || '';
                phoneNumber.value = phoneNumber.value? phoneNumber.value : item.phone || '';
            }
            });
            barcodeError.value = false;
        } else {
            // No result found
            barcodeError.value = true;
            barcodeErrorDismiss.value = false;
            // Optionally clear fields
            careOf.value = '';
            address.value = '';
            city.value = '';
            province.value = '';
            postalCode.value = '';
        }
        } catch (e) {
        console.log(e);
        barcodeError.value = true;
        barcodeErrorDismiss.value = false;
        } finally {
        isLoading.value = false;
        }
    } else {
        // Clear the fields if barcode is not 14 characters
        careOf.value = '';
        address.value = '';
        city.value = '';
        province.value = '';
        postalCode.value = '';
        barcodeError.value = false;
    }
    }
};

watch(
  [
    profile,
    firstName,
    lastName,
    dateOfBirth,
    barcode,
    () => registrationStore.networkName
  ],
  async (
    [
      newProfile,
      newFirstName,
      newLastName,
      newDateOfBirth,
      newBarcode,
      newNetworkName
    ],
    [
      oldProfile,
      oldFirstName,
      oldLastName,
      oldDateOfBirth,
      oldBarcode,
      oldNetworkName
    ]
  ) => {
    // --- Profile logic ---
    if (newProfile !== oldProfile) {
      if (profileNames.Adult.includes(newProfile)) {
        router.push('/adult');
      } else if (profileNames.Child.includes(newProfile)) {
        router.push('/child');
      }
    }

    handleAsyncWatch(
        newFirstName, oldFirstName, 
        newLastName, oldLastName, 
        newDateOfBirth, oldDateOfBirth, 
        newBarcode, oldBarcode
    );

    // --- Network Name logic ---
    if (newNetworkName && newNetworkName !== oldNetworkName) {
      networkName.value = newNetworkName;
      console.log('Network Name:', newNetworkName);

      // Pre-select the branch if it exists in the list
      if (uniqueCustomers.value.includes(newNetworkName)) {
        selectedCustomer.value = newNetworkName;
      }
    }
  },
  { immediate: true }
);

const generateDigitalCardNumber = async () => {
    const response = await apiService.getBarcode();
    libraryCardBarcode.value = response.barcode;
}

// const generateBarcode = (id: number) => {
//     const minor = minors.value.find((minor) => minor.id === id);
//     if (minor) {
//         apiService.getBarcode().then(response => {
//             minor.libraryCardBarcode = response.barcode;
//         });
//     }
// }
watch(selectedEmailConsent, (newValue, oldValue) => {
    // Check if the new value is not empty and has changed
    if (newValue && newValue !== oldValue) {
        // each child account should have careof, address, city, province, postal code, email address, phone number, and barcode
        if (profileType.value === 'Child') {
            if (minors.value.length > 0) {
                minors.value.forEach((minor) => {
                    minor.careOf = careOf.value;
                    minor.address = address.value;
                    minor.city = city.value;
                    minor.province = province.value;
                    minor.postalCode = postalCode.value;
                    minor.emailAddress = emailAddress.value;
                    minor.phoneNumber = phoneNumber.value;
                    minor.barcode = barcode.value;
                    minor.address2 = address2.value,
                    minor.city2 = city2.value;
                    minor.province2 = province2.value;
                    minor.postalCode2 = postalCode2.value;
                    minor.emailAddress = emailAddress.value;
                    minor.password =  dateOfBirth.value.getFullYear().toString().slice(-2);
                    minor.confirmPassword =  dateOfBirth.value.getFullYear().toString().slice(-2);
                    minor.selectedEmailConsent = newValue;
                    minor.selectedIndigenousStatus = indigenousStatus.value;
                    minor.useSecondaryAddress = useSecondaryAddress.value;
                    minor.profileType = profile.value;
                });
            }
        }
    }
})

const handleSubmit = async () => {
  const { valid } = await form.value.validate();
  if (!valid) {
    return;
  }
  
  if (dateOfBirth.value) {
    const formData = {
        profile: profile.value,
        form: {
          firstName: firstName.value,
          lastName: lastName.value,
          middleName: middleName.value,
          library: selectedCustomer.value,
          preferredName: preferredName.value,
          usePreferredName: usePreferredName.value,
          dateOfBirth: dateOfBirth.value.toISOString().split('T')[0] as unknown as Date,
          barcode: barcode.value,
          careOf: careOf.value,
          address: address.value,
          city: city.value,
          province: province.value,
          postalCode: postalCode.value,
          address2: address2.value,
          city2: city2.value,
          province2: province2.value,
          postalCode2: postalCode2.value,
          emailAddress: emailAddress.value,
          phoneNumber: phoneNumber.value,
          libraryCardBarcode: libraryCardBarcode.value,
          selectedEmailConsent: selectedEmailConsent.value,
          selectedIndigenousStatus: indigenousStatus.value,
          useSecondaryAddress: useSecondaryAddress.value,
          profileType: profile.value,
          isClient: isClient.value,
          minors: minors.value,
          password: password.value,
          confirmPassword: password.value,
        }
    };
    
    // Store the form data for use in ReturnAlert
    submittedFormData.value = formData.form;
    
    emit('submit', formData);
  }
}

const password = computed(() => {
    if (!dateOfBirth?.value) return '';

    if (profileType.value === 'Child') {
        return dateOfBirth?.value?.getFullYear().toString();
    }
    
    const phone = phoneNumber.value ? phoneNumber.value.replace(/\D/g, '') : '';
    if (phone.length >= 4) {
        return phone.slice(-4);
    }
    
    return dateOfBirth?.value?.getFullYear().toString();
});

// Setup address lookup composables
const { 
    suggestions: primaryAddressSuggestions, 
    loading: primaryAddressLoading, 
    selectAddress: selectPrimaryAddress, 
    searchAddresses: searchPrimaryAddresses, 
    cleanup: primaryAddressCleanup 
} = useAddressLookup({
  addressFields: {
    address,
    city,
    province,
    postalCode
  },
  cachePrefix: 'primary'
});

const { 
    suggestions: secondaryAddressSuggestions, 
    loading: secondaryAddressLoading, 
    selectAddress: selectSecondaryAddress, 
    searchAddresses: searchSecondaryAddresses, 
    cleanup: secondaryAddressCleanup 
} = useAddressLookup({
  addressFields: {
    address: address2,
    city: city2,
    province: province2,
    postalCode: postalCode2
  },
  cachePrefix: 'secondary'
});

onUnmounted(() => {
  // Cleanup timeouts when component is destroyed
  primaryAddressCleanup();
  secondaryAddressCleanup();
});

const isGenerateBtnDisabled = computed(() => {
  return libraryCardBarcode.value !== '' && libraryCardBarcode.value.length === 14;
});

const onPostalCodeInput = (event) => {
      let value = event.target.value || '';
      // Convert the value to uppercase and remove spaces
      value = value.replace(/\s/g, '').toUpperCase();

      // Automatically prepend 'T' if it's not already there
      if (value.length === 0 || value[0] !== 'T') {
          value = 'T' + value;
      }

      // Only accept up to 6 characters (postal code length)
      if (value.length > 6) {
          value = value.slice(0, 6);
      }

      // Add space after the first 3 characters for formatting (e.g., T1A 1A1)
      if (value.length > 3) {
          value = value.slice(0, 3) + ' ' + value.slice(3, 6);
      }

      postalCode.value = value.trim().toUpperCase();
      if (useSecondaryAddress.value) {
        postalCode2.value = value.trim().toUpperCase();
      }
      event.target.value = value;
};

const clearForm = () => {
  form.value.reset();
}
</script>

<style scoped>

</style>

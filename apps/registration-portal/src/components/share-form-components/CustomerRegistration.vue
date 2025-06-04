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
    <v-form v-else class="px-10">
        <!-- Add New Adult Customer -->
        <v-row>
            <v-col cols="12" sm="12" md="12">
                <h1 class="text-h5 font-weight-bold">Add New {{ profile }} Customer</h1>
            </v-col>
        </v-row>
        <!-- Profile and Home Branch -->
        <v-row>
            <v-col cols="12" sm="6" md="4">
                <v-combobox 
                    label="Profile" 
                    :items="profileOptions" 
                    v-model="profile"
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
        <!-- School -->
        <v-row v-if="profile === 'Child'">
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
        
       
        <v-row class="mt-4">
            <v-col cols="12" sm="12" md="12">
                <h2 class="text-h6 font-weight-medium">Customer Information</h2>
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
                    :max="profile === 'Adult' ? maxChildDate : undefined"
                    :min="profile === 'Child' ? minAdultDate : undefined"
                    prepend-icon=""
                    prepend-inner-icon="$calendar"
                    hide-details="auto"
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
                    hide-details="auto"
                    density="compact" 
                    required 
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
        <!-- Add minor button-->
        <v-row class="mb-5" v-if="profile === 'Child'">
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
        <ChildrenList v-if="profile === 'Child'" :minors="minors" :deleteMinor="deleteMinor" />
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
                    required 
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
                    required
                    readonly
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
                    :items="addressSuggestions"
                    item-title="text"
                    item-value="id"
                    density="compact" 
                    append-inner-icon="mdi-map-marker"
                    :loading="addressLoading"
                    @update:search="searchAddresses"
                    @update:modelValue="selectAddress"
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
                    value="AB"
                    hide-details="auto"
                    v-model="province"
                    density="compact"
                    readonly
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
                <v-select 
                    label="City" 
                    v-model="city2"
                    append-inner-icon="mdi-city"
                    variant="outlined"
                    hide-details="auto"
                    density="compact"
                    item-title="text"
                    item-value="value"
                    :items="cityOptions"
                    required 
                />
            </v-col>
        </v-row>
        <!-- Province, Postal Code -->
        <v-row v-if="useSecondaryAddress">
            <v-col cols="12" sm="6" md="4">
                <v-text-field 
                    label="Province" 
                    v-model="province2"
                    value="AB"
                    variant="outlined"
                    hide-details="auto"
                    density="compact"
                    readonly
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
        <v-row class="mb-6">
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
                    color="orange" 
                    prepend-icon="mdi-barcode"
                    class="text-capitalize text-white"
                    text="Generate a digital card Number"
                />   
            </v-col>
        </v-row>
        <!-- Submit Button   -->
        <v-row class="mt-6">
            
            <v-col cols="12" sm="6" md="4">
                <v-btn 
                    color="primary" 
                    prepend-icon="mdi-check"
                    class="text-capitalize mr-10"
                    text="Submit"
                    @click="handleSubmit"
                />
            </v-col>
           
        </v-row>
    </v-form>
</template>
<script setup lang="ts">
import { 
    ref, 
    onMounted, 
    shallowRef, 
    computed, 
    watch, 
    defineProps, 
    defineEmits 
} from 'vue';
import DuplicateAlert from '../notification/DuplicateAlert.vue';
import { apiService } from '../shared-components/src/services/api-service';
import ChildrenList from '../notification/ChildrenList.vue';
import { useRouter } from 'vue-router';

// Types for address lookup
interface AddressResult {
  id: string;
  text: string;
  highlight: string;
  description: string;
  address?: {
    line1: string;
    line2: string;
    city: string;
    province: string;
    postalCode: string;
    country: string;
  }
}

interface AddressDetailsResponse {
  address: {
    line1: string;
    line2: string;
    city: string;
    province: string;
    postalCode: string;
    country: string;
  };
}

const props = defineProps<{ profileType?: string, isClient?: boolean }>();
const emit = defineEmits<{
  (e: 'submit', payload: { profile: string; form: any }): void
}>();

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
const profileOptions = ref(['Adult', 'Child']);
const cityOptions = ref([
    { value: 'Edmonton', text: 'Edmonton' },
    { value: 'Epoch', text: 'Epoch' },
])
const profile = ref('');
const selectedCustomer = ref('');
const emailConsent = ref([
    { value: 'Consent Not Given', text: 'Consent Not Given' },
    { value: 'Consent Withheld', text: 'Consent Withheld' },
    { value: 'Consent Given', text: 'Consent Given' },
]);
const title = ref([ 'Mr.', 'Mrs.', 'Ms.', 'Dr.', 'Prof.', 'Rev.', 'Hon.']);
const selectedTitle = ref(null);
const selectedEmailConsent = ref(null);

const schools = ref([
    { value: 'Elementary', text: 'Elementary' },
    { value: 'Secondary', text: 'Secondary' },
    { value: 'High School', text: 'High School' },
]);
const selectedSchool = ref(null);
const duplicateRecord = ref([]);
const isLoading = ref(false);
const barcodeError = ref(false);    
const barcodeErrorDismiss = ref(false);
const indigenousStatus = ref('false');
const isClient = ref(false);
const useSecondaryAddress = ref(false);
const addressSuggestions = ref([]);
const addressLoading = ref(false);
const minors = ref([]);
const router = useRouter();

const addMinor = () => {
    minors.value.push({ 
        id: minors.value.length + 1, 
        firstName: firstName.value , 
        lastName: lastName.value, 
        middleName: middleName.value,
        dateOfBirth: dateOfBirth.value.toISOString().split('T')[0]
    });
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
        dateOfBirth.value = lastMinor.dateOfBirth;
        deleteMinor(lastMinor.id);

    }
}
const addressCache = new Map(); // Cache for address suggestions
const addressDetailsCache = new Map(); // Cache for full address details
let searchTimeout: NodeJS.Timeout | null = null;

onMounted(() => {
  if (props.profileType) {
    profile.value = props.profileType;
  }
  if (props.isClient) {
    isClient.value = true;
  }
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

watch([firstName, lastName, dateOfBirth], async () => {
  if (!firstName.value || !lastName.value || !dateOfBirth.value) {
    return;
  }
  isLoading.value = true;
  const dob = typeof dateOfBirth.value === 'string'
    ? dateOfBirth.value
    : dateOfBirth.value.toISOString().split('T')[0];

  const response = await apiService.quickDuplicate({
    firstname: firstName.value,
    lastname: lastName.value,
    dateofbirth: dob,
    middlename: middleName.value,
  });

  isLoading.value = false;

  if (response?.data?.match) {
    duplicateRecord.value = response.data.matched_record
      ? [response.data.matched_record]
      : [];
    dialog.value = true;
  }
});

// Watch barcode for 14 characters and auto-populate fields
watch(barcode, async (newVal) => {
  if (newVal && newVal.length === 14) {
    isLoading.value = true;
    try {
      const response = await apiService.lookupByBarcode({ barcode: newVal });
      if (response && response.result && response.result.length > 0) {
        response.result.forEach((item: any) => {
          careOf.value = item.careof || '';
          address.value = item.address || '';
          city.value = item.city || '';
          province.value = item.province || '';
          postalCode.value = item.postalcode || '';
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
});

function handleSubmit() {
  emit('submit', {
    profile: profile.value,
    form: {
      firstName: firstName.value,
      lastName: lastName.value,
      middleName: middleName.value,
      preferredName: preferredName.value,
      usePreferredName: usePreferredName.value,
      dateOfBirth: dateOfBirth.value,
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
      email: email.value,
      phoneNumber: phoneNumber.value,
      libraryCardBarcode: libraryCardBarcode.value,
      selectedEmailConsent: selectedEmailConsent.value,
      indigenousStatus: indigenousStatus.value,
    }
  });
}

const searchAddresses = async (query: string) => {
    if (!query || query.length < 3) {
        addressSuggestions.value = [];
        return;
    }
    
    // Check cache first
    const cacheKey = query.toLowerCase().trim();
    if (addressCache.has(cacheKey)) {
        addressSuggestions.value = addressCache.get(cacheKey);
        return;
    }
    
    // Clear existing timeout
    if (searchTimeout) {
        clearTimeout(searchTimeout);
    }
    
    // Debounce the search
    searchTimeout = setTimeout(async () => {
        addressLoading.value = true;
        try {
            const response = await $fetch('/api/address-lookup', {
                method: 'POST',
                body: { query }
            });
            
            const results = response.results || [];
            addressSuggestions.value = results;
            
            // Cache the results for 5 minutes
            addressCache.set(cacheKey, results);
            setTimeout(() => {
                addressCache.delete(cacheKey);
            }, 5 * 60 * 1000);
            
        } catch (error) {
            console.error('Address lookup error:', error);
            addressSuggestions.value = [];
        } finally {
            addressLoading.value = false;
        }
    }, 300); // 300ms debounce
}

const selectAddress = async (selectedItem: unknown) => {
    // Handle when user types freely vs selects from dropdown
    if (typeof selectedItem === 'string') {
        address.value = selectedItem;
        return;
    }
    
    const addressItem = selectedItem as AddressResult;
    if (!addressItem || !addressItem.id) {
        return;
    }
    
    // If we already have full address details (from mock data), use them directly
    if (addressItem.address) {
        address.value = addressItem.address.line1;
        city.value = addressItem.address.city;
        province.value = addressItem.address.province;
        postalCode.value = addressItem.address.postalCode;
        return;
    }
    
    // Check cache for address details
    if (addressDetailsCache.has(addressItem.id)) {
        const cachedAddress = addressDetailsCache.get(addressItem.id);
        address.value = cachedAddress.line1;
        city.value = cachedAddress.city;
        province.value = cachedAddress.province;
        postalCode.value = cachedAddress.postalCode;
        return;
    }
    
    // Fetch full address details only when user selects an address
    addressLoading.value = true;
    try {
        const response = await $fetch('/api/address-retrieve', {
            method: 'POST',
            body: { addressId: addressItem.id }
        }) as AddressDetailsResponse;
        
        if (response && response.address) {
            const addressData = response.address;
            
            // Auto-fill the address fields
            address.value = addressData.line1;
            city.value = addressData.city;
            province.value = addressData.province;
            postalCode.value = addressData.postalCode;
            
            // Cache the address details
            addressDetailsCache.set(addressItem.id, addressData);
            setTimeout(() => {
                addressDetailsCache.delete(addressItem.id);
            }, 10 * 60 * 1000); // Cache for 10 minutes
        }
    } catch (error) {
        console.error('Address retrieve error:', error);
        // Fallback: try to extract info from the display text
        const text = addressItem.text || '';
        address.value = text;
    } finally {
        addressLoading.value = false;
    }
}

watch(profile, (newProfile) => {
  if (newProfile === 'Adult') {
    router.push('/adult');
  } else if (newProfile === 'Child') {
    router.push('/child');
  }
});
</script>

<template>
  <v-container class="py-10">
    <v-row>
      <v-col cols="12" md="4">
        <div class="d-flex flex-column align-start">
          <img src="../public/images/lpass2.jpg" alt="L-Pass logo">
          <p class="mt-4">
            The L-Pass (Library Pass) Registration is a program connected to the Edmonton Public Library, 
            allowing both students and staff of participating institutions to register and gain access 
            to all the resources offered by the library.
          </p>
        </div>  
      </v-col>
      
      <v-col cols="12" md="8">
        <p class="mb-5 text-h6 text-primary">If any of your information isn't correct, please contact your institution.</p>
        <span class="text-body-1 font-weight-light">Fields marked with an asterisk (*) are required</span>  
        <v-card class="pa-10 bg-grey-lighten-5" variant="flat">
          <v-form fast-fail ref="form" class="p-4 rounded shadow-sm">
            <!-- Name Row -->
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="studentData.firstname"
                  label="First Name"
                  variant="outlined"
                  density="compact"
                  disabled
                  hide-details
                  readonly
                />
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="studentData.lastname"
                  label="Last Name"
                  variant="outlined"
                  density="compact"
                  disabled
                  hide-details
                  readonly
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="studentData.middlename"
                  label="Middle Name"
                  variant="outlined"
                  density="compact"
                  disabled
                  hide-details
                  readonly
                />
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="studentData.dateofbirth"
                  label="Date of Birth *"
                  variant="outlined"
                  density="compact"
                  v-maska="'####-##-##'"
                  :rules="dateOfBirthRules"
                  placeholder="YYYY-MM-DD"
                  required
                />
              </v-col>
            </v-row>
            <!-- Contact Info Row -->
            <v-row>
              <v-col cols="12" md="5">
                <v-text-field
                  v-model="studentData.email"
                  label="Email *"
                  variant="outlined"
                  density="compact"
                  :rules="emailRules"
                  disabled

                  required
                />
              </v-col>
              <v-col cols="12" md="3">
                <v-text-field
                  v-model="studentData.phone"
                  label="Phone *"
                  variant="outlined"
                  density="compact"
                  v-maska="'###-###-####'"
                  :rules="phoneRules"
                  required
                />
              </v-col>
              <v-col cols="12" md="4">
                <v-combobox 
                    label="Address *" 
                    variant="outlined" 
                    hide-details="auto"
                    v-model="address"
                    :items="primaryAddressSuggestions"
                    item-title="text"
                    item-value="id"
                    density="compact" 
                    append-inner-icon="mdi-map-marker"
                    :loading="primaryAddressLoading"
                    @update:search="q => searchPrimaryAddresses(q, city)"
                    @update:modelValue="selectPrimaryAddress"
                    @focus="openPrimaryMenu"
                    @blur="closePrimaryMenu"
                    :rules="[v => !!v || 'Address is required']"
                    required 
                    :menu-props="{
                      closeOnContentClick: false,
                      persistent: true
                    }"
                    v-model:menu="primaryAddressMenuOpen"
                />
              </v-col>
            </v-row>
  
            <!-- Address Row -->
            <v-row> 
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="city"
                  label="City *"
                  variant="outlined"
                  density="compact"
                  :rules="cityRules"                 
                  required
                />
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="province"
                  label="Province *"
                  variant="outlined"
                  density="compact"
                  :rules="provinceRules"
                  required
                />
              </v-col>
            
            </v-row>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="postalCode"
                  label="Postal Code *"
                  variant="outlined"
                  density="compact"
                  :rules="postalCodeRules"
                  @input="onPostalCodeInput"
                  :maxLength="7"
                  required
                />
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="studentData.country"
                  label="Country *"
                  variant="outlined"
                  density="compact"
                  :rules="countryRules"
                  required
                />
              </v-col>
            </v-row>

            <!-- profile Info Row -->
            <v-row>
            
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="studentData.profile"
                  label="Institution *"
                  variant="outlined"
                  density="compact"
                  disabled
                  hide-details
                  readonly
                />
              </v-col>
              
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="studentData.expirydate"
                  label="Expiry Date *"
                  variant="outlined"
                  density="compact"
                  disabled
                  hide-details
                  required
                />
              </v-col>
            </v-row>
            
            <!-- Password Row -->
            <v-row>
              <p class="font-weight-light mt-1 text-body-2 px-3"> Please do NOT use your institution password. Set a new password for your EPL Library account.</p>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="studentData.password"
                  label="Password *"
                  type="password"
                  variant="outlined"
                  density="compact"
                  :rules="passwordRules"
                  required
                />
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="studentData.confirmPassword"
                  label="Confirm Password *"
                  type="password"
                  variant="outlined"
                  density="compact"
                  :rules="confirmPasswordRules"
                  required
                />
              </v-col>
            </v-row>
  
            <!-- Submit Button -->
            <v-row>
              <v-col cols="12" class="text-right">
                <v-btn 
                  color="primary" 
                  @click="submitForm"
                  :loading="isSubmitting"
                >
                  Submit
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-card>
        
      </v-col>    
    </v-row>
  </v-container>
  <SystemError :is-active="showSystemErrorDialog" @close="closeErrorDialog" />
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { useRegistrationStore } from '../store/registration-store';
import { useRouter } from 'vue-router';
import SystemError from './SystemError.vue';
import { apiService } from '../services/api-service';
import { vMaska } from "maska/vue"
import { useAddressLookup } from '../composables/useAddressLookup';

const userRegistration = useRegistrationStore();
const router = useRouter();
// create a validation rules for the form
const form = ref(null);

// Define the data model
const studentData = ref({
  firstname: '',
  lastname: '',
  middlename: '',
  dateofbirth: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  province: '',
  postalcode: '',
  studentid: '',
  profile: '',
  status: '',
  expirydate: '',
  id: '',
  country: '',
  password: '',
  confirmPassword: '',
});


const isSubmitting = ref(false);
const showSystemErrorDialog = ref(false);

// Individual refs for address fields (required by useAddressLookup composable)
const address = ref('');
const city = ref('');
const province = ref('');
const postalCode = ref('');
const closeErrorDialog = async () => {
  showSystemErrorDialog.value = false;
  await navigateTo('https://epl.bibliocommons.com/locations', {
      external: true
  })
};

const passwordRegex = /^(?=[A-Za-z0-9]{6,20}$)(?!.*\s).*$/;
const passwordRules =  [
  v => !!v || 'Password is required',
  v => passwordRegex.test(v) || 'Password must be 6-20 characters long and no special characters allowed.',
]
const confirmPasswordRules = ref([v => !!v || 'Password is required', 
v => passwordRegex.test(v) || 'Password must be 6-20 characters long and no special characters allowed.']);
// watch the password and confirm password variables
watch([() => studentData.value.password, () => studentData.value.confirmPassword], ([password, confirmPassword]) => {
  if (password !== confirmPassword) {
    confirmPasswordRules.value = [v => v === password || 'Passwords do not match'];
  } else {
    confirmPasswordRules.value = [v => !!v || 'Password is required',
    v => passwordRegex.test(v) || 'Password must be 6-20 characters long and no special characters allowed.'];
  }
});

const emailRules = [
v => !!v || 'Email is required',
v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || 'Invalid email address',
];

const phoneRules = [
v => !!v || 'Phone is required',
v => /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/.test(v) || 'Invalid phone number',
];

const addressRules = [
v => !!v || 'Address is required',
];

const postalCodeRules = [
v => !!v || 'Postal code is required',
];

const cityRules = [
v => !!v || 'City is required',
];

const provinceRules = [
v => !!v || 'Province is required',
];

const countryRules = [
v => !!v || 'Country is required',
];

const dateOfBirthRules = [
v => !!v || 'Date of birth is required',
v => /^\d{4}-\d{2}-\d{2}$/.test(v) || 'Date must be in YYYY-MM-DD format',
v => {
  if (!v) return true; // Let the required rule handle empty values
  const date = new Date(v);
  const today = new Date();
  return date <= today || 'Date of birth cannot be in the future';
},
v => {
  if (!v) return true; // Let the required rule handle empty values
  const date = new Date(v);
  const minDate = new Date();
  minDate.setFullYear(minDate.getFullYear() - 120); // 120 years ago
  return date >= minDate || 'Date of birth is too far in the past';
},
v => {
  if (!v) return true; // Let the required rule handle empty values
  const date = new Date(v);
  return !isNaN(date.getTime()) || 'Invalid date';
}
];

onMounted(async () => {
  await apiService.initializeToken().then((response) => {
    return response;
  });
  await apiService.sanctumToken().then((response) => {
    return response;
  });
      
  const url = new URL(window.location.href);
  const id = url.searchParams.get('id');
  // Check if the id is present in the URL
  if (!id) {
      console.warn('No student ID found in URL');
      return;
  }
  const data = await $fetch(`/api/retrieve-lpass-record?id=${id}`);
  studentData.value = data;
  
  // Sync the individual refs with the loaded studentData
  address.value = data.address || '';
  city.value = data.city || '';
  province.value = data.province || '';
  postalCode.value = data.postalcode || '';
});

// Watch for changes in studentData and sync with individual refs
watch(() => studentData.value.address, (newValue) => {
  if (newValue !== address.value) {
    address.value = newValue || '';
  }
});

watch(() => studentData.value.city, (newValue) => {
  if (newValue !== city.value) {
    city.value = newValue || '';
  }
});

watch(() => studentData.value.province, (newValue) => {
  if (newValue !== province.value) {
    province.value = newValue || '';
  }
});

watch(() => studentData.value.postalcode, (newValue) => {
  if (newValue !== postalCode.value) {
    postalCode.value = newValue || '';
  }
});

// Watch for changes in individual refs and sync back to studentData
watch(address, (newValue) => {
  if (newValue !== studentData.value.address) {
    studentData.value.address = newValue;
  }
});

watch(city, (newValue) => {
  if (newValue !== studentData.value.city) {
    studentData.value.city = newValue;
  }
});

watch(province, (newValue) => {
  if (newValue !== studentData.value.province) {
    studentData.value.province = newValue;
  }
});

watch(postalCode, (newValue) => {
  if (newValue !== studentData.value.postalcode) {
    studentData.value.postalcode = newValue;
  }
});

const { 
    suggestions: primaryAddressSuggestions, 
    loading: primaryAddressLoading, 
    isMenuOpen: primaryAddressMenuOpen,
    selectAddress: selectPrimaryAddress, 
    searchAddresses: searchPrimaryAddresses, 
    cleanup: primaryAddressCleanup,
    openMenu: openPrimaryMenu,
    closeMenu: closePrimaryMenu
} = useAddressLookup({
  addressFields: {
    address,
    city,
    province,
    postalCode
  },
});

// get id using institution name 
// const getInstitutionId = (institutionName) => {
//   const prefixes = {
//     "Concordia University": "1510",
//     "Kings University": "1530",
//     "NorQuest College": "13800",
//     "MacEwan University": "13200",
//     "University of Alberta": ["1010", "1011", "1110", "1111"],
//   };
//   const value = prefixes[institutionName];
//   if (!value) return undefined;
//   if (Array.isArray(value)) {
//     const randomIndex = Math.floor(Math.random() * value.length);
//     return value[randomIndex];
//   }
//   return value;
// }

onUnmounted(() => {
  // Cleanup timeouts when component is destroyed
  primaryAddressCleanup();
});


const generateBarcode = () => {
// Get first 3 chars of profile, convert to uppercase
//const profilePrefix = studentData.value.profile.substring(0, 3).toUpperCase();
const profilePrefix = studentData.value.id;
// Start with profile prefix and student ID
let barcode = profilePrefix + studentData.value.studentid;

return barcode;
};


function getStudentProfile(studentData) {
const profileMap = new Map([
  ['Concordia University', 'EPL_CONCOR'],
  ['MacEwan University', 'EPL_GMU'],
  ['NorQuest College', 'EPL_NORQ'],
  ['University of Alberta', 'EPL_UAL'],
  ['Kings University', 'EPL_KINGS'],
]);

return profileMap.get(studentData?.value?.profile) || null;
}

// Handle form submission
const submitForm = async () => {
// check if the form is valid
  const { valid } = await form.value.validate();
  if (!valid) {
    return;
  } 
  if (studentData.value.password !== studentData.value.confirmPassword) {
      alert('Passwords do not match!');
      return;
  }

  isSubmitting.value = true;
  try {
      const response = await $fetch('/api/submit-lpass', {
          method: 'POST',
          body: {
              ...studentData.value,
              address: address.value,
              city: city.value,
              province: province.value,
              postalcode: postalCode.value,
              password: studentData.value.password,
              barcode: generateBarcode(),
              profile: getStudentProfile(studentData),
              country: studentData.value.country,
              preferredname: '',
          },
      });

      if (response) {
         // create a state management for the response then extract the barcode
        userRegistration.setSuccessResponse({
            name: response?.data?.firstName + ' ' + response?.data?.lastName,
            barcode: response?.data?.barcode,
            programType: 'LPASS',
        });               
        // redirect to the success page
        response?.data?.firstName !== undefined ? router.push('/success-page') : showSystemErrorDialog.value = true;
      } 
  } catch (error) {
      console.error('Error submitting form:', error);
      showSystemErrorDialog.value = true;
  } finally {
      isSubmitting.value = false;
  }
};

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
      event.target.value = value;
    };


</script>

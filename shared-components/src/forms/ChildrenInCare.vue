<template>
  <v-container fluid>
  
    <v-row>
      <v-col cols="3" class="bg-primary p-4">
        <div class=" h-100 w-100">
          <h3 class="text-white text-center text-h4 font-weight-bold">Children in Care</h3>
          <v-list class="bg-primary">
            <v-list-item>
              <v-list-item-title class="d-flex align-center ">
                <v-icon>mdi-home</v-icon>
                <nuxt-link to="/" class="ml-3">
                  Online Registration
                </nuxt-link>
              </v-list-item-title>
            </v-list-item>
           
          </v-list>
        </div>
      </v-col>
      <v-col cols="9">
        <v-stepper v-model="currentStep" class="mt-4" flat>
      <v-stepper-header>
        <v-stepper-item
          :complete="currentStep > 1"
          :value="1"
          title="Login"
          subtitle="Authenticate as a Practitioner"
        ></v-stepper-item>
        <v-divider></v-divider>
        <v-stepper-item
          :complete="currentStep > 2"
          :value="2"
          title="Practitioner Details"
          subtitle="Practitioner information"
        ></v-stepper-item>
        <v-divider></v-divider>
        <v-stepper-item
          :value="3"
          title="Child Details"
          subtitle="Add children information"
        ></v-stepper-item>
      </v-stepper-header>

      <v-stepper-window>
        <!-- Step 1: Login -->
        <v-stepper-window-item :value="1">
          <v-card flat>
            <v-card-text>
              <v-row>
                <v-col cols="12" md="6">
                  <img src="../public/images/children.png" alt="Children in Care" class="img-fluid" />
                </v-col>
                <v-col cols="12" md="6">
                  <LibraryCardAuth
                    source="CIC"
                    :allowedBarcodes="allowedBarcodes"
                    v-model:barcode="cardNumber"
                    v-model:pin="password"
                    :rules="validationRules"
                    title="Log in to create EPL card"
                    success-message="Authentication successful!"
                    @authentication-success="handleSuccess"
                    @authentication-error="handleError"
                  />
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-stepper-window-item>

        <!-- Step 2: Adult Details -->
        <v-stepper-window-item :value="2">
          <v-card flat>
            <v-card-title>
              <h4>Details of Practioner Responsible for the Child(ren)</h4>
              <span class="text-body-1 font-weight-light">Fields marked with an asterisk (*) are required</span>
            </v-card-title>
            <v-card-text>
              <v-row>
                <v-col cols="12" md="4" sm="6">
                  <v-text-field 
                    v-model="firstname" 
                    label="First Name *" 
                    :rules="[rules.required, rules.firstname]"
                    density="compact"
                    variant="outlined"
                    :maxlength="25"
                  />
                </v-col>
                <v-col cols="12" md="4" sm="6">
                  <v-text-field 
                    v-model="lastname" 
                    label="Last Name *" 
                    :rules="[rules.required, rules.lastname]"
                    density="compact"
                    variant="outlined"
                    :maxlength="25"
                  />
                </v-col>
                <v-col cols="12" md="4" sm="6">
                  <v-text-field 
                    v-model="email" 
                    label="Email *" 
                    :rules="[rules.required, rules.email]"
                    density="compact"
                    variant="outlined"
                  />
                </v-col>
                <v-col cols="12" md="4" sm="6">
                  <v-text-field 
                    v-model="phone" 
                    label="Phone Number *" 
                    v-maska="'###-###-####'"
                    :rules="[rules.required, rules.phone]"
                    density="compact"
                    variant="outlined"
                  />
                </v-col>
                <v-col cols="12" md="4" sm="6">
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
                    @update:search=" (q: string) => searchPrimaryAddresses(q, city)"
                    @update:modelValue="selectPrimaryAddress"
                    @focus="openPrimaryMenu"
                    @blur="closePrimaryMenu"
                    :rules="[(v: any) => !!v || 'Address is required']"
                    required 
                    :menu-props="{
                      closeOnContentClick: true,
                      persistent: false
                    }"
                    v-model:menu="primaryAddressMenuOpen"
                  />
                </v-col>
        
                <v-col cols="12" md="4" sm="6">
                  <v-select
                    label="City *"
                    :items="['Edmonton', 'Enoch']"
                    v-model="city" 
                    variant="outlined"
                    :rules="[rules.city]"
                    required
                    density="compact"
                    prepend-inner-icon="mdi-city"
                  />
                </v-col>
                <v-col cols="12" md="4" sm="6">
                  <v-text-field 
                    v-model="province" 
                    label="Province *" 
                    :rules="[rules.required, rules.province]"
                    density="compact"
                    variant="outlined"
                    readonly
                  />
                </v-col>
                <v-col cols="12" md="4" sm="6">
                  <v-text-field 
                    v-model="postalCode" 
                    label="Postal Code *" 
                    :rules="[rules.required, rules.postalCode]"
                    density="compact"
                    variant="outlined"
                    :maxLength="7"
                  />
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-stepper-window-item>

        <!-- Step 3: Child Details -->
        <v-stepper-window-item :value="3">
          <v-card flat>
            <v-card-title>
              <h4>Child Details</h4>
              <span class="text-body-1 font-weight-light">Fields marked with an asterisk (*) are required</span>
            </v-card-title>
            <v-card-text>
              <v-row>
                <v-col cols="12" md="6">
                  <v-select 
                    label="Borrowing Limit *"
                    :items="[
                      { value: 'EPL_JUV01', text: '1' }, 
                      { value: 'EPL_JUV05', text: '5' }, 
                      { value: 'EPL_JUV10', text: '10' },
                      { value: 'EPL_JUV', text: '40' }
                    ]"
                    item-title="text"
                    item-value="value"
                    :return-object="false"
                    v-model="profile"
                    density="compact"
                    variant="outlined"
                  />
                </v-col>
                <v-col cols="12" md="6">
                  <v-select
                    label="Home Branch *"
                    :items="homeBranch"
                    v-model="library"
                    item-title="name"
                    item-value="value"
                    :return-object="false"
                    variant="outlined"
                    :rules="[rules.required]"
                    required
                    density="compact"
                  >
               
                  </v-select>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field 
                    v-model="minorFirstname" 
                    label="First Name *" 
                    :rules="[rules.required, rules.firstname]"
                    density="compact"
                    variant="outlined"
                    :maxlength="25"
                  />
                </v-col>  
                <v-col cols="12" md="6">
                  <v-text-field 
                    v-model="minorLastname" 
                    label="Last Name *" 
                    density="compact"
                    :rules="[rules.required, rules.lastname]"
                    variant="outlined"
                    :maxlength="25"
                  />
                </v-col>    
                <v-col cols="12" md="6">
                  <v-text-field 
                    v-model="minorMiddlename" 
                    label="Middle Name"
                    density="compact"
                    :rules="[(v: string) => /^[a-zA-Z]*$/.test(v) || 'Only alphabetic characters are allowed']"
                    variant="outlined"
                    :maxlength="25"
                  />
                </v-col>      
                <v-col cols="12" md="6">
                  <v-menu v-model="isMenuOpen" :close-on-content-click="false">
                    <template v-slot:activator="{ props }">
                      <v-text-field
                        :model-value="formattedDate"
                        v-bind="props"
                        variant="outlined"
                        rounded-0
                        density="compact"
                        label="Date of Birth *"
                        prepend-inner-icon="mdi-calendar"
                        required
                        :readonly="isReadonly"
                      />
                    </template>
                    <v-date-picker
                      v-model="minorDateOfBirth"
                      @update:model-value="isMenuOpen = false"
                      hide-actions
                      :min="minDate"
                      :max="new Date().toISOString().split('T')[0]"
                    ></v-date-picker>
                  </v-menu>
                </v-col> 
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="password"
                    label="Pin *"        
                    variant="outlined"
                    :rules="[rules.required, rules.password]"
                    :type="showPassword ? 'text' : 'password'"
                    density="compact"
                    hint="Pin must be 4-20 characters long, no space or special characters allowed."
                    persistent-hint
                    :minlength="4"
                    :maxlength="20"
                  />
                </v-col>
                <v-col cols="12" md="6">
                 
                  <v-checkbox v-model="showPassword" label="Show Pin" hide-details="auto" density="compact" />
                </v-col>   
                <v-col cols="12" md="6">
                  <v-btn
                    v-if="minors.length < 3"  
                    variant="flat" 
                    color="primary" 
                    :disabled=" isMinorInvalid "
                    text="Add another child"
                    @click="addMinor"
                    size="small"      
                    prepend-icon="mdi-plus-circle" 
                    class="btn-add-minor w-100 w-sm-75" 
                  >
                  </v-btn>
                </v-col>
                <v-col cols="12" md="6" v-if="minors.length > 0">
                  <v-btn 
                    variant="flat"
                    :disabled="disabled" 
                    color="red" 
                    text="Cancel"
                    size="small"
                    prepend-icon="mdi-minus-circle"
                    @click="resetMinorForm"
                    class="btn-add-minor w-100 w-sm-75"
                  />
                </v-col>
                <!-- End of add minor button-->
                <v-col cols="12" class="my-5" v-if="minors.length > 0">
                  <h3 class="text-uppercase font-weight-black">List of Added Child(ren)</h3>
                </v-col>
                <v-card 
                  color="primary" 
                  variant="outline" 
                  elevated border 
                  v-if="minors.length > 0"
                  class="w-100 mx-3 my-5"
                >
                  <v-card-text>
                    <v-data-table
                      :headers="headers"
                      :items="minors"
                      item-key="id"
                      :hide-default-footer="true"
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
                      <template v-slot:item.actions="{ item }">
                        <v-btn 
                          color="red"
                          :disabled=" isClicked" 
                          @click="deleteMinor(item.id)" 
                          text="Delete" 
                          size="small" 
                          density="compact" 
                          icon="mdi-delete"
                        />
                      </template>
                    </v-data-table>
                  </v-card-text>
                </v-card>
              </v-row>
            </v-card-text>
            
           
          </v-card>
        </v-stepper-window-item>
      </v-stepper-window>

      <!-- Custom Navigation Buttons -->
      <v-card-actions class="d-flex justify-space-between pa-4">
        <v-btn
          v-if="currentStep > 1"
          variant="outlined"
          @click="goToPreviousStep"
          prepend-icon="mdi-arrow-left"
        >
          Previous
        </v-btn>
        <v-spacer v-else></v-spacer>
        
        <v-btn
          v-if="currentStep < 3 && currentStep !== 1"
          color="primary"
          variant="flat"
          @click="goToNextStep"
          :disabled="!canProceedToNextStep"
          append-icon="mdi-arrow-right"
        >
          Next
        </v-btn>
        
        <v-btn
          v-if="currentStep === 3"
          color="success"
          variant="flat"
          :loading="loader"
          prepend-icon="mdi-content-save"
          @click="submitForm"
        >
          Submit
        </v-btn>
      </v-card-actions>
        </v-stepper>
      </v-col>
    </v-row>
    
  </v-container>
  <ErrorPrompt :is-active="showErrorDialog" @close="closeErrorDialog" />
  <SystemError :is-active="showSystemErrorDialog" @close="closeErrorDialog" />
</template>

<script setup lang="ts">
import LibraryCardAuth from './LibraryCardAuth.vue';
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import { vMaska } from "maska/vue";
import { minDate } from '../composables/minDate';
import { dateFormat } from '../composables/dateFormat';
import { useRegistrationStore } from '../store/registration-store';
import { useAddressLookup } from '../composables/useAddressLookup';
import { apiService } from '../services/api-service';
import { useRouter } from 'vue-router'
import { navigateTo } from 'nuxt/app';
import ErrorPrompt from './ErrorPrompt.vue';
import SystemError from './SystemError.vue';
import { homeBranch } from '../constants/home-branch';

interface Minor {
    id: number;
    firstname: string;
    lastname: string;
    middlename: string;
    dateOfBirth: string;
    password: string;
    confirmPassword: string;
    address: string;
    city: string;
    province: string;
    postalCode: string;
    email: string;
    phone: string;
    careof: string;
    profile: string;
    library: string;
    homeBranchName: string;
    homeBranchLink: string;
}
const showErrorDialog = ref(false);
const showSystemErrorDialog = ref(false);
const userRegistration = useRegistrationStore();
const closeErrorDialog = async () => {
    showErrorDialog.value = false;
    showSystemErrorDialog.value = false;
    await navigateTo('https://epl.bibliocommons.com/locations', {
        external: true
    })
};
let minorId = 0;

const router = useRouter();
const cardNumber = ref('');
const password = ref('');
const confirmPassword = ref('');
const validationRules = ref([]);
const loader = ref(false);
const loggedIn = ref(false);
const minors = ref<Minor[]>([]);
const minorsContact = ref(false);
const disabled = ref(false);
const currentStep = ref(1);
const address = ref('');
const city = ref('Edmonton');
const province = ref('Alberta');
const postalCode = ref('');
const profile = ref('');
const firstname = ref('');
const lastname = ref('');
const email = ref('');
const phone = ref('');
const minorFirstname = ref('');
const minorLastname = ref('');
const minorMiddlename = ref('');
const minorDateOfBirth = ref('');
const library = ref('');
const showPassword = ref(false);
const homeBranchLink = ref('');
const homeBranchName = ref('');
const rules = ref({
  required: (value: any) => !!value || 'This field is required',
  firstname: (value: string) => !value || /^[a-zA-Z\s\-\']+$/.test(value) || 'Invalid characters in first name',
  lastname: (value: string) => !value || /^[a-zA-Z\s\-\']+$/.test(value) || 'Invalid characters in last name',
  email: (value: string) => !value || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || 'Invalid email format',
  phone: (value: string) => !value || /^\d{3}-\d{3}-\d{4}$/.test(value) || 'Phone number must be in format XXX-XXX-XXXX',
  city: (value: any) => !!value || 'City is required',
  province: (value: any) => !!value || 'Province is required',
  postalCode: (value: string) => !value || /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/.test(value) || 'Invalid postal code format',
  password: (value: string) => !value || /^[a-zA-Z0-9]{4,20}$/.test(value) || 'Password must be 4-20 characters long, no space or special characters allowed'
});

// Use props.formData directly instead of creating a separate ref
//const formData = ref(props.formData);

const handleSuccess = (data: any) => {
  if(data.error) {
    loggedIn.value = false;
    return;
  }
  console.log("Check the Data" ,data);
  loggedIn.value = true;
  currentStep.value = 2; // Automatically advance to step 2 after successful login
  
};

const handleError = (error: any) => {
  console.log(error);
};

// Initialize tokens on component mount
onMounted(async () => {
  try {
    await apiService.initializeToken();
    await apiService.sanctumToken();
  } catch (error) {
    console.error('Failed to initialize tokens:', error);
  }
});
onUnmounted(() => {
  // Cleanup timeouts when component is destroyed
  primaryAddressCleanup();
});

// Navigation methods
const goToNextStep = () => {
  // I need to reset the password and confirm password
  password.value = '';
  confirmPassword.value = '';
  
  if (canProceedToNextStep.value && currentStep.value < 3) {
    currentStep.value++;
    console.log('Advanced to step:', currentStep.value);
  }
};

const goToPreviousStep = () => {

  if (currentStep.value > 1) {
    currentStep.value--;
    console.log('Went back to step:', currentStep.value);
  }
};
const isMinorInvalid = ref(true);

// Watch for changes in minor form fields to validate them
watch(
  [
    () => minorFirstname.value,
    () => minorLastname.value,
    () => minorDateOfBirth.value,
    () => password.value
  ],
  () => {
    // Check if all required fields are valid
    const isFirstNameValid = minorFirstname.value && rules.value.firstname(minorFirstname.value) === true;
      const isLastNameValid = minorLastname.value && rules.value.lastname(minorLastname.value) === true;
    const isDateOfBirthValid = !!minorDateOfBirth.value;
    const isPasswordValid = password.value && rules.value.password(password.value) === true;

    // Set isMinorInvalid to false only when all fields are valid
    isMinorInvalid.value = !(isFirstNameValid && isLastNameValid && isDateOfBirthValid && isPasswordValid);
  },
  { immediate: true }
);

const formattedDate = computed(() => {
    if (!minorDateOfBirth.value) return '';
    const date = new Date(minorDateOfBirth.value);
    return new Intl.DateTimeFormat('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    }).format(date);
});

 // Define headers for the data table
 const headers = [
      { title: 'First Name', value: 'firstname' },
      { title: 'Last Name', value: 'lastname' },
      { title: 'Middle Name', value: 'middlename' },
      { title: 'Date of Birth', value: 'dateOfBirth' },
      { title: 'Actions', value: 'actions', sortable: false },
    ];
const isClicked = ref(false);
const isReadonly = ref(true);
const isMenuOpen = ref(false);


// Auto-fill child's password with birth year and mirror to confirmPassword
watch(
  () => minorDateOfBirth.value,
  (newDob) => {
    if (!newDob) return;
    const year = new Date(newDob).getFullYear().toString();
    password.value = year;
  }
);

watch(
  () => password.value,
  (newPassword) => {
    confirmPassword.value = newPassword || '';
  }
);

// Watch for library selection to populate homeBranchName and homeBranchLink
watch(
  () => library.value,
  (selectedValue) => {
    if (selectedValue) {
      const selectedBranch = homeBranch.find(branch => branch.value === selectedValue);
      if (selectedBranch) {
        homeBranchName.value = selectedBranch.name;
        homeBranchLink.value = selectedBranch.link;
      }
    } else {
      homeBranchName.value = '';
      homeBranchLink.value = '';
    }
  }
);

  // Validation for stepper navigation
  const canProceedToNextStep = computed(() => {
    console.log('Validating step:', currentStep.value);
    
    switch (currentStep.value) {
      case 1:
        const step1Valid = loggedIn.value;
        console.log('Step 1 - loggedIn:', loggedIn.value, 'valid:', step1Valid);
        return step1Valid;
      case 2:
        // Check if all required fields are filled
        const step2Valid = !!(
          firstname.value && 
          lastname.value && 
          email.value && 
          phone.value && 
          address.value && 
          city.value && 
          province.value && 
          postalCode.value
        );
        
        return step2Valid;
      case 3:
        return true;
      default:
        console.log('Default case - not valid');
        return false;
    }
  });
  const addMinor = () => {
      if (isMinorInvalid.value) {
          return;
      }
      minors.value.push({
        id: ++minorId,
        firstname: minorFirstname.value,
        lastname: minorLastname.value,
        middlename: minorMiddlename.value,
        dateOfBirth: dateFormat(minorDateOfBirth.value || ''),
        password: password.value,
        confirmPassword: password.value,
        address: address.value,
        city: city.value,
        province: province.value,
        postalCode: postalCode.value,
        email: email.value,
        phone: phone.value,
        careof: firstname.value + ' ' + lastname.value,
        profile: profile.value,
        library: library.value,
        homeBranchName: homeBranchName.value,
        homeBranchLink: homeBranchLink.value,
      });

      userRegistration.setAdditionalMinor(true);
    
      minorFirstname.value = '';
      minorLastname.value = '';
      minorMiddlename.value = '';
      minorDateOfBirth.value = '';
      password.value = '';
      confirmPassword.value = '';
      homeBranchName.value = '';
      homeBranchLink.value = '';
      library.value = '';
      minorsContact.value = false;
      isClicked.value = false;
  };

 // Delete minor from the list
 const deleteMinor = (id: any) => {
    minors.value = minors.value.filter(minor => minor.id !== id);
  };
  const resetMinorForm = () => {
    // Check if minors array is not empty
    isReadonly.value = false;
    if (minors.value.length > 0) {
      // Get the last minor record
      const lastMinor = minors.value[minors.value.length - 1];

      // Populate the form with the last minor's details
      minorFirstname.value = lastMinor.firstname;
      minorLastname.value = lastMinor.lastname;
      minorMiddlename.value = lastMinor.middlename;
      minorDateOfBirth.value = new Date(lastMinor.dateOfBirth).toISOString().split('T')[0];
      password.value = lastMinor.password;
      confirmPassword.value = lastMinor.confirmPassword;
      homeBranchName.value = lastMinor.homeBranchName;
      homeBranchLink.value = lastMinor.homeBranchLink;
      library.value = lastMinor.library;
      // Delete the last minor from the list
      deleteMinor(lastMinor.id);
      isReadonly.value = true;
    }
  };

  const submitForm = async () => {
    // Validation before submission
    const validationErrors: string[] = [];

    // Check if there's at least one child to submit
    const hasCurrentChild = minorFirstname.value && minorLastname.value && minorDateOfBirth.value && password.value;
    const hasMinorsInList = minors.value.length > 0;

    if (!hasCurrentChild && !hasMinorsInList) {
      alert('Please add at least one child before submitting.');
      return;
    }

    // Validate current child form if fields are filled
    if (hasCurrentChild) {
      // Validate profile
      if (!profile.value) {
        validationErrors.push('Profile selection is required');
      }

      // Validate first name
      if (!minorFirstname.value) {
        validationErrors.push('Child first name is required');
      } else if (rules.value.firstname(minorFirstname.value) !== true) {
        validationErrors.push('Invalid characters in child first name');
      }

      // Validate last name
      if (!minorLastname.value) {
        validationErrors.push('Child last name is required');
      } else if (rules.value.lastname(minorLastname.value) !== true) {
        validationErrors.push('Invalid characters in child last name');
      }

      // Validate middle name if provided
      if (minorMiddlename.value && !/^[a-zA-Z]*$/.test(minorMiddlename.value)) {
        validationErrors.push('Only alphabetic characters are allowed in middle name');
      }

      // Validate date of birth
      if (!minorDateOfBirth.value) {
        validationErrors.push('Child date of birth is required');
      }

      // Validate password
      if (!password.value) {
        validationErrors.push('Password is required');
      } else if (rules.value.password(password.value) !== true) {
        validationErrors.push('Password must be 6-20 characters long, no space or special characters allowed');
      }

      // No confirm password field; it mirrors the password automatically

      // Validate adult information (guardian)
      if (!firstname.value) {
        validationErrors.push('Guardian first name is required');
      }
      if (!lastname.value) {
        validationErrors.push('Guardian last name is required');
      }
      if (!address.value) {
        validationErrors.push('Address is required');
      }
      if (!city.value) {
        validationErrors.push('City is required');
      }
      if (!province.value) {
        validationErrors.push('Province is required');
      }
      if (!postalCode.value) {
        validationErrors.push('Postal code is required');
      } else if (rules.value.postalCode(postalCode.value) !== true) {
        validationErrors.push('Invalid postal code format');
      }
      if (!email.value) {
        validationErrors.push('Email is required');
      } else if (rules.value.email(email.value) !== true) {
        validationErrors.push('Invalid email format');
      }
      if (!phone.value) {
        validationErrors.push('Phone number is required');
      } else if (rules.value.phone(phone.value) !== true) {
        validationErrors.push('Phone number must be in format XXX-XXX-XXXX');
      }
    }

    // Display validation errors if any
    if (validationErrors.length > 0) {
      alert('Please fix the following errors:\n\n' + validationErrors.join('\n'));
      return;
    }

    loader.value = true;
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Only create payload if current child form is filled
      let payload = null;
      if (hasCurrentChild) {
        payload = {
          firstName: minorFirstname.value,
          lastName: minorLastname.value,
          middleName: minorMiddlename.value,
          dateOfBirth: dateFormat(minorDateOfBirth.value || ''),
          address: address.value,
          city: city.value,
          province: province.value,
          postalCode: postalCode.value,
          emailAddress: email.value,
          phoneNumber: phone.value,
          careOf: firstname.value + ' ' + lastname.value,
          password: password.value,
          confirmPassword: confirmPassword.value,
          profileType: profile.value,
          library: library.value,
          homeBranchName: homeBranchName.value,
          homeBranchLink: homeBranchLink.value,
          source: 'CIC'
        };
      }
      // Collect all submissions (minors list + current form)
      const allSubmissions = [];
      
      // Add minors from the list
      if (minors.value.length > 0) {
        for (const minor of minors.value) {
          allSubmissions.push({
            firstName: minor.firstname,
            lastName: minor.lastname,
            middleName: minor.middlename,
            dateOfBirth: minor.dateOfBirth,
            address: minor.address,
            city: minor.city,
            province: minor.province,
            postalCode: minor.postalCode,
            emailAddress: minor.email,
            phoneNumber: minor.phone,
            careOf: minor.careof,
            password: minor.password,
            confirmPassword: minor.confirmPassword,
            profileType: minor.profile,
            library: minor.library,
            homeBranchName: minor.homeBranchName,
            homeBranchLink: minor.homeBranchLink,
            source: 'CIC'
          });
        }
      }
      
      // Add current form if filled
      if (payload) {
        allSubmissions.push(payload);
      }
      
      // Submit all children
      const successfulSubmissions = [];
      for (const submission of allSubmissions) {
        console.log('submission for children in care: ', submission);
        const response = await apiService.postUserData(submission);
        
        if (response?.message === "Record added successfully.") {
          successfulSubmissions.push({
            name: response?.data?.firstName + ' ' + response?.data?.lastName,
            barcode: response?.data?.barcode,
            programType: 'CIC',
          });
        }
        else if (response?.error === 'HTTP error! status: 409' || response?.error === 'Posting to ILS failed 409') {
          showErrorDialog.value = true;
          return; // Exit on error
        }
        else {
          showSystemErrorDialog.value = true;
          return; // Exit on error
        }
      }
      
      // If we have successful submissions, store all responses and redirect to success page
      if (successfulSubmissions.length > 0) {
        for (const submission of successfulSubmissions) {
          await userRegistration.setSuccessResponse(submission);
        }
        router.push('/success-page');
      }
   
    } catch (error) {
      console.error('Error saving changes:', error);
      if( error === 'HTTP error! status: 409' || error === 'Posting to ILS failed 409') {
        showErrorDialog.value = true;
      }
      else {
        showSystemErrorDialog.value = true;
      }
    } finally {
      loader.value = false;
    }
  };

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
const allowedBarcodes = ref([
  "21221020520463",
  "21221024596097",
  "YYC-EMERALDHOUSE",
  "YYC-WATERTON",
  "YYC-PYRAMID",
  "MCMAN-STRATHEARN",
  "CHIMO-2",
  "CHIMO-7",
  "CHIMO-8",
  "CHIMO-10",
  "CHIMO-11",
  "KATERI",
  "YESS_SP",
  "GORETTI",
  "ANGELUS",
  "HOPEHOUSE",
  "PROSPERITY",
  "FAITHHOUSE",
  "ASPEN",
  "CONNECT",
  "CASPIAN",
  "FALABELLA"
]);
// Removed unused minorPassword computed; password is derived via watchers above
</script>
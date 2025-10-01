<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1 class="text-h1 font-weight-bold">Children in Care</h1>
      </v-col>
    </v-row>
    <v-row v-if="!loggedIn">
      <v-col cols="12" md="6">
        <img src="https://media.istockphoto.com/id/544351338/photo/storytime-at-nursery.jpg?s=612x612&w=0&k=20&c=g7K9wv5eh7wsbFq1mxX1X_es-m7oNsiJuQnpkImi1zY=" alt="Children in Care" class="img-fluid" />
      </v-col>
      <v-col cols="12" md="6">
        <LibraryCardAuth
          v-model:barcode="cardNumber"
          v-model:pin="password"
          :rules="validationRules"
          title="Login to your EPL account"
          @authentication-success="handleSuccess"
          @authentication-error="handleError"
        />
      </v-col>
    </v-row>
  
    <v-row class="my-5" v-if="minors.length > 0">
     
    </v-row>
    <!-- End of minor list-->
    <v-row v-if="loggedIn">
      <v-col cols="12" >
        <v-card flat >
          <v-card-title>
              <h4>Details of Adult responsible for the child(ren)</h4>
              <span class="text-body-1 font-weight-light">Fields marked with an asterisk (*) are required</span>
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12">
                <h2 class="text-h6 font-weight-bold ">Child Details</h2>
              </v-col>
              <v-col cols="12" md="4" sm="6">
                <v-text-field 
                  v-model="formData.minorFirstname" 
                  label="First Name *" 
                  :rules="[props.rules.required, props.rules.firstname]"
                  density="compact"
                  variant="outlined"
                  :maxlength="25"
                />
              </v-col>  
              <v-col cols="12" md="4" sm="6">
                <v-text-field 
                  v-model="formData.minorLastname" 
                  label="Last Name *" 
                  density="compact"
                  :rules="[props.rules.required, props.rules.lastname]"
                  variant="outlined"
                  :maxlength="25"
                />
              </v-col>    
              <v-col cols="12" md="4" sm="6">
                <v-text-field 
                  v-model="formData.minorMiddlename" 
                  label="Middle Name"
                  density="compact"
                  :rules="[(v: string) => /^[a-zA-Z]*$/.test(v) || 'Only alphabetic characters are allowed']"
                  variant="outlined"
                  :maxlength="25"
                />
              </v-col>      
              <v-col cols="12" md="4" sm="6">
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
                    v-model="formData.minorDateOfBirth"
                    @update:model-value="isMenuOpen = false"
                    hide-actions
                    :min="minDate"
                    :max="new Date().toISOString().split('T')[0]"
                  ></v-date-picker>
                </v-menu>
              </v-col> 
              <v-col cols="12" md="4" sm="6">
                <v-text-field
                  v-model="formData.minorPassword"
                  label="Password *"        
                  variant="outlined"
                  :rules="[props.rules.required, props.rules.password]"
                  type="password"
                  density="compact"
                  hint="Password must be 6-20 characters long, no space or special characters allowed."
                  persistent-hint
                  :minlength="6"
                  :maxlength="20"
                />
                
              </v-col>
              <v-col cols="12"  md="4" sm="6">
                <v-text-field
                  v-model="formData.minorConfirmPassword"
                  label="Confirm Password *"
                  variant="outlined"
                  :rules="[props.rules.required, props.rules.password, confirmPinRules]"
                  type="password"
                  hint="Password must be 6-20 characters long, no space or special characters allowed."
                  persistent-hint
                  density="compact"
                  :minlength="6"
                  :maxlength="20"   
                />
              </v-col>   
              <v-col cols="12" md="4" sm="6">
                <v-btn
                  v-if="minors.length < 3"  
                  variant="flat" 
                  color="primary" 
                  :disabled="disabled || isMinorInvalid || isClicked"
                  text="Add another child"
                  @click="addMinor"
                  size="small"      
                  prepend-icon="mdi-plus-circle" 
                  class="btn-add-minor w-100 w-sm-75" 
                >
                </v-btn>
              </v-col>
              <v-col cols="12" md="4" sm="6" v-if="minors.length > 0">
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
              <v-col cols="12" class="">
        <h3 class="text-uppercase font-weight-black">List of Added Child(ren)</h3>
      </v-col>
              <v-card color="primary" variant="outline" elevated border >
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
              <!-- Adult details-->
              <v-col cols="12" md="4" sm="6">
                <v-text-field 
                  v-model="formData.adultFirstname" 
                  label="First Name *" 
                  :rules="[props.rules.required, props.rules.firstname]"
                  density="compact"
                  variant="outlined"
                  :maxlength="25"
                />
              </v-col>
              <v-col cols="12" md="4" sm="6">
                <v-text-field 
                  v-model="formData.adultLastname" 
                  label="Last Name *" 
                  :rules="[props.rules.required, props.rules.lastname]"
                  density="compact"
                  variant="outlined"
                  :maxlength="25"
                />
              </v-col>
              <v-col cols="12" md="4" sm="6">
                <v-text-field 
                  v-model="formData.adultEmail" 
                  label="Email *" 
                  :rules="[props.rules.required, props.rules.email]"
                  density="compact"
                  variant="outlined"
                />
              </v-col>
              <v-col cols="12" md="4" sm="6">
                <v-text-field 
                  v-model="formData.adultPhone" 
                  label="Phone Number *" 
                  v-maska="'###-###-####'"
                  :rules="[props.rules.required, props.rules.phone]"
                  density="compact"
                  variant="outlined"
                />
              </v-col>
              <v-col cols="12" md="4" sm="6">
                <v-text-field
                  label="Building Number *"
                  v-model="formData.adultBuildingNumber"
                  variant="outlined"
                  density="compact"
                  :rules="[props.rules.required, props.rules.alphanumericRule]"
                  required
                  prepend-inner-icon="mdi-home"
                  
                />
              </v-col>
              <v-col cols="12" md="4" sm="6">
                <v-text-field
                  label="Street *"
                  v-model="formData.streetName"
                  variant="outlined"
                  required
                  density="compact"
                  prepend-inner-icon="mdi-road"
                  
                  :rules="[
                    (value: any) => !!value || 'Street name is required',
                    (value: string) => /^[a-zA-Z0-9\s\-\'\/#]+$/.test(value) || 'Invalid characters in street name'
                  ]"
                />
              </v-col>
              <v-col cols="12" md="4" sm="6">
                <v-text-field
                  label="Apt/Unit"
                  v-model="formData.adultAptUnit"
                  variant="outlined"
                  density="compact"
                  :rules="[
                    (value: string) => !value || /^[a-zA-Z0-9\s\-\'\/#]*$/.test(value) || 'Invalid characters in Apt/Unit'
                  ]"
                  prepend-inner-icon="mdi-office-building"
                
                />
              </v-col>
              <v-col cols="12" md="4" sm="6">
                <v-select
                  label="City *"
                  :items="['Edmonton', 'Enoch']"
                  v-model="formData.adultCity" 
                  variant="outlined"
                  :rules="[props.rules.city]"
                  required
                  density="compact"
                  prepend-inner-icon="mdi-city"
                />
              </v-col>
              <v-col cols="12" md="4" sm="6">
                <v-text-field 
                  v-model="formData.adultProvince" 
                  label="Province *" 
                  :rules="[props.rules.required, props.rules.province]"
                  density="compact"
                  variant="outlined"
                  readonly
                />
              </v-col>
              <v-col cols="12" md="4" sm="6">
                <v-text-field 
                  v-model="formData.adultPostalCode" 
                  label="Postal Code *" 
                  :rules="[props.rules.required, props.rules.postalCode]"
                  density="compact"
                  variant="outlined"
                  :maxLength="7"
                
                />
              </v-col>
            </v-row>

          </v-card-text>
          <v-card-actions class="d-flex flex-column align-start justify-start">
            <v-btn 
              :loading="loader"
              variant="flat" 
              color="primary" 
              class="ml-2"
              prepend-icon="mdi-content-save"
              @click="saveChanges"
            >
              Save Changes
            </v-btn>
            <v-row v-if="showSuccessMessage" class="mt-2">
              <v-col cols="12">
                <span class="text-green-darken-4 font-italic font-weight-medium">Record saved successfully!</span>
              </v-col>
            </v-row>  
          </v-card-actions> 
          <v-alert
            density="compact"
            text="Please click the 'SAVE CHANGES' button to save your progress before proceeding to the 'SUBMIT' button."
            type="warning"
            class="mt-5 mx-3"
          >
          </v-alert>
        </v-card>
      </v-col>
    </v-row>
   
  </v-container>
</template>

<script setup lang="ts">
import LibraryCardAuth from './LibraryCardAuth.vue';
import { ref, computed } from 'vue';
import { vMaska } from "maska/vue";
import { minDate } from '../composables/minDate';
import { useRegistrationStore } from '../store/registration-store';

interface Minor {
    id: number;
    firstname: string;
    lastname: string;
    middlename: string;
    dateOfBirth: string;
    password: string;
    confirmPassword: string;
  }

const userRegistration = useRegistrationStore();
let minorId = 0;
const props = defineProps({
  formData: {
    type: Object,
    default: () => ({
      adultFirstname: '',
      adultLastname: '',
      adultEmail: '',
      adultPhone: '',
      adultBuildingNumber: '',
      streetName: '',
      adultAptUnit: '',
      adultCity: 'Edmonton',
      adultProvince: 'Alberta',
      adultPostalCode: '',
      minorFirstname: '',
      minorLastname: '',
      minorMiddlename: '',
      minorDateOfBirth: '',
      minorPassword: '',
      minorConfirmPassword: '',
    })
  },
  rules: {
    type: Object,
    default: () => ({
      required: (value: any) => !!value || 'This field is required',
      firstname: (value: string) => !value || /^[a-zA-Z\s\-\']+$/.test(value) || 'Invalid characters in first name',
      lastname: (value: string) => !value || /^[a-zA-Z\s\-\']+$/.test(value) || 'Invalid characters in last name',
      email: (value: string) => !value || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || 'Invalid email format',
      phone: (value: string) => !value || /^\d{3}-\d{3}-\d{4}$/.test(value) || 'Phone number must be in format XXX-XXX-XXXX',
      alphanumericRule: (value: string) => !value || /^[a-zA-Z0-9\s\-\'\/#]*$/.test(value) || 'Invalid characters',
      city: (value: any) => !!value || 'City is required',
      province: (value: any) => !!value || 'Province is required',
      postalCode: (value: string) => !value || /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/.test(value) || 'Invalid postal code format'
    })
  }
});

const cardNumber = ref('');
const password = ref('');
const validationRules = ref([]);
const loader = ref(false);
const showSuccessMessage = ref(false);
const loggedIn = ref(false);
const minors = ref<Minor[]>([]);
const minorsContact = ref(false);
const disabled = ref(false);

// Use props.formData directly instead of creating a separate ref
const formData = ref(props.formData);

const handleSuccess = (data: any) => {
  if (data) {
    loggedIn.value = true;
  }
  console.log(data);
};

const handleError = (error: any) => {
  console.log(error);
};
const isMinorInvalid = ref(true);
const formattedDate = computed(() => {
  if (!props.formData.minorDateOfBirth) return '';
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(props.formData.minorDateOfBirth);
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
const confirmPinRules = computed(() => {
  return props.formData.minorConfirmPassword !== props.formData.minorPassword ? 'Pins do not match' : true;
});
const addMinor = () => {
      if (isMinorInvalid.value) {
          return;
      }
      minors.value.push({
        id: ++minorId,
        firstname: props.formData.minorFirstname,
        lastname: props.formData.minorLastname,
        middlename: props.formData.minorMiddlename,
        dateOfBirth: formattedDate.value,
        password: props.formData.minorPassword,
        confirmPassword: props.formData.minorConfirmPassword,
      });

      userRegistration.setAdditionalMinor(true);
    
      formData.value.minorFirstname = '';
      formData.value.minorLastname = '';
      formData.value.minorMiddlename = '';
      formData.value.minorDateOfBirth = null;
      formData.value.minorPassword = '';
      formData.value.minorConfirmPassword = '';
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
        formData.value.minorFirstname = lastMinor.firstname;
        formData.value.minorLastname = lastMinor.lastname;
        formData.value.minorMiddlename = lastMinor.middlename;
        formData.value.minorDateOfBirth = new Date(lastMinor.dateOfBirth);
        formData.value.minorPassword = lastMinor.password;
        formData.value.minorConfirmPassword = lastMinor.confirmPassword;

        // Delete the last minor from the list
        deleteMinor(lastMinor.id);
        isReadonly.value = true;
      }
    };
const saveChanges = async () => {
  loader.value = true;
  try {
    // Add your save logic here
    // For now, just simulate a save operation
    await new Promise(resolve => setTimeout(resolve, 1000));
    showSuccessMessage.value = true;
    setTimeout(() => {
      showSuccessMessage.value = false;
    }, 3000);
  } catch (error) {
    console.error('Error saving changes:', error);
  } finally {
    loader.value = false;
  }
};
</script>
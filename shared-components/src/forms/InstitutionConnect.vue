<template>
    <v-container class="py-10">
      <v-row>
        <v-col cols="12" md="4">
          <div class="d-flex flex-column align-start">
            <img src="~/assets/images/lpass2.jpg" alt="L-Pass logo">
            <p class="mt-4">
              The L-Pass (Library Pass) Registration is a program connected to the Edmonton Public Library, 
              allowing both students and staff of participating institutions to register and gain access 
              to all the resources offered by the library.
            </p>
          </div>  
        </v-col>
        
        <v-col cols="12" md="8">
          <p class="mb-5 text-h6 text-primary">If any of your information isn't correct, please contact your institution.</p>
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
                  label="Date of Birth"
                  variant="outlined"
                  density="compact"
                  disabled
                  hide-details
                  readonly
                />
              </v-col>
            </v-row>
            <!-- Contact Info Row -->
            <v-row>
              <v-col cols="12" md="5">
                <v-text-field
                  v-model="studentData.email"
                  label="Email"
                  variant="outlined"
                  density="compact"
                  hide-details
                />
              </v-col>
              <v-col cols="12" md="3">
                <v-text-field
                  v-model="studentData.phone"
                  label="Phone"
                  variant="outlined"
                  density="compact"
                  hide-details
                />
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="studentData.address"
                  label="Address"
                  variant="outlined"
                  density="compact"
                  hide-details
                />
              </v-col>
            </v-row>
  
            <!-- Address Row -->
            <v-row> 
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="studentData.city"
                  label="City"
                  variant="outlined"
                  density="compact"
                  hide-details
                />
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="studentData.province"
                  label="Province"
                  variant="outlined"
                  density="compact"
                  hide-details 
                />
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="studentData.postalcode"
                  label="Postal Code"
                  variant="outlined"
                  density="compact"
                  hide-details
                />
              </v-col>
            </v-row>

            <!-- profile Info Row -->
            <v-row>
              <v-col cols="12" md="3">
                <v-text-field
                  v-model="studentData.studentid"
                  label="Student ID"
                  variant="outlined"
                  density="compact"
                  disabled
                  hide-details
                  readonly
                />
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="studentData.profile"
                  label="Institution"
                  variant="outlined"
                  density="compact"
                  disabled
                  hide-details
                  readonly
                />
              </v-col>
              
              <v-col cols="12" md="3">
                <v-text-field
                  v-model="studentData.expirydate"
                  label="Expiry Date"
                  variant="outlined"
                  density="compact"
                  disabled
                  hide-details
                />
              </v-col>
            </v-row>
            
            <!-- Password Row -->
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="studentData.password"
                  label="Password"
                  type="password"
                  variant="outlined"
                  density="compact"
                  hide-details
                  :rules="passwordRules"
                />
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="studentData.confirmPassword"
                  label="Confirm Password"
                  type="password"
                  variant="outlined"
                  density="compact"
                  hide-details
                  :rules="confirmPasswordRules"
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
import { ref, onMounted } from 'vue';
import { useRegistrationStore } from '../store/registration-store';
import { useRouter } from 'vue-router';
import SystemError from './SystemError.vue';
import { apiService } from '../services/api-service';

const userRegistration = useRegistrationStore();
const router = useRouter();

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
const closeErrorDialog = async () => {
    showSystemErrorDialog.value = false;
    await navigateTo('https://epl.bibliocommons.com/locations', {
        external: true
    })
};

const passwordRules = [
  v => !!v || 'Password is required',
  v => (v && v.length >= 8) || 'Password must be at least 8 characters',
];

const confirmPasswordRules = [
  v => !!v || 'Please confirm your password',
  v => v === studentData.value.password || 'Passwords do not match',
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
});


const generateBarcode = () => {
  // Get first 3 chars of profile, convert to uppercase
  //const profilePrefix = studentData.value.profile.substring(0, 3).toUpperCase();
  const profilePrefix = studentData.value.id;
  // Start with profile prefix and student ID
  let barcode = profilePrefix + studentData.value.studentid;
  
  // If length is less than 14, pad with random numbers
  while (barcode.length < 14) {
    barcode += Math.floor(Math.random() * 10);
  }
  
  // If longer than 14, truncate
  if (barcode.length > 14) {
    barcode = barcode.substring(0, 13);
  }

  return barcode;
};


function getStudentProfile(studentData) {
  const profileMap = new Map([
    ['Concordia University', 'EPL_CONCOR'],
    ['Grant MacEwan University', 'EPL_GMU'],
    ['NorQuest College', 'EPL_NORQ'],
    ['University of Alberta Cameron', 'EPL_UAL'],
    ['Kings University', 'EPL_KINGS'],
  ]);

  return profileMap.get(studentData?.value?.profile) || null;
}

// Handle form submission
const submitForm = async () => {
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
                password: studentData.value.password,
                barcode: generateBarcode(),
                profile: getStudentProfile(studentData),
                country: 'Canada',
                preferredname: false,
            },
        });
        if (response) {
           // create a state management for the response then extract the barcode
          userRegistration.setSuccessResponse({
              name: response?.data?.firstName + ' ' + response?.data?.lastName,
              barcode: response?.data?.barcode,
          });               
          // redirect to the success page
          router.push('/success-page');
        } 
    } catch (error) {
        console.error('Error submitting form:', error);
        showSystemErrorDialog.value = true;
    } finally {
        isSubmitting.value = false;
    }
};

</script>

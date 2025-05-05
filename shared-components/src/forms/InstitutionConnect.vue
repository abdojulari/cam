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
          <v-alert
            density="compact"
            text="If any of your information isn't correct, please contact your institution."
            title="Notice"
            type="warning"
            class="mb-5"
          />

          <v-card class="pa-10" variant="outlined">
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
                  disabled
                  readonly
                />
              </v-col>
              <v-col cols="12" md="3">
                <v-text-field
                  v-model="studentData.phone"
                  label="Phone"
                  variant="outlined"
                  density="compact"
                  disabled
                  readonly
                />
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="studentData.address"
                  label="Address"
                  variant="outlined"
                  density="compact"
                  disabled
                  readonly
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
                  disabled
                  readonly
                />
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="studentData.province"
                  label="Province"
                  variant="outlined"
                  density="compact"
                  disabled
                  readonly
                />
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="studentData.postalcode"
                  label="Postal Code"
                  variant="outlined"
                  density="compact"
                  disabled
                  readonly
                />
              </v-col>
            </v-row>

            <!-- Institution Info Row -->
            <v-row>
              <v-col cols="12" md="3">
                <v-text-field
                  v-model="studentData.studentid"
                  label="Student ID"
                  variant="outlined"
                  density="compact"
                  disabled
                  readonly
                />
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="studentData.institution"
                  label="Institution"
                  variant="outlined"
                  density="compact"
                  disabled
                  readonly
                />
              </v-col>
              <v-col cols="12" md="2">
                <v-text-field
                  v-model="studentData.status"
                  label="Status"
                  variant="outlined"
                  density="compact"
                  disabled
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
                  readonly
                />
              </v-col>
            </v-row>
            <!-- Status Row -->
            <v-row>
              
            </v-row>
  
            <!-- Password Row -->
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="password"
                  label="Password"
                  type="password"
                  variant="outlined"
                  density="compact"
                  :rules="passwordRules"
                />
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  variant="outlined"
                  density="compact"
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
</template>


<script setup>
import { ref, onMounted } from 'vue';
import { useFetch } from '#app';

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
    institution: '',
    status: '',
    expirydate: '',
    neos: '',
    country: '',
});

const password = ref('');
const confirmPassword = ref('');
const isSubmitting = ref(false);

const passwordRules = [
  v => !!v || 'Password is required',
  v => (v && v.length >= 8) || 'Password must be at least 8 characters',
];

const confirmPasswordRules = [
  v => !!v || 'Please confirm your password',
  v => v === password.value || 'Passwords do not match',
];

onMounted(async () => {
    const url = new URL(window.location.href);
    const id = url.searchParams.get('id');
    // Check if the id is present in the URL
    if (!id) {
        console.warn('No student ID found in URL');
        return;
    }
    const data = await $fetch(`/api/retrieve-lpass-record?id=${id}`);
    console.log('Student Data:', data);
    studentData.value = data;
});


const generateBarcode = () => {
  // Get first 3 chars of institution, convert to uppercase
  //const institutionPrefix = studentData.value.institution.substring(0, 3).toUpperCase();
  const institutionPrefix = studentData.value.neos;
  // Start with institution prefix and student ID
  let barcode = institutionPrefix + studentData.value.studentid;
  
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
  const institutionMap = new Map([
    ['Concordia University', 'EPL_CONCOR'],
    ['Grant MacEwan University', 'EPL_GMU'],
    ['NorQuest College', 'EPL_NORQ'],
    ['University of Alberta Cameron', 'EPL_UAL'],
    ['Kings University', 'EPL_KINGS'],
  ]);

  return institutionMap.get(studentData?.value?.institution) || null;
}

// Handle form submission
const submitForm = async () => {
    if (password.value !== confirmPassword.value) {
        alert('Passwords do not match!');
        return;
    }

    isSubmitting.value = true;
    try {
        const response = await useFetch('/api/submit-lpass', {
            method: 'POST',
            body: {
                ...studentData.value,
                password: password.value,
                barcode: generateBarcode(),
                profile: getStudentProfile(studentData),
            },
        });

        if (response.status === 200) {
            alert('Registration successful!');
            // You can redirect the user or show a success message
        } else {
            alert('Registration failed!');
        }
    } catch (error) {
        console.error('Error submitting form:', error);
        alert('Something went wrong.');
    }
};

</script>

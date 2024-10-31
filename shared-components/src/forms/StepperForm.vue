<template>
    <div>
        <v-stepper alt-labels v-model="step" show-actions="true" elevation="0" width="100%" min-width="620">
            <template v-slot:default>
            <v-stepper-header>
                <template v-for="(item, index) in filteredSteps" :key="index">
                    <v-stepper-item
                        :complete="step > index + 1"
                        :step="item.title"
                        :value="index + 1"
                        :title="item.title"
                        editable
                    ></v-stepper-item>
                    <v-divider 
                    :thickness="2"
                    class="border-opacity-100"
                    color="info"
                    v-if="index !== filteredSteps.length - 1">
                    </v-divider>
                </template>
            </v-stepper-header>
    
            <v-stepper-window>
                <template v-for="(item, index) in filteredSteps" :key="index">
                <v-stepper-window-item :value="index + 1">
                    <v-card>
                    <v-card-title>
                        <h3>{{ item.title }}</h3>
                    </v-card-title>
                    <v-card-text>
                        <component :is="item.component" :formData="formData" :rules="item.rules" :page="props.page" />
                    </v-card-text>
                    </v-card>
                </v-stepper-window-item>
                </template>
            </v-stepper-window>
    
                <v-stepper-actions
                    :disabled="!formData.radios && page !== 'registration-portal' || disabled"
                    @click:next="next"
                    @click:prev="prev"
                >
                </v-stepper-actions>
                <v-btn
                    v-if="step === filteredSteps.length && step !== 1"
                    color="primary"
                    @click="submitForm"
                    class="me-2"
                >
                    Submit
                </v-btn>
            </template>
        </v-stepper>
    </div>
</template>
  
<script setup>
  import { ref, computed } from 'vue';
  import BioData from './BioData.vue';
  import ContactInfo from './ContactInformation.vue';
  import Confirmation from './Confirmation.vue';
  import ProfileSelection from './ProfileSelection.vue';
  import Minor from './Minor.vue';
  import { useRegistrationStore } from '../store/registration-store';
  import Privilege from './Privilege.vue';
  
  const userRegistration = useRegistrationStore();
  const props = defineProps({
    page: {
      type: String,
      required: true,
    },
  });
  
  // Stepper state
  const step = ref(1);
  
  // Single reactive formData object
  const formData = ref({
    radios: '',
    firstname: '',
    lastname: '',
    middlename: '',
    dateofBirth: null,
    address: '',
    city: '',
    province: '',
    phone: '',
    email: '',
    postalCode: '',
    message: '',
    guardianName: '',
    gender: '',
    careOf: '',
    street: '',
    country: '',
    pin:'',
    confirmPin:'',
    barcode:'',
    addMinor: false,
    minorFirstname: '',
    minorLastname: '',
    minorMiddlename: '',
    minorDateOfBirth: null,
  });
  
  // Step list
  const stepList = [
    {
      title: 'Profile ',
      component: ProfileSelection,
      props: {
        formData: formData,
        rules: {
          required: (value) => !!value || 'Required.',
        }
      },
    },
    {
      title: 'Bio Data',
      component: BioData,
      props: {
        formData: formData,
        rules: {
          required: (value) => !!value || 'Required.',
        },
      },
      rules: {
        required: (value) => !!value || 'Required.',
      },
    },
    {
      title: 'Contacts',
      component: ContactInfo,
      rules: {
        required: (value) => !!value || 'Required.',
        email: (value) => {
          const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
          return emailPattern.test(value) || 'Invalid e-mail.';
        },
        phone: (value) => {
          const phonePattern = /^\d{10}$/;
          return phonePattern.test(value) || 'Invalid phone number.';
        },
        postalCode: (value) => {
            
          const postalCodePattern = /^[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d$/;
          return postalCodePattern.test(value) || 'Invalid postal code. Format: A1A 1A1';
        },
      },
    },
    {
      title: 'Confirmation',
      component: Confirmation,
      rules: {
        required: (value) => !!value || 'Required.',
      },
    },
    {
      title: 'Minor',
      component: Minor,
      rules: [
        (value) => !!value || 'Required.',
        (value) => {
          const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
          return emailPattern.test(value) || 'Invalid e-mail.';
        },
      ],
    },
    {
      title: 'Privilege',
      component: Privilege,
      rules: {
        required: (value) => !!value || 'Required.',
      },
        },
    ];

    const selectedRadio = computed(() => userRegistration.getRadioSelection);
    watch(selectedRadio, (newValue) => {
    console.log('I am watch:', newValue);
    return formData.radios = newValue;
    });
    onMounted(() => { 
        console.log('Selected Radio on load:', selectedRadio.value);
        return formData.radios = selectedRadio.value;
    });
    // Filter items based on the current page
    const filteredSteps = computed(() => {
        const selected = selectedRadio.value;
        if (selected === "Adult") {
            if (formData.value.addMinor) {
                return stepList.slice(0, 5);
            }
            return stepList.slice(0, 4); 
        }

        if (selected === "Minor") {
            return [stepList[0], stepList[4]]; 
        }
        if (props.page === 'registration-portal') {
            return [stepList[1], stepList[2], stepList[3], stepList[5]];
        }
        
        return stepList.slice(0,1); 
    });
    // Navigation methods
    const next = () => {

          // Handle submission based on current step
        if (filteredSteps.value[step.value - 1].title === 'Bio Data') {
            userRegistration.addBioData({
                firstname: formData.value.firstname,
                lastname: formData.value.lastname,
                middlename: formData.value.middlename,
                dateofbirth: formData.value.dateofBirth,
            });
            console.log('BioData submitted:', formData.value);
        } else if (filteredSteps.value[step.value - 1].title === 'Contacts') {
            userRegistration.registration.contact = {
                street: formData.value.street,
                city: formData.value.city,
                province: formData.value.province,
                postalcode: formData.value.postalCode,
                phone: formData.value.phone,
                email: formData.value.email,
            };
            console.log('Contact Info submitted:', formData.value);
        } else if (filteredSteps.value[step.value - 1].title === 'Profile') {
            userRegistration.registration.profile = formData.value.radios; // Assuming profile is based on radios
            console.log('Profile submitted:', formData.value);
        } else if (filteredSteps.value[step.value - 1].title === 'Minor') {
            userRegistration.addBioData({
                firstname: formData.value.minorFirstname,
                lastname: formData.value.minorLastname,
                middlename: formData.value.minorMiddlename,
                dateofbirth: formData.value.minorDateOfBirth,
            });
            console.log('Minor submitted:', formData.value);
        }


        if (step.value < filteredSteps.value.length) {
        step.value++;
        }
        // disable if there is no more steps
        if (step.value === filteredSteps.value.length) {
        return isNextDisabled;
        }
    };
    
    const prev = () => {
        if (step.value > 1) {
        step.value--;
        }
    };
  // Check if the next button should be disabled
    const isNextDisabled = computed(() => {
    return step.value >= filteredSteps.value.length;
    })
    // Handle form submission
    // const submitForm = () => {
    //     console.log('Form submitted:', formData.value);
    // };
    const submitForm = () => {
    const finalRegistrationData = {
        biodata: userRegistration.registration.biodata,
        contact: userRegistration.registration.contact, // Get contact info from the store
        profile: userRegistration.registration.profile,
        // You can add additional data as necessary
    };

    // Update the registration store with the final data
    //userRegistration.setRegistration(finalRegistrationData);

    // Log the final submission
    console.log('Form submitted:', finalRegistrationData);
};

</script>

  
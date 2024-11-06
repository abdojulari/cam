<template>
    <div>
        <v-stepper v-model="step" show-actions="true" elevation="0" width="100%" min-width="620">
            <template v-slot:default>
            <v-stepper-header>
                <template v-for="(item, index) in filteredSteps" :key="index">
                    <v-stepper-item
                        :complete="step > index + 1"
                        :step="item.title"
                        :value="index + 1"
                        :title="item.title"                    
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
                <v-container>
                    <v-row>
                    <v-col class="d-flex justify-end">
                        <v-btn
                            v-if="step === filteredSteps.length && step !== 1"
                            :disabled="!formData.acceptTerms"
                            color="primary"
                            @click="submitForm"
                            class="me-2"
                        >
                            Submit
                        </v-btn>
                    </v-col>
                    </v-row>
                </v-container>
               
            </template>
        </v-stepper>
    </div>
</template>
  
<script setup>
    import { ref, computed } from 'vue';
    import BioData from './BioData.vue';
    import ContactInfo from './ContactInformation.vue';
    import ProfileSelection from './ProfileSelection.vue';
    import Minor from './Minor.vue';
    import { useRegistrationStore } from '../store/registration-store';
    import Privilege from './Privilege.vue';
    import CreatePin from './CreatePin.vue';
    import { useRouter } from 'vue-router'
    
    const userRegistration = useRegistrationStore();
    const router = useRouter();
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
        password: '',
        confirmPassword:'',
        barcode:'',
        addMinor: false,
        minorFirstname: '',
        minorLastname: '',
        minorMiddlename: '',
        minorDateOfBirth: null,
        acceptTerms: false,
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
        title: 'Choose your password',
        component: CreatePin,
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
                userRegistration.setAddMinor(true);
                return stepList.slice(0, 5);
            }
            return stepList.slice(0, 4); 
        }
        if (selected === "Minor") {
            
            return [stepList[0], stepList[4],stepList[3]]; 
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
            userRegistration.adult.biodata = {
                firstname: formData.value.firstname,
                lastname: formData.value.lastname,
                middlename: formData.value.middlename,
                dateofbirth: (formData.value.dateofBirth).toISOString().split('T')[0],
            };
        } else if (filteredSteps.value[step.value - 1].title === 'Contacts') {
            userRegistration.adult.contact = {
                street: formData.value.street,
                city: formData.value.city,
                province: formData.value.province,
                postalcode: formData.value.postalCode,
                phone: formData.value.phone,
                email: formData.value.email,
            };
        } else if (filteredSteps.value[step.value - 1].title === 'Profile') {
            userRegistration.adult.profile = formData.value.radios; // Assuming profile is based on radios
            
        } else if (filteredSteps.value[step.value - 1].title === 'Minor') {
            userRegistration.addBioData({
                firstname: formData.value.minorFirstname,
                lastname: formData.value.minorLastname,
                middlename: formData.value.minorMiddlename,
                dateofbirth: formData.value.minorDateOfBirth,
            });
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

    const isValidStep = (stepIndex) => {
        const rules = filteredSteps.value[stepIndex].rules;
        const data = formData.value;

        // Iterate over the rules and check if each required field is filled
        for (const [key, rule] of Object.entries(rules)) {
            if (Array.isArray(rule)) {
                // Handle array of rules (if applicable)
                for (const validate of rule) {
                    const validationResult = validate(data[key]);
                    if (typeof validationResult === 'string') {
                        return false; // Return false if any rule fails
                    }
                }
            } else {
                const validationResult = rule(data[key]);
                if (typeof validationResult === 'string') {
                    return false;
                }
            }
        }
        return true; 
    };
    // Check if the next button should be disabled
    const isNextDisabled = computed(() => {
        //return step.value >= filteredSteps.value.length;
        const currentStepIndex = step.value - 1; // Adjust for zero-based index
        return !isValidStep(currentStepIndex) || step.value >= filteredSteps.value.length;
    })
   
    const submitForm = () => {
        setTimeout(async () => {
            console.log('Form submitted:', userRegistration.registration);
            // Navigate to the "/preview" route
            router.push('/preview');
        }, 1000);  
};
</script>
  
<template>  
    <v-container class="main-view">
        <v-row class="py-5">
            <h2 class="text-h4 text-primary font-weight-bold">
                Get Your FREE Library Card
            </h2>
        </v-row>
        <div v-if="isLoading" 
        class="fill-height w-100 opacity-20 blue-grey-lighten-5 d-flex justify-center align-center"
        style="height: 100%;"
        >
            <v-progress-circular
                v-if="isLoading"
                :size="50"
                :width="4"
                indeterminate
                color="primary"
            />
        </div>
        <v-row class="px-1 py-1 mx-1 my-1 d-flex justify-center">
            <v-col cols="12">
                <v-img src="~/assets/images/horizontal.png" alt="registration"></v-img>
            </v-col>
        </v-row>
        <v-row class="px-1 py-1 mx-1 my-1 d-flex justify-center">  
            <v-col cols="12">
                <v-stepper v-model="step" show-actions="true" elevation="0" width="100%" height="100%">
                    <template v-slot:default>
                    <v-stepper-header class="elevation-0 border-b">
                        <template v-for="(item, index) in filteredSteps" :key="index">
                            <v-stepper-item
                                :complete="step > index + 1"
                                :step="item.title"
                                :value="index + 1"
                                :title="item.title"
                                :color="step === index + 1 ? 'primary-darken-1' : 'green-darken-4'" 
                                class="text-body-2 font-weight-bold"            
                            ></v-stepper-item>
                            <v-divider 
                            :thickness="3"
                            class="border-opacity-100 border-warning"
                            v-if="index !== filteredSteps.length - 1">
                            </v-divider>
                        </template>
                    </v-stepper-header>
            
                    <v-stepper-window class="stepper-window">
                        <template v-for="(item, index) in filteredSteps" :key="index">
                        <v-stepper-window-item :value="index + 1">
                            <v-card>
                            <v-card-title>
                                <h3 class="text-primary text-h6 font-weight-bold">{{ item.title }}</h3>
                            </v-card-title>
                            <v-card-text>
                                <component 
                                    :is="item.component" 
                                    :formData="formData" 
                                    :rules="item.rules" 
                                    :page="props.page" 
                                    v-model="formValid"
                                    :form="form"
                                />
                            </v-card-text>
                            </v-card>
                        </v-stepper-window-item>
                        </template>
                    </v-stepper-window>
                    <v-container>
                        <v-row>
                        <v-col class="d-flex justify-end">
                            <v-btn
                                v-if="step === filteredSteps.length && step !== 1"
                                :disabled="!formData.acceptTerms || turnstile === false || isLoading === true"
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
                    <template v-slot:actions>
                        <section class="d-flex justify-space-between pt-10">
                            <v-btn v-if="step !== 1"
                                @click="prev" 
                                variant="flat"
                            >
                                <p class=" font-medium capitalize">Previous</p>
                            </v-btn>
                            <v-spacer v-if="step === 1"/>
                            <v-btn 
                                @click="next" 
                                variant="flat" 
                                color="primary" 
                
                                :disabled="!formData.radios && page !== 'registration-portal' || disabled || isNextDisabled"
                            >
                                <p class="font-medium capitalize">Next</p>
                            </v-btn>
                        </section>
                    </template>
                </v-stepper>
            </v-col>
        </v-row> 
    </v-container>
    <ErrorPrompt :is-active="showErrorDialog" @close="closeErrorDialog" />
</template>
  
<script setup>
    import { ref, computed } from 'vue';
    import { useRegistrationStore } from '../store/registration-store';
    import { useRouter } from 'vue-router'
    import { apiService } from '../services/api-service';
    import { rules } from '../composables/rules';
    import ErrorPrompt from './ErrorPrompt.vue';
    
    const userRegistration = useRegistrationStore();
    const router = useRouter();
    const props = defineProps({
        page: {
        type: String,
        required: true,
        },
    });
    const formValid = ref(false);
    const form = ref();
    const step = ref(1);
    
    const formData = ref({
        radios: '',
        firstname: '',
        lastname: '',
        middlename: '',
        dateofBirth: null,
        address: '',
        city: '',
        province: 'AB',
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
        adultProvince: 'AB',
    });
    const isLoading = ref(false);
    // Step list
    const stepList = rules(formData);
    const selectedRadio = computed(() => userRegistration.getRadioSelection);
    const turnstile = computed(() => userRegistration.getTurnstile);
    const showErrorDialog = ref(false);
    const closeErrorDialog = async () => {
        showErrorDialog.value = false;
        await navigateTo('https://epl.bibliocommons.com/locations', {
            external: true
        })
    };
    watch(selectedRadio, (newValue) => {
        return formData.value.radios = newValue;
    });

    onMounted(async () => {
        apiService.initializeToken().then((response) => {
            return response;
        });
        return formData.value.radios = selectedRadio.value;
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
        if (filteredSteps.value[step.value - 1].title === 'About You') {
            form.value?.validate();
            
            if (!formValid.value) {
                return;
            }
            userRegistration.adult.biodata = {
                firstname: formData.value.firstname,
                lastname: formData.value.lastname,
                middlename: formData.value.middlename,
                dateofbirth: (formData.value.dateofBirth).toISOString().split('T')[0],
            };
            
        } else if (filteredSteps.value[step.value - 1].title === 'Contact') {
            if (formData.value.street === '' || formData.value.city === '' 
            || formData.value.province === '' || formData.value.postalCode === null
            || formData.value.phone === '' || formData.value.email === '') {
                return isNextDisabled;
            }
            userRegistration.adult.contact = {
                street: formData.value.street,
                city: formData.value.city,
                province: formData.value.province,
                postalcode: formData.value.postalCode,
                phone: formData.value.phone,
                email: formData.value.email,
            };

            console.log(userRegistration.adult.contact);
        } else if (filteredSteps.value[step.value - 1].title === 'Profile') {
            userRegistration.adult.profile = formData.value.radios; 
            userRegistration.adult.consent = userRegistration.getConsent;
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
                    // Clear the form data based on the current step before moving back
            const currentStepTitle = filteredSteps.value[step.value - 1].title;

            if (currentStepTitle === 'About You') {
                userRegistration.adult.biodata = {}; 
                console.log(userRegistration.adult.biodata);
            } else if (currentStepTitle === 'Contact') {
                userRegistration.adult.contact = {}; 
                console.log(userRegistration.adult.contact);
            } else if (currentStepTitle === 'Profile') {
                userRegistration.adult.profile = {}; 
                userRegistration.adult.consent = null; 
                console.log(userRegistration.adult.profile);
            }

            step.value--;
        }
    };
    // Check if the next button should be disabled
    const isNextDisabled = computed(() => {
        //const currentStepIndex = step.value - 1;
        if (filteredSteps.value[step.value - 1].title === 'About You' && !formValid.value) {
            return true;
        }
        if (filteredSteps.value[step.value - 1].title === 'Contact') {
            if (formData.value.street === '' || formData.value.city === '' 
            || formData.value.province === '' || formData.value.postalCode === ''
            || formData.value.phone === '' || formData.value.email === '') {
                return true;
            }
        }
        if (filteredSteps.value[step.value - 1].title === 'Minor') {
            if (formData.value.minorFirstname === '' || formData.value.minorLastname === '' 
           || formData.value.minorDateOfBirth === null) {
                return true;
            }
        }
        if (filteredSteps.value[step.value - 1].title === 'Choose your password' || filteredSteps.value[step.value - 1].title === 'Confirmation') {
            if (formData.value.password === '' || formData.value.confirmPassword === '') {
                return true;
            }
        }

        return step.value >= filteredSteps.value.length;
    })
    const disabled = computed(() => {
        if (filteredSteps.value.length === 1) return 'prev'
        if (filteredSteps.value.length === step.value) return 'next'
        return undefined
    })
   
    const submitForm = async () => {
        isLoading.value = true;
            let registrationData;
            try {
                for (const data of userRegistration.registration) {
                await apiService.registration(data).then((response) => {
                    registrationData = response;
                });
            }
            // Once all submissions are done, check for errors in the data
            if (registrationData && registrationData.error || registrationData?.message !== 'Record added successfully.') {
                showErrorDialog.value = true; 
                return;
            }
            // Proceed to next page if no errors
            router.push('/success-page');
        } catch (error) {
            console.error('Error during registration:', error);
            alert('There was an error during registration.');
        } finally {
            isLoading.value = false; // Hide loading animation once the process is complete
        }
        return registrationData;
    };

</script>
<style scoped>
.v-stepper-item {
    transition: background-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease;
}
/* Mobile-specific styles */
@media (max-width: 600px) {
    .v-stepper-window, .main-view  > .stepper-window{
        margin: 0 !important;
    }
}
</style>

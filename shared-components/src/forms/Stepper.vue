<template>  
    <v-container class="main-view">
        <v-row class="pa-5 ">
            <h2 class="text-h6 text-sm-h4  text-primary font-weight-bold">
                Get Your FREE Library Card
            </h2>
        </v-row>
      
        <v-row class="px-1 py-1 mx-1 my-1 d-flex justify-center">
            <v-col cols="12">
                <v-img class="w-100" src="~/assets/images/horizontal.png" alt="registration"></v-img>
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
                                :title="item.title === 'Minor' ? 'Child' : item.title"
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
                                <h3 class="text-primary text-h6 font-weight-bold">{{ item.title === 'Minor' ? 'Child' : item.title}}</h3>
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
                        <div v-if="isLoading" 
                            class="fill-height h-100 w-100 opacity-20 blue-grey-lighten-5 d-flex justify-center align-center"
                            style="height: 100%;"
                        >
                            <v-progress-circular
                                v-if="isLoading"
                                :size="60"
                                :width="4"
                                indeterminate
                                color="primary"
                            />
                        </div>
                    </v-container>
                    </template>
                    <template v-slot:actions>
                        <section class="d-flex justify-space-between pt-10">
                            <v-btn v-if="step !== 1"
                                @click="prev" 
                                color="primary" 
                                variant="flat"
                            >
                                <p class=" font-medium capitalize">Previous</p>
                            </v-btn>
                            <v-spacer v-if="step === 1"/>
                            <v-btn v-if="(
                                    (selectedRadio === 'Minor' && step !== 2) ||
                                    (selectedRadio === 'Adult' && ((step !== 5 && step !== 4) || (step === 4 && formData.addMinor)))
                                )"
                                @click="next($event)" 
                                variant="flat" 
                                color="primary" 
                                :disabled="(!formData.radios && page !== 'registration-portal') || disabled || isNextDisabled || !formData.acceptTerms  "
                            >
                                <p class="font-medium capitalize">Next</p>
                            </v-btn>
                            <v-btn
                                v-if="step === filteredSteps.length && step !== 1"
                                :disabled="!formData.acceptTerms || (selectedRadio === 'Adult' && !buttonClickState && formData.addMinor)|| (selectedRadio !== 'Adult' && 
                                !buttonClickState)  || isLoading === true || (selectedRadio === 'Adult' 
                                && !formData.addMinor && (formData.password.length < 6 || 
                                formData.password !== formData.confirmPassword || !pass.test(formData.password)))" 
                                color="primary"
                                @click="submitForm($event)"
                                class="me-2"
                            >
                                Submit
                            </v-btn>
                        </section>
                    </template>
                </v-stepper>
            </v-col>
        </v-row> 
    </v-container>
    <ErrorPrompt :is-active="showErrorDialog" @close="closeErrorDialog" />
    <SystemError :is-active="showSystemErrorDialog" @close="closeErrorDialog" />
</template>
  
<script setup>
    import { ref, computed } from 'vue';
    import { useRegistrationStore } from '../store/registration-store';
    import { useRouter } from 'vue-router'
    import { apiService } from '../services/api-service';
    import { validationRules } from '../composables/rules';
    import ErrorPrompt from './ErrorPrompt.vue';
    import { useUtmParams } from '../composables/useUtmParams';
    import { useReproducibleData } from '../composables/reproducible-data';
    import SystemError from './SystemError.vue';
   
    const { gtag } = useGtag()
    const userRegistration = useRegistrationStore();
    const utmParams = useUtmParams()
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
        postalCode: 'T',
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
        minorPassword: '',
        minorConfirmPassword: '',
        acceptTerms: false,
        adultProvince: 'AB',
        adultPostalCode: 'T',
        buildingNumber:'',
        streetName:'',
        aptUnit:'',
    });
    const isLoading = ref(false);
    const streetNamePattern = /^[a-zA-Z0-9\s\-/#']*$/;
    const pass = /^(?=[A-Za-z0-9]{6,20}$)(?!.*\s).*$/;
    // Step list
    const stepList = validationRules(formData);
    const selectedRadio = computed(() => userRegistration.getRadioSelection);
    const buttonClickState = computed(() => userRegistration.getButtonClickState);
    const showErrorDialog = ref(false);
    const showSystemErrorDialog = ref(false);
    const closeErrorDialog = async () => {
        showErrorDialog.value = false;
        showSystemErrorDialog.value = false;
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
        apiService.sanctumToken().then((response) => {
            return response;
        });
        
        return formData.value.radios = selectedRadio.value;
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
    const next = async (event) => {
        // Handle submission based on current step
        const buttonName = event.target.innerText;
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
            sendEventToGA(buttonName, 'biodata', 'EPL_SELF');
            // send the reproducible data to the api
            const reproducibleData = useReproducibleData({
                eventCategory: 'EPL_SELF',
                eventLabel: `${buttonName} button clicked`,
                screenName: filteredSteps.value[step.value - 1].title,
                registrationType: 'EPL_SELF',
                dob: (formData.value.dateofBirth).toISOString().split('T')[0],
                step: step.value,
            });
            await apiService.reproducibleData(reproducibleData);
           
        } else if (filteredSteps.value[step.value - 1].title === 'Contact') {
            
            if ( formData.value.city === '' || formData.value.streetName === '' 
            || formData.value.buildingNumber === '' || formData.value.province === '' 
            || formData.value.postalCode === null || formData.value.phone === '' 
            || formData.value.email === '' || !streetNamePattern.test(formData.value.streetName)) {
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
            sendEventToGA(buttonName, 'contact', 'EPL_SELF');
            // send the reproducible data to the api
            const reproducibleData = useReproducibleData({
                eventCategory: 'EPL_SELF',
                eventLabel: `${buttonName} button clicked`,
                screenName: filteredSteps.value[step.value - 1].title,
                registrationType: 'EPL_SELF',
                postalCode: formData.value.postalCode,
                step: step.value,
            });
            await apiService.reproducibleData(reproducibleData);
            
        } else if (filteredSteps.value[step.value - 1].title === 'Profile') {
            userRegistration.adult.profile = formData.value.radios; 
            userRegistration.adult.consent = userRegistration.getConsent;
            userRegistration.minor.consent = userRegistration.getConsent;
            
            sendEventToGA(buttonName, 'profile_selection', formData.value.radios);
            // send the reproducible data to the api
            const reproducibleData = useReproducibleData({
                eventCategory: 'EPL_SELF',
                eventLabel: `${buttonName} button clicked`,
                screenName: filteredSteps.value[step.value - 1].title,
                registrationType: 'EPL_SELF',
                step: step.value,
            });
            await apiService.reproducibleData(reproducibleData);
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
                userRegistration.registration.pop();
                console.log(userRegistration.adult.biodata);
            } else if (currentStepTitle === 'Contact') {
                userRegistration.adult.contact = {}; 
                userRegistration.registration.pop();
                formData.value.password = '';
                formData.value.confirmPassword = '';
                console.log(userRegistration.adult.contact);
            } else if (currentStepTitle === 'Profile') {
                userRegistration.adult.profile = {}; 
                userRegistration.adult.consent = null;
                userRegistration.registration.pop(); 
                console.log(userRegistration.adult.profile);
            } else if (currentStepTitle === 'Confirmation') {
                userRegistration.adult.password = '';
                userRegistration.adult.confirmPassword = ''
                userRegistration.registration.pop();
                formData.value.password = '';
                formData.value.confirmPassword = '';
            }

            step.value--;
        }
    };
    // Check if the next button should be disabled
    const isNextDisabled = computed(() => {
        
        const postalCodePattern = /^T\d[ABCEGHJ-NPRSTV-Z]\s\d[ABCEGHJ-NPRSTV-Z]\d$/;
        const passwordRegex = /^(?=[A-Za-z0-9]{6,20}$)(?!.*\s).*$/;
        const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
        const phonePattern = /^\d{3}-\d{3}-\d{4}$/;

        if (filteredSteps.value[step.value - 1].title === 'About You' && !formValid.value) {
            return true;
        }
        if (filteredSteps.value[step.value - 1].title === 'Contact') {
            if ( formData.value.city === '' || formData.value.streetName === '' 
            || formData.value.buildingNumber === '' || !streetNamePattern.test(formData.value.streetName)
            || formData.value.province === '' || formData.value.postalCode === ''
            || formData.value.phone === '' || formData.value.email === '' || 
            !phonePattern.test(formData.value.phone) || 
            !emailPattern.test(formData.value.email) || !postalCodePattern.test(formData.value.postalCode)) {
                return true;
            }
        }
        if (filteredSteps.value[step.value - 1].title === 'Minor') {
            if (formData.value.minorFirstname === '' || formData.value.minorLastname === '' 
           || formData.value.minorDateOfBirth === null || formData.value.password === '' || formData.value.confirmPassword === '' || formData.value.password.length < 6 || formData.value.password !== formData.value.confirmPassword ) {
                return true;
            }
        }
        if (filteredSteps.value[step.value - 1].title === 'Choose your password' || filteredSteps.value[step.value - 1].title === 'Confirmation' ) {
            if (formData.value.password === '' || formData.value.confirmPassword === '' || formData.value.password.length < 6 || formData.value.password !== formData.value.confirmPassword || !passwordRegex.test(formData.value.password)) {
                return true;
            }
        }

        if(filteredSteps.value[step.value - 1].title === 'Minor' && userRegistration.getLinkState === false) {
            return true; 
        }

        if (filteredSteps.value[step.value - 1].title === 'Profile') {
            if (formData.value.acceptTerms === false) {
                return true;
            }
        }

        return step.value >= filteredSteps.value.length;
    })
    const disabled = computed(() => {
       if (filteredSteps.value[step.value - 1].title === 'Profile') {
            if (formData.value.acceptTerms === false) {
                return true;
            }
        }
        if (filteredSteps.value.length === 1) return 'prev'
        if (filteredSteps.value.length === step.value) return 'next'
        return undefined
    })

    // Send event to GA with UTM params
    const sendEventToGA = (buttonName, eventName, profile) => {
        gtag('event', eventName, {
            app_name: 'EPL | Online Registration',
            method: `Online Card Reg, ${profile}`,
            screen_name: `${filteredSteps.value[step.value - 1].title} Screen`,
            event_category: `${buttonName} button clicked`,
            event_label: filteredSteps.value[step.value - 1].title,
            registration_type: profile,
            step: step.value,
            ...utmParams
        });
    }
   
    const submitForm = async (event) => {
        const buttonName = event.target.innerText;
        isLoading.value = true;
            let registrationData;
            try {
                for (const data of userRegistration.registration) {
                    await apiService.registration(data).then((response) => {
                        registrationData = response;
                        // create a state management for the response then extract the barcode
                        userRegistration.setSuccessResponse({
                            name: response?.data?.firstName + ' ' + response?.data?.lastName,
                            barcode: response?.data?.barcode,
                        });
                       
                    });
                }
                // Once all submissions are done, check for errors in the data
                if (registrationData?.message === "Duplicate record found with fuzzy logic.") {
                    showErrorDialog.value = true; 
                    return;
                } else if (registrationData === undefined || registrationData?.message === "Error posting to ILS API" || registrationData?.error === "Posting to ILS failed 500") {
                    showSystemErrorDialog.value = true;
                    return;
                } else {
                    const reproducibleData = useReproducibleData({
                        eventCategory: 'Complete Registration',
                        eventLabel: `${buttonName} button clicked`,
                        screenName: 'Success Page',
                        registrationType: selectedRadio.value === 'Adult' ? 'EPL_SELF' : 'EPL_SELFJ',
                        step: step.value,
                    });
                    await apiService.reproducibleData(reproducibleData);
                    // Proceed to next page if no errors
                    sendEventToGA(buttonName, 'sign_up', registrationData?.data?.profile?.['@key']);
                    router.push('/success-page');
                }
                
            } catch (error) {
                if( error.message === 'HTTP error! status: 409') {
                    showErrorDialog.value = true
                }
                else {
                    showSystemErrorDialog.value = true;
                }
                console.log('Error Message:', error.message);
            
            } finally {
                isLoading.value = false; // Hide loading animation once the process is complete
            }
            return registrationData;
    };

</script>
<style scoped>
.v-container {
    max-width: 900px;
}
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

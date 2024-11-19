<template>
    <v-container class="">
        <v-row class="mx-auto px-10">
            <v-col cols="8">
                <v-stepper v-model="step" show-actions="true" elevation="0" width="100%">
            <template v-slot:default>
            <v-stepper-header>
                <template v-for="(item, index) in filteredSteps" :key="index">
                    <v-stepper-item
                        
                        :complete="step > index + 1"
                        :step="item.title"
                        :value="index + 1"
                        :title="item.title" 
                        class="text-body-1 font-weight-bold"              
                    ></v-stepper-item>
                    <v-divider 
                    :thickness="3"
                    class="border-opacity-100"
                    color="success"
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
                        <component :is="item.component" :formData="formData" :rules="item.rules" :page="props.page" v-model="biodataFormValid"/>
                    </v-card-text>
                    </v-card>
                </v-stepper-window-item>
                </template>
            </v-stepper-window>
    
                <v-stepper-actions
                    color="primary"
                    :disabled="!formData.radios && page !== 'registration-portal' || disabled || isNextDisabled"
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
            </v-col>
            <v-col cols="4">
                <v-img src="https://www2.epl.ca/register/images/EPLCards.svg" alt="registration"></v-img>
            </v-col>
        </v-row>     
    </v-container>
</template>
  
<script setup>
    import { ref, computed } from 'vue';
    import { useRegistrationStore } from '../store/registration-store';
    import { useRouter } from 'vue-router'
    import { apiService } from '../services/api-service';
    import { rules } from '../composables/rules';
    
    const userRegistration = useRegistrationStore();
    const router = useRouter();
    const props = defineProps({
        page: {
        type: String,
        required: true,
        },
    });
    const biodataFormValid = ref(false);
    const form = useTemplateRef("form");
    const step = ref(1);
    const formData = ref({
        radios: '',
        firstname: '',
        lastname: '',
        middlename: '',
        dateofBirth: null,
        address: '',
        city: '',
        province: 'Alberta',
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
        adultProvince: 'Alberta',
    });
  
    // Step list
    const stepList = rules(formData);
    const selectedRadio = computed(() => userRegistration.getRadioSelection);
    watch(selectedRadio, (newValue) => {
        return formData.radios = newValue;
    });

    onMounted(async () => {
        apiService.initializeToken().then((response) => {
            return response;
        });
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
            // Validate the form before proceeding
            form.value?.validate();
            if (!biodataFormValid.value) {
                console.log("Form is invalid! Please fill the form.");
                return;
            }
            userRegistration.adult.biodata = {
                firstname: formData.value.firstname,
                lastname: formData.value.lastname,
                middlename: formData.value.middlename,
                dateofbirth: (formData.value.dateofBirth).toISOString().split('T')[0],
            };
            
        } else if (filteredSteps.value[step.value - 1].title === 'Contacts') {
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
        step.value--;
        }
    };
    // Check if the next button should be disabled
    const isNextDisabled = computed(() => {
        //const currentStepIndex = step.value - 1;
        return step.value >= filteredSteps.value.length;
    })
    const disabled = computed(() => {
        if (filteredSteps.value.length === 1) return 'prev'
        if (filteredSteps.value.length === step.value) return 'next'
        return undefined
    })
   
    const submitForm = async () => {
        setTimeout(async () => {
            let registrationData;
            for (const data of userRegistration.registration) {
                await apiService.registration(data).then((response) => {
                    registrationData = response;
                });
            }
            // Once all submissions are done, check for errors in the data
            if (registrationData && registrationData.error === '[POST] \"http://cre.test/api/duplicates\": 409 Conflict' || registrationData?.message !== 'Record added successfully.') {
                alert('Please can you visit the library to resolve the issue?');
                return;
            }
            // Proceed to next page if no errors
            router.push('/preview');
            return registrationData;
        }, 1000);  
    };

</script>
<style scoped>
.v-stepper-item {
    transition: background-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease;
}
</style>

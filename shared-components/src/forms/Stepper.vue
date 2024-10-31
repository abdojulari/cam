<template>
  <v-stepper
    v-model="step"
    :items="items"
    show-actions
    elevation="0"
    width="100%"
  >
    
      <template v-slot:item.1>
        <v-card>
          <v-card-title>
            <span>Bio Data</span>
          </v-card-title>
           <v-container class="pt-8">
            <v-text-field
              label="First name"
              model-value="John "
              variant="outlined"
              density="compact"
              :rules="[rules.required]"
              required
            ></v-text-field>
            <v-text-field
              label="Last name"
              model-value="Leider "
              variant="outlined"
              density="compact"
              :rules="[rules.required]"
              required
            ></v-text-field>
            <v-text-field
              label="Middle name"
              model-value="Carter"
              variant="outlined"
              density="compact"
              :rules="[rules.required]"
              required
            ></v-text-field>
              <v-menu v-model="isMenuOpen" :close-on-content-click="false">
                <template v-slot:activator="{ props }">
                  <v-text-field
                    :model-value="formattedDate"
                    readonly
                    v-bind="props"
                    variant="outlined"
                    rounded-0
                    density="compact"
                    label="Date of Birth"
                    prepend-inner-icon="fa-solid fa-calendar-days"
                     
                  />
                </template>
                <v-date-picker
                  v-model="selectedDate"
                  @change="updateDate" 
                  hide-actions
                  :min="new Date(1900, 0, 1)"
                >
                <template v-model="selectedDate" v-slot:header></template>
                </v-date-picker>
              </v-menu>
           </v-container>
        </v-card>
         
       
      </template>

      <template v-slot:item.2>
        <v-card>
          <v-card-title>
            <h3 class="text-h6">Contact Information</h3>
          </v-card-title>
          <v-card-text>
             <v-container class="pt-8">
          
            <v-text-field 
            label="Address" 
            variant="outlined"
            :rules="[rules.required]"
            required
            density="compact"
            >
            </v-text-field>
            <v-text-field 
            label="City" 
            variant="outlined"
            :rules="[rules.required]"
            required
            density="compact"
            >
            </v-text-field>

            <div class="d-flex ga-2">
              <v-text-field 
              label="Province" 
              variant="outlined"
              :rules="[rules.required]"
              required
              density="compact"
              >
              </v-text-field>

              <v-text-field 
              label="Phone Number" 
              variant="outlined"
              :rules="[rules.required]"
              required
              density="compact"
              >
              </v-text-field>
              
            </div>
            <v-text-field 
              label="Email" 
              variant="outlined"
               :rules="[rules.required, rules.email]"
              required
              density="compact"
              >
              </v-text-field>
              <v-text-field 
              label="Postal code" 
              variant="outlined"
              :rules="[rules.required]"
              required
              density="compact"
              >
              </v-text-field>
          </v-container>
          </v-card-text>
          
        </v-card>
      </template>

      <template v-slot:item.3 v-if="props.page === 'registration-portal'">
        <v-card >
          <v-card-title>
            <h3>Confirm</h3>
          </v-card-title>
          <v-card-text>
            <v-checkbox
              label="I accept the terms and conditions"
              value="true"
              :rules="[rules.required]"
              required
            ></v-checkbox>
            <v-text-field
              label="Message"
              v-model="formData.message"
              variant="outlined"
              :rules="[rules.required]"
              required >
            </v-text-field>
          </v-card-text>
        </v-card>   
      </template>
  </v-stepper>
</template>

<script setup>
  import { computed, ref, defineProps, watch } from 'vue'

  const props = defineProps({
    page: {
      type: String,
      required: true
    }
  });
  const step = ref(1)
  const isMenuOpen = ref(false);
  const selectedDate = ref(null);
  const form = ref(null);
  const items = [
    'Bio Data',
    'Contact Information',
    'Submit',
  ]
  const formattedDate = computed(() => {  
   if (!selectedDate.value) return '';
    return new Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }).format(selectedDate.value);
   
  });

  const updateDate = (date) => {
    selectedDate.value = date; 
    isMenuOpen.value = false; 
  };

  const formData = ref({
    firstname: '',
    lastname: '',
    middlename: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    province: '',
    postalCode: '',

  });

const rules = {
  required: (value) => !!value || 'Required.',
  email: (value) => {
    const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    return emailPattern.test(value) || 'Invalid e-mail.';
  },
};

const submitForm = () => {
  if (form.value.validate()) {
    console.log('Form data:', formData.value);
    formData.value = { firstname: '', middlename: '', lastname: '', email: '', message: '' }; 
  }
};
</script>

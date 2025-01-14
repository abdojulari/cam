<template>
  <v-container>
    <v-row>
        <v-col cols="12">
          <v-alert
            color="#003365"
            density="compact"
            icon="mdi-information"
            theme="dark"
          >
          Click 'ADD ANOTHER MINOR' only if adding more than one. The form cannot be left blank. For example, when adding two minors, click 'ADD ANOTHER MINOR' to enter the second, while the first will appear in the table below.
          </v-alert>
        </v-col>
        <v-col cols="12">
          <span class="text-body-1 font-weight-light">Fields marked with an asterisk (*) are required</span>
        </v-col>
    </v-row>
    <v-card class="" variant="flat" >
      <v-card-title>
        <h3>Minor Details</h3>
      </v-card-title>
      <v-card-text>
        <div class="d-flex ga-5 my-3">
            <v-text-field 
              v-model="formData.minorFirstname" 
              label="First Name *" 
              :rules="[props.rules.required, props.rules.firstname]"
              density="compact"
              variant="outlined"
            >
            </v-text-field>
            <v-text-field 
              v-model="formData.minorLastname" 
              label="Last Name *" 
              density="compact"
              :rules="[props.rules.required, props.rules.lastname]"
              variant="outlined"
            >
            </v-text-field>
        </div>
        <div class="d-flex ga-5 my-3">
          <v-text-field 
            v-model="formData.minorMiddlename" 
            label="Middle Name"
            density="compact"
            :rules="[(v: string) => /^[a-zA-Z]*$/.test(v) || 'Only alphabetic characters are allowed']"
            variant="outlined"
          >
          </v-text-field>
 
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
                width="50"
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
        </div>
        <!-- Password details -->
        <div class="d-flex ga-5 my-3">
          <v-text-field
            v-model="formData.password"
            label="Password *"        
            variant="outlined"
            :rules="[props.rules.required, props.rules.password]"
            type="password"
            density="compact"
            hint="Password must be 6-20 characters long, no space or special characters allowed."
            persistent-hint
            :minLength="6"
            :maxLength="20"
          />
          
        </div>
        <div class="">
          <v-text-field
            v-model="formData.confirmPassword"
            label="Confirm Password *"
            variant="outlined"
            :rules="[props.rules.required,confirmPinRules]"
            type="password"
            density="compact"
            :minLength="6"
            :maxLength="20"   
          />
        </div>
      </v-card-text>
    </v-card> 
    <v-container>
      <!-- Add minor button-->
      <v-row class="d-flex justify-between">
        <v-col cols="6" sm="6">
          <v-btn
            v-if="minors.length < 3"  
            variant="flat" 
            color="primary" 
            :disabled="disabled || isMinorInvalid"
            text="Add another minor"
            size="small"
            @click="addMinor"   
            prepend-icon="mdi-plus-circle" 
            class="btn-add-minor" 
          >
          </v-btn>
        </v-col>
        <v-col cols="6" class="d-flex justify-end" v-if="minors.length > 0">
          <v-btn 
            variant="flat"
            :disabled="disabled " 
            color="red" 
            class="ms-5"
            text="Cancel"
            size="small"
            prepend-icon="mdi-minus-circle"
            @click="resetMinorForm"
          />
        </v-col>
      </v-row>
      <!-- Minor list-->
      <v-row v-if="minors.length > 0" class="ma-2">
        <h3 class="text-uppercase font-weight-black">Minors List</h3>
      </v-row>
      <v-row class="px-2">
        <v-card color="primary" variant="outline" elevated border v-if="minors.length > 0">
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
      <!-- End of minor list-->
      <v-row>
  
        <v-col cols="12">
          <v-btn
            v-if="props.formData.radios === 'Adult'"
            :loading="isLoading"
            v-model="minorsContact" 
            @click="sameAsAdult"
            :text="!isLoading && disabled ? 'Saved' : 'Save Changes'"
            :disabled = "isLoading || disabled"
            variant="outlined"
            color="primary"
            prepend-icon="mdi-content-save"
          />
        </v-col>
        <v-col cols="12" v-if="!isLoading && disabled && props.formData.radios === 'Adult'">
          <span class="text-green-darken-4 font-italic font-weight-medium">Record saved successfully!</span>
        </v-col>
      </v-row>
    </v-container> 
    <div v-if="props.formData.radios !== 'Adult'"> 
      <v-switch
        label="Attach minor(s) to your profile"
        v-model="linkMinor"
        @click="connectionHandler"
        :disabled="(!loading && linkDisabled) || disabled"
      >
      </v-switch>
    </div>
    <div class="" v-if="props.formData.radios !== 'Adult'">
        <v-card flat v-if="linkMinor">
        <v-card-title class="mb-2">
          <h3>Link your child(ren) to your profile</h3>
        </v-card-title>
        <v-card-text>
          
        <v-row class="d-flex ga-5 my-2">
          <v-text-field 
            v-model="formData.barcode" 
            label="Barcode" 
            :rules="[props.rules.required]"
            density="compact"
            variant="outlined"
          />
          <v-text-field 
            v-model="formData.pin" 
            label="Password" 
            :rules="[props.rules.required]"
            density="compact"
            variant="outlined"
            type="password"
          />
        </v-row>
        <v-row v-if="!loading && linkDisabled">
          <v-col cols="12">
            <span class="text-green-darken-4 font-italic font-weight-medium">Record saved successfully!</span>
          </v-col>
        </v-row>
        </v-card-text>
        <v-card-actions class="d-flex flex-column align-start justify-start">
          <v-btn 
            variant="flat" 
            color="primary" 
            class="me-2 text-none text-uppercase"
            :disabled="loading || formData.barcode === '' || formData.pin === ''"
            :loading="loading"
            :text="linkDisabled ? 'Saved' : 'Save Changes'"
            @click="loading = !loading"
            prepend-icon="mdi-content-save"
          />
        </v-card-actions>
      </v-card>
      <v-card flat v-if="!linkMinor">
        <v-card-title>
            <h4>Details of Adult responsible for the minor(s)</h4>
        </v-card-title>
        <v-card-text>
          <div class="d-flex ga-5 my-2">
              <v-text-field 
              v-model="formData.adultFirstname" 
              label="First Name" 
              :rules="[props.rules.required, props.rules.firstname]"
              density="compact"
              variant="outlined"
            />
            <v-text-field 
              v-model="formData.adultLastname" 
              label="Last Name" 
              :rules="[props.rules.required, props.rules.lastname]"
              density="compact"
              variant="outlined"
            />
          </div>
          <div class="d-flex ga-5 my-2">
              <v-text-field 
                v-model="formData.adultEmail" 
                label="Email" 
                :rules="[props.rules.required, props.rules.email]"
                density="compact"
                variant="outlined"
              />
              <v-text-field 
                v-model="formData.adultPhone" 
                label="Phone Number" 
                v-maska="'###-###-####'"
                :rules="[props.rules.required, props.rules.phone]"
                density="compact"
                variant="outlined"
              />
          </div>
          <div class="d-flex ga-5 my-2">
            <v-text-field 
              v-model="formData.adultStreet" 
              label="Address" 
              :rules="[props.rules.required]"
              density="compact"
              variant="outlined"
            />
            <v-select
              label="City"
              :items="['Edmonton', 'Enoch']"
              v-model="formData.adultCity" 
              variant="outlined"
              :rules="[props.rules.city]"
              required
              density="compact"
              prepend-inner-icon="mdi-city"
            />
         
          </div>
          <div class="d-flex ga-5 my-2">
            <v-text-field 
              v-model="formData.adultProvince" 
              label="Province" 
              :rules="[props.rules.required, props.rules.province]"
              density="compact"
              variant="outlined"
              readonly
            />
            <v-text-field 
              v-model="formData.adultPostalCode" 
              label="Postcode" 
              :rules="[props.rules.required, props.rules.postalCode]"
              density="compact"
              variant="outlined"
              :maxLength="7"
              @input="onPostalCodeInput"
            />
          </div>
          <v-row v-if="disabled">
            <v-col cols="12">
              <span class="text-green-darken-4 font-italic font-weight-medium">Record saved successfully!</span>
            </v-col>
          </v-row>  
        </v-card-text>
        <v-card-actions class="d-flex flex-column align-start justify-start">
          <v-btn 
            :loading="loader"
            variant="flat" 
            color="primary" 
            class="ml-2"
            :text="disabled ? 'Saved' : 'Save Changes'"
            :disabled="disabled || isInvalid"
            @click="linkAdult"
            prepend-icon="mdi-content-save"
          >
          </v-btn>
        </v-card-actions> 
      </v-card>
    </div>
  </v-container>
</template>
  
<script setup lang="ts">
  import { 
    computed, 
    onMounted, 
    ref, 
    watch 
  } from 'vue';
  import { useRegistrationStore } from '../store/registration-store';
  import { apiService } from '../services/api-service';
  import { minDate } from '../composables/minDate';
  import { vMaska } from "maska/vue"

  import { 
    createMinorRegistrationData, 
    createRegistrationData, 
    sameAsAdultData
  } from '../constants/minor-form-data';

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
  const minors = ref<Minor[]>([]);
  const linkMinor = ref(false);
  const minorsContact = ref(false);
  const isClicked =ref(false);
  const loading = ref(false);
  const isLoading = ref(false);
  const loader = ref(false);
  const barcode = ref('');
  const disabled = ref(false);
  const linkDisabled = ref(false);
  const isInvalid = ref(true);
  const isMinorInvalid = ref(true);
 
  const props = defineProps(['formData', 'rules', 'page', 'bioDataFormValid', 'form']);
  const formData = ref(props.formData);
  let minorId = 0;
  const confirmPinRules = computed(() => {
    return props.formData.confirmPassword !== props.formData.password ? 'Pins do not match' : true;
  });
  onMounted(() => {
    formData.value.confirmPassword = '';
    formData.value.password = '';
    apiService.fetchBarcode().then((item) => {
      barcode.value = item;
    });
  });
  // create watch for loading 
    watch(loading, (value) => {
      if (!value) return;  
      setTimeout(async () => {
        try {
          const body = {
            barcode: props.formData.barcode,
            password: props.formData.pin,
          } as any;
        
          const data = await apiService.authenticate(body);
          if (minors.value.length > 0) {
            minors.value.map(minor => {
              userRegistration.setMinor(createRegistrationData(barcode.value,props.formData, minor, data));
              userRegistration.addRegistration({data:userRegistration.minor});
            });
          }
          userRegistration.setMinor(createRegistrationData(barcode.value,props.formData, undefined, data));
          userRegistration.addRegistration({data:userRegistration.minor});
          isClicked.value = true;   
          loading.value = false; 
          linkDisabled.value = true
          console.log('LOGIN' ,userRegistration.getRegistration)
          return data; 
          } catch (err) {
              return (err as any).message;
          }
      }, 2000);
      
    });

    const isMenuOpen = ref(false);
    const formattedDate = computed(() => {
      if (!props.formData.minorDateOfBirth) return '';
      return new Intl.DateTimeFormat('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      }).format(props.formData.minorDateOfBirth);
    });

    const sameAsAdult = () => {
      isLoading.value = true
      setTimeout(() => {
      
        if (minors.value.length> 0) {
          minors.value.map(minor => {
            userRegistration.setMinor(sameAsAdultData(props.formData, barcode.value, minor));
            userRegistration.addRegistration({data:userRegistration.minor});
          });
        }
      
        userRegistration.setMinor(sameAsAdultData(props.formData, barcode.value));
        userRegistration.addRegistration({data:userRegistration.minor});
        isClicked.value = true;
        disabled.value = true  
        isLoading.value = false
      }, 2000)

      console.log('SAME as :', userRegistration.getRegistration)
    };

    watch(props.formData, (newVal) => {
      isMinorInvalid.value = !newVal.minorFirstname?.trim() ||
                        !newVal.minorLastname?.trim() ||
                        !newVal.minorDateOfBirth ||
                        !newVal.password?.trim() ||
                        !newVal.confirmPassword?.trim();
    }, { deep: true });
    // Add minor to the list
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
        password: props.formData.password,
        confirmPassword: props.formData.confirmPassword,
      });

      userRegistration.setAdditionalMinor(true);
    
      formData.value.minorFirstname = '';
      formData.value.minorLastname = '';
      formData.value.minorMiddlename = '';
      formData.value.minorDateOfBirth = null;
      formData.value.password = '';
      formData.value.confirmPassword = '';
      minorsContact.value = false;
      isClicked.value = false;
    };
    
    // Watch the formData object for changes
    watch(formData.value, (newVal) => {
      isInvalid.value = !newVal.adultFirstname?.trim() ||
                        !newVal.adultLastname?.trim() ||
                        !newVal.adultEmail?.trim() ||
                        !newVal.adultPhone?.trim() ||
                        !newVal.adultStreet?.trim() ||
                        !newVal.adultCity?.trim() ||
                        !newVal.adultProvince?.trim() ||
                        !newVal.adultPostalCode?.trim();
    }, { deep: true });

    // Link adult to the minor
    const linkAdult = () => {
      if (isInvalid.value) {
          return;
      }
      loader.value = true
      setTimeout(() => {
        loader.value = false
        disabled.value = true
      }, 2000)
      if (minors.value.length> 0) {
        minors.value.map(minor => {
          userRegistration.setMinor(createMinorRegistrationData(barcode.value,props.formData,  minor,));
          userRegistration.addRegistration({data:userRegistration.minor});
        });
      }
      userRegistration.setMinor(createMinorRegistrationData(barcode.value,props.formData, undefined));
      isClicked.value = true;
      userRegistration.addRegistration({data:userRegistration.minor});
      console.log('ADULT Contact:', userRegistration.getRegistration)
    }
    // Delete minor from the list
    const deleteMinor = (id: any) => {
      minors.value = minors.value.filter(minor => minor.id !== id);
    };

    const resetMinorForm = () => {
       // Check if minors array is not empty
      if (minors.value.length > 0) {
        // Get the last minor record
        const lastMinor = minors.value[minors.value.length - 1];

        // Populate the form with the last minor's details
        formData.value.minorFirstname = lastMinor.firstname;
        formData.value.minorLastname = lastMinor.lastname;
        formData.value.minorMiddlename = lastMinor.middlename;
        formData.value.minorDateOfBirth = new Date(lastMinor.dateOfBirth);
        formData.value.password = lastMinor.password;
        formData.value.confirmPassword = lastMinor.confirmPassword;

        // Delete the last minor from the list
        deleteMinor(lastMinor.id);
      }
    };
    // Define headers for the data table
    const headers = [
      { title: 'First Name', value: 'firstname' },
      { title: 'Last Name', value: 'lastname' },
      { title: 'Middle Name', value: 'middlename' },
      { title: 'Date of Birth', value: 'dateOfBirth' },
      { title: 'Actions', value: 'actions', sortable: false },
    ];
    
    const connectionHandler = apiService.externalApiCall();
   
    const onPostalCodeInput = (event: { target: { value: string; }; }) => {
      let value = event.target.value || '';
      // Convert the value to uppercase and remove spaces
      value = value.replace(/\s/g, '').toUpperCase();
      // If the first character is not 'T', reject the input
      if (value.length > 0 && value[0] !== 'T') {
          // If the input doesn't start with 'T', clear the input (reject it)
          formData.value.adultPostalCode = ''; // Optionally reset the form data
          event.target.value = ''; // Clear the input field
          return;
      }
      // Only accept up to 6 characters (postal code length)
      if (value.length > 6) {
          value = value.slice(0, 6);
      }
      // Add space after the first 3 characters for formatting (e.g., T1A 1A1)
      if (value.length > 3) {
          value = value.slice(0, 3) + ' ' + value.slice(3, 6);
      }

      formData.value.adultPostalCode = value.trim();
      event.target.value = value;
    };
</script>
<style scoped>
@media (max-width: 600px) {
  .btn-add-minor {
    width: 140px !important;
    color: #fff;
    font-size: 8px;
  }
}
</style> 
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
    <v-row>
      <v-col cols="12">
        <h2 class="text-h6 font-weight-bold ">Minor Details</h2>
      </v-col>
      <v-col cols="12" sm="6">
        <v-text-field 
          v-model="formData.minorFirstname" 
          label="First Name *" 
          :rules="[props.rules.required, props.rules.firstname]"
          density="compact"
          variant="outlined"
        />
        </v-col>  
        <v-col cols="12" sm="6">
          <v-text-field 
            v-model="formData.minorLastname" 
            label="Last Name *" 
            density="compact"
            :rules="[props.rules.required, props.rules.lastname]"
            variant="outlined"
            />
        </v-col>    
        <v-col cols="12" sm="6">
          <v-text-field 
            v-model="formData.minorMiddlename" 
            label="Middle Name"
            density="compact"
            :rules="[(v: string) => /^[a-zA-Z]*$/.test(v) || 'Only alphabetic characters are allowed']"
            variant="outlined"
          />
        </v-col>      
        <v-col cols="12" sm="6">
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
        <v-col cols="12" sm="6">
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
          
        </v-col>
        <v-col cols="12"  sm="6">
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
        </v-col>    
    </v-row>  
    <!-- Add minor button-->
    <v-row class="mb-5">
      <v-col cols="6">
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
      <v-col cols="6" v-if="minors.length > 0">
        <v-btn 
          variant="flat"
          :disabled="disabled " 
          color="red" 
          text="Cancel"
          size="small"
          prepend-icon="mdi-minus-circle"
          @click="resetMinorForm"
          class="me-5 btn-add-minor"
        />
      </v-col>
    </v-row>
    <!-- Minor list-->
    <v-row class="my-5" v-if="minors.length > 0">
      <v-col cols="12" class="">
        <h3 class="text-uppercase font-weight-black">Minors List</h3>
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
 
    <div v-if="props.formData.radios !== 'Adult'"> 
      <v-switch
        label="Attach minor(s) to your profile"
        v-model="linkMinor"
        @click="connectionHandler"
        :disabled="(!loading && linkDisabled && !errorLogin) || (disabled && !errorLogin) "
      >
      </v-switch>
    </div>
    <div class="" v-if="props.formData.radios !== 'Adult'">
        <v-card flat v-if="linkMinor">
        <v-card-title class="mb-2">
          <h3>Link your child(ren) to your EPL card</h3>
        </v-card-title>
        <v-card-text>
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field 
              v-model="formData.barcode" 
              label="Barcode" 
              :rules="[props.rules.required]"
              density="compact"
              variant="outlined"
            />
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field 
              v-model="formData.pin" 
              label="Password" 
              :rules="[props.rules.required]"
              density="compact"
              variant="outlined"
              type="password"
            />
          </v-col>
          
        </v-row>
        <v-row v-if="!loading && linkDisabled && !errorLogin">
          <v-col cols="12">
            <span class="text-green-darken-4 font-italic font-weight-medium">Record saved successfully!</span>
          </v-col>
        </v-row>
        </v-card-text>
        <v-card-actions class="d-flex flex-column align-start justify-start">
          <v-btn 
            variant="flat" 
            color="primary" 
            :disabled="loading || formData.barcode === '' || formData.pin === ''"
            :loading="loading"
            :text="linkDisabled && !errorLogin ? 'Saved' : 'Save Changes'"
            @click="loading = !loading"
            prepend-icon="mdi-content-save"
          />
        </v-card-actions>
        <div class="px-5">
          <p class="font-italic font-weight-medium" v-if="errorLogin"> {{ errorLogin }}</p>
          <span class="font-weight-medium text-red my-5">
            Please click the 'SAVE CHANGES' button to save your progress before proceeding to the 'NEXT' button.
          </span>
        </div>
      </v-card>
      <v-card flat v-if="!linkMinor">
        <v-card-title>
            <h4>Details of Adult responsible for the minor(s)</h4>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field 
                v-model="formData.adultFirstname" 
                label="First Name" 
                :rules="[props.rules.required, props.rules.firstname]"
                density="compact"
                variant="outlined"
              />
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field 
                v-model="formData.adultLastname" 
                label="Last Name" 
                :rules="[props.rules.required, props.rules.lastname]"
                density="compact"
                variant="outlined"
              />
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field 
                v-model="formData.adultEmail" 
                label="Email" 
                :rules="[props.rules.required, props.rules.email]"
                density="compact"
                variant="outlined"
              />
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field 
                v-model="formData.adultPhone" 
                label="Phone Number" 
                v-maska="'###-###-####'"
                :rules="[props.rules.required, props.rules.phone]"
                density="compact"
                variant="outlined"
              />
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field 
                v-model="formData.adultStreet" 
                label="Address" 
                :rules="[props.rules.required]"
                density="compact"
                variant="outlined"
              />
            </v-col>
            <v-col cols="12" sm="6">
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
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field 
                v-model="formData.adultProvince" 
                label="Province" 
                :rules="[props.rules.required, props.rules.province]"
                density="compact"
                variant="outlined"
                readonly
              />
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field 
                v-model="formData.adultPostalCode" 
                label="Postal Code" 
                :rules="[props.rules.required, props.rules.postalCode]"
                density="compact"
                variant="outlined"
                :maxLength="7"
                @input="onPostalCodeInput"
              />
            </v-col>
          </v-row>

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
        <div>
          <p class="px-5 font-weight-bold text-red">Please click the 'SAVE CHANGES' button to save your progress before proceeding to the 'NEXT' button.</p>
        </div>
      </v-card>
    </div>
  </v-container>
</template>
  
<script setup lang="ts">
  import { 
    computed, 
    onMounted, 
    readonly, 
    ref, 
    watch 
  } from 'vue';
  import { useRegistrationStore } from '../store/registration-store';
  import { apiService } from '../services/api-service';
  import { minDate } from '../composables/minDate';
  import { vMaska } from "maska/vue";
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
  const errorLogin = ref();
  const isReadonly = ref(true);

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
          // data returns error notify the user 
          if (data.error) {
            errorLogin.value = 'Invalid barcode or password';
          }

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
    watch([() => isClicked.value, formData.value], ([newIsClicked, newVal]) => {
      isInvalid.value = !newVal.adultFirstname?.trim() ||
                        !newVal.adultLastname?.trim() ||
                        !newVal.adultEmail?.trim() ||
                        !newVal.adultPhone?.trim() ||
                        !newVal.adultStreet?.trim() ||
                        !newVal.adultCity?.trim() ||
                        !newVal.adultProvince?.trim() ||
                        !newVal.adultPostalCode?.trim();
      userRegistration.setLinkState(newIsClicked);
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
      isReadonly.value = false;
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
        isReadonly.value = true;
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
    width: 180px !important;
    color: #fff;
    font-size: 10px;
  }
}
</style> 
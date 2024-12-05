<template>
  <v-container>
    <v-row>
        <v-col cols="12">
          <span class="text-body-1 font-weight-light">Fields marked with an asterisk (*) are required</span>
        </v-col>
    </v-row>
    <v-card class="" variant="flat" >
      <v-card-title>
        <h3>Minor Details</h3>
      </v-card-title>
      <v-card-text>
        <div class="d-flex ga-5">
            <v-text-field 
              v-model="formData.minorFirstname" 
              label="First Name *" 
              :error-messages="erroMessage"
              density="compact"
              variant="outlined"
            >
            </v-text-field>
            <v-text-field 
              v-model="formData.minorLastname" 
              label="Last Name *" 
              :error-messages="erroMessage"
              density="compact"
              variant="outlined"
            >
            </v-text-field>
        </div>
        <div class="d-flex ga-5">
          <v-text-field 
            v-model="formData.minorMiddlename" 
            label="Middle Name"
            :error-messages="erroMessage"
            density="compact"
            variant="outlined"
          >
          </v-text-field>
 
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
              prepend-inner-icon="mdi-calendar"
              :error-messages="erroMessage"
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
        <div class="d-flex ga-5">
          <v-text-field
            v-model="formData.password"
            label="Password"        
            variant="outlined"
            :error-messages="erroMessage"
            type="password"
            density="compact"
          ></v-text-field>
          <v-text-field
            v-model="formData.confirmPassword"
            label="Confirm Password"
            variant="outlined"
            :error-messages="erroMessage"
            :rules="[confirmPinRules]"
            type="password"
            density="compact"   
          ></v-text-field>
        </div>
      </v-card-text>
    </v-card> 
    <v-container>
      <!-- Add minor button-->
      <v-row>
        <v-col class="d-flex justify-end">
          <v-btn  
            variant="flat" 
            color="primary" 
            :disabled="disabled"
            class="ml-2"
            text="Add another minor"
            @click="addMinor"     
          >
          </v-btn>
        </v-col>
      </v-row>
      <!-- Minor list-->
      <v-row v-if="minors.length > 0"><h3 class="text-uppercase">Minors List</h3></v-row>
      <v-row>
        <v-card flat variant="tonal"  v-if="minors.length > 0">
          <v-card-text>
            <v-data-table
              :headers="headers"
              :items="minors"
              item-key="id"
              :hide-default-footer="true"
            > 
              <template v-slot:headers="{ columns,toggleSort }">
                <tr>
                  <template v-for="column in columns" :key="column.key">
                    <th>
                      <span class="mr-2 cursor-pointer" @click="() => toggleSort(column)">{{ column.title }}</span>
                    </th>
                  </template>
                </tr>
              </template>
              <template v-slot:item.actions="{ item }">
                <v-btn @click="deleteMinor(item.id)" density="compact" icon="mdi-delete"></v-btn>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-row>
      <!-- End of minor list-->
        <v-checkbox 
          v-model="minorsContact" 
          @click="sameAsAdult"
          v-if="props.formData.radios === 'Adult'"
        >
          <template v-slot:label>
            <div class="text-body-2">
              Contact Information same as Adult
            </div>
          </template>
        </v-checkbox>
    </v-container> 
    <div v-if="props.formData.radios !== 'Adult'"> 
      <v-switch
        label="Attach minor(s) to your profile"
        v-model="linkMinor"
        @click="connectionHandler"
      >
      </v-switch>
    </div>
    <div class="" v-if="props.formData.radios !== 'Adult'">
        <v-card flat v-if="linkMinor">
        <v-card-title class="mb-2">
          <h3>Link your child(ren) to your profile</h3>
        </v-card-title>
        <v-card-text>
          
        <v-row class="d-flex ga-5">
          <v-text-field 
            v-model="formData.barcode" 
            label="Barcode" 
            :rules="[props.rules.required]"
            density="compact"
            variant="outlined"
          ></v-text-field>
          <v-text-field 
            v-model="formData.pin" 
            label="Password" 
            :rules="[props.rules.required]"
            density="compact"
            variant="outlined"
            type="password"
            >
          </v-text-field>
        </v-row>
        </v-card-text>
        <v-card-actions class="d-flex flex-column align-start justify-start">
          <v-btn 
            variant="flat" 
            color="primary" 
            class="me-2  text-none text-uppercase"
            :disabled="loading || formData.barcode === '' || formData.pin === ''"
            :loading="loading"
            @click="loading = !loading"
            >
              Save Changes
            </v-btn>
        </v-card-actions>
      </v-card>
      <v-card flat v-if="!linkMinor">
        <v-card-title>
            <h4>Details of Adult responsible for the minor(s)</h4>
        </v-card-title>
        <v-card-text>
          <div class="d-flex ga-5">
              <v-text-field 
              v-model="formData.adultFirstname" 
              label="First Name" 
              :rules="[props.rules.required, props.rules.firstname]"
              density="compact"
              variant="outlined"
            ></v-text-field>
            <v-text-field 
              v-model="formData.adultLastname" 
              label="Last Name" 
              :rules="[props.rules.required, props.rules.lastname]"
              density="compact"
              variant="outlined"
            ></v-text-field>
          </div>
          <div class="d-flex ga-5">
                <v-text-field 
                v-model="formData.adultEmail" 
                label="Email" 
                :rules="[props.rules.required, props.rules.email]"
                density="compact"
                variant="outlined"
              ></v-text-field>
              <v-text-field 
                v-model="formData.adultPhone" 
                label="Phone Number" 
                v-maska="'(###) ###-####'"
                :rules="[props.rules.required, props.rules.phone]"
                density="compact"
                variant="outlined"
              ></v-text-field>
          </div>
          <div class="d-flex ga-5">
            <v-text-field 
            v-model="formData.adultStreet" 
            label="Street" 
            :rules="[props.rules.required]"
            density="compact"
            variant="outlined"
          ></v-text-field>
          <v-select
            label="City"
            :items="['Edmonton', 'Enoch']"
            v-model="formData.adultCity" 
            variant="outlined"
            :rules="[props.rules.city]"
            required
            density="compact"
            prepend-inner-icon="mdi-city"
          ></v-select>
          <v-text-field 
            v-model="formData.adultProvince" 
            label="Province" 
            :rules="[props.rules.required, props.rules.province]"
            density="compact"
            variant="outlined"
            readonly
          ></v-text-field>
          </div>
          
          <v-text-field 
            v-model="formData.adultPostalCode" 
            label="Postcode" 
            :rules="[props.rules.required, props.rules.postalCode]"
            density="compact"
            variant="outlined"
            width="100"
          ></v-text-field>
        </v-card-text>
        <v-card-actions class="d-flex flex-column align-start justify-start">
          <v-btn 
            :loading="loader"
            variant="flat" 
            color="primary" 
            class="ml-2"
            :text="disabled ? 'Saved' : 'Save Changes'"
            :disabled="disabled || adultFormData.isInvalid"
            @click="linkAdult"
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
  const erroMessage = ref('');
  const disabled = ref(false);
 
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
          console.log(userRegistration.getRegistration)
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
        isLoading.value = false
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
      }, 2000)
      
      console.log(userRegistration.getRegistration)
    };
    // Add minor to the list
    const addMinor = () => {
      if (!props.formData.minorFirstname || !props.formData.minorLastname || !props.formData.minorMiddlename || !props.formData.minorDateOfBirth) {
        erroMessage.value = 'Please fill in all the fields';
        return;
      }  
      erroMessage.value = '';
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
    
    const adultFormData = {
      isInvalid: !props.formData.adultFirstname || 
        !props.formData.adultLastname || !props.formData.adultEmail || 
        !props.formData.adultPhone || !props.formData.adultStreet || 
        !props.formData.adultCity || !props.formData.adultProvince ||
        !props.formData.adultPostalCode
    }
    // Link adult to the minor
    const linkAdult = () => {
      if (adultFormData.isInvalid) {
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
      console.log(userRegistration.getRegistration)
    }
    // Delete minor from the list
    const deleteMinor = (id: any) => {
      minors.value = minors.value.filter(minor => minor.id !== id);
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

</script>
  
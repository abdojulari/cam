<template>
    <v-card class="" flat >
      <v-card-title>
        <h3>Minor Details</h3>
      </v-card-title>
      <v-card-text>
        <div class="d-flex ga-5">
            <v-text-field 
              v-model="formData.minorFirstname" 
              label="First Name" 
              :rules="rules.required"
              density="compact"
              variant="outlined"
            >
            </v-text-field>
            <v-text-field 
              v-model="formData.minorLastname" 
              label="Last Name" 
              :rules="rules.required"
              density="compact"
              variant="outlined"
            >
            </v-text-field>
        </div>
        <div class="d-flex ga-5">
          <v-text-field 
            v-model="formData.minorMiddlename" 
            label="Middle Name"
            :rules="rules.required"
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
              prepend-inner-icon="fa-solid fa-calendar-days"
            />
          </template>
          <v-date-picker
            v-model="formData.minorDateOfBirth"
            @update:model-value="isMenuOpen = false"
            hide-actions
            :min="new Date(1900, 0, 1)"
          ></v-date-picker>
          </v-menu>
        </div>
        <!-- Password details -->
        <div class="d-flex ga-5">
          <v-text-field
            v-model="formData.password"
            label="Pin/Password"        
            variant="outlined"
            :rules="[rules.required]"
            type="password"
            density="compact"
            required
          ></v-text-field>
          <v-text-field
            v-model="formData.confirmPassword"
            label="Confirm Pin/Password"
            variant="outlined"
            :rules="[rules.required, confirmPinRules]"
            type="password"
            density="compact"
            required
          ></v-text-field>
        </div>
        <v-checkbox 
          v-model="minorsContact" 
          @click="sameAsAdult"
          v-if="props.formData.radios === 'Adult'"
        >
          <template v-slot:label>
            <div class="text-body-2">
              Contact Information same as Adult
            </div>
            <span class="text-body-2"> Note: Each time you add a minor, you have to check "Contact Information same as Adult" </span>
          </template>
        </v-checkbox>
      </v-card-text>
    </v-card>  
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
        <v-card-title>
          <h3 class="text-uppercase">Link your child(ren) to your profile</h3>
        </v-card-title>
        <v-card-text>
          
        <div class="d-flex ga-5">
          <v-text-field 
            v-model="formData.barcode" 
            label="Barcode" 
            :rules="rules.required"
            density="compact"
            variant="outlined"
            
          ></v-text-field>
          <v-text-field 
            v-model="formData.pin" 
            label="Pin/Password" 
            :rules="rules.required"
            density="compact"
            variant="outlined"
            type="password"
            width="35%">
          </v-text-field>
        </div>
        </v-card-text>
        <v-card-actions>
          <v-btn 
            variant="flat" 
            color="primary" 
            class="ml-2 text-none text-uppercase"
            :disabled="loading"
            :loading="loading"
            @click="loading = !loading"
            >
              Link
            </v-btn>
            <span class="text-body-2"> Note: Each time you add a minor, you have to click on Link button</span>
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
              :rules="rules.required"
              density="compact"
              variant="outlined"
            ></v-text-field>
            <v-text-field 
              v-model="formData.adultLastname" 
              label="Last Name" 
              :rules="rules.required"
              density="compact"
              variant="outlined"
            ></v-text-field>
          </div>
          <div class="d-flex ga-5">
                <v-text-field 
                v-model="formData.adultEmail" 
                label="Email" 
                :rules="[rules.required, rules.email]"
                density="compact"
                variant="outlined"
              ></v-text-field>
              <v-text-field 
                v-model="formData.adultPhone" 
                label="Phone Number" 
                :rules="rules.required"
                density="compact"
                variant="outlined"
              ></v-text-field>
          </div>
          <div class="d-flex ga-5">
            <v-text-field 
            v-model="formData.adultStreet" 
            label="Street" 
            :rules="rules.required"
            density="compact"
            variant="outlined"
          ></v-text-field>
          <v-text-field 
            v-model="formData.adultCity" 
            label="City" 
            :rules="rules.required"
            density="compact"
            variant="outlined"
          ></v-text-field>
          <v-text-field 
            v-model="formData.adultProvince" 
            label="Province" 
            :rules="rules.required"
            density="compact"
            variant="outlined"
          ></v-text-field>
          </div>
          
          <v-text-field 
            v-model="formData.adultPostalCode" 
            label="Postcode" 
            :rules="rules.required"
            density="compact"
            variant="outlined"
            width="100"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn 
            variant="flat" 
            color="primary" 
            class="ml-2"
            text="Link Unregistered Adult"
            @click="linkAdult"
          >
          </v-btn>
          <span class="text-body-2"> Note: Each time you add a minor, you have to click on "Link unregistered Adult" button</span>
        </v-card-actions> 
      </v-card>
    </div>
    <v-container>
      <!-- Add minor button-->
      <v-row>
        <v-col class="d-flex justify-end">
          <v-btn  
            variant="flat" 
            color="primary" 
            class="ml-2"
            text="Add additional minor"
            @click="addMinor"
            :disabled="!isClicked"
          >
          </v-btn>
        </v-col>
      </v-row>
      <!-- Minor list-->
      <v-row>
        <v-card flat  v-if="minors.length > 0">
      <v-card-title>
        <h3 class="text-uppercase">Minors List</h3>
      </v-card-title>
      <v-card-text>
        <v-data-table
          :headers="headers"
          :items="minors"
          item-key="id"
          :hide-default-footer="true"
        >
          <template v-slot:item.actions="{ item }">
            <v-btn icon @click="deleteMinor(item.id)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </v-card-text>
        </v-card>
      </v-row>
      <!-- End of minor list-->
    </v-container>
</template>
  
<script setup lang="ts">
  import { computed, onMounted, ref, watch } from 'vue';
  import { useRegistrationStore } from '../store/registration-store';

  interface Minor {
    id: number;
    firstname: string;
    lastname: string;
    middlename: string;
    dateOfBirth: string;
  }
  const userRegistration = useRegistrationStore();
  const minors = ref<Minor[]>([]);
  const linkMinor = ref(false);
  const minorsContact = ref(false);
  const isClicked =ref(false);
  const loading = ref(false);
  const props = defineProps({
    formData: {
      type: Object,
      required: true,
    },
    rules: {
      type: Object,
      required: true,
    },
  });
  let minorId = 0;
  const confirmPinRules = computed(() => {
    return props.formData.confirmPassword !== props.formData.password ? 'Pins do not match' : true;
  });
  onMounted(() => {
    props.formData.confirmPassword = '';
    props.formData.password = '';
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
        // Send a POST request to the external API route
       const response = await fetch('/api/authenticate', {
            method: 'POST',
            body: JSON.stringify(body), 
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json', 
            },
        });
        const data = await response.json();
        userRegistration.setMinor({  
            biodata: {
              firstname: props.formData.minorFirstname,
              lastname: props.formData.minorLastname,
              middlename: props.formData.minorMiddlename,
              dateofbirth: (props.formData.minorDateOfBirth).toISOString().split('T')[0],
            },
            contact: {
              street: data.address?.street,
              city: data.address?.city,
              province: data.address?.province,
              phone: data.address?.phone,
              email: data.address?.email,
              postalcode: data.address?.postalCode,
            },
            careof: data.address?.careOf,
            profile: props.formData.radios,
            radioSelection: props.formData.radios,
            password: props.formData.password,
            confirmPassword: props.formData.confirmPassword,
            barcode: props.formData.barcode,
        })
        loading.value = false; 
        userRegistration.addRegistration({data:userRegistration.minor});
        isClicked.value = true;   
        return await response.json(); 
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
      userRegistration.setMinor({
          biodata: {
            firstname: props.formData.minorFirstname,
            lastname: props.formData.minorLastname,
            middlename: props.formData.minorMiddlename,
            dateofbirth: (props.formData.minorDateOfBirth).toISOString().split('T')[0],
          },
          contact: {
            street: props.formData.street,
            city: props.formData.city,
            province: props.formData.province,
            phone: props.formData.phone,
            email: props.formData.email,
            postalcode: props.formData.postalCode,
          },
          careof: `${props.formData.firstname} ${props.formData.lastname}`,
          profile: props.formData.radios,
          radioSelection: props.formData.radios,
          password: props.formData.password,
          confirmPassword: props.formData.confirmPassword,
          barcode: props.formData.barcode,
      });
    
      isClicked.value = true;
      userRegistration.addRegistration({data:userRegistration.minor});
      console.log('same as adult:', userRegistration.minor);
    };
    // Add minor to the list
    const addMinor = () => {
      if (!props.formData.minorFirstname || !props.formData.minorLastname || !props.formData.minorMiddlename || !props.formData.minorDateOfBirth) {
        return;
      }  
      minors.value.push({
        id: ++minorId,
        firstname: props.formData.minorFirstname,
        lastname: props.formData.minorLastname,
        middlename: props.formData.minorMiddlename,
        dateOfBirth: formattedDate.value,
      });

      userRegistration.setAdditionalMinor(true);
    
      props.formData.minorFirstname = '';
      props.formData.minorLastname = '';
      props.formData.minorMiddlename = '';
      props.formData.minorDateOfBirth = null;
      props.formData.password = '';
      props.formData.confirmPassword = '';
      minorsContact.value = false;
      isClicked.value = false;
    };
    // Link adult to the minor
    const linkAdult = () => {
      if (!props.formData.adultFirstname || 
        !props.formData.adultLastname || !props.formData.adultEmail || 
        !props.formData.adultPhone || !props.formData.adultStreet || 
        !props.formData.adultCity || !props.formData.adultProvince ||
        !props.formData.adultPostalCode) {
          return;
      }
      userRegistration.setMinor({
        biodata: {
          firstname: props.formData.minorFirstname,
          lastname: props.formData.minorLastname,
          middlename: props.formData.minorMiddlename,
          dateofbirth: (props.formData.minorDateOfBirth).toISOString().split('T')[0],
        },
        contact: {
          street: props.formData.adultStreet,
          city: props.formData.adultCity,
          province: props.formData.adultProvince,
          phone: props.formData.adultPhone,
          email: props.formData.adultEmail,
          postalcode: props.formData.adultPostalCode,
        },
        careof: `${props.formData.adultFirstname} ${props.formData.adultLastname}`,
        profile: props.formData.radios,
        radioSelection: props.formData.radios,
        password: props.formData.password,
        confirmPassword: props.formData.confirmPassword,
        barcode: props.formData.barcode,
      });
      isClicked.value = true;
      userRegistration.addRegistration({data:userRegistration.minor});
      console.log('Link unregistered Adult:', userRegistration.minor);
    }
    // Delete minor from the list
    const deleteMinor = (id: any) => {
      minors.value = minors.value.filter(minor => minor.id !== id);
    };
    // Define headers for the data table
    const headers = [
      { text: 'First Name', value: 'firstname' },
      { text: 'Middle Name', value: 'middlename' },
      { text: 'Last Name', value: 'lastname' },
      { text: 'Gender', value: 'gender' },
      { text: 'Date of Birth', value: 'dateOfBirth' },
      { text: 'Actions', value: 'actions', sortable: false },
    ];
    
    const connectionHandler = () => {
      try {
          fetch('/api/external-api', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
          });
      } catch (err) {
            const error = (err as any).message; // Handle errors
            console.log('ERROR:', error);
      }
    }

</script>
  
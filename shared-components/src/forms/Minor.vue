<template>
    <v-card class="my-5" flat >
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
      </v-card-text>
      <v-card-actions>
        <v-btn  
          variant="flat" 
          color="primary" 
          class="ml-2"
          text="Add additional minor"
           @click="addMinor"
        >
        </v-btn>
      </v-card-actions>
    </v-card>
    
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
  <v-divider :thickness="2" class="border-opacity-100 my-5" color="primary"></v-divider>
  <div> 
    <v-checkbox
      label="Attach minor(s) to your profile"
      v-model="linkMinor"
      @click="connectionHandler"
    >
    </v-checkbox>
  </div>
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
      ></v-text-field>
    </v-card-text>
  </v-card>   
</template>
  
<script setup lang="ts">
  import { computed, ref, watch } from 'vue';
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
  let minorId = 0;
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

  // create watch for loading 
  watch(loading, (value) => {
    if (!value) return;  
    setTimeout(async () => {
      // new approach 
      try {
        // Construct the body with login and password
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
        console.log('RESPONSE:', response.json());
        loading.value = false;
        
        return await response.json(); 
        } catch (err) {
            return (err as any).message; // Handle any errors

        }
      // end of new approach
     
    }, 2000);
    
  });

  const isMenuOpen = ref(false);
   // Format the date for display
   const formattedDate = computed(() => {
    if (!props.formData.MinorDateOfBirth) return '';
    return new Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }).format(props.formData.minorDateOfBirth);
  });

  // Add minor to the list
  const addMinor = () => {
    if (!props.formData.minorFirstname || !props.formData.minorLastname || !props.formData.minorMiddlename || !props.formData.minorDateOfBirth) {
      return; // Prevent adding if fields are empty
    }
  
    minors.value.push({
      id: ++minorId,
      firstname: props.formData.minorFirstname,
      lastname: props.formData.minorLastname,
      middlename: props.formData.minorMiddlename,
      dateOfBirth: formattedDate.value,
    });

    
    userRegistration.addBioData({
      firstname: props.formData.minorFirstname,
      lastname: props.formData.minorLastname,
      middlename: props.formData.minorMiddlename,
      dateofbirth: props.formData.minorDateOfBirth,
    });
    console.log('Minor submitted:', props.formData.value);
        
    // Reset form fields after adding
    props.formData.minorFirstname = '';
    props.formData.minorLastname = '';
    props.formData.minorMiddlename = '';
    props.formData.minorDateOfBirth = null;
  };

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
  
<template>
     <!-- Main Dialog -->
     <v-dialog
        v-model="showDialog"
        max-width="600"
        persistent
      >
        <v-card
          title="Notification"
          subtitle="Please check the following customer(s)."
          class="pa-5"
          flat
        >
        <div v-if="successData.length > 0" class="w-100">
            <div v-for="(entry, index) in successData" :key="index" class="mb-1 text-success ml-5">
                <span class="text-body-2 text-success pa-2 w-100">
                  <v-icon class="mr-3">mdi-check-circle</v-icon>
                  <strong>{{ entry?.name }}</strong> - {{ entry?.barcode }}
                </span>
            </div>
        </div>
        <div v-if="failedData.length > 0" class="w-100">
            <div v-for="(entry, index) in failedData" :key="index" class="mb-1 text-error ml-5">
                <span class="text-body-2 text-error pa-2 w-100">
                  <v-icon class="mr-3">mdi-close-circle</v-icon>
                  <strong>{{ entry?.message }}</strong>
                </span>
            </div>
        </div>
         <!-- Error message below the card/buttons -->
        <div v-if="errorMessage" class="pa-4 text-center mt-2">
          <p class="text-error ma-0">
            You can't override this record. User already exists!
          </p> 
          <span class="text-body-2 italic">This message is coming from ILS. Click the close button to exit the application.</span>
        </div>
          <template v-slot:actions>
            <v-spacer></v-spacer>
            <div class="d-flex">
              <v-btn 
                class="text-capitalize bg-orange text-white rounded-pill mr-5" 
                @click="closeDialog"
              > 
                <v-icon>mdi-close-circle</v-icon>Close 
              </v-btn>
              <v-btn 
                v-if="failedData.length > 0"
                class="text-capitalize bg-green-darken-1 text-white rounded-pill" 
                @click="overrideDuplicateAlert"
                :loading="isLoading"
                :disabled="isLoading"
              > 
                <v-icon>mdi-find-replace</v-icon>Override 
              </v-btn>
        </div>
          </template>
        </v-card>
      </v-dialog>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { apiService } from '@cam/shared-components/services/api-service';
const router = useRouter();

const props = defineProps({
    data: {
        type: Array,
        required: true
    },
    failedData: {
        type: Array,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: String,
        required: true
    },
    formData: {
        type: Object,
        required: false,
        default: () => ({})
    }
})
const overrideStatus = ref(false);
const errorMessage = ref('');
const isLoading = ref(false);
const successData = props.data as any;
const failedData = props.failedData as any;
// Computed property to control dialog visibility
const showDialog = ref(successData.length > 0 || failedData.length > 0);
// add close button to the dialog
const closeDialog = () => {
    showDialog.value = false; 
    // clear the data
    successData.splice(0, successData.length);
    failedData.splice(0, failedData.length);
    // redirect to the home page
    router.push('/');
}

const overrideDuplicateAlert = async () => {
    isLoading.value = true;
    const payloads = props.formData;
    try {
      if (payloads.minors.length > 0) {
      payloads.minors.forEach(async (payload: any) => {
        const response = await apiService.overrideDuplicate({
          firstname: payload?.firstName,
              lastname: payload?.lastName,
              middlename: payload?.middleName,
              dateofbirth: payload?.dateOfBirth,
              library: payload?.library,
              address: payload?.address,
              city: payload?.city,
              province: payload?.province,
              postalcode: payload?.postalCode,
              phone: payload?.phoneNumber,
              email: payload?.emailAddress,
              profile: payload?.profileType,
              password: payload?.password,
              confirmPassword: payload?.confirmPassword,
              careof: payload?.careOf,
              category5: payload?.selectedEmailConsent ? payload?.selectedEmailConsent : 'ENOCONSENT',
              preferredname: payload?.preferredName,
              usepreferredname: payload?.usePreferredName,
              emailconsent: payload?.selectedEmailConsent,
              indigenousstatus: payload?.selectedIndigenousStatus,
              address2: payload?.address2,
              city2: payload?.city2,
              province2: payload?.province2,
              postalcode2: payload?.postalCode2,  
              barcode: payload?.libraryCardBarcode,
              category1: payload?.selectedIndigenousStatus ? 'ONRES_SET' : '',
              source: 'CRP'
        });
        console.log('response before try', response);
        try {
          if (response?.message === "Override status set successfully.") {
            console.log('Child form submitted successfully', response);
            overrideStatus.value = true;
          }
          else {
            console.log('Record not submitted', response?.message);
            errorMessage.value = response?.message;
          }
    
        } catch (error) {
          console.error(error);
        }
      });
    }
    isLoading.value = false;
    } catch (error) {
      isLoading.value = false;
      console.error(error);
    }
   
    try {
      isLoading.value = true;
      const response = await apiService.overrideDuplicate({
        firstname: payloads?.firstName,
              lastname: payloads?.lastName,
              middlename: payloads?.middleName,
              dateofbirth: payloads?.dateOfBirth,
              library: payloads?.library,
              address: payloads?.address,
              city: payloads?.city,
              province: payloads?.province,
              postalcode: payloads?.postalCode,
              phone: payloads?.phoneNumber,
              email: payloads?.emailAddress,
              profile: payloads?.profileType,
              password: payloads?.password,
              confirmPassword: payloads?.confirmPassword,
              careof: payloads?.careOf,
              category5: payloads?.selectedEmailConsent ? payloads?.selectedEmailConsent : 'ENOCONSENT',
              preferredname: payloads?.preferredName,
              usepreferredname: payloads?.usePreferredName,
              emailconsent: payloads?.selectedEmailConsent,
              indigenousstatus: payloads?.selectedIndigenousStatus,
              address2: payloads?.address2,
              city2: payloads?.city2,
              province2: payloads?.province2,
              postalcode2: payloads?.postalCode2,  
              barcode: payloads?.libraryCardBarcode,
              category1: payloads?.selectedIndigenousStatus ? 'ONRES_SET' : '',
              source: 'CRP'
      });
         if (response?.message === "Override status set successfully.") {
         console.log('Record submitted successfully', response);
         isLoading.value = false;
         overrideStatus.value = true;
         closeDialog();
       } else {
         console.log('Record not submitted', response?.message);
         isLoading.value = false;
         errorMessage.value = response?.message;
       }
    
    } catch (error) {
      isLoading.value = false;
      console.error(error);
   }
    
    // const response = await apiService.overrideDuplicate({
    //   // Pass all form data to the backend
    //   ...props.formData,
    //   firstname: props.firstname,
    //   lastname: props.lastname,
    //   dateofbirth: props.dateOfBirth,
    //   status: true
    // });

    //console.log(response);
    //router.push('/');
}

</script>
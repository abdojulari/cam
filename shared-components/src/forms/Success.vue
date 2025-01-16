<template>
  <v-container class="pa-6 bg-white  max-width-4xl mt-10 mx-auto">
    <v-row>
      <v-col cols="12">
        <div class="text-h4 font-weight-semibold mb-4">
          Congratulations!
        </div>
      </v-col>
      <v-col cols="12">
        <v-divider 
          class="border-opacity-100" 
          :thickness="3" 
          color="orange-lighten-1"
        />
      </v-col>
      <v-col cols="12">
        <p class="text-body-1">
          You have successfully completed your account registration.
        </p>
        <p class="text-body-1 font-weight-bold mb-4">
          Please check your inbox for your library card.
        </p>
        <v-btn 
          class="font-weight-bold text-body-1 text-primary" 
          color="primary"
          variant="outlined"
          @click="showDialog"
        >
          Print your profile
      </v-btn>
      </v-col>

      <v-col cols="12">
        <div 
          variant="body1" 
          class="text-body-1 mb-4"
        >
          Start placing holds before coming in by registering with 
          <a 
            href="https://epl.bibliocommons.com/user/registration" 
            class="text-body-1 font-weight-bold text-primary"
            target="_blank"
          >
            My EPL Account
          </a>
        </div>
      </v-col>

      <v-col cols="12">
        <div 
          variant="body1" 
          class="text-body-1 mb-6"
        >
          You will need to bring proof of address and picture ID to an 
          <a 
            class="text-body-1 font-weight-bold text-primary"
            href="https://epl.bibliocommons.com/v2/locations"
            target="_blank"
          >
            EPL location
          </a> to begin 
          physical borrowing and to extend your membership from 45 days to as long as you live 
          in Edmonton. As a bonus, you'll receive a FREE tote bag when you visit us the first time!
        </div>
      </v-col>

      <v-col cols="12">
        <div 
          variant="h2" 
          class="text-h5 font-weight-bold mb-2"
        >
          Ready to get started?
        </div>
      </v-col>

      <v-col cols="12">
        <a 
          href="https://epl.bibliocommons.com/user/login?destination=%2Fdashboard%2Fuser_dashboard" 
          color="success" 
          class="py-3 px-10 text-lg font-weight-bold text-white rounded-lg bg-success"
        >
          Log In
        </a>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="3">
        <div>
          <a href="https://itunes.apple.com/ca/app/epl-mobile/id390969843?mt=8">
            <v-img 
              src="~/assets/images/eplappphone.png" 
              alt="EPL Mobile App"
              :width="200"
            />
          </a>
        </div>
      </v-col>
      <v-col cols="9">
        <div>
          <h2 
            class="text-h5 font-weight-bold mb-1"
          >
            Get the EPL Mobile App
          </h2>
          <div 
            variant="body1" 
            class="text-body-1 mb-4"
          >
            With the EPL Mobile app, you can keep the library in your pocket! It makes your phone a scannable library card and lets you find and discover titles, manage your account, and get branch information.
          </div>
          <br>
          <span class="text-body-1 font-weight-bold"> Download it now!</span>
        </div>
        <div class="d-flex my-5">
          <a href="">
            <v-img 
              src="~/assets/images/app_Store_Badge.svg" 
              alt="QR Code" 
              :width="200" 
            />
            <div v-if="appleDataUrl">
              <v-img 
                :src="appleDataUrl" 
                alt="Generated QR Code" 
              />
            </div>
          </a>
          <v-spacer />
          <a href="">
            <v-img 
              src="~/assets/images/Get_it_on_Google_play.svg" 
              alt="QR Code" 
              :width="200" 
            />
            <div v-if="googleDataUrl">
              <v-img 
                :src="googleDataUrl" 
                alt="Generated QR Code" 
              />
            </div>
          </a>
        </div>
      </v-col>
    </v-row>
  </v-container>
  <div class="text-center pa-4">
    <v-dialog
      v-model="dialog"
      transition="dialog-bottom-transition"
      fullscreen
    >
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn
          prepend-icon="mdi-cog"
          size="small"
          text="Settings"
          v-bind="activatorProps"
        ></v-btn>
      </template>

      <v-card >
        <v-toolbar>
          <v-btn
            icon="mdi-close"
            @click="dialog = false"
          ></v-btn>

          <v-toolbar-title>EPL - Online Registration</v-toolbar-title>

          <v-spacer></v-spacer>

          <v-toolbar-items>
            <v-btn
              text="print"
              variant="text"
              @click="printPreview"
            ></v-btn>
          </v-toolbar-items>
        </v-toolbar>


        <v-card-title class="text-h5 text-center">Registration Summary</v-card-title>
        <v-card-text class="form-preview mx-auto" flat>
          <div v-if="registration.length">
            <v-row v-for="(entry, index) in registration" :key="index" class="mb-4">
              <v-col cols="12">
                <div class="mb-4">
                  <span v-if="registration.length > 1" class="text-h6">Record {{ index + 1 }}</span>
                  <v-divider class="my-4"></v-divider>
                </div>

                <!-- Biodata Section -->
                <div class="mb-4">
                  <div class="pa-2 my-2 text-h6 bg-blue">Biodata</div>
                  <v-row>
                    <v-col cols="12" md="6" class="mb-2">
                      <span><strong>First Name:</strong> {{ entry.data.biodata.firstname }}</span>
                    </v-col>
                    <v-col cols="12" md="6" class="mb-2">
                      <span><strong>Last Name:</strong> {{ entry.data.biodata.lastname }}</span>
                    </v-col>
                    <v-col cols="12" md="6" class="mb-2">
                      <span><strong>Middle Name:</strong> {{ entry.data.biodata.middlename }}</span>
                    </v-col>
                    <v-col cols="12" md="6" class="mb-2">
                      <span><strong>Date of Birth:</strong> {{ entry.data.biodata.dateofbirth }}</span>
                    </v-col>
                  </v-row>
                  <v-divider class="my-4"></v-divider>
                </div>

                <!-- Contact Section -->
                <div class="mb-4">
                  <div class="pa-2 my-2 text-h6 bg-blue">Contact</div>
                  <v-row>
                    <v-col cols="12" md="6" class="mb-2">
                      <span><strong>Street:</strong> {{ entry.data.contact.street }}</span>
                    </v-col>
                    <v-col cols="12" md="6" class="mb-2">
                      <span><strong>City:</strong> {{ entry.data.contact.city }}</span>
                    </v-col>
                    <v-col cols="12" md="6" class="mb-2">
                      <span><strong>Province:</strong> {{ entry.data.contact.province }}</span>
                    </v-col>
                    <v-col cols="12" md="6" class="mb-2">
                      <span><strong>Postal Code:</strong> {{ entry.data.contact.postalcode }}</span>
                    </v-col>
                    <v-col cols="12" md="6" class="mb-2">
                      <span><strong>Phone:</strong> {{ entry.data.contact.phone }}</span>
                    </v-col>
                    <v-col cols="12" md="6" class="mb-2">
                      <span><strong>Email:</strong> {{ entry.data.contact.email }}</span>
                    </v-col>
                  </v-row>
                  <v-divider class="my-4"></v-divider>
                </div>

                <!-- Library Card Section -->
                <div class="mb-4">
                  <div class="pa-2 my-2 text-h6 bg-blue">Library Card</div>
                  <span>{{ entry.data.barcode }}</span>
                  <v-divider class="my-4"></v-divider>
                </div>

                <!-- Care Of Section -->
                <div v-if="entry.data.careof">
                  <div class="pa-2 my-2 text-h6 bg-blue">Care Of</div>
                  <span>{{ entry.data.careof }}</span>
                </div>
              </v-col>
            </v-row>
          </div>

          <v-alert v-if="!registration.length" type="info" class="mt-3">
            No registrations available.
          </v-alert>
        </v-card-text>

        <v-card-actions>
          <v-btn @click="printPreview" color="primary">Print Preview</v-btn>
        </v-card-actions>
        
      </v-card>
    </v-dialog>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as QRCode from 'qrcode'
import { useRegistrationStore } from '../store/registration-store';

const registrationStore = useRegistrationStore();
const registration = registrationStore.getRegistration;
const dialog = ref(false)

const appleDataUrl = ref<string >()
const googleDataUrl = ref<string>()
// Async function to generate the QR code from URL
const generateQRCode = async (url: string) => {
  if (url) {
    try {
      const dataUrl = await QRCode.toDataURL(url)  // Generate QR code as a Data URL
      return dataUrl
    } catch (error) {
      console.error('Error generating QR code:', error)
    }
  }
}

// Generate the QR code when the component is mounted
onMounted(async () => {
  const googleUrl = 'https://play.google.com/store/apps/details?id=com.bibliocommons.epl&hl=en'
  googleDataUrl.value = await generateQRCode(googleUrl) 
  
  // URL for the App Store
  const appleUrl = 'https://itunes.apple.com/ca/app/epl-mobile/id390969843?mt=8'
  appleDataUrl.value = await generateQRCode(appleUrl)
})

// turn on the dialog
const showDialog = () => {
  dialog.value = true
}
const printPreview = () => {
  window.print();
};
</script>

<style scoped>
img {
  margin-top: 20px;
  max-width: 200px;
  height: auto;
}
.form-preview {
  padding: 20px;
}

@media print {
  .form-preview {
    background: #fff;
    box-shadow: none;
  }
}
</style>
<template>
  <v-container class="pa-10 bg-white mt-10 mx-auto px-10 px-md-6" style="max-width: 980px;" >
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
    
        <h6 v-if="data.length > 0"  class="text-h6 text-primary font-weight-bold">Library Card Number(s)</h6>
        <div v-for="(entry, index) in data" :key="index">    
          <div>
            <span><strong>{{ entry?.name }}</strong>: {{ entry?.barcode }}</span>
          </div>
          
        </div>
      </v-col>

      <v-col cols="12" v-if="data[0]?.programType === 'OLR'">
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

      <v-col cols="12" v-if="data[0]?.programType === 'OLR'">
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
        <v-btn
          :block="$vuetify.display.xsOnly"
          color="success"
          max-width="320"
          width="100%"
          @click="navigateTo('https://epl.bibliocommons.com/user/registration', {
            external: true
          })"
        >
          Log In
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="3" class="text-center text-md-start">
        <div>
          <a href="https://itunes.apple.com/ca/app/epl-mobile/id390969843?mt=8">
            <v-img 
              src="~/assets/images/eplappphone.png" 
              alt="EPL Mobile App"
              :width="$vuetify.display.smAndDown ? 300 : 200"
              class="mx-auto mx-md-0"
            />
          </a>
        </div>
      </v-col>
      <v-col cols="12" md="9">
        <div class="mb-5">
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
          <span class="text-h6 font-weight-bold"> Download it now!</span>
        </div>
        <v-row>
          <v-col cols="12" sm="6" class="text-center">
            <a href="">
              <v-img 
                src="~/assets/images/app_Store_Badge.svg" 
                alt="QR Code" 
                :width="300"
                :height="$vuetify.display.smAndDown ? 70 : 100"
                class="mx-auto mb-4"
              />
              <div v-if="appleDataUrl">
                <v-img 
                  :src="appleDataUrl" 
                  alt="Generated QR Code" 
                  :width="$vuetify.display.smAndDown ? 400 : 300"
                  class="mx-auto px-8 px-md-2"
                />
              </div>
            </a>
          </v-col>
          <v-col cols="12" sm="6" class="text-center">
            <a href="">
              <v-img 
                src="~/assets/images/Get_it_on_Google_play.svg" 
                alt="QR Code" 
                :width="300"
                :height="$vuetify.display.smAndDown ? 70 : 100"
                class="mx-auto mb-4"
              />
              <div v-if="googleDataUrl">
                <v-img 
                  :src="googleDataUrl" 
                  alt="Generated QR Code" 
                  :width="$vuetify.display.smAndDown ? 400 : 300"
                  class="mx-auto px-8 px-md-2"
                />
              </div>
            </a>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as QRCode from 'qrcode'
import { useRegistrationStore } from '../store/registration-store';
import { navigateTo } from 'nuxt/app';

const registrationStore = useRegistrationStore();
const data = registrationStore.getSuccessResponse;

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
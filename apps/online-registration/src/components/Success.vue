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
        <a 
          class="font-weight-bold text-body-1 text-primary" 
          href="/preview"
        >
          Print your profile
        </a>
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
          physical borrowing and to extend your membership from 90 days to as long as you live 
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
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as QRCode from 'qrcode'

const appleDataUrl = ref<string | null>(null)
  const googleDataUrl = ref<string | null>(null)
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
</style>

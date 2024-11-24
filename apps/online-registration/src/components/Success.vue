<template>
  <v-container class="pa-6 bg-white rounded-lg shadow-md max-width-4xl mt-10 mx-auto">
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
          Please check your inbox for your library card and PIN number.
        </p>
        <a 
          class="font-weight-bold text-body-1 text-primary" 
          href="/preview"
        >
          Print your profile
        </a>
      </v-col>

      <v-col cols="12">
        <div variant="body1" class="text-body-1 mb-4">
          Prepare your baby for a lifetime of learning with 
          <span class="font-weight-bold">FREE early literacy programs</span> 
          at all EPL locations and through the EPL 
          <a 
            href="" 
            class="text-body-1 font-weight-bold text-primary"
          >
            Welcome Baby Program
          </a>.
        </div>
      </v-col>

      <v-col cols="12">
        <div variant="body1" class="text-body-1 mb-6">
          Visit any EPL Location to receive a <span class="font-weight-bold">FREE tote bag</span>. Simply show your picture ID and your library card (a printed copy or via the EPL Mobile app). A picture ID is also required the first time you borrow a video game with your online card.
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

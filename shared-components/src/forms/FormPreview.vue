<template>
  <v-card class="form-preview mx-auto" flat max-width="800px">
    <v-card-title class="text-h5 text-center">Registration Summary</v-card-title>
    <v-card-text>
      <div v-if="registration.length">
        <v-row v-for="(entry, index) in registration" :key="index" class="mb-4">
          <v-col cols="12">
            <div class="mb-4">
              <span class="text-h6">Record {{ index + 1 }}</span>
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
</template>

<script setup>
import { useRegistrationStore } from '../store/registration-store';
const registrationStore = useRegistrationStore();
const registration = registrationStore.getRegistration;
const printPreview = () => {
  window.print();
};
</script>

<style scoped>
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

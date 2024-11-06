<template>
    <v-container>
      <v-card class="form-preview" flat >
        <v-card-title class="text-h5 text-center">Registration Preview</v-card-title>
        <v-card-text>
          <v-list v-if="registration.length">
            <v-list-item-group>
              <v-list-item v-for="(entry, index) in registration" :key="index">
                <v-list-item-content>
                  <v-list-item-title class="text-h6">Entry {{ index + 1 }}</v-list-item-title>
                  
                  <v-divider inset class="my-4"></v-divider>
  
                  <v-list-item-subtitle class="text-h6">Biodata</v-list-item-subtitle>
                  <v-list-item-content>
                    <v-list-item>
                      <v-list-item-title><strong>First Name:</strong> {{ entry.data.biodata.firstname }}</v-list-item-title>
                      <v-list-item-title><strong>Last Name:</strong> {{ entry.data.biodata.lastname }}</v-list-item-title>
                      <v-list-item-title><strong>Middle Name:</strong> {{ entry.data.biodata.middlename }}</v-list-item-title>
                      <v-list-item-title><strong>Date of Birth:</strong> {{ entry.data.biodata.dateofbirth }}</v-list-item-title>
                    </v-list-item>
                  </v-list-item-content>
  
                  <v-divider inset :thickness="4" class="my-4"></v-divider>
  
                  <v-list-item-subtitle class="text-h6">Contact</v-list-item-subtitle>
                  <v-list-item-content>
                    <v-list-item>
                      <v-list-item-title><strong>Street:</strong> {{ entry.data.contact.street }}</v-list-item-title>
                      <v-list-item-title><strong>City:</strong> {{ entry.data.contact.city }}</v-list-item-title>
                      <v-list-item-title><strong>Province:</strong> {{ entry.data.contact.province }}</v-list-item-title>
                      <v-list-item-title><strong>Postal Code:</strong> {{ entry.data.contact.postalcode }}</v-list-item-title>
                      <v-list-item-title><strong>Phone:</strong> {{ entry.data.contact.phone }}</v-list-item-title>
                      <v-list-item-title><strong>Email:</strong> {{ entry.data.contact.email }}</v-list-item-title>
                    </v-list-item>
                  </v-list-item-content>
  
                  <v-divider inset :thickness="4" class="my-4"></v-divider>

                  <v-list-item-subtitle class="text-h6">Libary Card</v-list-item-subtitle>
                  <v-list-item-title>{{ entry.data.barcode }}</v-list-item-title>
  
                  <v-divider inset :thickness="4" class="my-4"></v-divider>

                  <v-list-item-subtitle class="text-h6">Profile</v-list-item-subtitle>
                  <v-list-item-title>{{ entry.data.profile }}</v-list-item-title>
  
                  <v-divider inset :thickness="4" class="my-4"></v-divider>
  
                  <v-list-item-subtitle class="text-h6">Care Of</v-list-item-subtitle>
                  <v-list-item-title>{{ entry.data.careof }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="printPreview" color="primary">Print Preview</v-btn>
        </v-card-actions>
        <v-alert v-if="!registration.length" type="info" class="mt-3">
          No registrations available.
        </v-alert>
      </v-card>
    </v-container>
  </template>
  
  <script setup>
  import { useRegistrationStore } from '../store/registration-store';

  const registrationStore = useRegistrationStore()
  const registration = registrationStore.getRegistration
  
  const printPreview = () => {
    window.print();
  }
  </script>
  
  <style scoped>
  .form-preview {
    max-width: 800px;
    margin: auto;
    padding: 20px;
  }
  
  @media print {
    .form-preview {
      background: #fff;
      box-shadow: none;
    }
  }
  </style>
  
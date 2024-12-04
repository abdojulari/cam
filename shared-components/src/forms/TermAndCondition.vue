<template>
      <v-dialog v-model="isActive" max-width="800">
        <template v-slot:default="{ isActive }">
          <v-card title="Terms of Use">
            <template v-slot:text>         
              <p>
                Please read the following information carefully to better understand what you are agreeing to when you click 'Accept':
              </p>
              <h6 class="text-h6 font-weight-bold my-3"> Account Borrowing Rules</h6>
              <p>
                When you register for an Edmonton Public Library ("EPL") account, you agree to accept full responsibility for the 
                new library account created and for the choices and use of library resources. This includes unfiltered access to 
                the Internet, the return of all materials borrowed and for charges on items that are overdue, lost or damaged. 
                You also agree to abide by the policies of the Edmonton Public Library, which include:
              </p>
              <ul class="custom-list">
                <li> <a href="https://www.epl.ca/borrowing-guide/">Borrowing Basics</a></li>
                <li> <a href="">Customer Conduct</a></li>
                <li><a href="">Public Internet Use Policy</a></li>
              </ul>
              <span>NOTE: you must show picture ID the first time you borrow video games with 
                your online card.
              </span>
              <h6 class="text-h6 font-weight-bold my-3"> Email Address</h6>
              <p>
                Upon successful registration, we'll use the email address you’ve entered to send you 
                your library card number and PIN (personal identification number). This number may 
                then be used immediately to access the full range of EPL services (including borrowing 
                books, video games, eBooks and more).<br>
                Your email address will also be used to provide you with notifications
                about your account, such as on hold items available for pick-up and items coming due.<br>
                You can change your password through the My EPL Account page or by visiting an EPL location.
              </p>
              <h6 class="text-h6 font-weight-bold my-3"> Verification of Identity</h6>
              <p>
                For your identity protection and to confirm that you are a resident of Edmonton, we're required 
                to verify your personal identity to open a library account for you. A library card allows you 
                to borrow large quantities of physical items worth thousands of dollars. This verification process
                 is to ensure the right individuals are signing up for a library account since having access to 
                 library items carry a potential financial risk to the cardholder (e.g. library fees).<br>

                By completing the online card registration application, you consent to allow EPL to use a secure,
                trusted third-party vendor (TransUnion) to access your credit file. You will be presented with a
                series of questions, which will assist us in confirming your identity.<br>

                Please note, the search of your credit file does not affect your credit score.
              </p>
              <p><b>EPL does not access your credit or financial information directly and does not store any information 
                from your credit file.</b> If you register for a library card online, EPL will only store the following 
                personal information for account purposes:</p>
              <ul class="custom-list">
                <li>First and last name</li>
                <li>Date of birth</li>
                <li>Address, including postal code</li>
                <li>Phone number</li>
                <li>Email address</li>
                <li>Library card number</li>
              </ul>
              <h6 class="text-h6 font-weight-bold my-3"> Privacy</h6>
              <p>
                The information that we collect is used and disclosed in accordance with the 
                Library Board's Privacy and Confidentiality of Customer Information Policy and 
                the Freedom of Information and Protection of Privacy Act sections 39(1) and 40(1). 
                Customer information is collected under the authority of the Alberta Libraries Act 
                and the Freedom of Information and Protection of Privacy Act 33(c).<br>
                If you have any questions or concerns about the personal information that is collected 
                and retained by EPL, please take a look at the Privacy Policy. Alternatively, you can 
                submit a question online or by writing to our FOIP Coordinator at 7th Floor, 10235 101
                 Street, Edmonton, Alberta T5J 3G1.<br>

                We take your privacy seriously and are committed to maintaining the confidentiality of your personal information.
              </p>
            </template>
  
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="surface-variant"
                text="Agree"
                variant="flat"
                @click="agree"
              ></v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
</template>
<script setup lang="ts">
import { ref, defineEmits } from 'vue';

const emit = defineEmits(['update:modelValue']);
const isActive = ref(false);

const agree = () => {
  emit('update:modelValue', false);
  //isActive.value = true;
};
</script>
<style scoped>
  .custom-list {
    list-style-type: disc; /* Bullet style for the list */
    padding-left: 20px; /* Ensure proper alignment */
  }
</style>
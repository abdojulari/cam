<template>
    <v-card border title="Terms of Use" class="my-5 overflow-auto" height="300">
      <template v-slot:text>         
        <p class="">
          These terms are an agreement between Edmonton Public Library (“EPL”) and you. 
          You should read all the terms before indicating acceptance. These terms apply to 
          membership for Library services, borrowing services, access to online content 
          and programs, Internet access, rules of conduct within a library branch, and use 
          of your Library account.
        </p>
        <h6 class="text-h6 font-weight-bold my-3"> Accuracy of Membership Information</h6>
        <p>
          When you register for an Edmonton Public Library ("EPL") account, you agree the personal 
          information you have provided is correct and current, and that you will notify EPL in a 
          timely manner if there are any changes to your contact details in the future. Validation 
          of identity will take place when you visit an EPL branch for the first time. Remember to 
          bring picture ID and proof of address to begin borrowing and to extend your 45-day temporary 
          library card to a full Edmonton resident membership. 
        </p>
        <p>
          Children under the age of 18 and others lacking in capacity require the consent of a parent 
          or guardian.  EPL will communicate to accounts with a parent/guardian attached by the 
          email/phone/address provided for the account. No changes can be made to the account without 
          the parent/guardian’s consent.  
        </p>
        <ul class="custom-list my-5">
            <li>
                <a 
                class="text-body-1 text-primary"
                target="_blank"
                href="https://www.epl.ca/borrowing-guide/"
                >
                Borrowing Basics
                </a>
            </li>
            <li>
                <a 
                href="/pdf-templates/privacy.pdf"
                class="text-body-1  text-primary"
                target="_blank"
                >
                    Customer Conduct
                </a>
            </li>
            <li>
                <a 
                href="/pdf-templates/public.pdf"
                class="text-body-1  text-primary"
                target="_blank"
                >
                    Public Internet Use Policy
                </a>
            </li>
        </ul>
        <span class="my-5">NOTE: you must show picture ID the first time you borrow video games with 
          your online card.
        </span>
        <h6 class="text-h6 font-weight-bold my-3"> Email Address</h6>
        <p>
          Upon successful registration, we'll use the email address you’ve entered to send you 
          your library card number and password. This number may 
          then be used immediately to access the full range of EPL services (including borrowing 
          books, video games, eBooks and more).<br>
          Your email address will also be used to provide you with notifications
          about your account, such as on hold items available for pick-up and items coming due.<br>
          You can change your password through the My EPL Account page or by visiting an EPL location.
        </p>
        <h6 class="text-h6 font-weight-bold my-3"> Verification of Identity</h6>
        <p class="my-3">
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
          <li>First name </li> 
          <li>Middle name (if applicable) </li>
          <li>Last name</li>
          <li>Date of birth</li>
          <li>Address, including postal code</li>
          <li>Phone number</li>
          <li>Email address</li>
          <li>Library card number</li>
        </ul>
        <h6 class="text-h6 font-weight-bold my-3"> Privacy</h6>
        <p class="mb-5">
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
    </v-card>
  </template>
  <style scoped>
  .custom-list {
    list-style-type: disc; /* Bullet style for the list */
    padding-left: 20px; /* Ensure proper alignment */
  }
</style>
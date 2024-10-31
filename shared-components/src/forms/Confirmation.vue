<template>
    <v-container class="pt-8">
      <div>
        <v-text-field
          label="Pin/Password"        
          variant="outlined"
          :rules="[rules.required]"
          type="password"
          required
        ></v-text-field>
        <v-text-field
          label="Confirm Pin/Password"

          variant="outlined"
          :rules="[rules.required]"
          type="password"
          required
        ></v-text-field>
      </div>
      <v-checkbox
        label="I accept the terms and conditions"
        v-model="accepted"
        :rules="[rules.required]"
        required
      ></v-checkbox>
      <v-text-field
        label="Message"
        v-model="formData.message"
        variant="outlined"
        :rules="[rules.required]"
        required
      ></v-text-field>

      <v-checkbox
        label="Do you want to add minor(s) to your account?"
        v-model="formData.addMinor"
      >
      </v-checkbox>
    </v-container>
</template>
  
<script setup lang="ts">
import { ref } from 'vue';
  const props = defineProps(['formData', 'rules']);
  const accepted = ref(false);


</script>
  
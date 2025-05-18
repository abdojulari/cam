<template>
    <v-container >
        <v-row>
            <v-col cols="12" sm="12" md="12" lg="12" xl="12">
                <div class="d-flex flex-column align-center justify-center mx-10" style="min-height: 60vh;">
                    <h1 class="text-center text-primary font-weight-bold text-h4"> Library Account System Maintenance</h1>
                    <div class="maintenance-card">
                        <p class="text-center text-h6 mb-4">Our Library Account System is currently undergoing scheduled maintenance to serve you better.
                            We're working to bring everything back online as quickly as possible.
                        </p>
                        <p class="text-center text-h6 mb-4">Thank you for your patience!</p>
                    </div>
                    <img 
                        src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExdmowamQxYmZ6am1veHp5MWF0bjZtemR2ZnQydDRocjNhNW54dGU3NiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/vwKp97qL3auSHHrE0Z/giphy.gif" 
                        alt="Engineers working on system" 
                        style="max-width: 320px; width: 100%; margin-top: 10px;"
                    />
                  
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">

</script>

<style scoped>
.maintenance-card {
  max-width: 780px;
  width: 100%;
  margin: 0 auto;
  padding: 2.5rem 2rem;

}
</style>
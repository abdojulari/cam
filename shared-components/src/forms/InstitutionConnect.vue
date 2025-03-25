<template>
    <v-container>
        <v-row>
            <v-col cols="12" md="4">
                <div class="d-flex flex-column align-start">
                    <img src="~/assets/images/lpass2.jpg" alt="L-Pass logo"  >
                    <p>The L-Pass (Library Pass) Registration is a program connected to the Edmonton Public Library, allowing both students and staff of participating institutions to register and gain access to all the resources offered by the library.</p>
                </div>  
            </v-col>
            <v-col cols="12" md="8"> 
                <v-form fast-fail ref="form"  class="border border-md border-primary p-4 rounded shadow-sm">
                    <v-col cols="12" md="6">
                        <v-text-field
                            v-model="password"
                            density="compact"
                            label="password"
                            variant="outlined"
                        />
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field
                            v-model="confirmPassword"
                            density="compact"
                            label="Confirm Password"
                            variant="outlined"
                        />
                    </v-col>
                   
                </v-form>
            </v-col>    
        </v-row>
       
    </v-container>
</template>
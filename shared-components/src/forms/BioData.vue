<template>
    <v-container class="pt-8">
        <v-row>
            <v-col>
            <span class="text-body-1 font-weight-light">Fields marked with an asterisk (*) are required</span>
            </v-col>
        </v-row>
        <v-form 
            ref="form" 
            v-model="formValid" 
            @update:model-value="updateFormValid" 
            lazy-validation
        >
            <v-row>
                <v-col>
                   <v-text-field
                    class="text-capitalize"
                    label="First name *"
                    v-model="formData.firstname"
                    variant="outlined"
                    density="compact"
                    :rules="[rules.required, props.rules.firstname]"
                    required
                    />
                </v-col>
                <v-col>
                    <v-text-field
                    class="text-capitalize"
                    label="Last name *"
                    v-model="formData.lastname"
                    variant="outlined"
                    density="compact"
                    :rules="[rules.required, props.rules.lastname]"
                    required
                    />
                </v-col>
            </v-row>
            <v-row> 
                <v-col>
                   <v-text-field
                    class="text-capitalize" 
                    label="Middle name"
                    v-model="formData.middlename"
                    variant="outlined"
                    density="compact"
                    />
                </v-col>
                <v-col>
                    <v-menu v-model="isMenuOpen" :close-on-content-click="false">
                    <template v-slot:activator="{ props }">
                        <v-text-field
                            :model-value="formattedDate"
                            readonly
                            v-bind="props"
                            variant="outlined"
                            rounded-0
                            density="compact"
                            label="Date of Birth"
                            prepend-inner-icon="mdi-calendar"
                        />
                    </template>
                    <v-date-picker
                        v-model="formData.dateofBirth"
                        @update:model-value="isMenuOpen = false"
                        hide-actions
                        :max="minDate"
                    >
                    </v-date-picker>
                </v-menu>
                </v-col>
            </v-row>
        </v-form>
    </v-container>
</template>
  
<script setup lang="ts">
    import { ref, computed, defineProps, defineEmits } from 'vue';
    import { useRegistrationStore } from '../store/registration-store';
    import { minDate } from '../composables/minDate';
   
    const formValid = ref(false);
    const emit = defineEmits(['update:formData', 'update:modelValue']);
    // Update the parent when form validation changes
    const updateFormValid = (isValid: boolean) => {
        formValid.value = isValid;  
        emit('update:modelValue', isValid); 
    };
    
    const props = defineProps(['formData', 'rules', 'page', 'bioDataFormValid', 'form']);
    const isMenuOpen = ref(false);
    const formattedDate = computed(() => {
    if (!props.formData.dateofBirth) return '';
        return new Intl.DateTimeFormat('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
        }).format(props.formData.dateofBirth);
    });
</script>

<template>
    <v-container class="pt-8">
        <v-form 
            ref="form" 
            v-model="formValid" 
            @update:model-value="updateFormValid" 
            lazy-validation
        >
            <div class="d-flex ga-5">
                <v-text-field
                    class="text-capitalize"
                    label="First name"
                    v-model="formData.firstname"
                    variant="outlined"
                    density="compact"
                    :rules="[rules.required, props.rules.firstname]"
                    required
                >
                </v-text-field>
                <v-text-field
                    class="text-capitalize" 
                    label="Middle name"
                    v-model="formData.middlename"
                    variant="outlined"
                    density="compact"
                    :rules="[props.rules.middlename]"
                >
                </v-text-field>
            </div>
            <div class="d-flex ga-5">
                <v-text-field
                    class="text-capitalize"
                    label="Last name"
                    v-model="formData.lastname"
                    variant="outlined"
                    density="compact"
                    :rules="[rules.required, props.rules.lastname]"
                    required
                >
                </v-text-field>
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
                        >
                        </v-text-field>
                    </template>
                    <v-date-picker
                        v-model="formData.dateofBirth"
                        @update:model-value="isMenuOpen = false"
                        hide-actions
                        :max="minDate"
                    >
                    </v-date-picker>
                </v-menu>
            </div>
        </v-form>
    </v-container>
</template>
  
<script setup lang="ts">
    import { ref, computed, defineProps, defineEmits, onMounted, useTemplateRef } from 'vue';
    import { useRegistrationStore } from '../store/registration-store';
    import { minDate } from '../composables/minDate';
   
    const formValid = ref(false);
    const emit = defineEmits(['update:formData', 'update:modelValue']);
    // Update the parent when form validation changes
    const updateFormValid = (isValid: boolean) => {
        formValid.value = isValid;  
        emit('update:modelValue', isValid); 
    };
    const radioSelection = useRegistrationStore();
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
 
    //const selectedRadio = computed(() => radioSelection.getRadioSelection);
    
    // watch(selectedRadio, (newValue) => {
    //     console.log('Selected Radio:', newValue);
    // });
    // onMounted(() => {
    //     console.log('Selected Radio on load:', selectedRadio.value);
    // });

    // const minDate = computed(() => {
    //     const today = new Date()
    //     const minAgeDate = new Date(today.setFullYear(today.getFullYear() - 18))
    //     return minAgeDate.toISOString().split('T')[0]
    // })
</script>

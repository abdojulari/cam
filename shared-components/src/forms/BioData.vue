<template>
    <v-container class="pt-8">
        <div class="d-flex ga-5">
            <v-text-field
                label="First name"
                v-model="formData.firstname"
                variant="outlined"
                density="compact"
                :rules="[rules.required]"
                required
            >
            </v-text-field>
            <v-text-field
                label="Middle name"
                v-model="formData.middlename"
                variant="outlined"
                density="compact"
                :rules="[rules.required]"
                required
            >
            </v-text-field>
        </div>
        <div class="d-flex ga-5">
            <v-text-field
                label="Last name"
                v-model="formData.lastname"
                variant="outlined"
                density="compact"
                :rules="[rules.required]"
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
                        prepend-inner-icon="fa-solid fa-calendar-days"
                    >
                    </v-text-field>
                </template>
                <v-date-picker
                    v-model="formData.dateofBirth"
                    @update:model-value="isMenuOpen = false"
                    hide-actions
                    :min="new Date(1900, 0, 1)"
                >
                </v-date-picker>
            </v-menu>
        </div>
  
    </v-container>
</template>
  
<script setup lang="ts">
    import { ref, computed, defineProps, watch, onMounted } from 'vue';
    import { useRegistrationStore } from '../store/registration-store';
  
    const radioSelection = useRegistrationStore();
    const props = defineProps(['formData', 'rules', 'page']);
    const isMenuOpen = ref(false);
    const formattedDate = computed(() => {
    if (!props.formData.dateofBirth) return '';
        return new Intl.DateTimeFormat('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
        }).format(props.formData.dateofBirth);
    });
 
    const selectedRadio = computed(() => radioSelection.getRadioSelection);
    // Watch for changes in selectedRadio and log the value
    watch(selectedRadio, (newValue) => {
    console.log('Selected Radio:', newValue);
    });
    onMounted(() => {
    console.log('Selected Radio on load:', selectedRadio.value);
    });
</script>

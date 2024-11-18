import { computed } from "vue";

export const minDate = computed(() => {
    const today = new Date();
    const minAgeDate = new Date(today.setFullYear(today.getFullYear() - 18));
    return minAgeDate.toISOString().split('T')[0];
});
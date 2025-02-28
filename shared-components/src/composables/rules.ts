
import BioData from '../forms/BioData.vue';
import ContactInfo from '../forms/ContactInformation.vue';
import ProfileSelection from '../forms/ProfileSelection.vue';
import Minor from '../forms/Minor.vue';
import CreatePin from '../forms/CreatePin.vue';
export const validationRules = (formData: any) => {
    return [
        {
            title: 'Profile ',
            component: ProfileSelection,
            props: {
                formData: formData,
                rules: {
                required: (value: unknown) => !!value || 'Required.',
                }
            },
        },
        {
            title: 'About You',
            component: BioData,
            rules: {
                required: (value: unknown) => !!value || 'Required.',
                firstname: (value: string) => /^[A-Za-záéíóúàèìòùâêîôûäëïöüãõñçłø苏'-\s]+$/.test(value) || 'First name can only contain alphabets, hyphens, apostrophes, spaces, and accented or special characters.',
                lastname: (value: string) => /^[A-Za-záéíóúàèìòùâêîôûäëïöüãõñçłø苏'-\s]+$/.test(value) || 'Last name can only contain alphabets, hyphens, apostrophes, spaces, and accented or special characters.',
                middlename: (value: string) => value === '' || /^[A-Za-záéíóúàèìòùâêîôûäëïöüãõñçłø苏'-\s]+$/.test(value) || 'Middle name can only contain alphabets, hyphens, apostrophes, spaces, and accented or special characters.',

            },
        },
        {
            title: 'Contact',
            component: ContactInfo,
            rules: {
                required: (value: unknown) => !!value || 'Required.',
                email: (value: string) => {
                    const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
                    return emailPattern.test(value) || 'Invalid e-mail.';
                },
                phone: (value: string) => {
                    const phonePattern = /^\d{3}-\d{3}-\d{4}$/;
                    return phonePattern.test(value) || 'Invalid phone number.';
                },
                postalCode: (value: string) => {      
                    const postalCodePattern = /^T\d[ABCEGHJ-NPRSTV-Z]\s\d[ABCEGHJ-NPRSTV-Z]\d$/;
                    return postalCodePattern.test(value) || 'Invalid postal code. Format: T1A 1A1';
                },
                province: (value: string) => /^[A-Za-z]+$/.test(value) || 'Province can only contain alphabets.',
                city: (value: string) => /^[A-Za-z]+$/.test(value) || 'City can only contain alphabets.',
            },
        },
        {
            title: formData.radios === "Adult" ? 'Choose your password' : 'Confirmation',
            component: CreatePin,
            rules: {
                required: (value: unknown) => !!value || 'Required.',
                password: (value: string) => {
                    const passwordRegex = /^(?=[A-Za-z0-9]{6,20}$)(?!.*\s).*$/;
                    return passwordRegex.test(value) || 'Password must be 6-20 characters long and no special characters allowed.';
                },
            },
        },
        {
            title: 'Minor',
            component: Minor,
            rules: {
                required: (value: unknown) => !!value || 'Required.',
                email: (value: string) => {
                    const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
                    return emailPattern.test(value) || 'Invalid e-mail.';
                },
                phone: (value: string) => {
                    const phonePattern = /^\d{3}-\d{3}-\d{4}$/;
                    return phonePattern.test(value) || 'Invalid phone number.';
                },
                postalCode: (value: string) => {    
                    const postalCodePattern = /^T\d[ABCEGHJ-NPRSTV-Z]\s\d[ABCEGHJ-NPRSTV-Z]\d$/;
                    return postalCodePattern.test(value) || 'Invalid postal code. Format: T1A 1A1';
                }, 
                province: (value: string) => /^[A-Za-z]+$/.test(value) || 'Province can only contain alphabets.',
                city: (value: string) => /^[A-Za-z]+$/.test(value) || 'City can only contain alphabets.',
                firstname: (value: string) => /^[A-Za-záéíóúàèìòùâêîôûäëïöüãõñçłø苏'-\s]+$/.test(value) || 'First name can only contain alphabets, hyphens, apostrophes, or spaces.',
                lastname: (value: string) => /^[A-Za-záéíóúàèìòùâêîôûäëïöüãõñçłø苏'-\s]+$/.test(value) || 'Last name can only contain alphabets, hyphens, apostrophes, or spaces.',
                middlename: (value: string) => value === '' || /^[A-Za-záéíóúàèìòùâêîôûäëïöüãõñçłø苏'-\s]+$/.test(value) || 'Middle name can only contain alphabets, hyphens, apostrophes, or spaces.',
                password: (value: string) => {
                    const passwordRegex = /^(?=[A-Za-z0-9]{6,20}$)(?!.*\s).*$/;
                    return passwordRegex.test(value) || 'Password must be 6-20 characters long and no special characters allowed.';
                },

            },
        }
    ]
}
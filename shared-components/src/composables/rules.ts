
import BioData from '../forms/BioData.vue';
import ContactInfo from '../forms/ContactInformation.vue';
import ProfileSelection from '../forms/ProfileSelection.vue';
import Minor from '../forms/Minor.vue';
import Privilege from '../forms/Privilege.vue';
import CreatePin from '../forms/CreatePin.vue';
export const rules = (formData: any) => {
    return [
        {
            title: 'Profile ',
            component: ProfileSelection,
            props: {
                formData: formData,
                rules: {
                required: (value: any) => !!value || 'Required.',
                }
            },
        },
        {
            title: 'Bio Data',
            component: BioData,
            rules: {
                required: (value: any) => !!value || 'Required.',
                firstname: (value: any) => /^[A-Za-z]+$/.test(value) || 'First name can only contain alphabets.',
                lastname: (value: any) => /^[A-Za-z]+$/.test(value) || 'Last name can only contain alphabets.',
                middlename: (value: any) => !!value || 'Middle name is required.',
            },
        },
        {
            title: 'Contacts',
            component: ContactInfo,
            rules: {
                required: (value: any) => !!value || 'Required.',
                email: (value: any) => {
                    const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
                    return emailPattern.test(value) || 'Invalid e-mail.';
                },
                phone: (value: any) => {
                    const phonePattern = /^\(\d{3}\) \d{3}-\d{4}$/;
                    return phonePattern.test(value) || 'Invalid phone number.';
                },
                postalCode: (value: any) => {      
                    const postalCodePattern = /^T\d[ABCEGHJ-NPRSTV-Z]\s\d[ABCEGHJ-NPRSTV-Z]\d$/;
                    return postalCodePattern.test(value) || 'Invalid postal code. Format: T1A 1A1';
                },
                province: (value: any) => /^[A-Za-z]+$/.test(value) || 'Province can only contain alphabets.',
                city: (value: any) => /^[A-Za-z]+$/.test(value) || 'City can only contain alphabets.',
            },
        },
        {
            title: 'Choose your password',
            component: CreatePin,
            rules: {
                required: (value: any) => !!value || 'Required.',
            },
        },
        {
            title: 'Minor',
            component: Minor,
            rules: {
                required: (value: any) => !!value || 'Required.',
                email: (value: any) => {
                    const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
                    return emailPattern.test(value) || 'Invalid e-mail.';
                },
                phone: (value: any) => {
                    const phonePattern = /^\(\d{3}\) \d{3}-\d{4}$/;
                    return phonePattern.test(value) || 'Invalid phone number.';
                },
                postalCode: (value: any) => {    
                    const postalCodePattern = /^T\d[ABCEGHJ-NPRSTV-Z]\s\d[ABCEGHJ-NPRSTV-Z]\d$/;
                    return postalCodePattern.test(value) || 'Invalid postal code. Format: T1A 1A1';
                }, 
                province: (value: any) => /^[A-Za-z]+$/.test(value) || 'Province can only contain alphabets.',
                city: (value: any) => /^[A-Za-z]+$/.test(value) || 'City can only contain alphabets.',
                firstname: (value: any) => /^[A-Za-z]+$/.test(value) || 'First name can only contain alphabets.',
                lastname: (value: any) => /^[A-Za-z]+$/.test(value) || 'Last name can only contain alphabets.',
                middlename: (value: any) => !!value || 'Middle name is required.',
            },
        },
        {
            title: 'Privilege',
            component: Privilege,
            rules: {
                required: (value: any) => !!value || 'Required.',
            },
        },
    ]
}
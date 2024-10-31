// creating store for registration using pinia 
import { defineStore } from 'pinia'

// create interface for registration
// interface Registration {
//     firstname: string
//     lastname: string
//     middlename: string
//     phone: string
//     dateofbirth: Date | null
//     email: string
//     city: string
//     province: string
//     street: string
//     postalcode: string
//     profile: string
//     minor: {
//         firstname: string
//         lastname: string
//         middlename: string
//         dateofbirth: Date | null
//         parent: {
//             firstname: string
//             lastname: string
//             middlename: string
//             phone: string
//             email: string
//             address: {
//                 city: string
//                 province: string
//                 street: string
//                 postalcode: string
//             }
//         }
//     }

// } 

// create interface for registration
interface BioData {
    firstname: string;
    lastname: string;
    middlename: string;
    dateofbirth: Date | null;
}

interface Contact {
    street: string;
    city: string;
    province: string;
    postalcode: string;
    phone: string;
    email: string;
}

interface Registration {
    biodata: BioData[];
    contact: Contact;
    profile: string;  // "Adult" or "Minor"
    radioSelection: string;
}
export const useRegistrationStore = defineStore({
  id: 'registration',
  state: () => ({
    registration: {
        biodata: [] as BioData[],
        contact: {
          street: '',
          city: '',
          province: '',
          postalcode: '',
          phone: '',
          email: '',
        } as Contact,
        profile: '',
        radioSelection: '',
      } as Registration,
    radioSelection: '' as string,
  }),
  actions: {
    async addBioData(bioData: BioData) {
        try {
          this.registration.biodata.push(bioData);
        } catch (error) {
          console.error(error);
        }
      },
      async setContact(contact: Contact) {
        try {
          this.registration.contact = contact;
        } catch (error) {
          console.error(error);
        }
      },
      async setProfile(profile: string) {
        try {
          this.registration.profile = profile;
        } catch (error) {
          console.error(error);
        }
      },
      async setRadioSelection(radioSelection: string) {
        try {
          this.registration.radioSelection = radioSelection;
        } catch (error) {
          console.error(error);
        }
      },
  },
  getters: {
    getRegistration(): Registration {
        return this.registration;
      },
      getRadioSelection(): string {
        return this.registration.radioSelection;
    },
  },

})
import { defineStore } from 'pinia'
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
   data: Adult;
}
interface Adult  {
    biodata: BioData;
    contact: Contact;
    profile: string;
    radioSelection: string;
    careof: string;
    password?: string;
    confirmPassword?: string;
    barcode?: string;
    consent?: string;
}
interface Minor {
    biodata: BioData;
    contact: Contact;
    profile: string;
    radioSelection: string;
    careof: string;
    password?: string;
    confirmPassword?: string;
    barcode?: string;
    consent?: string;
}
interface Password {
    password: string;
    confirmPassword: string;
}
interface SuccessResponse {
    barcode: string;
    name: string;
    
}
export const useRegistrationStore = defineStore({
  id: 'registration',
  state: () => ({
    registration: [] as Registration[],
    biodata: {} as BioData,
    contact: {} as Contact,
    profile: '',
    radioSelection: '',
    careof: '',
    adult: {} as Adult,
    minor: {} as Minor,
    additionalMinor:false,
    addMinor:false,
    consent: '',
    password: {} as Password,
    turnstile: false,
    linkState: false,
    buttonClickState: false,
    successResponse: [] as SuccessResponse[],
    networkName: '',
  }),
  actions: {
    async setTurnstile(turnstile: boolean) {
        try {
          this.turnstile = turnstile;
        } catch (error) {
          console.error(error + 'error in setTurnstile!');
        }
    },
    async addBioData(bioData: BioData) {
        try {
          this.biodata = bioData;
          //reset the biodata
          this.biodata = {} as BioData;

        } catch (error) {
          console.error(error);
        }
      },
      async setContact(contact: Contact) {
        try {
          
          this.contact= contact;

        } catch (error) {
          console.error(error);
        }
      },
      async setProfile(profile: string) {
        try {
          this.profile = profile;
        } catch (error) {
          console.error(error);
        }
      },
      async setRadioSelection(radioSelection: string) {
        try {
          this.radioSelection = radioSelection;
        } catch (error) {
          console.error(error);
        }
      },
      async setCareOf(careof: string) {
        try {
          this.careof = careof;
        } catch (error) {
          console.error(error);
        }
      },
      async setConsent(consent: string) {
        try {
          this.consent = consent;
        } catch (error) {
          console.error(error);
        }
      },
      async setAdult(adult: Adult) {
        try {
          this.adult = adult;
        } catch (error) {
          console.error(error);
        }
      },
      async setMinor(minor: Minor) {
        try {
          this.minor = minor;
        } catch (error) {
          console.error(error);
        }
      },
      async addRegistration(registration: Registration) {
        try {
          // Check if registration already exists by a unique key (e.g., barcode or combination of fields)
          const index = this.registration.findIndex(
            (existingRegistration) => 
              existingRegistration.data.biodata.firstname === registration.data.biodata.firstname &&
              existingRegistration.data.biodata.lastname === registration.data.biodata.lastname &&
              existingRegistration.data.biodata.dateofbirth === registration.data.biodata.dateofbirth
          );
      
          if (index === -1) {
            // If registration doesn't exist, push a new one
            this.registration.push(registration);
          } else {
            // If registration exists, update the existing one
            this.registration[index] = registration;
          }
        } catch (error) {
          console.error('Error in addRegistration: ', error);
        }
      },      
      async setAdditionalMinor(additionalMinor: boolean) {
        try {
          this.additionalMinor = additionalMinor;
        } catch (error) {
          console.error(error);
        }
      },
      async setAddMinor(addMinor: boolean) {
        try {
          this.addMinor = addMinor;
        } catch (error) {
          console.error(error);
        }
      },
      async setPassword(password: Password) {
        try {
          this.password = password;
        } catch (error) {
          console.error(error);
        }
      },
      async setLinkState(linkState: boolean) {
        try {
          this.linkState = linkState;
        } catch (error) {
          console.error(error);
        }
      },
      async setButtonClickState(buttonClickState: boolean) {
        try {
          this.buttonClickState = buttonClickState;
        } catch (error) {
          console.error(error);
        }
      },
      async setSuccessResponse(successResponse: SuccessResponse) {
        try {
          this.successResponse.push(successResponse);
        } catch (error) {
          console.error(error);
        }
      },
      async setNetworkName(networkName: string) {
        try {
          this.networkName = networkName;
        } catch (error) {
          console.error(error);
        }
      }
  },
  getters: {
    getBioData(): BioData {
      return this.biodata;
    },
    getContact(): Contact {
      return this.contact;
    },
    getRegistration(): Registration[] {
        return this.registration;
    },
    getRadioSelection(): string {
        return this.radioSelection;
    },
    getCareOf(): string {
        return this.careof;
    },
    getProfile(): string {
        return this.profile;
    },
    getAdult(): Adult {
        return this.adult;
    },
    getMinor(): Minor {
        return this.minor;
    },
    getAdditionalMinor(): boolean {
        return this.additionalMinor;
    },
    getAddMinor(): boolean {
        return this.addMinor;
    },
    getPassword(): Password {
        return this.password;
    },
    getConsent(): string {
        return this.consent;
    },
    getTurnstile(): boolean {
        return this.turnstile;
    },
    getLinkState(): boolean {
        return this.linkState;
    },
    getButtonClickState(): boolean {
        return this.buttonClickState;
    },
    getSuccessResponse(): SuccessResponse[] {
        return this.successResponse;
    },
    getNetworkName(): string {
        return this.networkName;
    }
  },

})
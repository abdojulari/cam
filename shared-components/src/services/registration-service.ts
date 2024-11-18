// services/registration-service.ts
import { useRegistrationStore } from '../store/registration-store';

export const registrationService = {
  setMinorData(minorData: any) {
    const userRegistration = useRegistrationStore();
    userRegistration.setMinor({
      biodata: minorData.biodata,
      contact: minorData.contact,
      careof: minorData.careof,
      profile: minorData.profile,
      radioSelection: minorData.radioSelection,
      password: minorData.password,
      confirmPassword: minorData.confirmPassword,
      barcode: minorData.barcode,
    });
    userRegistration.addRegistration({ data: userRegistration.minor });
  },

  addAdditionalMinor(minors: any, minorData: any) {
    minors.push(minorData);
  },

  linkAdultToMinor(adultData: any, minorData: any) {
    const userRegistration = useRegistrationStore();
    userRegistration.setMinor({
      biodata: minorData.biodata,
      contact: adultData.contact,
      careof: adultData.careof,
      profile: adultData.profile,
      radioSelection: adultData.radioSelection,
      password: adultData.password,
      confirmPassword: adultData.confirmPassword,
      barcode: adultData.barcode,
    });
    userRegistration.addRegistration({ data: userRegistration.minor });
  },
};

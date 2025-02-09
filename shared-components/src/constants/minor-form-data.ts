// Utility function to build minor registration data
export const createMinorRegistrationData = (barcode: string, formData: any, minor: any) => {
    return {
        biodata: {
            firstname: minor?.firstname || formData.minorFirstname,
            lastname: minor?.lastname || formData.minorLastname,
            middlename: minor?.middlename || formData.minorMiddlename,
            dateofbirth: minor?.dateOfBirth || (formData.minorDateOfBirth).toISOString().split('T')[0],
        },
        contact: {
            street: formData.adultStreet,
            city: formData.adultCity,
            province: formData.adultProvince,
            phone: formData.adultPhone,
            email: formData.adultEmail,
            postalcode: formData.adultPostalCode,
        },
        careof: `${formData.adultFirstname} ${formData.adultLastname}`,
        profile: 'EPL_SELFJ',
        radioSelection: formData.radios,
        password: minor?.password || formData?.password,
        confirmPassword: minor?.confirmPassword || formData.confirmPassword,
        barcode: barcode,
    };
};

// Utility function to create registration data for both adults and minors
export const createRegistrationData = (barcode: string, formData: any, minor?: any, data?: any) => {
    return {
        biodata: {
            firstname: minor?.firstname || formData?.minorFirstname,
            lastname: minor?.lastname || formData?.minorLastname,
            middlename: minor?.middlename || formData?.minorMiddlename,
            dateofbirth: minor?.dateOfBirth || (formData?.minorDateOfBirth)?.toISOString().split('T')[0],
        },
        contact: {
            street: data?.address?.street,
            city: data?.address?.city,
            province: data?.address?.province,
            phone: data?.address?.phone,
            email: data?.address?.email,
            postalcode: data?.address?.postalCode,
        },
        careof: data?.address?.careOf,
        profile: 'EPL_SELFJ',
        radioSelection: formData?.radios,
        password: minor?.password || formData?.password,
        confirmPassword: minor?.confirmPassword || formData?.confirmPassword,
        barcode: barcode,
    };
};

export const sameAsAdultData = (formData: any, barcode: any, minor?: any) => {
    return {
        biodata: {
          firstname: minor?.firstname || formData.minorFirstname,
          lastname: minor?.lastname || formData.minorLastname,
          middlename: minor?.middlename || formData.minorMiddlename,
          dateofbirth: minor?.dateOfBirth || (formData.minorDateOfBirth).toISOString().split('T')[0],
        },
        contact: {
          street: formData.street,
          city: formData.city,
          province: formData.province,
          phone: formData.phone,
          email: formData.email,
          postalcode: formData.postalCode,
        },
        careof: `${formData.firstname} ${formData.lastname}`,
        profile: 'EPL_SELFJ',
        radioSelection: formData.radios,
        password: minor?.password || formData.password,
        confirmPassword: minor?.confirmPassword || formData.confirmPassword,
        barcode: barcode,
    }
}
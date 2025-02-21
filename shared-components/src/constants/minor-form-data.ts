// Utility function to build minor registration data
export const createMinorRegistrationData = (formData: any, minor: any) => {
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
        password: minor?.password || formData?.minorPassword,
        confirmPassword: minor?.confirmPassword || formData.minorConfirmPassword
    };
};

// Utility function to create registration data for both adults and minors
export const createRegistrationData = (formData: any, minor?: any, data?: any) => {
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
        careof: data?.address?.careOf ? `${data?.address?.careOf}` : `${data?.firstName} ${data?.lastName}`,
        profile: 'EPL_SELFJ',
        radioSelection: formData?.radios,
        password: minor?.password || formData?.minorPassword,
        confirmPassword: minor?.confirmPassword || formData?.minorConfirmPassword
    };
};

export const sameAsAdultData = (formData: any, minor?: any) => {
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
        password: minor?.password || formData.minorPassword,
        confirmPassword: minor?.confirmPassword || formData.minorConfirmPassword,
    }
}
export interface CareOfAddress {
    careof: string;
    address: string;
    city: string;
    province: string;
    postalcode: string;
}

export interface CareOfAddresses {
    result: CareOfAddress[];
}

export interface Minors {
    id: number;
    firstName: string;
    lastName: string;
    middleName?: string;
    dateOfBirth: Date;
}

export interface MinorsList {
    result: Minors[];
}

export interface CustomerRegistration {
    profile: string;
    form: {
        firstName: string;
        lastName: string;
        middleName?: string;
        preferredName?: string;
        dateOfBirth: Date;
        barcode: string;
        careOf: string;
        address: string;
        city: string;
        province: string;
        postalCode: string;
        address2?: string;
        city2?: string;
        province2?: string;
        postalCode2?: string;
        email: string;
        phoneNumber: string;
        libraryCardBarcode: string;
        selectedEmailConsent: string;
        selectedIndigenousStatus: string;
        useSecondaryAddress: boolean;
        minors: Minors[];
        profileType?: string;
        isClient?: boolean;
        usePreferredName?: boolean;
    }
}
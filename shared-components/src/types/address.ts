import { type Ref } from "vue";

// Types for address lookup
export interface AddressResult {
    id: string;
    text: string;
    highlight: string;
    description: string;
    address?: {
      line1: string;
      line2: string;
      city: string;
      province: string;
      postalCode: string;
      country: string;
    }
  }
  
  export interface AddressDetailsResponse {
    address: {
      line1: string;
      line2: string;
      city: string;
      province: string;
      postalCode: string;
      country: string;
    };
  }
  
  export interface AddressFields {
    address: Ref<string>;
    city: Ref<string>;
    province: Ref<string>;
    postalCode: Ref<string>;
  }
  
  export interface UseAddressLookupOptions {
    addressFields: AddressFields;
    cachePrefix?: string;
    debounceMs?: number;
    cacheExpiryMs?: number;
    detailsCacheExpiryMs?: number;
  }
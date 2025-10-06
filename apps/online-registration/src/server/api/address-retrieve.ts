import { defineEventHandler, EventHandlerRequest, H3Event, readBody, createError } from 'h3';

// Add the missing import for useRuntimeConfig
const useRuntimeConfig = (event: H3Event) => {
  // In a real Nuxt environment, this would be automatically imported
  // For now, we'll create a simple mock or you can import it properly
  return {
    public: {
      CANADA_POST_API_KEY: process.env.CANADA_POST_API_KEY,
      CANADA_POST_API_FIND_URL: process.env.CANADA_POST_API_FIND_URL,
      CANADA_POST_API_RETRIEVE_URL: process.env.CANADA_POST_API_RETRIEVE_URL,
    }
  };
};

interface AddressRetrieveRequest {
  addressId: string;
}

interface AddressDetailsResponse {
  address: {
    line1: string;
    line2: string;
    city: string;
    province: string;
    postalCode: string;
    country: string;
  };
}

interface CanadaPostRetrieveResponse {
  Items: Array<{
    Id: string;
    DomesticId: string;
    Language: string;
    LanguageAlternatives: string;
    Department: string;
    Company: string;
    SubBuilding: string;
    BuildingNumber: string;
    BuildingName: string;
    SecondaryStreet: string;
    Street: string;
    Block: string;
    Neighbourhood: string;
    District: string;
    City: string;
    Line1: string;
    Line2: string;
    Line3: string;
    Line4: string;
    Line5: string;
    AdminAreaName: string;
    AdminAreaCode: string;
    Province: string;
    ProvinceName: string;
    ProvinceCode: string;
    PostalCode: string;
    CountryName: string;
    CountryIso2: string;
    CountryIso3: string;
    CountryIsoNumber: string;
    SortingNumber1: string;
    SortingNumber2: string;
    Barcode: string;
    POBoxNumber: string;
    Label: string;
    Type: string;
    DataLevel: string;
  }>;
}

interface CanadaPostErrorResponse {
  Items: Array<{
    Error: string;
    Description: string;
    Cause: string;
    Resolution: string;
  }>;
}

export default defineEventHandler(async (event: H3Event<EventHandlerRequest>) => {
  const config = useRuntimeConfig(event);
  const apiKey = config.public.CANADA_POST_API_KEY;
  const retrieveUrl = config.public.CANADA_POST_API_RETRIEVE_URL;
  const body = await readBody<AddressRetrieveRequest>(event);
  
  if (!body.addressId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Address ID is required'
    });
  }

  // If no API key is configured, return mock data
  if (!apiKey) {
    console.warn('Canada Post API key not configured, using mock data');
    return getMockAddressDetails(body.addressId);
  }

  try {
    const retrieveResponse = await fetch(retrieveUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        Key: apiKey,
        Id: body.addressId
      })
    });

    if (retrieveResponse.status !== 200) {
      throw new Error(`Canada Post Retrieve API error: ${retrieveResponse.status}`);
    }

    const retrieveData: CanadaPostRetrieveResponse | CanadaPostErrorResponse = await retrieveResponse.json();
    
    // Check if the response contains an error
    if (retrieveData.Items && retrieveData.Items.length > 0) {
      const firstItem = retrieveData.Items[0];
      
      if ('Error' in firstItem) {
        console.error('Canada Post Retrieve API Error:', {
          error: firstItem.Error,
          description: firstItem?.Description,
          cause: firstItem.Cause,
          resolution: firstItem.Resolution
        });
        throw createError({
          statusCode: 400,
          statusMessage: `Address retrieval error: ${firstItem.Error}`
        });
      }
      
      // Process the address normally
      const address = firstItem;
      
      return {
        address: {
          line1: address.Line1 || address.Street || '',
          line2: address.Line2 || '',
          city: address.City || '',
          province: address.ProvinceCode || address.Province || '',
          postalCode: address.PostalCode || '',
          country: address.CountryName || 'Canada'
        }
      };
    }

    throw createError({
      statusCode: 404,
      statusMessage: 'Address not found'
    });

  } catch (error: any) {
    console.error('Canada Post Address Retrieve Error:', error);
    
    if (error.statusCode) {
      throw error; // Re-throw HTTP errors
    }
    
    // Return mock data as fallback for other errors
    console.warn('Falling back to mock data due to API error');
    return getMockAddressDetails(body.addressId);
  }
});

// Mock data for development/testing and fallback
function getMockAddressDetails(addressId: string): AddressDetailsResponse {
  // Simple mock based on addressId
  const mockAddresses: Record<string, AddressDetailsResponse> = {
    '1': {
      address: {
        line1: '123 Main Street',
        line2: '',
        city: 'Toronto',
        province: 'ON',
        postalCode: 'M5V 3A8',
        country: 'Canada'
      }
    },
    '2': {
      address: {
        line1: '456 Queen Street West',
        line2: '',
        city: 'Toronto',
        province: 'ON',
        postalCode: 'M5V 2A4',
        country: 'Canada'
      }
    },
    '3': {
      address: {
        line1: '789 King Street',
        line2: '',
        city: 'Toronto',
        province: 'ON',
        postalCode: 'M5H 1J9',
        country: 'Canada'
      }
    },
    '4': {
      address: {
        line1: '321 Bay Street',
        line2: '',
        city: 'Toronto',
        province: 'ON',
        postalCode: 'M5H 2R2',
        country: 'Canada'
      }
    },
    '5': {
      address: {
        line1: '2234 17 Street Northwest',
        line2: '',
        city: 'Edmonton',
        province: 'AB',
        postalCode: 'T6Y 4H4',
        country: 'Canada'
      }
    }
  };

  return mockAddresses[addressId] || {
    address: {
      line1: 'Unknown Address',
      line2: '',
      city: 'Unknown',
      province: 'AB',
      postalCode: 'T0T 0T0',
      country: 'Canada'
    }
  };
} 
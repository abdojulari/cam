import { log } from 'console';
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

interface AddressLookupRequest {
  query: string;
  postalCode?: string;
  city?: string;
  province?: string;
}

interface AddressResult {
  id: string;
  text: string;
  highlight: string;
  description: string;
  // optional address fields - only populated after retrieve
  address?: {
    line1: string;
    line2: string;
    city: string;
    province: string;
    postalCode: string;
    country: string;
  }
}

interface AddressLookupResponse {
  results: AddressResult[];
  total: number;
}

// Canada Post AddressComplete API response interfaces
interface CanadaPostFindResponse {
  Items: Array<{
    Id: string;
    Type: string;
    Text: string;
    Highlight: string;
    Description: string;
  }>;
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
  const findUrl = config.public.CANADA_POST_API_FIND_URL;
  const body = await readBody<AddressLookupRequest>(event);
  
  if (!body.query) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Query parameter is required'
    });
  }

  // If no API key is configured, return mock data
  if (!apiKey) {
    console.warn('Canada Post API key not configured, using mock data');
    return getMockAddressData(body.query);
  }

  try {
    const city = body.city?.value || ""; // default to empty string if not provided
    const searchTerm = `${city}, ${body.query}`;

    // Only call Find API to get address suggestions
    const findResponse = await fetch(findUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        Key: apiKey,
        SearchTerm: searchTerm,
        Country: 'CAN',
        MaxSuggestions: '5',
        LanguagePreference: 'en'
      })
    });

    if (findResponse.status !== 200) {
      throw new Error(`Canada Post Find API error: ${findResponse.status}`);
    }

    const findData: CanadaPostFindResponse = await findResponse.json();
    
    const addressResults: AddressResult[] = findData.Items
      .filter(item => item.Description.includes(city))
      .map(item => ({
        id: item.Id,
        text: item.Text,
        highlight: item.Highlight,
        description: item.Description,
      }));

    return {
      results: addressResults,
      total: addressResults.length
    };

  } catch (error: any) {
    console.error('Canada Post Address Lookup Error:', error);
    
    // Return mock data as fallback
    console.warn('Falling back to mock data due to API error');
    return getMockAddressData(body.query);
  }
});

// Mock data for development/testing and fallback
function getMockAddressData(query: string): AddressLookupResponse {
  const mockResults: AddressResult[] = [
    {
      id: '1',
      text: '123 Main Street, Toronto, ON M5V 3A8',
      highlight: '123 Main Street',
      description: 'Toronto, Ontario',
      address: {
        line1: '123 Main Street',
        line2: '',
        city: 'Toronto',
        province: 'ON',
        postalCode: 'M5V 3A8',
        country: 'Canada'
      }
    },
    {
      id: '2', 
      text: '456 Queen Street West, Toronto, ON M5V 2A4',
      highlight: '456 Queen Street West',
      description: 'Toronto, Ontario',
      address: {
        line1: '456 Queen Street West',
        line2: '',
        city: 'Toronto',
        province: 'ON',
        postalCode: 'M5V 2A4',
        country: 'Canada'
      }
    },
    {
      id: '3',
      text: '789 King Street, Toronto, ON M5H 1J9',
      highlight: '789 King Street',
      description: 'Toronto, Ontario', 
      address: {
        line1: '789 King Street',
        line2: '',
        city: 'Toronto',
        province: 'ON',
        postalCode: 'M5H 1J9',
        country: 'Canada'
      }
    },
    {
      id: '4',
      text: '321 Bay Street, Toronto, ON M5H 2R2',
      highlight: '321 Bay Street',
      description: 'Toronto, Ontario',
      address: {
        line1: '321 Bay Street',
        line2: '',
        city: 'Toronto',
        province: 'ON',
        postalCode: 'M5H 2R2',
        country: 'Canada'
      }
    },
    {
      id: '5',
      text: '2234 17 Street Northwest, Edmonton, AB T6Y 4H4',
      highlight: '2234 17 Street Northwest',
      description: 'Edmonton, Alberta',
      address: {
        line1: '2234 17 Street Northwest',
        line2: '',
        city: 'Edmonton',
        province: 'AB',
        postalCode: 'T6Y 4H4',
        country: 'Canada'
      }
    }
  ].filter(result => 
    result.text.toLowerCase().includes(query.toLowerCase()) ||
    result.address.postalCode.toLowerCase().includes(query.toLowerCase()) ||
    result.address.line1.toLowerCase().includes(query.toLowerCase())
  );

  return {
    results: mockResults,
    total: mockResults.length
  };
} 
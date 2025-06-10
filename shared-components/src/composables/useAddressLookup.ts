import { ref, type Ref, toRefs } from 'vue';

// Types for address lookup
interface AddressResult {
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

interface AddressFields {
  address: Ref<string>;
  city: Ref<string>;
  province: Ref<string>;
  postalCode: Ref<string>;
}

interface UseAddressLookupOptions {
  addressFields: AddressFields;
  cachePrefix?: string;
  debounceMs?: number;
  cacheExpiryMs?: number;
  detailsCacheExpiryMs?: number;
}

// Global caches - shared across all instances
const globalSuggestionsCache = new Map<string, AddressResult[]>();
const globalDetailsCache = new Map<string, AddressDetailsResponse['address']>();
const globalTimeouts = new Map<string, NodeJS.Timeout>();

export function useAddressLookup(options: UseAddressLookupOptions) {
  const {
    addressFields,
    cachePrefix = 'default',
    debounceMs = 300,
    cacheExpiryMs = 5 * 60 * 1000, // 5 minutes
    detailsCacheExpiryMs = 10 * 60 * 1000 // 10 minutes
  } = options;

  // Reactive state
  const suggestions = ref<AddressResult[]>([]);
  const loading = ref(false);

  // Generate unique cache keys
  const getSuggestionsCacheKey = (query: string) => `${cachePrefix}_suggestions_${query.toLowerCase().trim()}`;
  const getDetailsCacheKey = (addressId: string) => `${cachePrefix}_details_${addressId}`;
  const getTimeoutKey = () => `${cachePrefix}_timeout`;

  const searchAddresses = async (query: string) => {
    if (!query || query.length < 3) {
      suggestions.value = [];
      return;
    }

    // Check cache first
    const cacheKey = getSuggestionsCacheKey(query);
    if (globalSuggestionsCache.has(cacheKey)) {
      suggestions.value = globalSuggestionsCache.get(cacheKey) || [];
      return;
    }

    // Clear existing timeout for this instance
    const timeoutKey = getTimeoutKey();
    if (globalTimeouts.has(timeoutKey)) {
      clearTimeout(globalTimeouts.get(timeoutKey));
    }

    // Debounce the search
    const timeout = setTimeout(async () => {
      loading.value = true;
      try {
        const response = await $fetch('/api/address-lookup', {
          method: 'POST',
          body: { query }
        }) as { results: AddressResult[] };

        const results = response.results || [];
        suggestions.value = results;

        // Cache the results
        globalSuggestionsCache.set(cacheKey, results);
        setTimeout(() => {
          globalSuggestionsCache.delete(cacheKey);
        }, cacheExpiryMs);

      } catch (error) {
        console.error('Address lookup error:', error);
        suggestions.value = [];
      } finally {
        loading.value = false;
        globalTimeouts.delete(timeoutKey);
      }
    }, debounceMs);

    globalTimeouts.set(timeoutKey, timeout);
  };

  const selectAddress = async (selectedItem: unknown) => {
    // Handle when user types freely vs selects from dropdown
    if (typeof selectedItem === 'string') {
      addressFields.address.value = selectedItem;
      return;
    }

    const addressItem = selectedItem as AddressResult;
    if (!addressItem || !addressItem.id) {
      return;
    }

    // If we already have full address details (from mock data), use them directly
    if (addressItem.address) {
      addressFields.address.value = addressItem.address.line1;
      addressFields.city.value = addressItem.address.city;
      addressFields.province.value = addressItem.address.province;
      addressFields.postalCode.value = addressItem.address.postalCode;
      return;
    }

    // Check cache for address details
    const detailsCacheKey = getDetailsCacheKey(addressItem.id);
    if (globalDetailsCache.has(detailsCacheKey)) {
      const cachedAddress = globalDetailsCache.get(detailsCacheKey)!;
      addressFields.address.value = cachedAddress.line1;
      addressFields.city.value = cachedAddress.city;
      addressFields.province.value = cachedAddress.province;
      addressFields.postalCode.value = cachedAddress.postalCode;
      return;
    }

    // Fetch full address details only when user selects an address
    loading.value = true;
    try {
      const response = await $fetch('/api/address-retrieve', {
        method: 'POST',
        body: { addressId: addressItem.id }
      }) as AddressDetailsResponse;

      if (response && response.address) {
        const addressData = response.address;

        // Auto-fill the address fields
        addressFields.address.value = addressData.line1;
        addressFields.city.value = addressData.city;
        addressFields.province.value = addressData.province;
        addressFields.postalCode.value = addressData.postalCode;

        // Cache the address details
        globalDetailsCache.set(detailsCacheKey, addressData);
        setTimeout(() => {
          globalDetailsCache.delete(detailsCacheKey);
        }, detailsCacheExpiryMs);
      }
    } catch (error) {
      console.error('Address retrieve error:', error);
      // Fallback: try to extract info from the display text
      const text = addressItem.text || '';
      addressFields.address.value = text;
    } finally {
      loading.value = false;
    }
  };

  // Cleanup function to clear timeouts
  const cleanup = () => {
    const timeoutKey = getTimeoutKey();
    if (globalTimeouts.has(timeoutKey)) {
      clearTimeout(globalTimeouts.get(timeoutKey));
      globalTimeouts.delete(timeoutKey);
    }
  };

  return {
    // Reactive state - direct refs for template
    suggestions,
    loading,
    
    // Functions
    searchAddresses,
    selectAddress,
    cleanup,
    
    // Cache management (for debugging/advanced use)
    clearCache: () => {
      // Clear only this instance's cache entries
      Array.from(globalSuggestionsCache.keys())
        .filter(key => key.startsWith(`${cachePrefix}_suggestions_`))
        .forEach(key => globalSuggestionsCache.delete(key));
      
      Array.from(globalDetailsCache.keys())
        .filter(key => key.startsWith(`${cachePrefix}_details_`))
        .forEach(key => globalDetailsCache.delete(key));
    }
  };
} 
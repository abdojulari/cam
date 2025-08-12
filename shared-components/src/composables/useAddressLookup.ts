import { ref } from 'vue';
import { 
  UseAddressLookupOptions, 
  AddressResult 
} from '../types/address';
import { AddressDetailsResponse } from '../types/address';

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
  const isMenuOpen = ref(false);

  const searchAddresses = async (query: string, city?: string) => {
    if (!query || query.length < 3) {
      suggestions.value = [];
      isMenuOpen.value = false;
      return;
    }

    // Debounce the search
    setTimeout(async () => {
      loading.value = true;
      try {
        const response = await $fetch('/api/address-lookup', {
          method: 'POST',
          body: { query, city }
        }) as { results: AddressResult[] };

        const results = response.results || [];
        // map over results and concat text and description
        suggestions.value = results.map(result => ({
          ...result,
          text: `${result.text} ${result.description ? `- ${result.description}` : ''}`
        }));
        
        // Open the dropdown when we have results
        if (results.length > 0) {
          isMenuOpen.value = true;
        }
      } catch (error) {
        console.error('Address lookup error:', error);
        suggestions.value = [];
      } finally {
        loading.value = false;
      }
    }, debounceMs);
  };

  const selectAddress = async (selectedItem: unknown) => {
    // Close the menu when an item is selected
    isMenuOpen.value = false;
    
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

  // Cleanup function to clear timeouts (no cache to clear now)
  const cleanup = () => {};

  // Function to manually control menu state
  const openMenu = () => {
    if (suggestions.value.length > 0) {
      isMenuOpen.value = true;
    }
  };

  const closeMenu = () => {
    isMenuOpen.value = false;
  };

  return {
    // Reactive state - direct refs for template
    suggestions,
    loading,
    isMenuOpen,
    
    // Functions
    searchAddresses,
    selectAddress,
    cleanup,
    openMenu,
    closeMenu
  };
} 
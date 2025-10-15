import { ref } from 'vue';
import { UseAddressLookupOptions, AddressResult } from '../types/address';
import { AddressDetailsResponse } from '../types/address';

export function useAddressLookup(options: UseAddressLookupOptions) {
  const { addressFields, debounceMs = 300 } = options;

  // Reactive state
  const suggestions = ref<AddressResult[]>([]);
  const loading = ref(false);
  const isMenuOpen = ref(false);
  let searchDebounceHandle: ReturnType<typeof setTimeout> | null = null;
  let suppressSearch = false;

  const searchAddresses = async (query: string, city?: string) => {
    // Clear any pending debounced searches before scheduling a new one
    if (searchDebounceHandle) {
      clearTimeout(searchDebounceHandle);
      searchDebounceHandle = null;
    }
    // Skip lookups when we are programmatically updating fields due to a selection
    if (suppressSearch) {
      return;
    }
    if (!query || query.length < 3) {
      suggestions.value = [];
      isMenuOpen.value = false;
      return;
    }

    // Debounce the search
    searchDebounceHandle = setTimeout(async () => {
      loading.value = true;
      try {
        const response = (await $fetch('/api/address-lookup', {
          method: 'POST',
          body: { query, city },
        })) as { results: AddressResult[] };

        const results = response.results || [];
        // map over results and concat text and description
        suggestions.value = results.map((result) => ({
          ...result,
          text: `${result.text} ${
            result.description ? `- ${result.description}` : ''
          }`,
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
    // Prevent any pending lookup from firing after a selection
    if (searchDebounceHandle) {
      clearTimeout(searchDebounceHandle);
      searchDebounceHandle = null;
    }

    // Handle when user types freely vs selects from dropdown
    if (typeof selectedItem === 'string') {
      addressFields.address.value = selectedItem;
      // Ensure searches are allowed while typing freeform
      suppressSearch = false;
      return;
    }

    const addressItem = selectedItem as AddressResult;
    if (!addressItem || !addressItem.id) {
      // Nothing selected; keep searches enabled for future typing
      suppressSearch = false;
      return;
    }

    // Close the menu immediately when a valid item is selected
    isMenuOpen.value = false;

    // If we already have full address details (from mock data), use them directly
    // if (addressItem.address) {
    //   // Temporarily suppress searches while we programmatically update fields
    //   suppressSearch = true;
    //   addressFields.address.value = addressItem.address.line1;
    //   addressFields.city.value = addressItem.address.city;
    //   addressFields.province.value = addressItem.address.province;
    //   addressFields.postalCode.value = addressItem.address.postalCode;
    //   // Ensure menu stays closed and re-enable searches after updates settle
    //   setTimeout(() => {
    //     isMenuOpen.value = false;
    //     suppressSearch = false;
    //   }, 50);
    //   return;
    // }

    // Fetch full address details only when user selects an address
    suppressSearch = true;
    loading.value = true;
    try {
      const response = (await $fetch('/api/address-retrieve', {
        method: 'POST',
        body: { addressId: addressItem.id },
      })) as AddressDetailsResponse;

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
      // Force menu closed and re-enable searches after all updates settle
      setTimeout(() => {
        isMenuOpen.value = false;
        suppressSearch = false;
      }, 50);
    }
  };

  // Cleanup function to clear timeouts (no cache to clear now)
  const cleanup = () => {
    if (searchDebounceHandle) {
      clearTimeout(searchDebounceHandle);
      searchDebounceHandle = null;
    }
  };

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
    closeMenu,
  };
}

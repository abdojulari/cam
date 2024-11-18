// services/api-service.ts

export const apiService = {
    async fetchBarcode() {
      try {
        const response = await fetch('http://cre.test/api/barcode', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        return data.barcode;
      } catch (err) {
        console.error('Error fetching barcode:', err);
        throw new Error('Failed to fetch barcode');
      }
    },
  
    async authenticate(body: any) {
      try {
        const response = await fetch('/api/authenticate', {
          method: 'POST',
          body: JSON.stringify(body),
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        });
        return await response.json();
      } catch (err) {
        console.error('Error during authentication:', err);
        throw new Error('Authentication failed');
      }
    },
  
    async externalApiCall() {
      try {
        await fetch('/api/external-api', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });
      } catch (err) {
        console.error('Error calling external API:', err);
        throw new Error('External API call failed');
      }
    },
};
  
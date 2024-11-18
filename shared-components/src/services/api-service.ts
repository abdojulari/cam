// services/api-service.ts

export const apiService = {
    async fetchBarcode() {
      try {
        const response = await fetch('/api/barcode', {
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
    async registration(payload: any) {
      try {
        const response = await fetch('/api/registration', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firstname: payload.data.biodata.firstname,
                lastname: payload.data.biodata.lastname,
                middlename: payload.data.biodata.middlename,
                dateofbirth: payload.data.biodata.dateofbirth,
                address: payload.data.contact.street,
                city: payload.data.contact.city,
                province: payload.data.contact.province,
                postalcode: payload.data.contact.postalcode,
                phone: payload.data.contact.phone,
                email: payload.data.contact.email,
                profile: payload.data.profile,
                password: payload.data.password,
                confirmPassword: payload.data.confirmPassword,
                barcode: payload.data.barcode,
                careof: payload.data.careof,
                category5: payload.data.consent
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to submit form');
        }
        
        return await response.json();
        
      } catch (error) {
          console.error('Error during form submission:', error);
          alert('There was an issue submitting the form.');
          return;
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
    async initializeToken() {
      try {
        const response = await fetch('/api/getToken', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        }
        });

        if (!response.ok) {
        throw new Error('Failed to fetch token');
        }
        return await response.json();
      } catch (err: any) {
          console.log(err.message as string);
      }
    },
    async externalApiCall() {
      try {
        const response = await fetch('/api/external-api', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        return await response.json();
      } catch (err) {
        console.error('Error calling external API:', err);
        throw new Error('External API call failed');
      }
    },
};
  
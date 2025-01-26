// services/api-service.ts
import { getCookie } from '../composables/get-cookies';

export const apiService = {
    async fetchBarcode() {
      try {
        const response = await fetch('/api/get-barcode', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.barcode;
        } catch (error) {
            console.error('Error getting barcode:', error);
            throw error;
        }
    },
    async registration(payload: any) { 
      try {
        const access_token = getCookie('access_token');
        const response = await fetch('/api/registration', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization' :`Bearer ${access_token}`,
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
          credentials: 'include',
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
      } catch (error) {
          console.error('Error submitting the form:', error);
          throw error;
      }
  
    },
    async authenticate(body: unknown) {
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
          const client_secret = import.meta.env.VITE_CLIENT_SECRET;
          const client_id = import.meta.env.VITE_CLIENT_ID;
         
          const response = await $fetch('/api/get-token', { 
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Accept': 'application/json'
            },
            body: new URLSearchParams({
              client_id: client_id,
              client_secret: client_secret,
              grant_type: 'client_credentials'
            }).toString(), 
          });
          const data = await response as { access_token: string };
          if (data) {
              document.cookie = `access_token=${ import.meta.env.NODE_ENV === 'development' ? data : data.access_token}; path=/;`;
          }
          return data;
      } catch (error) {
          console.error('Token retrieval failed', error);
          throw error;
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
  
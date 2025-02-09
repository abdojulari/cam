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
                'X-CRE-Token' : import.meta.env.VITE_CUSTOM_SECURITY_TOKEN,
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
        const response = await fetch('/api/customer-auth', {
          method: 'POST',
          body: JSON.stringify(body),
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        return data;
      } catch (err) {
        console.error('Error during authentication:', err);
        throw new Error('Authentication failed');
      }
    },
    async initializeToken() {
      try {
          const body = new URLSearchParams({
              client_id: import.meta.env.VITE_CLIENT_ID,
              client_secret: import.meta.env.VITE_CLIENT_SECRET,
              grant_type: 'client_credentials'
          }).toString();

          const response = await $fetch('/api/get-token', { 
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Accept': 'application/json'
            },
            body: import.meta.env.DEV ? body : null
          });
          const data = await response as { access_token: string };
          if (data) {
              document.cookie = `access_token=${ import.meta.env.DEV ? data : data.access_token}; path=/;`;
          }
          return data?.access_token;
      } catch (error) {
          console.error('Token retrieval failed');
          throw error;
      }
    },
    async sanctumToken() {
      try {
        const response = await $fetch('/api/cre-login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        });
        
        const data = await response as { sanctum_token: string };
        
        if (data) {
            document.cookie = `x-sanctum-token=${ import.meta.env.DEV ? data : data.sanctum_token}; path=/;`;
        }
        return 'success';
      } catch (err) {
        console.error('Error during Sanctum token generation:');
        throw new Error('Sanctum token generation failed');
      }
    }
};
  
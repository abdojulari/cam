// services/api-service.ts
import { getCookie } from '../composables/get-cookies';

export const apiService = {
    async fetchBarcode() {
      const config = useRuntimeConfig();
      const url = `${config.public.CRE_BARCODE_URL}`;
      const headers = {
          'Content-Type': 'application/json'
      };
  
      try {
          const response = await fetch(url, {
              method: 'GET',
              headers,
              credentials: 'include',
              mode: 'cors'
          });
          const data = await response.json();
          return data.barcode;

      } catch (error) {
          return { error: (error as Error).message }; 
      }
    },
    async registration(payload: any) {
      const config = useRuntimeConfig();
      const url = `${config.public.CRE_DUPLICATE_URL}`;
      const access_token = getCookie('access_token');
      const body = JSON.stringify({
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
      });
    
      const headers = {
          'Accept': 'application/json',
          'Authorization' :`Bearer ${access_token}`,
          'Content-Type': 'application/json',
      };

      try {
          const response = await fetch(url, {
              method: 'POST',
              headers,
              body,
              credentials: 'include',
              mode: 'cors'
          });
          const data = await response.json();
          return data;
      } catch (error) {
            return { error: (error as Error).message };
        }
    },
    async authenticate(body: unknown) {
      const config = useRuntimeConfig();
      try {
        const response = await fetch(`${config.public.baseUrl}/authenticate`, {
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
      const config = useRuntimeConfig();
      const body = new URLSearchParams({
        client_id: config.public.CLIENT_ID,
        client_secret: config.public.CLIENT_SECRET,
        grant_type: "client_credentials"
      }).toString();
      
      const url = `${config.public.tokenUrl}`;
      const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      };

      const test = await fetch(`${config.public.baseUrl}/get-token`, {
        method: 'POST',
        headers,
        body,
        credentials: 'include',
        mode: 'cors'
      });
      const data = await test.json();
      console.log('test', data.access_token);

      try {
          const response = await fetch(url, {
              method: 'POST',
              headers,
              body,
              credentials: 'include',
              mode: 'cors'
          });
          const data = await response.json()
          
          if (data.access_token) {
              document.cookie = `access_token=${data.access_token}; path=/;`;
          }
          return data;
      }
      catch (error) {
        console.error(
          'Request failed:', 
          {error });
      }
    },
    async externalApiCall() {
      const config = useRuntimeConfig();
      try {
        const response = await fetch(`${config.public.baseUrl}/external-api`, {
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
  
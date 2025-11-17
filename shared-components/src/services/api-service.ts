// services/api-service.ts
import { getCookie } from '../composables/get-cookies';
import {dateFormat} from '../composables/dateFormat';

export const apiService = {
    async registration(payload: any) { 
      try {
        const access_token = getCookie('access_token');
        const formattedDateOfBirth = dateFormat(payload.data.biodata.dateofbirth);
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
              dateofbirth: formattedDateOfBirth,
              address: payload.data.contact.street,
              city: payload.data.contact.city,
              province: payload.data.contact.province,
              postalcode: payload.data.contact.postalcode,
              phone: payload.data.contact.phone,
              email: payload.data.contact.email,
              profile: payload.data.profile,
              password: payload.data.password,
              confirmPassword: payload.data.confirmPassword,
              careof: payload.data.careof,
              category5: payload.data.consent ? payload.data.consent : 'ENOCONSENT',
              source: 'OLR'
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
          const response = await $fetch('/api/get-token', { 
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Accept': 'application/json'
            }
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
        // cookie expires in 1 hour
        const expires = new Date();
        expires.setHours(expires.getHours() + 1);
        const data = await response as { sanctum_token: string };

        if (data) {
            document.cookie = `x-sanctum-token=${ 
              import.meta.env.DEV ? data : data.sanctum_token}; path=/; expires=${expires.toUTCString()};`;
        }
        
        return 'success';
      } catch (err) {
        console.error('Error during Sanctum token generation:');
        throw new Error('Sanctum token generation failed');
      }
    },
    async reproducibleData(params: any) {
      const response = await $fetch('/api/reproducible-data', {
        method: 'POST',
        body: JSON.stringify(params),
      });
      return response;
    },
    async quickDuplicate(params: any) {
        const response = await $fetch('/api/quick-duplicate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(params),
        });
        console.log('response from quick duplicate: ', response);
        const data = await response;
    
        return data;
    },
    async overrideDuplicate(params: any) {
      const response = await $fetch('/api/override', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });
      return await response;
    },
    async lookupByBarcode(params: any) {
      const response = await $fetch('/api/barcode-lookup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });
      return await response;
    },
    async getBarcode() {
      const response = await $fetch('/api/get-barcode', {
        method: 'GET',
      });
      return await response;
    }, 
    async postUserData(payload: any) { 
      try {
        const access_token = getCookie('access_token');
        const formattedDateOfBirth = dateFormat(payload.dateOfBirth);
       
        const response = await fetch('/api/registration', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization' :`Bearer ${access_token}`,
                'X-CRE-Token' : import.meta.env.VITE_CUSTOM_SECURITY_TOKEN,
            },
            body: JSON.stringify({
              firstname: payload?.firstName,
              lastname: payload?.lastName,
              middlename: payload?.middleName,
              dateofbirth: formattedDateOfBirth,
              library: payload?.library,
              address: payload?.address,
              city: payload?.city,
              province: payload?.province,
              postalcode: payload?.postalCode,
              phone: payload?.phoneNumber,
              email: payload?.emailAddress,
              profile: payload?.profileType,
              password: payload?.password,
              confirmPassword: payload?.confirmPassword,
              careof: payload?.careOf,
              category5: payload?.selectedEmailConsent ? payload?.selectedEmailConsent : 'ENOCONSENT',
              preferredname: payload?.preferredName,
              usepreferredname: payload?.usePreferredName,
              emailconsent: payload?.selectedEmailConsent,
              address2: payload?.address2,
              city2: payload?.city2,
              province2: payload?.province2,
              postalcode2: payload?.postalCode2,  
              barcode: payload?.libraryCardBarcode,
              category1: payload?.selectedIndigenousStatus,
              homeBranchName: payload?.homeBranchName,
              homeBranchLink: payload?.homeBranchLink,
              source: payload?.source || 'CRP'
          }),
          credentials: 'include',
        });
      
        const data = await response.json();
        console.log('data: ', data);
        if (data?.conflict && data?.status === 409) {
          console.log('Conflicting record:', data);
          return data;
        }
        console.log('Record submitted successfully:', data);
        return data;
        
      } catch (error) {
          console.error('Error submitting the form:', error);
          throw error;
      }
  
    },
    async dashboardData(filters = {}) {
      const queryParams = new URLSearchParams(filters).toString();
      const url = queryParams ? `/api/dashboard?${queryParams}` : '/api/dashboard';
      
      const response = await $fetch(url, {
        method: 'GET',
      });
      return await response;
    }

};
  
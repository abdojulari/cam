import { 
    createError, 
    defineEventHandler, 
    EventHandlerRequest, 
    H3Event, 
    readBody, 
    setCookie 
} from "h3";

export default defineEventHandler(async (event: H3Event<EventHandlerRequest>) => {
    const config = await useRuntimeConfig(event);
    
    // Create the form data exactly as it was working in the frontend
    const formData = new URLSearchParams();
    formData.append('grant_type', 'client_credentials');
    formData.append('client_id', config.private.client_id);
    formData.append('client_secret', config.private.client_secret);

    const url = config.public.NODE_ENV === 'development' ? config.public.tokenUrl : config.private.tokenUrl;
    
    try {
        // Debug what's being sent
        console.log('Request URL:', url);
        console.log('Form Data:', formData.toString());
        
        const response = await $fetch(url, {
            method: 'POST',
            body: formData.toString(), // Send as string
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        setCookie(event, 'access_token', response.access_token, {
            path: '/',
            maxAge: response.expires_in || 3600
        });

        return response.access_token;
    }
    catch (error) {
        console.error('Token error details:', error);
        throw createError({
            statusCode: 500,
            message: 'Token retrieval failed'
        });
    }
});
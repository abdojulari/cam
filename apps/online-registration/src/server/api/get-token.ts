import { 
    createError, 
    defineEventHandler, 
    EventHandlerRequest, 
    H3Event, 
    readBody, 
    setCookie 
} from "h3";

export default defineEventHandler(async (event: H3Event<EventHandlerRequest>) => {
    const config  = await useRuntimeConfig(event);
    //const body = await readBody(event);
     // Create form data string directly
    const formData = new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: `${config.private.client_id}`,
        client_secret: `${config.private.client_secret}`,
    }).toString();
    const url = config.public.NODE_ENV === 'development' ? config.public.tokenUrl : config.private.tokenUrl ;
    
    try {
        const response = await fetch(url,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formData
        });

        const data = await response.json();
        setCookie(event, 'access_token', data.access_token, {
            path: '/',
            maxAge: data.expires_in || 3600 // Use token expiration or default to 1 hour
        });

        return data.access_token;
    }
    catch (error) {
        throw createError({
            statusCode: 500,
            message: 'Token retrieval failed'
        });
    }
});
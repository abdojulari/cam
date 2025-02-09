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
    const payload = new URLSearchParams({
        client_id: config.private.clientId,
        client_secret: config.private.clientSecret,
        grant_type: 'client_credentials'
    }).toString()
    const body = await readBody(event);
    
    const url = config.public.NODE_ENV === 'development' ? config.public.tokenUrl : config.private.tokenUrl ;
    try {
        const response = await $fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: config.public.NODE_ENV === 'development' ? new URLSearchParams(body).toString() : payload 
        });

        setCookie(event, 'access_token', response.access_token, {
            path: '/',
            maxAge: response.expires_in || 3600 // Use token expiration or default to 1 hour
        });
       
        return await response.access_token;
    }
    catch (error) {
        throw createError({
            statusCode: error.response.status || 500,
            message: 'Token retrieval failed'
        });
    }
});
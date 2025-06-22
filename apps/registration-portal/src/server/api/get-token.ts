import { 
    createError, 
    defineEventHandler, 
    EventHandlerRequest, 
    H3Event, 
    readBody, 
    setCookie 
} from "h3";
import { $fetch } from 'ofetch';

export default defineEventHandler(async (event: H3Event<EventHandlerRequest>) => {
    const config  = await useRuntimeConfig(event);
    const payload = new URLSearchParams({
        client_id: config.private.CLIENT_ID,
        client_secret: config.private.CLIENT_SECRET,
        grant_type: 'client_credentials'
    }).toString()
    
    const url = config.private.tokenUrl;
    try {
        const response = await $fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: payload 
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
import { 
    defineEventHandler, 
    EventHandlerRequest, 
    H3Event, 
    setCookie
} from "h3";

export default defineEventHandler(async (event: H3Event<EventHandlerRequest>) => {
    const config = useRuntimeConfig(event).private;
    const url = config.VITE_CRE_AUTH_URL;
    const body = JSON.stringify({
        email: config.VITE_CRE_LOGIN,
        password: config.VITE_CRE_PASSWORD,
    });

    try {
        const response = await $fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(body),
            },
            body: body
        });
        
        setCookie(event, 'x-sanctum-token', response.sanctum_token, { 
            path: '/',
            maxAge: response.expires_in || 3600
        });
       
        return response.sanctum_token;
    } catch (error) {
        return { error: 'Unable to verify the authenticity!' }; 
    }
});
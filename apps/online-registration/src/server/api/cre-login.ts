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
            },
            body: body
        });
        setCookie(event, 'x-sanctum-token', response.sanctum_token, { 
            path: '/',
            maxAge: response.expires_in || 3600
        });
        console.log('BODY:', body);
        console.log('CRE login response:', config.VITE_CRE_LOGIN);
        console.log('Sanctum token:', response);
        return response.sanctum_token;
    } catch (error) {
        console.error('Error during CRE login:', error);
        return { error: error.message }; 
    }
});
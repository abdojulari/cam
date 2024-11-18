import { 
    defineEventHandler, 
    EventHandlerRequest, 
    H3Event, 
    setCookie
} from 'h3';

export default defineEventHandler(async (event: H3Event<EventHandlerRequest>) => {
    const config = useRuntimeConfig(event);
    const url = `${config.public.tokenUrl}`;
    const body = new URLSearchParams({
        client_id: config.public.CLIENT_ID,
        client_secret: config.public.CLIENT_SECRET,
        grant_type: "client_credentials"
    }).toString();
    
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
    };

    try {
        const response = await $fetch(url, {
            method: 'POST',
            headers,
            body
        });
        const data = await response
        console.log(data.access_token);
        setCookie(event, 'access_token', data.access_token, { path: '/' });
        return data;
    } catch (error) {
        return { error: error.message };
    }
});

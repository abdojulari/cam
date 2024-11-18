import { 
    defineEventHandler, 
    EventHandlerRequest, 
    getCookie, 
    H3Event, 
    readBody
} from 'h3';

export default defineEventHandler(async (event: H3Event<EventHandlerRequest>) => {
    const config = useRuntimeConfig(event);
    const url = `${config.public.CRE_DUPLICATE_URL}`;
    const access_token = getCookie(event, 'access_token');
    const body  = await readBody(event);
    
    const headers = {
        'Accept': 'application/json',
        'Authorization' :`Bearer ${access_token}`,
    };

    try {
        const response = await $fetch(url, {
            method: 'POST',
            headers,
            body
        });
        const data = await response
        console.log(data);
        return data;
    } catch (error) {
        return { error: error.message };
    }
});

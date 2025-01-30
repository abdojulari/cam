import { 
    defineEventHandler, 
    EventHandlerRequest, 
    getCookie, 
    H3Event, 
    readBody 
} from "h3";

export default defineEventHandler(async (event: H3Event<EventHandlerRequest>) => {
    const config = useRuntimeConfig(event).private;
    const url = `${config.CRE_CUSTOMER_AUTH_URL}`;
    const access_token = getCookie(event, 'access_token');
    const body  = await readBody(event);
   
    try {
        const response = await $fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization' :`Bearer ${access_token}`,
                'Content-Type': 'application/json',
            },
            body,
        });
    
        return await response;
    
    } catch (error) {
        return { error: error.message }; 
    }

});
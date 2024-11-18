import { 
    defineEventHandler, 
    EventHandlerRequest, 
    H3Event
} from "h3";

export default defineEventHandler(async (event: H3Event<EventHandlerRequest>) => {
    const config = useRuntimeConfig(event);
    const url = `${config.public.CRE_BARCODE_URL}`;
    const headers = {
        'Content-Type': 'application/json'
    };

    try {
        const response = await $fetch(url, {
            method: 'GET',
            headers
        });
        const data = await response;
        return data;
    } catch (error) {
        return { error: error.message }; 
    }

});
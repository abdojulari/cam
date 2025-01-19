import { 
    createError,
    defineEventHandler, 
    EventHandlerRequest, 
    H3Event
} from "h3";

export default defineEventHandler(async (event: H3Event<EventHandlerRequest>) => {
    const url = "https://epl.bibliocommons.com/widgets/external_templates.json";
    const headers = {
        'Accept': 'application/json',
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
        console.error('Error fetching templates:', error);
        throw createError({
            statusCode: 500,
            statusMessage: error.message
        });
    }
});
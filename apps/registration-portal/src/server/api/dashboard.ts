import { 
    createError,
    defineEventHandler, 
    EventHandlerRequest, 
    H3Event,
    getQuery
} from "h3";

export default defineEventHandler(async (event: H3Event<EventHandlerRequest>) => {
    // @ts-ignore
    const config = useRuntimeConfig(event).private;
    const query = getQuery(event);
    
    // Build query string for external API
    const queryParams = new URLSearchParams();
    Object.keys(query).forEach(key => {
        if (query[key]) {
            queryParams.append(key, String(query[key]));
        }
    });
    
    const queryString = queryParams.toString();
    const url = queryString 
        ? `${config.STATISTIC_API_URL}?${queryString}`
        : `${config.STATISTIC_API_URL}`;
    
    console.log('URL', url);
    
    try {
        // @ts-ignore
        const response = await $fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        });

        if (!response) {
            console.error('Failed to extract data from the API:', await response);
            throw new Error(`Failed to extract data from the API ${response.status}`);
        }

        const data = await response;
        return data;
    }
    catch (error) {
        console.error('Error:', error);
        throw createError({
            statusCode: 500,
            statusMessage: 'Failed to extract data from the API'
        });
    }
});
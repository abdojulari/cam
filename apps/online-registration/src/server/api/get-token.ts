import { 
    defineEventHandler, 
    EventHandlerRequest, 
    H3Event,
    readBody
} from "h3";

export default defineEventHandler(async (event: H3Event<EventHandlerRequest>) => {
    // read the event payload and extract the token from cre
    const config = useRuntimeConfig(event);
    const url = `${config.public.tokenUrl}`;
    const bodyStr = await readBody(event);
    // Convert the body to a URL-encoded string if needed
    // Or use JSON depending on what the API expects
    const body = new URLSearchParams(bodyStr).toString(); 
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers,
            body,
            credentials: 'include',
        });
        console.log('response', response);
        return response.json();
    }
    catch (error) {
        return {
            status: 500,
            body: {
                error: 'Failed to get token',
                message: error.message
            }
        };
    }

});
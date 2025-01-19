// server/api/get-token.ts
import { 
    createError,
    defineEventHandler, 
    EventHandlerRequest, 
    H3Event,
    readBody
} from "h3";

export default defineEventHandler(async (event: H3Event<EventHandlerRequest>) => {
    const config = useRuntimeConfig(event);
    const url = `${config.public.tokenUrl}`;
    
    try {
        const body = await readBody(event);
        
        // Log the request details for debugging
        console.log('Requesting token from:', url);
        console.log('Request body:', body);

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams(body).toString()
        });

        if (!response.ok) {
            console.error('Token request failed:', await response.text());
            throw new Error(`Token request failed with status ${response.status}`);
        }

        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error('Token error:', error);
        throw createError({
            statusCode: 500,
            statusMessage: error.message
        });
    }
});
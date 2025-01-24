// server/api/registration.ts
import { 
    createError,
    defineEventHandler, 
    EventHandlerRequest, 
    getCookie, 
    H3Event,
    readBody
} from "h3";

export default defineEventHandler(async (event: H3Event<EventHandlerRequest>) => {
    const config = useRuntimeConfig(event);
    const url = `${config.private.CRE_DUPLICATE_URL}`;
    
    try {
        const body = await readBody(event);
        const access_token = getCookie(event, 'access_token', );
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization' :`Bearer ${access_token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            console.error('Failed to post to ILS:', await response.text());
            throw new Error(`Posting to ILS failed ${response.status}`);
        }

        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error('Submission error:', error);
        throw createError({
            statusCode: 500,
            statusMessage: error.message
        });
    }
});
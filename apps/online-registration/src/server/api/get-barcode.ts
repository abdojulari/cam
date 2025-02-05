// server/api/get-token.ts
import { 
    createError,
    defineEventHandler, 
    EventHandlerRequest, 
    getCookie, 
    H3Event
} from "h3";

export default defineEventHandler(async (event: H3Event<EventHandlerRequest>) => {
    const config = useRuntimeConfig(event).private;
    const url = `${config.CRE_BARCODE_URL}`;
    const access_token = getCookie(event, 'access_token');
    
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization' :`Bearer ${access_token}`,
            }
        });

        if (!response.ok) {
            console.error('Barcode generation failed:', await response.text());
            throw new Error(`Barcode generation failed with status ${response.status}`);
        }

        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error('Barcode error:', error);
        throw createError({
            statusCode: 500,
            statusMessage: 'Barcode generation failed'
        });
    }
});
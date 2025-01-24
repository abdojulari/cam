// server/api/get-token.ts
import { 
    createError,
    defineEventHandler, 
    EventHandlerRequest, 
    H3Event
} from "h3";

export default defineEventHandler(async (event: H3Event<EventHandlerRequest>) => {
    const config = useRuntimeConfig(event).private;
    const url = `${config.CRE_BARCODE_URL}`;
    
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
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
            statusMessage: error.message
        });
    }
});
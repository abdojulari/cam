import { 
    defineEventHandler, 
    EventHandlerRequest, 
    H3Event,
    readBody
} from "h3";

export default defineEventHandler(async (event: H3Event<EventHandlerRequest>) => {
    // @ts-ignore
    const config = useRuntimeConfig(event);
    const url = `${config.private.CRE_STATISTICS_URL}`;
    
    try {
        const body = await readBody(event);
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        });
        
        const data = await response.json();
        return data;
    }
    catch (error) {  
        return { error: error.message }; 
    }
});
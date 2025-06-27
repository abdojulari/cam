// server/api/submit-lpass.ts
import { 
    defineEventHandler, 
    EventHandlerRequest, 
    getCookie, 
    H3Event,
    readBody
} from "h3";

export default defineEventHandler(async (event: H3Event<EventHandlerRequest>) => {
    // @ts-ignore
    const config = useRuntimeConfig(event);
    const url = `${config.private.LPASS_URL}`;
    
    try {
        const body = await readBody(event);
        const access_token = getCookie(event, 'access_token');
        const sanctum_token = getCookie(event, 'x-sanctum-token');
        console.log('LPASS body', body);
     
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization' :`Bearer ${access_token}`,
                'Content-Type': 'application/json',
                'X-Sanctum-Token' : sanctum_token
            },
            body: JSON.stringify(body)
        });
        console.log('response', response);
        if (!response.ok) {
            console.error('Failed to post to ILS:', await response.text());
            throw new Error(`Posting to ILS failed ${response.status}`);
        }

        const data = await response.json();
        return data;
    }
    catch (error) {   
        return { error: error.message }; 
    }
});
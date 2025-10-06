// server/api/registration.ts
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
    const url = `${config.private.CRE_DUPLICATE_URL}`;
    const token = `${config.private.VITE_CUSTOM_SECURITY_TOKEN}`;
    
    try {
        const body = await readBody(event);
        const access_token = getCookie(event, 'access_token');
        const sanctum_token = getCookie(event, 'x-sanctum-token');
     
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization' :`Bearer ${access_token}`,
                'Content-Type': 'application/json',
                'X-CRE-Token' : token,
                'X-Sanctum-Token' : sanctum_token
            },
            body: JSON.stringify(body)
        });
        if (!response.ok) {
            console.error('Failed to post to ILS:', await response.text());
            throw new Error(`Posting to ILS failed ${response.status}`);
        //    const responseText = await response.text();
        //     console.error('Failed to post to ILS:', responseText);
        //     throw new Error(`Posting to ILS failed ${response.status}: ${responseText}`);
          
        }

        const data = await response.json();
        return data;
    }
    catch (error) {
        if (error.response && error.response.status === 429) {
            // Handle rate limit exceeded
            console.error('Too many requests. Please try again later.');
        }
       
        return { error: error.message }; 
    }
});
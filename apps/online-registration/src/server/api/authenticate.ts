import { 
    defineEventHandler, 
    EventHandlerRequest, 
    getCookie, 
    H3Event, 
    readBody 
} from "h3";
import { extractUserInfo } from "../util/dataCleaner";

export default defineEventHandler(async (event: H3Event<EventHandlerRequest>) => {
    const config = useRuntimeConfig(event);
    const url = `${config.public.apiBase}${config.public.user}`;
    const sessionToken = getCookie(event, 'sessionToken');
    const body  = await readBody(event);
    const patronKeyUrl = `${config.public.apiBase}${config.public.PATRON_USER}`;
    // Define headers
    const headers = {
        'X-sirs-sessionToken': sessionToken,
        'x-sirs-clientID': config.public.SYMWSCLIENTID,
        'SD-Originating-App-Id': config.public.APPS_ID,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };
    let patronKey = '';
    try {
        const response = await $fetch(url, {
            method: 'POST',
            headers,
            body,
        });
        
        if (response.patronKey) {
            patronKey = response.patronKey;
        }
        const responseData = await $fetch(patronKeyUrl + patronKey+'?includeFields=*,address1', {
            method: 'GET',
            headers
        });
        const userInfo = extractUserInfo(responseData);
        return userInfo;
    } catch (error) {
        return { error: error.message }; 
    }

});
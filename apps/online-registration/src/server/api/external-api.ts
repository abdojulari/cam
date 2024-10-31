import { 
    defineEventHandler, 
    EventHandlerRequest, 
    H3Event, 
    setCookie
} from "h3";
import { apiClient } from "../util/fetch";

export default defineEventHandler(async (event: H3Event<EventHandlerRequest>) => {
    const config = useRuntimeConfig(event);
    // Construct the URL from the config
    const url = `${config.public.apiBase}${config.public.ENDPOINT}`;
    // Create the body with login and password
    const body = new URLSearchParams({
        login: config.public.SYMWS_USER,
        password: config.public.SYMWS_PASS,
    }).toString();

    // Define headers
    const headers = {
        'Accept': 'application/json',
        'X-sirs-clientID': config.public.SYMWSCLIENTID,
        'Content-Type': 'application/x-www-form-urlencoded',
    };

    try {
        const response = await apiClient(event, { url, method: 'POST', body, headers });
        setCookie(event, 'sessionToken', response.sessionToken, { path: '/' });
        return response;
    } catch (error) {
        return { error: error.message }; 
    }
});
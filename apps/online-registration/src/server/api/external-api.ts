import { 
    defineEventHandler, 
    EventHandlerRequest, 
    H3Event, 
    setCookie
} from "h3";
import { apiClient } from "../util/fetch";

export default defineEventHandler(async (event: H3Event<EventHandlerRequest>) => {
    const config = useRuntimeConfig(event).private;
    const url = `${config.apiBase}${config.ENDPOINT}`;
    const body = new URLSearchParams({
        login: config.SYMWS_USER,
        password: config.SYMWS_PASS,
    }).toString();
    const headers = {
        'Accept': 'application/json',
        'X-sirs-clientID': config.SYMWSCLIENTID,
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
import { 
    defineEventHandler, 
    EventHandlerRequest, 
    H3Event, 
    setCookie
} from "h3";
import { apiClient } from "../util/fetch";

export default defineEventHandler(async (event: H3Event<EventHandlerRequest>) => {
    const config = useRuntimeConfig(event).private;
    const url = config.VITE_CRE_AUTH_URL;
    const body = JSON.stringify({
        email: config.VITE_CRE_LOGIN,
        password: config.VITE_CRE_PASSWORD,
    });
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    };

    try {
        const response = await apiClient(event, { url, method: 'POST', body, headers });
        setCookie(event, 'x-sanctum-token', await response.sanctum_token, { path: '/' });
        console.log('Sanctum token:', await response.sanctum_token);
        return response.sanctum_token;
    } catch (error) {
        return { error: 'Unable to generate token' }; 
    }
});
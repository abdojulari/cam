import { createError, defineEventHandler, EventHandlerRequest, H3Event, readBody, setCookie } from "h3";

// export default defineEventHandler(async (event: H3Event<EventHandlerRequest>) => {
//     const { config } = await useRuntimeConfig(event).private;
//     const body = await readBody(event);
 
//     try {
//         const response = await $fetch(config.tokenUrl, {
//             method: 'POST',
//             headers: {
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/x-www-form-urlencoded'
//             },
//             body: body
//         });

//         setCookie(event, 'access_token', response.access_token, {
//             path: '/',
//             maxAge: response.expires_in || 3600 // Use token expiration or default to 1 hour
//         });

//         return response.access_token;
//     }
//     catch (error) {
//         throw createError({
//             statusCode: 500,
//             message: error.message
//         });
//     }
// });

import { apiClient } from "../util/fetch";

export default defineEventHandler(async (event: H3Event<EventHandlerRequest>) => {
    const { config } = useRuntimeConfig(event);
    const url = config.private.tokenUrl;
    const body = new URLSearchParams({
        client_id: config.private.CLIENT_ID,
        client_secret: config.private.CLIENT_SECRET,
        grant_type: 'client_credentials'
    }).toString();
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
    };

    try {
        const response = await apiClient(event, { url, method: 'POST', body, headers });
        setCookie(event, 'access_token', response.access_token, { path: '/' });
        return response.access_token;
    } catch (error) {
        return { error: error.message }; 
    }
});
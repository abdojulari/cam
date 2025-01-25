// // server/api/get-token.ts
// import { 
//     createError,
//     defineEventHandler, 
//     EventHandlerRequest, 
//     H3Event,
//     readBody
// } from "h3";

import { createError, defineEventHandler, EventHandlerRequest, H3Event, setCookie } from "h3";

// export default defineEventHandler(async (event: H3Event<EventHandlerRequest>) => {
//     const config = useRuntimeConfig(event).private;
//     const url = `${config.tokenUrl}`;
//     const body =  new URLSearchParams({
//         client_id: config.CLIENT_ID,
//         client_secret: config.CLIENT_SECRET,
//         grant_type: "client_credentials",
//     }).toString();
//     try {
//         const response = await fetch(url, {
//             method: 'POST',
//             headers: {
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/x-www-form-urlencoded'
//             },
//             body: body
//         });

//         if (!response.ok) {
//             console.error('Token request failed:', await response.text());
//             throw new Error(`Token request failed with status ${response.status}`);
//         }

//         const data = await response.json();
//         return data;
//     }
//     catch (error) {
//         console.error('Token error:', error);
//         throw createError({
//             statusCode: 500,
//             statusMessage: error.message
//         });
//     }
// });


export default defineEventHandler(async (event: H3Event<EventHandlerRequest>) => {
    const config = useRuntimeConfig(event).private;
    
    try {
        const response = await fetch(config.tokenUrl, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                client_id: config.CLIENT_ID,
                client_secret: config.CLIENT_SECRET,
                grant_type: "client_credentials"
            }).toString()
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw createError({
                statusCode: response.status,
                statusMessage: errorText
            });
        }

        const data = await response.json();
        
        // Optional: Set secure HttpOnly cookie
        setCookie(event, 'access_token', data.access_token, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            path: '/'
        });

        return { success: true };
    }
    catch (error) {
        console.error('Token error:', error);
        throw createError({
            statusCode: 500,
            statusMessage: error.message
        });
    }
});
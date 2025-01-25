import { createError, defineEventHandler, EventHandlerRequest, H3Event, readBody, setCookie } from "h3";
import crypto from 'crypto-js';
const secretKey = process.env.SECRET_KEY;
// Decrypt function
const decrypt = (encryptedText: any) => {
    const bytes = crypto.AES.decrypt(encryptedText, secretKey);
    return bytes.toString(crypto.enc.Utf8);
};

export default defineEventHandler(async (event: H3Event<EventHandlerRequest>) => {
    const { config } = await useRuntimeConfig(event).private;
    const data = await readBody(event);
    const body = {
        client_id: decrypt(data.client_id) || config.CLIENT_ID,
        client_secret: decrypt(data.client_secret) || config.CLIENT_SECRET,
        grant_type: data.grant_type || 'client_credentials'
    };
    
    try {
        const response = await $fetch(config.tokenUrl, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: JSON.stringify(body)
        });

        setCookie(event, 'access_token', response.access_token, {
            path: '/',
            maxAge: response.expires_in || 3600 // Use token expiration or default to 1 hour
        });

        return response.access_token;
    }
    catch (error) {
        throw createError({
            statusCode: 500,
            message: error.message
        });
    }
});
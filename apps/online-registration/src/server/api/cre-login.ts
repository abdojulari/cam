import { defineEventHandler, EventHandlerRequest, H3Event, setCookie } from "h3";

export default defineEventHandler(async (event: H3Event<EventHandlerRequest>) => {
    const config = useRuntimeConfig(event);
    
    // Debug log to verify config access
    console.log('Config check:', {
        authUrl: config.private.VITE_CRE_AUTH_URL,
        login: config.private.VITE_CRE_LOGIN,
        // Don't log actual password, just check if exists
        hasPassword: !!config.private.VITE_CRE_PASSWORD
    });

    // Validate required config
    if (!config.private.VITE_CRE_LOGIN || !config.private.VITE_CRE_PASSWORD || !config.private.VITE_CRE_AUTH_URL) {
        console.error('Missing required configuration:', {
            hasLogin: !!config.private.VITE_CRE_LOGIN,
            hasPassword: !!config.private.VITE_CRE_PASSWORD,
            hasAuthUrl: !!config.private.VITE_CRE_AUTH_URL
        });
        return {
            error: true,
            message: 'Missing required server configuration'
        };
    }

    const body = JSON.stringify({
        email: config.private.VITE_CRE_LOGIN,
        password: config.private.VITE_CRE_PASSWORD
    });

    // Log request details (careful with sensitive data)
    console.log('Making request to:', config.private.VITE_CRE_AUTH_URL);
    console.log('Request body contains email:', !!config.private.VITE_CRE_LOGIN);

    try {
        const response = await $fetch(config.private.VITE_CRE_AUTH_URL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body
        });

        console.log('Response received:', {
            success: !!response,
            hasSanctumToken: !!response.sanctum_token
        });

        if (response.sanctum_token) {
            setCookie(event, 'x-sanctum-token', response.sanctum_token, {
                path: '/',
                maxAge: response.expires_in || 3600,
                secure: true,
                httpOnly: true
            });
        }

        return { success: true, token: !!response.sanctum_token };
    } catch (error) {
        console.error('Request failed:', {
            status: error.status,
            message: error.message,
            data: error.data
        });
        
        return {
            error: true,
            message: error.message,
            status: error.status || 500,
            details: error.data
        };
    }
});
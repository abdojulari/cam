export default defineEventHandler(async (event: H3Event<EventHandlerRequest>) => {
    const config = useRuntimeConfig(event).private;
    const url = config.VITE_CRE_AUTH_URL;
    
    // Log the configuration being used
    console.log('Auth URL:', url);
    console.log('Login email:', config.VITE_CRE_LOGIN);

    const body = JSON.stringify({
        email: config.VITE_CRE_LOGIN,
        password: config.VITE_CRE_PASSWORD,
    });

    try {
        const response = await $fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'User-Agent': 'Nuxt-API-Client',
            },
            body: body,
            // Add timeout
            timeout: 30000,
        });

        if (!response.sanctum_token) {
            throw new Error('No sanctum token in response');
        }

        setCookie(event, 'x-sanctum-token', response.sanctum_token, {
            path: '/',
            maxAge: response.expires_in || 3600,
            secure: true,
            httpOnly: true
        });

        return { success: true, token: response.sanctum_token };
    } catch (error) {
        console.error('Login error:', {
            message: error.message,
            data: error.data,
            status: error.status,
        });

        // Return a more detailed error response
        return {
            error: true,
            message: error.message,
            status: error.status || 500,
            details: error.data
        };
    }
});
export const apiClient = async (event: any, { url, method = 'GET', body = null, headers = {} }: any) => {
    try {
        const response = await fetch(url, {
            method,
            headers,
            body,
        });
        return response.json();
    } catch (error) {
        // Return error response
        return { error: error.message };
    }
};

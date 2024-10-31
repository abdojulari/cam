import { ref, watchEffect, toValue } from 'vue';
export function useFetch(url: string, method = 'GET', body = null, headers = {}) {
    const dataValue = ref(null);
    const error = ref();
    const fetchData = async () => {  
        try {
            const res = await fetch(toValue(url), {
                method,
                headers: {
                    ...headers,
                },
                body: body,
            });

            if (!res.ok) throw new Error('Network response was not ok');
            
            const data = await res.json();
            // Extract the sessionToken
            const sessionToken = data.sessionToken;
            if (sessionToken) {
                // Save sessionToken in a cookie
                document.cookie = `sessionToken=${sessionToken}; path=/;`;
            }

            dataValue.value = data; 
        } catch (err) {
            error.value = err; 
        }
    };

    watchEffect(() => {
        fetchData();
    });

    return { dataValue, error };
}

export default defineNuxtRouteMiddleware((to, from) => {
    const access_token = useCookie('access_token').value;
    const sanctum_token = useCookie('x-sanctum-token').value;

    if (!access_token || !sanctum_token) {
        return navigateTo('/error-page');
    }
});
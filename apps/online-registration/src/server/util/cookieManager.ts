export function setBrowserCookie(name: string, value: string, options?: any) {
    const expires = options?.expires || 3600; // Default to 1 hour if not provided
    document.cookie = `${name}=${value}; path=/; max-age=${expires};`;
}   
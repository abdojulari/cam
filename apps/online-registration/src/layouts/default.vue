<template>
    <v-layout class="d-flex flex-column  rounded rounded-md">
      <div v-if="header" v-html="header"></div>
      <v-main class="d-flex align-center justify-center" style="min-height: 700px;">
        <nuxt-page />
      </v-main>
      <v-footer class="d-flex flex-column">
        <div class="w-100" v-if="footer" v-html="footer"></div>
      </v-footer>
    </v-layout>
</template>
<script setup lang="ts">
const href = ref([]);
const header = ref('');
const footer = ref('');
const CACHE_KEY = 'custom-header-footer';
const CACHE_EXPIRY_KEY = 'custom-header-footer-expiry';
const CACHE_EXPIRY_TIME = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

onMounted(async () => {
    const now = Date.now();
    // Check if the cached data exists and is still valid
    const cachedData = localStorage.getItem(CACHE_KEY);
    const cachedExpiry = localStorage.getItem(CACHE_EXPIRY_KEY);
    
    if (cachedData && cachedExpiry && now < parseInt(cachedExpiry)) {
        // If cached data is available and not expired, use it
        const data = JSON.parse(cachedData);
        const { css: linkTags, js: scriptTags, header: fetchedHeader, footer: fetchedFooter } = data;
        const linkRegex = /<link\s+[^>]*href="([^"]*)"[^>]*>/g;
        const scriptRegex = /<script\s+[^>]*src="([^"]*)"[^>]*>/g;
        href.value = extractUrls(linkTags, linkRegex);
        const scripts = extractUrls(scriptTags, scriptRegex);

        useHead({
            link: [ 
                // {
                //     rel: 'stylesheet',
                //     href: 'https://cdn.jsdelivr.net/npm/bootstrap@3.4.1/dist/css/bootstrap.min.css',
                //     type: 'text/css',
                // },
                {
                    rel: 'stylesheet',
                    href: 'https://cdn.jsdelivr.net/npm/bootstrap-select@1.13.14/dist/css/bootstrap-select.min.css',
                    type: 'text/css',
                },
                {
                    rel: 'stylesheet',
                    href: 'https://cor-cdn-static.bibliocommons.com/assets/responsive_external_header-c60fcf3650be665b532bd462de3f54a7.css',
                    type: 'text/css',
                },
                {
                    rel: 'stylesheet',
                    href: 'https://epl.bibliocommons.com/cor-cdn-static.bibliocommons.com/assets/responsive_external_header-c60fcf3650be665b532bd462de3f54a7.css',
                    type: 'text/css',
                }, 
            ...href.value.map(href => ({
                rel: 'stylesheet',
                href: `https:${href}`,
                type: 'text/css',
            }))
        ],
            style: [
                    {
              innerHTML: `
                .cp_header_wrapper .header_collapsible_search_wrapper .header_search_wrapper_desktop .cp_header_search {
                  width: auto;
                  opacity: 1 !important;
                  visibility: visible !important;
                  transition: opacity 0.3s;
                },
                
                    div.bc_core_external select.selectpicker {
                        display: inline-block !important;
                    } 
              `,
            },
            ],
            script: [
                {
                    src: 'https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js',
                    type: 'text/javascript',
                    defer: true,
                },
                {
                    src: 'https://cdn.jsdelivr.net/npm/bootstrap@3.4.1/dist/js/bootstrap.min.js',
                    type: 'text/javascript',
                    defer: true,
                },
                {
                    src: 'https://cdn.jsdelivr.net/npm/bootstrap-select@1.13.14/dist/js/bootstrap-select.min.js',
                    type: 'text/javascript',
                    defer: true,
                },
                ...scripts.map(src => ({
                    src: `https:${src}`,
                    type: 'text/javascript',
                })),
                {
                    src: 'https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.7.8/handlebars.min.js',
                    integrity: 'sha512-E1dSFxg+wsfJ4HKjutk/WaCzK7S2wv1POn1RRPGh8ZK+ag9l244Vqxji3r6wgz9YBf6+vhQEYJZpSjqWFPg9gg==',
                    crossorigin: 'anonymous',
                    referrerpolicy: 'no-referrer',
                }
            ],
        });

        // Set header and footer
        header.value = fetchedHeader;
        footer.value = fetchedFooter;

    } else {
        // If cached data is not available or expired, fetch new data
        try {
            const response = await fetch('/api/get-custom-header-footer', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch custom header/footer');
            }

            const data = await response.json();
            const { css: linkTags, js: scriptTags, header: fetchedHeader, footer: fetchedFooter } = data;
            const linkRegex = /<link\s+[^>]*href="([^"]*)"[^>]*>/g;
            const scriptRegex = /<script\s+[^>]*src="([^"]*)"[^>]*>/g;
            href.value = extractUrls(linkTags, linkRegex);
            const scripts = extractUrls(scriptTags, scriptRegex);

            useHead({
                link: [ 
                // {
                //     rel: 'stylesheet',
                //     href: 'https://cdn.jsdelivr.net/npm/bootstrap@3.4.1/dist/css/bootstrap.min.css',
                //     type: 'text/css',
                // },
                {
                    rel: 'stylesheet',
                    href: 'https://cdn.jsdelivr.net/npm/bootstrap-select@1.13.14/dist/css/bootstrap-select.min.css',
                    type: 'text/css',
                },
                {
                    rel: 'stylesheet',
                    href: 'https://cor-cdn-static.bibliocommons.com/assets/responsive_external_header-c60fcf3650be665b532bd462de3f54a7.css',
                    type: 'text/css',
                },    
                {
                    rel: 'stylesheet',
                    href: 'https://epl.bibliocommons.com/cor-cdn-static.bibliocommons.com/assets/responsive_external_header-c60fcf3650be665b532bd462de3f54a7.css',
                    type: 'text/css',
                },
                ...href.value.map(href => ({
                    rel: 'stylesheet',
                    href: `https:${href}`,
                    type: 'text/css',
                }))],
                style: [{
                  innerHTML: `
                    .cp_header_wrapper .header_collapsible_search_wrapper .header_search_wrapper_desktop .cp_header_search {
                      width: auto;
                      opacity: 1 !important;
                      visibility: visible !important;
                      transition: opacity 0.3s;
                    },
                    {
                    div.bc_core_external select.selectpicker {
                        display: inline-block !important;
                    }
                  `,
                },],
                script: [
                    {
                        src: 'https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js',
                        type: 'text/javascript',
                        defer: true,
                    },
                    {
                    src: 'https://cdn.jsdelivr.net/npm/bootstrap@3.4.1/dist/js/bootstrap.min.js',
                    type: 'text/javascript',
                    defer: true,
                },
                    {
                        src: 'https://cdn.jsdelivr.net/npm/bootstrap-select@1.13.14/dist/js/bootstrap-select.min.js',
                        type: 'text/javascript',
                    },
                    ...scripts.map(src => ({
                        src: `https:${src}`,
                        type: 'text/javascript',
                    })),
                    {
                        src: 'https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.7.8/handlebars.min.js',
                        integrity: 'sha512-E1dSFxg+wsfJ4HKjutk/WaCzK7S2wv1POn1RRPGh8ZK+ag9l244Vqxji3r6wgz9YBf6+vhQEYJZpSjqWFPg9gg==',
                        crossorigin: 'anonymous',
                        referrerpolicy: 'no-referrer',
                    }
                ],
            });
            // Set header and footer
            header.value = fetchedHeader;
            footer.value = fetchedFooter;

            // Cache the response data and expiry time
            localStorage.setItem(CACHE_KEY, JSON.stringify(data));
            localStorage.setItem(CACHE_EXPIRY_KEY, (now + CACHE_EXPIRY_TIME).toString());

        } catch (error) {
            console.error('Error fetching custom header/footer:', error);
            header.value = 'Error loading header';
            footer.value = 'Error loading footer';
        }
    }
});

// Utility function to extract URLs from tags (link or script)
const extractUrls = (tags: any, regex: any) => {
    const matches = [];
    let match: any;
    while ((match = regex.exec(tags)) !== null) {
        matches.push(match[1]);
    }
    return matches;
};

onMounted(() => {
    const loadScript = (src: string) => {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = src;
            script.onload = resolve;
            script.onerror = reject;
            document.body.appendChild(script);
        });
    };

    const loadStylesheet = (href: string) => {
        return new Promise((resolve, reject) => {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = href;
            link.onload = resolve;
            link.onerror = reject;
            document.head.appendChild(link);
        });
    };

    const loadResources = async () => {
        try {
            await loadStylesheet('https://cdn.jsdelivr.net/npm/bootstrap-select@1.13.14/dist/css/bootstrap-select.min.css');
            await loadScript('https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js');
            await loadScript('https://cdn.jsdelivr.net/npm/bootstrap-select@1.13.14/dist/js/bootstrap-select.min.js');
            // Initialize the selectpicker
            $('.selectpicker').selectpicker('refresh');
        } catch (error) {
            console.error('Failed to load resources:', error);
        }
    };

    loadResources();
});

</script>

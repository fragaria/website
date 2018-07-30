---
layout: null
---
const urls = [];

// Cache assets
{%- for asset in site.static_files -%}
{%- if asset.path contains '/assets/fonts' or asset.path contains '/assets/icons' or asset.path contains '/assets/img' or asset.extname == '.js' -%}
urls.push("{{ asset.path | relative_url }}");
{%- endif -%}
{%- endfor -%}


// Cache posts
{%- for post in site.posts limit: 10 -%}
urls.push("{{ post.url | relative_url }}");
{%- endfor -%}

// Cache pages
{%- for page in site.html_pages -%}
{%- unless page.path contains 'amp-html' or page.path contains 'blog/archive' -%}
urls.push("{{ page.url | relative_url }}");
{%- endunless -%}
{%- endfor -%}


// Cache name: adjust version number to invalidate service worker cache.
const CACHE_NAME = 'fragariacz-cache-v1';

self.addEventListener('install', function(event) {
    // Perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            console.log(`[sw] Opened cache ${CACHE_NAME}`);
            return cache.addAll(urls);
        })
    );
});

addEventListener('activate', activateEvent => {
    activateEvent.waitUntil(
        caches.keys().then(keyList => Promise.all(keyList.map(key => {
            if (key !== CACHE_NAME) {
                return caches.delete(key);
            }
        })))
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(resp) {
            if (resp) {
                return resp;
            }

            return fetch(event.request).then(function(response) {
                let responseClone = response.clone();

                caches.open(CACHE_NAME).then(function(cache) {
                    cache.put(event.request, responseClone);
                });

                return response;
            });
        }).catch(function (err) {
            console.warn('[sw] Could not load ', err);
            return caches.match('{{ site.baseurl }}offline/');
        })
    );
});

// Listen to skipWaiting message, that can be issued when user wants to update the service worker.
// @note: message is posted from register-sw.js script.
self.addEventListener('message', messageEvent => {
    if (messageEvent.data === 'skipWaiting') return skipWaiting();
});

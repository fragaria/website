---
layout: null
---
const urls = [];

// Cache assets
{% for asset in site.static_files -%}
{%- if asset.path contains '/assets/fonts' or asset.path contains '/assets/icons' or asset.path contains '/assets/img' or asset.path contains '/assets/favicons' or asset.extname == '.js' -%}
urls.push("{{ asset.path | relative_url }}");
{%- endif -%}
{%- endfor %}

// Cache posts
{% for post in site.posts limit: 10 -%}
urls.push("{{ post.url | relative_url }}");
{%- endfor %}

// Cache pages
{% for page in site.html_pages -%}
{%- unless page.path contains 'blog/archive' -%}
urls.push("{{ page.url | relative_url }}");
{%- endunless -%}
{%- endfor %}


// Cache name: adjust version number to invalidate service worker cache.
const CACHE_NAME = 'fragariacz-cache-v{{ site.service_worker.cache_version }}';

function precache() {
    caches.open(CACHE_NAME).then(function(cache) {
        console.log(`[sw] Opened cache ${CACHE_NAME}`);
        return cache.addAll(urls);
    });
}

function storeInCache(request, response) {
    caches.open(CACHE_NAME).then(cache => {
        cache.put(request, response);
    });
}

function loadFromNetwork(request, timeout) {
    return new Promise((fulfill, reject) => {
        let tid = setTimeout(reject, timeout);

        fetch(request).then(response => {
            clearTimeout(tid);
            const responseClone = response.clone();
            fulfill(response);
            storeInCache(request, responseClone);
        }, reject);
    });
}

function loadFromCache(request) {
    return caches.open(CACHE_NAME).then(cache => {
        return cache.match(request).then(matching => {
            return matching || Promise.reject('no-match');
        });
    });
}

self.addEventListener('install', function(event) {
    console.log(`[sw] Installing ...`);
    // Perform install steps
    event.waitUntil(precache());
});

self.addEventListener('fetch', event => {
    const request = event.request;
    let loadPipe = loadFromNetwork(request, 1500).catch(err => loadFromCache(request));

    if (request.method === 'GET') {
        loadPipe = loadPipe.catch(err => {
            console.warn('[sw] Could not load, redirecting to offline page ', err);
            return caches.open(CACHE_NAME).then(cache => {
                return cache.match('{{ "/offline/" | relative_url }}');
            })
        });
    } else {
        loadPipe = loadPipe.catch(err => {
            console.warn('[sw] Could not load, going for 404', err);
            throw err;
        });
    }

    event.respondWith(loadPipe);
});

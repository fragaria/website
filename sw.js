const urls = [];

// Cache assets
urls.push("/assets/favicons/android-chrome-192x192.png");urls.push("/assets/favicons/android-chrome-512x512.png");urls.push("/assets/favicons/apple-touch-icon.png");urls.push("/assets/favicons/favicon-16x16.png");urls.push("/assets/favicons/favicon-32x32.png");urls.push("/assets/favicons/mstile-150x150.png");urls.push("/assets/favicons/safari-pinned-tab.svg");urls.push("/assets/fonts/fragariacz-icons.eot");urls.push("/assets/fonts/fragariacz-icons.svg");urls.push("/assets/fonts/fragariacz-icons.ttf");urls.push("/assets/fonts/fragariacz-icons.woff");urls.push("/assets/img/angular.svg");urls.push("/assets/img/aws.svg");urls.push("/assets/img/django.svg");urls.push("/assets/img/docker.png");urls.push("/assets/img/elasticsearch.svg");urls.push("/assets/img/ethereum.svg");urls.push("/assets/img/faces.svg");urls.push("/assets/img/html5.svg");urls.push("/assets/img/java.svg");urls.push("/assets/img/javascript.svg");urls.push("/assets/img/kubernetes.svg");urls.push("/assets/img/linux.svg");urls.push("/assets/img/mongodb.svg");urls.push("/assets/img/nodejs.svg");urls.push("/assets/img/python.svg");urls.push("/assets/img/react.svg");urls.push("/assets/img/strawberry.png");urls.push("/assets/img/strawberry.svg");urls.push("/assets/img/strawberry_1-1.png");urls.push("/assets/img/strawberry_1-1_transparent.png");urls.push("/assets/img/strawberry_1200-600.png");urls.push("/assets/img/strawberry_60-60.png");urls.push("/assets/img/table.svg");urls.push("/assets/img/typescript.svg");urls.push("/assets/img/vuejs.svg");urls.push("/assets/img/working.svg");urls.push("/assets/js/element-closest.js");urls.push("/assets/js/site.js");urls.push("/assets/js/smoothscroll.js");

// Cache posts
urls.push("/blog/2021/08/02/lt-15-rabbitmq/");urls.push("/blog/2021/07/26/lt-14-efektivni-prace-s-api/");urls.push("/blog/2021/07/12/lt-13-socialni-site/");urls.push("/blog/2021/06/28/lt-12-jak-nesdilet-hesla/");urls.push("/blog/2021/06/24/lt-11-kafka-streams-copy/");urls.push("/blog/2021/06/20/tech-talk-5-agile-framework-scrum/");urls.push("/blog/2021/05/23/tech-talk-4-poetry/");urls.push("/blog/2021/05/17/lt-10-sqlite-na-statickem-hostingu/");urls.push("/blog/2021/05/13/lt-9-domaci-pivo/");urls.push("/blog/2021/05/10/lt-8-nepritel-startupu/");

// Cache pages
urls.push("/404.html");urls.push("/work-with-us/freelance-graficky-designer/");urls.push("/how-we-work/");urls.push("/work-with-us/");urls.push("/blog/");urls.push("/");urls.push("/offline/");urls.push("/solutions/");


// Cache name: adjust version number to invalidate service worker cache.
const CACHE_NAME = 'fragariacz-cache-v5';

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
    // Make sure to not stuck waiting for current sw to become terminated.
    self.skipWaiting();
    // Perform install steps
    event.waitUntil(precache());
});

self.addEventListener('fetch', event => {
    const request = event.request;
    let handler = null;

    if (request.method === 'GET') {
        handler = loadFromNetwork(request, 1500)
            .catch(err => loadFromCache(request))
            .catch(err => {
                console.warn('[sw] Could not load, redirecting to offline page ', err);
                return caches.open(CACHE_NAME).then(cache => {
                    return cache.match('/offline/');
                })
            });
    } else {
        handler = fetch(request);
    }

    return event.respondWith(handler);
});

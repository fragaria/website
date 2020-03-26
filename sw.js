const urls = [];

// Cache assets
urls.push("/assets/favicons/android-chrome-192x192.png");urls.push("/assets/favicons/android-chrome-512x512.png");urls.push("/assets/favicons/apple-touch-icon.png");urls.push("/assets/favicons/favicon-16x16.png");urls.push("/assets/favicons/favicon-32x32.png");urls.push("/assets/favicons/mstile-150x150.png");urls.push("/assets/favicons/safari-pinned-tab.svg");urls.push("/assets/fonts/fragariacz-icons.eot");urls.push("/assets/fonts/fragariacz-icons.svg");urls.push("/assets/fonts/fragariacz-icons.ttf");urls.push("/assets/fonts/fragariacz-icons.woff");urls.push("/assets/img/angular.svg");urls.push("/assets/img/aws.svg");urls.push("/assets/img/django.svg");urls.push("/assets/img/docker.png");urls.push("/assets/img/elasticsearch.svg");urls.push("/assets/img/ethereum.svg");urls.push("/assets/img/html5.svg");urls.push("/assets/img/java.svg");urls.push("/assets/img/javascript.svg");urls.push("/assets/img/kubernetes.svg");urls.push("/assets/img/linux.svg");urls.push("/assets/img/mongodb.svg");urls.push("/assets/img/nodejs.svg");urls.push("/assets/img/python.svg");urls.push("/assets/img/react.svg");urls.push("/assets/img/strawberry.png");urls.push("/assets/img/strawberry.svg");urls.push("/assets/img/strawberry_1-1.png");urls.push("/assets/img/strawberry_1-1_transparent.png");urls.push("/assets/img/strawberry_1200-600.png");urls.push("/assets/img/strawberry_60-60.png");urls.push("/assets/img/typescript.svg");urls.push("/assets/img/vuejs.svg");urls.push("/assets/js/element-closest.js");urls.push("/assets/js/site.js");urls.push("/assets/js/smoothscroll.js");

// Cache posts
urls.push("/blog/2020/03/26/moving-on/");urls.push("/blog/2020/03/08/kdyz-1g-nestaci/");urls.push("/blog/2019/10/11/magenta-nechte-pocitace-hrat/");urls.push("/blog/2019/08/19/fandime-slusne/");urls.push("/blog/2019/04/08/building-a-simple-company-website-the-hard-way-service-workers/");urls.push("/blog/2019/03/29/kouzlo-malych-projektu/");urls.push("/blog/2019/02/05/runtime-configuration-in-web-applications/");urls.push("/blog/2018/11/12/building-a-simple-company-website-the-hard-way-vertical-rhythm/");urls.push("/blog/2018/09/03/building-a-simple-company-website-the-hard-way-typography-intro/");urls.push("/blog/2018/07/25/spehujeme-pouzivatelov-na-nasich-strankach/");

// Cache pages
urls.push("/404.html");urls.push("/solutions/");urls.push("/work-with-us/");urls.push("/blog/");urls.push("/");urls.push("/offline/");


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

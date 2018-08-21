const urls = [];

// Cache assets
urls.push("/assets/favicons/android-chrome-192x192.png");urls.push("/assets/favicons/android-chrome-512x512.png");urls.push("/assets/favicons/apple-touch-icon.png");urls.push("/assets/favicons/favicon-16x16.png");urls.push("/assets/favicons/favicon-32x32.png");urls.push("/assets/favicons/mstile-150x150.png");urls.push("/assets/favicons/safari-pinned-tab.svg");urls.push("/assets/fonts/fragariacz-icons.eot");urls.push("/assets/fonts/fragariacz-icons.svg");urls.push("/assets/fonts/fragariacz-icons.ttf");urls.push("/assets/fonts/fragariacz-icons.woff");urls.push("/assets/img/angular.svg");urls.push("/assets/img/aws.svg");urls.push("/assets/img/django.svg");urls.push("/assets/img/docker.png");urls.push("/assets/img/elasticsearch.svg");urls.push("/assets/img/ethereum.svg");urls.push("/assets/img/html5.svg");urls.push("/assets/img/java.svg");urls.push("/assets/img/javascript.svg");urls.push("/assets/img/kubernetes.svg");urls.push("/assets/img/linux.svg");urls.push("/assets/img/mongodb.svg");urls.push("/assets/img/nodejs.svg");urls.push("/assets/img/python.svg");urls.push("/assets/img/react.svg");urls.push("/assets/img/strawberry.png");urls.push("/assets/img/strawberry.svg");urls.push("/assets/img/strawberry_1-1.png");urls.push("/assets/img/strawberry_1-1_transparent.png");urls.push("/assets/img/strawberry_1200-600.png");urls.push("/assets/img/typescript.svg");urls.push("/assets/img/vuejs.svg");urls.push("/assets/js/element-closest.js");urls.push("/assets/js/site.js");urls.push("/assets/js/smoothscroll.js");

// Cache posts
urls.push("/blog/2018/07/25/spehujeme-pouzivatelov-na-nasich-strankach/");urls.push("/blog/2018/03/28/blockchain-can-do/");urls.push("/blog/2018/02/14/idealni-bezdratova-sluchatka-spunty/");urls.push("/blog/2018/02/05/mapujeme-adresy-do-ceskych-kraju/");urls.push("/blog/2018/01/23/vybirame-bezdratova-sluchatka-uvod/");urls.push("/blog/2017/12/01/elasticsearch-60-se-blizi/");urls.push("/blog/2017/11/10/ohlednuti-ex-vedce/");urls.push("/blog/2017/09/22/fraga-akce-aneb-kluci-na-vylete/");urls.push("/blog/2017/07/03/jahoda-malina-sloni-hadi-flandera/");urls.push("/blog/2017/06/26/npm-packages-101-creating-npm-package/");

// Cache pages
urls.push("/404.html");urls.push("/blog/");urls.push("/solutions/");urls.push("/work-with-us/");urls.push("/");urls.push("/nginx-redir-list/");urls.push("/offline/");


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
                return cache.match('/offline/');
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

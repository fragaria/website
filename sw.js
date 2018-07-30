const urls = [];

// Cache assets
urls.push("/website/assets/fonts/fragariacz-icons.eot");urls.push("/website/assets/fonts/fragariacz-icons.svg");urls.push("/website/assets/fonts/fragariacz-icons.ttf");urls.push("/website/assets/fonts/fragariacz-icons.woff");urls.push("/website/assets/img/angular.svg");urls.push("/website/assets/img/aws.svg");urls.push("/website/assets/img/docker.png");urls.push("/website/assets/img/elasticsearch.svg");urls.push("/website/assets/img/ethereum.svg");urls.push("/website/assets/img/html5.svg");urls.push("/website/assets/img/java.svg");urls.push("/website/assets/img/javascript.svg");urls.push("/website/assets/img/kubernetes.svg");urls.push("/website/assets/img/linux.svg");urls.push("/website/assets/img/mongodb.svg");urls.push("/website/assets/img/nodejs.svg");urls.push("/website/assets/img/python.svg");urls.push("/website/assets/img/react.svg");urls.push("/website/assets/img/strawberry.svg");urls.push("/website/assets/img/typescript.svg");urls.push("/website/assets/img/vuejs.svg");urls.push("/website/assets/js/site.js");

// Cache posts
urls.push("/website/blog/2018/03/28/blockchain-can-do/");urls.push("/website/blog/2018/02/14/idealni-bezdratova-sluchatka-spunty/");urls.push("/website/blog/2018/02/05/mapujeme-adresy-do-ceskych-kraju/");urls.push("/website/blog/2018/01/23/vybirame-bezdratova-sluchatka-uvod/");urls.push("/website/blog/2017/12/01/elasticsearch-60-se-blizi/");urls.push("/website/blog/2017/11/10/ohlednuti-ex-vedce/");urls.push("/website/blog/2017/09/22/fraga-akce-aneb-kluci-na-vylete/");urls.push("/website/blog/2017/07/03/jahoda-malina-sloni-hadi-flandera/");urls.push("/website/blog/2017/06/26/npm-packages-101-creating-npm-package/");urls.push("/website/blog/2017/05/26/co-je-noveho-v-ionic-3_26/");

// Cache pages
urls.push("/website/blog/");urls.push("/website/career/");urls.push("/website/");urls.push("/website/offline/");


// Cache name: adjust version number to invalidate service worker cache.
const CACHE_NAME = 'fragariacz-cache-v1';

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
                return cache.match('/website/offline/');
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

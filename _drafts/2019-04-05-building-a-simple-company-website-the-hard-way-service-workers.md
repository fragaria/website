---
layout: post
title: 'Building a simple company website the Hard Way: Service workers'
date: 2019-04-05T10:00:00.000+01:00
author: Filip Vařecha
lang: en
tags:
- javascript
- service workers
modified_time: 2019-04-05T10:00:00.000+01:00
cloudinary_src: posts/PIXNIO-227587-5372x3586_khjell
---

Hi there once again! I’m gonna close our litte *Building a simple company
website th Hard Way* series with a brief introduction to how service workers operate
and why you should want them on your website too. They’re cool and fancy, sometimes unnecessary, but likely still worth your time as I’m about to demonstrate.

{% include figure.html cloudinary_src='posts/PIXNIO-227587-5372x3586_khjell' sizing='wide' %}

<section class="box">
<p>This article is a part of the <i>Building a simple company website the Hard Way</i> series.</p>

<ol>
    <li><a href="/blog/2018/09/03/building-a-simple-company-website-the-hard-way-typography-intro/">Typography introduction</a></li>
    <li><a href="/blog/2018/11/12/building-a-simple-company-website-the-hard-way-vertical-rhythm/">Vertical rhythm</a></li>
    <li>Service workers</li>
</ol>
</section>


Service workers are little JavaScript worker scripts that browser runs in the background. This means they’re kinda alive
even if you do not interact with the page directly. Service workers let you do plenty of amazing stuff including:

- background sync
- push notifications
- browsing your pages even though you’re offline
- suggest adding home screen link on user’s device to access your page

For the sake of this article, we will focus on offline experience as it’s the single most important feature for company portfolio websites. These days, huge ratio of content viewers visit your page using their mobile devices. Being mobile often means being offline regularly as mobile networks are generally unrealiable.

## Saving the offline situation

Interruption when viewing a website often means the visitor just quits right away. This even includes situations when the interruptions are to be expected: like when descending down to the subway. You probably know from your own personal experience, too. That is why the service workers are so important for your business: they can help you avoid these interruptions by making your website accessible &mdash; albeit not fully &mdash; while the visitor is offline.

This works because service worker script can act like *a network proxy* to your website. They can intercept every request
the browser makes to the server. And in case the server is unavailable, you can return your own cached response. They can even let you preload content your visitors are likely to hit so you can make next clicks blazing fast. The typical scenario is following:

1. Assemble a **list of assets to load automatically** when visitor hits your website. This should include the content that is most likely to be required in near future. It can be any content you can think of: page content, images, scripts, videos. Anything you want. Just make sure you’re *not too greedy* about the data transfer. Remember: we do this for mobile devices where data transfer can be costly.
2. Upon service worker installation, **preload these assets** and store them in service worker cache.
3. Use service worker to **proxy network requests**. Impose a timeout to load the content from the real server. If the server doesn’t make it on time, offer the cached version instead.
4. If both network and caches fail (e.g. when hitting something that wasn’t preloaded), serve some kind of „*You’re offline*“ page so that the visitor knows what happend. This improves the general user experience.

## Using service workers

It is important to understand the basic lifecycle of a service worker to avoid potiential errors. Have a look at following diagram:

{% include figure.html cloudinary_src='posts/sw-lifecycle_t6dh0u' format='svg' caption='Service worker lifecycle.' %}

After you register the SW, browser will run it’s installation stage. Next, the SW gets activated and it starts working as our network proxy. It will stay activated until it’s replaced by a new SW script or in case it fails.

Particularly important is the condition when new SW get installed. This &mdash;by definition&mdash; happens when service worker file *gets changed*. Ultimately, this means that new SW is installed once the size of the current SW script is different from the new one, bytewise. Unfortunately, it works little counterintuitively. The old worker is not replaced immediately, but after the user leaves the page. This can be fixed by calling `skipWaiting` method as shown below.

Still got your attention? Good. Let’s talk code for a moment. I’ll share few examples from this very website.

### Service worker registration

You can initialize your service worker with a simple JS snippet that points the browser to the service worker script. Make sure you first verify your browser supports service workers (most of the modern ones do). Next, just call `navigator.serviceWorker.register` and provide the path to the worker script itself. In following example, this script is available at `/sw.js`.

```html
<script type="text/javascript">
if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/sw.js").then(function(registration) {
        console.log("[sw] Service Worker registration successful with scope: ", registration.scope);
    }).catch(function(err) {
        console.log("[sw] Service Worker registration failed: ", err);
    });
}
</script>
```

Once this snipped is run, registration is finished. Browser takes over and starts the script in the background.

### Pre-loading content

After you’ve registered the service worker, browser will run it’s installation stage. This is our time to preload our content.


```javascript
// Cache assets
{% raw %}{% for asset in site.static_files -%}
{%- if asset.path contains '/assets/fonts' or asset.path contains '/assets/icons' or asset.path contains '/assets/img' or asset.path contains '/assets/favicons' or asset.extname == '.js' -%}
urls.push("{{ asset.path | relative_url }}");
{%- endif -%}
{%- endfor %}{% endraw %}

// Cache last 10 posts
{% raw %}{% for post in site.posts limit: 10 -%}
urls.push("{{ post.url | relative_url }}");
{%- endfor %}{% endraw %}

// Cache other pages
{% raw %}{% for page in site.html_pages -%}
{%- unless page.path contains 'blog/archive' -%}
urls.push("{{ page.url | relative_url }}");
{%- endunless -%}
{%- endfor %}{% endraw %}

// Cache name: adjust version number to invalidate service worker cache.
const CACHE_NAME = 'sw-cache-v-1';

function precache() {
    caches.open(CACHE_NAME).then(function(cache) {
        console.log(`[sw] Opened cache ${CACHE_NAME}`);
        return cache.addAll(urls);
    });
}

self.addEventListener('install', function(event) {
    console.log(`[sw] Installing ...`);
    // Make sure to not stuck waiting for current sw to become terminated.
    self.skipWaiting();
    // Perform install steps
    event.waitUntil(precache());
});
```

We start by listing URLs to cache. Jekyll syntax makes it a little messy. Cache will contain some static assets, last 10 posts and some other important pages.

Next, we register the handler for the `install` browser event. As a result, `precache` is executed which adds all the assets to the SW cache. Caches are automatically available for every SW as `caches` object.

Before caching starts, we also call `self.skipWaiting` method to ensure, our new worker gets activated once installed. If we didn’t call it, old SW would be replaced *after* user leaves the page which is not desirable.


### Network proxying

Once the SW is activated, it can start proxing network requests. This will allow us to make our page work offline. In order to do so, we need to add handler for `fetch` browser event. Basic script is following:


```javascript
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

self.addEventListener('fetch', event => {
    const request = event.request;
    let loadPipe = loadFromNetwork(request, 1500).catch(err => loadFromCache(request));
    event.respondWith(loadPipe);
});
```

We impose *1500 ms timeout* to allow loading resources using the network. If this fails, we provide the cached
version in case it’s available. Next, let’s clean up the fetch handler a little. We do not want to alter the responses for `POST` HTTP method. `POST` usually means form submission. In that case, it would be very unwise to pretend submit succeeded. Let’s intervene only for `GET`:

```javascript
self.addEventListener('fetch', event => {
    const request = event.request;
    let loadPipe = loadFromNetwork(request, 1500).catch(err => loadFromCache(request));
    let handler = request.method === 'GET' ? loadPipe : fetch(request);
    return event.respondWith(handler)
});
```

### Offline page

In order to show user a nice offline page, we need improve the `loadPipe`:

```javascript
self.addEventListener('fetch', event => {
    const request = event.request;
    let handler = null;

    if (request.method === 'GET') {
        handler = loadFromNetwork(request, 1500)
            .catch(err => loadFromCache(request))
            .catch(err => {
                console.warn('[sw] Could not load, redirecting to offline page ', err);
                return caches.open(CACHE_NAME).then(cache => {
                    return cache.match('{{ "/offline/" | relative_url }}');
                })
            });
    } else {
        handler = fetch(request);
    }

    return event.respondWith(handler);
});
```

We only cache `GET` and in case loading fails altogether, return `/offline` page from the cache. We already have it available because it was loaded during SW installation stage.


## Homescreen link to your page

Another nice benefit of implementing a service worker is ability to offer your visitors a website shortcut on their phone homesceern. It will look just like any other mobile application button. This has few more requirements though:

- Your page has to be served using HTTPs. But you do that already anyway, don’t you?
- You need to prepare the icon for the app shortcut. Usually, you’re site logo will do.
- You have to provide a manifest file. The easiest way to create it is using some online generator, like [this one](https://app-manifest.firebaseapp.com/).

Once you meet all the requirements, Chrome will suggest visitors option to add shortcut automatically.

{% include figure.html cloudinary_src='posts/Screenshot_2019-04-07-14-23-47-738_com.android.chrome_q0rwob' caption='Google Chrome suggests adding home screen shortcut.' %}

## Conclusions

It a brief example, we’ve demonstrated how you can use service workers to improve the overall user experience especially on mobile devices. Our examples needs polishing in real world (like syncing the caches in the background) but hopefully got you a little headstart. *Progessive Web Apps* are way to go these thats and running a service worker is one of key requirements to make your app a progressive one.

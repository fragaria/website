---
layout: post
title: 'Building a simple company website the Hard Way: Service workers'
date: 2019-04-08T09:00:00.000+02:00
author: Filip Vařecha
lang: en
tags:
- javascript
- service workers
- progressive web apps
modified_time: 2019-04-08T09:00:00.000+02:00
cloudinary_src: posts/PIXNIO-227587-5372x3586_khjell
---

Hi there once again! I’m gonna close our little *Building a simple company
website the Hard Way* series with a brief introduction to how service workers
operate and why you should want them on your website too. They’re cool and
fancy, sometimes unnecessary, but likely still worth your time as I’m about to
demonstrate.

{% include figure.html cloudinary_src='posts/PIXNIO-227587-5372x3586_khjell' sizing='wide' %}

<section class="box">
<p>This article is a part of the <i>Building a simple company website the Hard Way</i> series.</p>

<ol>
    <li><a href="/blog/2018/09/03/building-a-simple-company-website-the-hard-way-typography-intro/">Typography introduction</a></li>
    <li><a href="/blog/2018/11/12/building-a-simple-company-website-the-hard-way-vertical-rhythm/">Vertical rhythm</a></li>
    <li>Service workers</li>
</ol>
</section>


Service workers are little JavaScript worker scripts that run in the
background. Besides registering it, they are completely managed by
the browser. Their life is not limited to the time you directly interact with
the related website: they’re kinda alive even if you’re not using the site.

They allow you to do some interesting stuff including:

- support offline use of your pages
- make push notifications for new content on your site
- synchronize cached data for offline use in the background
- promote adding of home screen link to your page on mobile devices

For the sake of this article, we will focus on offline experience as it’s the
most important feature for company portfolio websites.

Huge number of content viewers visit your page using their cellphones these
days. As a result your visitors frequently go offline temporarily as mobile
networks are generally unrealiable.

## Saving the offline situation

Network connection hanging out in the middle of browsing often results in visitor
simply quitting the website right away. This includes even situations when
interruptions are to be expected: like during your descent down to the subway.
Service workers can be used to mitigate such risk as they allow you to keep
your website functional&mdash;albeit just partially&mdash;even while the
visitor’s network connection is down.

How is that possible? It's because SW script can act like *a network proxy*. It
can intercept every request the browser makes to the server. This means you can
modify the response (either forge one, or use a cached one) and avoid hitting
the server at all. You can fill up the caches by preloading the content when SW
script is being installed. This enables you to make your website blazing fast if
you can anticipate next clicks of your users, too.

A typical scenario how offline support implementation looks like is following:

1. Assemble a **list of assets to load automatically** when visitor hits your
   site. This should include the content that is most likely to be required
   in near future. It can be any content you can think of: page documents, images,
   scripts, videos. Anything you want. Just make sure you’re *not too greedy*
   about the data transfer. Remember: we do this for mobile devices where data
   transfer can be costly.
2. Upon service worker installation, **preload these assets** and store them in
   service worker cache.
3. Use service worker to **proxy network requests**. Impose a timeout to load
   the content from the real server. If the server doesn’t make it on time,
   offer the cached version instead.
4. If both network and caches fail (e.g. when hitting something that wasn’t
   preloaded), serve some kind of „*You’re offline*“ page so that the visitor
   knows what happend. This improves the general user experience.

## Using service workers

It is important to understand the basic lifecycle of a service worker to avoid
potiential mistakes. Have a look at following diagram:

{% include figure.html cloudinary_src='posts/sw-lifecycle_t6dh0u' format='svg' caption='Service worker lifecycle.' %}

After you’ve registed the SW, browser will run it’s installation stage. Next,
the SW gets activated and it starts working as our network proxy. It will stay
activated until it’s replaced by a new SW script or in case it fails somewhere
along the way.

Particularly important is the condition when new SW get installed. By
definition, this happens when service worker file *gets changed*. Ultimately, it
means new SW is installed once the size of the current SW script is different
from the new one&mdash;bytewise. Unfortunately, the exact process is a little
counterintuitive. Old SW is not replaced immediately after new SW is detected,
but once the user leaves the page. This means closing it, not just refreshing.
Weird? Yes but fortunately fixable. We can avoid default behavior by calling
 `skipWaiting` SW method during the installation as shown below.

Still got your attention? Good. Let’s talk code for a moment. I’ll share few
examples from this very website.

### Service worker registration

You can initialize your service worker with a simple JS snippet that points the
browser to the service worker script. It’s always a good idea to verify your browser
supports service workers. All of the modern ones do but someone might
still be using an old IE, right?

Next, just call `navigator.serviceWorker.register` and provide it the path to
the worker script itself. In following example, this script is available at
`/sw.js`.

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

Once this snippet is run, registration is finished. Browser takes over and
starts the script in the background, proceeding to the installation stage.

### Pre-loading content

Installation stage is there to prepare the SW for it’s real job. In our case, we
want to use it as a network proxy. This is the right time to preload our content
and fill up the caches. It’s rather straightforward:

```javascript
// Cache assets
urls.push("/assets/favicons/android-chrome-192x192.png");
urls.push("/assets/favicons/android-chrome-512x512.png");
urls.push("/assets/favicons/apple-touch-icon.png");
urls.push("/assets/favicons/favicon-16x16.png");
urls.push("/assets/favicons/favicon-32x32.png");
...

// Cache last 10 blog posts
urls.push("/blog/2019/04/05/building-a-simple-company-website-the-hard-way-service-workers/");
urls.push("/blog/2019/03/29/kouzlo-malych-projektu/");
urls.push("/blog/2019/02/05/runtime-configuration-in-web-applications/");
...

// Cache other pages
urls.push("/404.html");
urls.push("/blog/");
urls.push("/work-with-us/");
...

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
    // Make sure not to get stuck waiting for the current to become terminated.
    self.skipWaiting();
    // Perform preloading of cached content.
    event.waitUntil(precache());
});
```

Ultimately, we need a list of URLs to preload. Cache will contain some critical
static assets, last 10 blog posts and few other important pages.

Next, we register the handler for the `install` event. As a result,
`precache` is executed which adds all the assets to the SW cache. Caches are
automatically available for every SW as the `caches` global object and they are clever enough
to know how to load URLs. Naturally, this will result in bunch of network
requests made by the browser.

Before caching starts we also call `self.skipWaiting` method to ensure our new
worker gets activated once install is finished. If we didn’t call it, old SW would be
replaced *after* user leaves the page which is not desirable.

Please note that `event` is promise-aware so we can make it wait for `precache`
to finish by using `event.waitUntil`.


### Network proxying

When the SW is activated, it can start proxying network requests. This will allow
us to make our page work offline. In order to do so, we need to add another handler,
this time for `fetch` browser event. `fetch` is called whenever a request to
our server is made by the browser. We can hijack it and make it return cached
responses in case server is too slow to respond (which means network is down
as our pages are purely static and quick to respond with). Basic script is
following:

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

We impose *1500 ms timeout* to allow loading resources using the network. If
this fails, we provide the cached version in case it’s available.

Let’s clean up the fetch handler a little. We do not want to alter the responses for
`POST` HTTP method. `POST` usually means form submission. In that case, it would
be unwise to pretend submit succeeded. Let’s intervene only for `GET`:

```javascript
self.addEventListener('fetch', event => {
    const request = event.request;
    let loadPipe = loadFromNetwork(request, 1500).catch(err => loadFromCache(request));
    let handler = request.method === 'GET' ? loadPipe : fetch(request);
    return event.respondWith(handler)
});
```

### Offline pages

In order to show user a nice offline page, we need to improve our `loadPipe`
pipeline. Specifically, we need to handle the case when cached version of the
page is *unavailable*:

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

`/offline/` should always be in the cache as we’ve added it to the cache
during installation stage.


## Homescreen link to your page

Another nice benefit of implementing a service worker is ability to prompt your
visitors to add a website shortcut on their phone homescreen. It will
look just like any other mobile application launch button and open in a
webview automatically. It’s a first step towards making your website work
like a *Progressive Web App*. You need to meet a few more requirements though:

- Your page has to be *served using HTTPS*. But you do that already anyway, don’t
  you?
- You need to *prepare the icon* for the app shortcut. Usually, your site logo
  will do just fine.
- You have to provide a *manifest file*. The easiest way to create it is using
  some online generator, like [this one](https://app-manifest.firebaseapp.com/).

Once you’ve accomplished all of these tasks and have a working SW, Chrome will
prompt visitors to add shortcut automatically.

{% include figure.html cloudinary_src='posts/Screenshot_2019-04-07-14-23-47-738_com.android.chrome_q0rwob' caption='Google Chrome suggests adding a home screen shortcut.' %}

## Conclusions

In a brief example, we’ve demonstrated how you can use service workers to
improve the overall user experience especially on mobile devices. In a real world
scenario, we would need to add a few more moving parts like syncing up the caches
in the background (when new content comes up) but hopefully we’ve at least gave
you a little headstart. *Progessive Web Apps* are way to go these days and
running a service worker is one of key requirements to make your app a
progressive one.

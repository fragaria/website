---
layout: null
---

if ("serviceWorker" in navigator) {
    function listenForWaitingServiceWorker(reg, callback) {
        function awaitStateChange() {
            reg.installing.addEventListener('statechange', function() {
                if (this.state === 'installed') callback(reg);
            });
        }
        if (! reg) return;
        if (reg.waiting) return callback(reg);
        if (reg.installing) awaitStateChange();

        reg.addEventListener('updatefound', awaitStateChange);
    }

    function promptUserToRefresh(reg) {
        // this is just an example
        // don't use window.confirm in real life; it's terrible
        if (window.confirm("New version available! OK to refresh?")) {
            // send message to service workers to reload themselves.
            reg.waiting.postMessage('skipWaiting');
        }
    }

    navigator.serviceWorker.register("{{ site.baseurl }}sw.js").then(function(registration) {
        console.log("[sw] Service Worker registration successful with scope: ", registration.scope);
        listenForWaitingServiceWorker(registration, promptUserToRefresh);
    }).catch(function(err) {
        console.log("[sw] Service Worker registration failed: ", err);
    });


    // reload once when the new Service Worker starts activating
    var refreshing;
    navigator.serviceWorker.addEventListener('controllerchange', function() {
        if (refreshing) {
            return;
        }

        refreshing = true;
        window.location.reload();
    });
}

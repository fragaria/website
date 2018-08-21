if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/sw.js").then(function(registration) {
        console.log("[sw] Service Worker registration successful with scope: ", registration.scope);
    }).catch(function(err) {
        console.log("[sw] Service Worker registration failed: ", err);
    });
}

const CACHE_NAME = "medtrack-v1";

const FILES_TO_CACHE = [
    "./",
    "./dashboard.html",
    "./index.html",
    "./register.html",
    "./add_medicine.html",
    "./history.html",
    "./profile.html",

    "./dashboard.js",
    "./login.js",
    "./register.js",
    "./add_medicine.js",
    "./history.js",
    "./profile.js",

    "./manifest.json",

    "./style/add_medicine.css",
    "./style/dashboard.css",
    "./style/history.css",
    "./style/login.css",
    "./style/profile.css",
    "./style/register.css",

    "./assets/app-icon.png",
    "./assets/favicon.ico",
    "./assets/profile.png"
];

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log("Caching files...");
                return cache.addAll(FILES_TO_CACHE);
            })
            .catch(error => {
                console.log("Cache install error:", error);
            })
    );
});

self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});

self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(
                keys
                    .filter(key => key !== CACHE_NAME)
                    .map(key => caches.delete(key))
            );
        })
    );
});
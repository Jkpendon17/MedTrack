const CACHE_NAME = "medtracker-v1";

const FILES_TO_CACHE = [
  "/",
  "/index.html",
  "/dashboard.html",
  "/add-medicine.html",
  "/history.html",
  "/profile.html",
  "/manifest.json",

  "/style/dashboard.css",

  "/js/dashboard.js",

  "/assets/favicon.ico",
  "/assets/app-icon.png"
];

// Install event: save files to cache
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});

// Fetch event: use cache first, then network
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

// Activate event: remove old caches
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});
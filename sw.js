const CACHE_NAME = 'infradepot-v1-cache';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/survey.html',
  '/dashboard.html',
  '/css/styles.css', // Adjust paths to your actual CSS/JS folder names
  '/js/app.js',
  '/manifest.json'
];

// Install Event: Caching the core UI and registry assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Activate Event: Cleaning up old versions without breaking the current session
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch Event: Serving data from cache first, then updating from the network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request).then((networkResponse) => {
        return caches.open(CACHE_NAME).then((cache) => {
          // Cache a copy of the new data (like a new PDF or registry sync)
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
      });
    })
  );
});

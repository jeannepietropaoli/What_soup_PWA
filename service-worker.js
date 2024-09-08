const CACHE_NAME = "static-cache-v9";

//Add list of files to cache here.
const FILES_TO_CACHE = [
  "offline.html",
  "style/css/style.css",
];

// Installation - fait seulement une fois, premiere ouverture du site (installation du service worker)
self.addEventListener("install", (evt) => {
  // Precache static resources here.
  evt.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("[ServiceWorker] Pre-caching offline page");
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
  console.log("[ServiceWorker] Install");
});

// Activation - a chaque ouverture du site / app
self.addEventListener("activate", (evt) => {
  // Remove previous cached data from disk.
  evt.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            console.log("[ServiceWorker] Removing old cache", key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
  console.log("[ServiceWorker] Activate");
});

// Fetch event - Acces aux ressources
self.addEventListener("fetch", (evt) => {
  console.log("[ServiceWorker] Fetch", evt.request.url);

  // Handle image requests with stale-while-revalidate strategy
  if (evt.request.url.includes('/img/')) {
    evt.respondWith(
      caches.match(evt.request).then((cachedResponse) => {
        // Fetch the image from the network in the background
        const fetchPromise = fetch(evt.request).then((networkResponse) => {
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(evt.request, networkResponse.clone()); // Update the cache with the new image
          });
          return networkResponse;
        });
        // Return the cached image if available, else wait for network response
        return cachedResponse || fetchPromise;
      })
    );
    return; // Exit the fetch event handler after processing images
  }

  // Handle navigation requests (e.g., pages)
  if (evt.request.mode === "navigate") {
    evt.respondWith(
      fetch(evt.request).catch(() => {
        return caches.open(CACHE_NAME).then((cache) => {
          return cache.match("offline.html");
        });
      })
    );
    return;
  }
});
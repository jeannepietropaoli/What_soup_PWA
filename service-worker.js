const CACHE_NAME = "static-cache-v10";

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
          const clonedResponse = networkResponse.clone(); // Clone the response
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(evt.request, clonedResponse); // Use cloned response for cache
          });
          return networkResponse; // Return the original response to the browser
        }).catch(err => console.error("Fetch failed for image", err)); // Catch fetch errors
        // Return the cached image if available, else wait for the network response
        return cachedResponse || fetchPromise;
      }).catch(err => console.error("Cache match failed", err)) // Catch cache match errors
    );
    return; // Exit the fetch event handler after processing images
  }

  // Handle navigation requests (e.g., pages)
  if (evt.request.mode === "navigate") {
    evt.respondWith(
      fetch(evt.request).catch(() => {
        return caches.open(CACHE_NAME).then((cache) => {
          return cache.match("offline.html");
        }).catch(err => console.error("Cache match for offline.html failed", err)); // Catch errors
      })
    );
    return;
  }
});
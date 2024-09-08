// Mettre a jour la cache a chaque fois qu'un fichier de la cache change pour etre pris en compte
const CACHE_NAME = "static-cache-v5";

//Add list of files to cache here.
const FILES_TO_CACHE = ["offline.html"];

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

// Activation -  a chaque ouverture du site / app
self.addEventListener("activate", (evt) => {
  //Remove previous cached data from disk.
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

//Acces aux ressources
self.addEventListener("fetch", (evt) => {
  console.log("[ServiceWorker] Fetch", evt.request.url);
  //Add fetch event handler here.
  if (evt.request.mode !== "navigate") {
    // Not a page navigation, bail.
    return;
  }
  evt.respondWith(
    fetch(evt.request).catch(() => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match("/TP1_Integration_Web_2/offline.html");
      });
    })
  );
});

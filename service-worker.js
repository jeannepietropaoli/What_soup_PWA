const CACHE_NAME = "static-cache-v35";

// Fichiers a stocker dans la cache
const FILES_TO_CACHE = [
  "offline.html",
  "index.html",
  "inspiration.html",
  "mes-recettes.html",
  "preparation.html",
  "style/css/style.css",
  "fontawesome-free-6.6.0-web/css/all.min.css",
  "fontawesome-free-6.6.0-web/webfonts/fa-solid-900.woff2",
  "fontawesome-free-6.6.0-web/webfonts/fa-regular-400.woff2",
  "fontawesome-free-6.6.0-web/webfonts/fa-brands-400.woff2",
  "https://fonts.googleapis.com/css2?family=Oleo+Script:wght@400;700&display=swap",
  "scripts/collapse.js",
  "scripts/mobile_menu.js",
  "scripts/paralax.js",
  "scripts/formValidation.js",
  "scripts/ramen-creation-form.js",
  "scripts/RamenRecipe.js",
  "scripts/recipe-display.js"
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

  // Permet de mettre en cache dynamiquement les images avec une strategie stale-while-revalidate, c'est a dire que l'image sera affichee meme si elle est obsolete, et sera remplacee par la nouvelle image une fois telechargee
  
  // faire en sorte de cacher les images qui ne se trouvent pad sur la page sur laquelle on est sinon hors ligne ne seront pas cachees deja
  if (evt.request.url.includes('/img/')) {
    evt.respondWith(
      caches.match(evt.request).then((cachedResponse) => {
        // Fetch the image from the network in the background
        const fetchPromise = fetch(evt.request).then((networkResponse) => {
          const clonedResponse = networkResponse.clone(); 
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(evt.request, clonedResponse); 
          });
          return networkResponse; 
        }).catch(err => console.error("Fetch failed for image", err)); 
        
        return cachedResponse || fetchPromise;
      }).catch(err => console.error("Cache match failed", err))
    );
    return;
  }

  if (evt.request.mode !== 'navigate') {
    // Not a page navigation, bail.
    return;
    }
    evt.respondWith(
    fetch(evt.request)
    .catch(() => {
    return caches.open(CACHE_NAME)
    .then((cache) => {
   return cache.match('offline.html' );
    });
    })
    );
   });
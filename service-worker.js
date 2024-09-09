const CACHE_NAME = "static-cache-v43";

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
  "scripts/recipe-display.js",
  "img/favicon.png",
  "img/ingredeints-bg.png",
  "img/ingredients-bg-checked.png",
  "img/ramen_bol.png",
  "img/ramen-semaine.png",
  "img/whatsoup-blue.png",
  "img/etapes/bouillon_miso_avec_bg.png",
  "img/etapes/bouillon_shio_avec_bg.png",
  "img/etapes/bouillon_shoyu_avec_bg.png",
  "img/etapes/bouillon_tonkotsu_avec_bg.png",
  "img/etapes/bouillon-photo-2.jpg",
  "img/etapes/bouillon-photo.jpg",
  "img/etapes/casserole.png",
  "img/etapes/nouilles-photo.jpg",
  "img/etapes/nouilles.png",
  "img/etapes/passoire.png",
  "img/etapes/toppings-photo.jpg",
  "img/ingredients/bouillons/bol-v1-trs.png",
  "img/ingredients/bouillons/bol-v2-trspng.png",
  "img/ingredients/bouillons/bol-v3-trs.png",
  "img/ingredients/bouillons/bol-v4-trs.png",
  "img/epices/ail_poudre.png",
  "img/epices/gingembre_poudre.png",
  "img/epices/huile_sesame.png",
  "img/epices/kimchi.png",
  "img/epices/piment_poudre.png",
  "img/epices/poivre_noir.png",
  "img/epices/shichimi_togarashi.png",
  "img/epices/yuzu_kosho.png",
  "img/legumes/bambou.png",
  "img/legumes/basilic.png",
  "img/legumes/brocoli.png",
  "img/legumes/champignons.png",
  "img/legumes/chou.png",
  "img/legumes/epinards.png",
  "img/legumes/fenouil.png",
  "img/legumes/feuille-chou.png",
  "img/legumes/mais.png",
  "img/legumes/oignons_verts.png",
  "img/legumes/poireau.png",
  "img/legumes/pousses_soja.png",
  "img/legumes/radis.png",
  "img/legumes/shiitake.png",
  "img/nouilles/plates-trs.png",
  "img/nouilles/thick-trs.png",
  "img/nouilles/thin-trs.png",
  "img/nouilles/wavy-trs.png",
  "img/proteines/boeuf.png",
  "img/proteines/crevette.png",
  "img/proteines/porc.png",
  "img/proteines/poulet.png",
  "img/proteines/tempura_crevette.png",
  "img/proteines/tofu.png",
  "img/toppings/ail_frit.png",
  "img/toppings/algues.png",
  "img/toppings/beurre.png",
  "img/toppings/dumplings.png",
  "img/toppings/gingembre.png",
  "img/toppings/narutomaki.png",
  "img/toppings/oeuf-mollet.png",
  "img/toppings/oeuf.png",
  "img/toppings/sesame.png",
  "img/presntation_cards/creer.jpg",
  "img/presntation_cards/s_inspirer.jpg",
  "img/presntation_cards/tester.jpg",
];

// Installation - fait seulement une fois, premiere ouverture du site (installation du service worker)
self.addEventListener("install", (evt) => {
    // Precache static resources here.
  evt.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log("[ServiceWorker] Pre-caching offline page");
        return cache.addAll(FILES_TO_CACHE)
          .catch((error) => {
            console.error("[ServiceWorker] Pre-caching failed:", error);
          });
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
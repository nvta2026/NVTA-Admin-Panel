const CACHE_NAME = 'nvta-admin-v2';

const urlsToCache = [
  '/NVTA-Admin-Panel/',
  '/NVTA-Admin-Panel/index.html',
  '/NVTA-Admin-Panel/manifest.json',
  '/NVTA-Admin-Panel/icons/icon-192x192.png',
  '/NVTA-Admin-Panel/icons/icon-512x512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        return cachedResponse || fetch(event.request);
      })
      .catch(() => {
        return caches.match('/NVTA-Admin-Panel/index.html');
      })
  );
});
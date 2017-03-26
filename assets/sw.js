const CACHE_NAME = 'shaunbent-cache-v1';
const urlsToCache = [
  '/',
  '/assets/css/main.css'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});

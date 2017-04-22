const CACHE_NAME = 'shaunbent:0001';

const cacheFiles = [
  '/',
  '/assets/images/pattern.svg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(cacheFiles);
      })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }

        return fetch(event.request);
    }).catch(() => {
      return caches.match('/offline/');
    })
  );
});

// Empty out any caches that don’t match the ones listed.
self.addEventListener('activate', (event) => {
  const cacheWhitelist = ['shaunbent:0001'];

  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheWhitelist.indexOf(cacheName) === -1) {
              return caches.delete(cacheName);
            }
          })
        );
      }
    )
  );
});

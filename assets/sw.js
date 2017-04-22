const cacheName = 'shaunbent:0001';
const cacheFiles = [
  '/',
  '/assets/images/pattern.svg'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
      caches.open(cacheName)
        .then((cache) => {
          return cache.addAll(cacheFiles)
            .then(() => self.skipWaiting());
        })
    );
  }
);

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.open(cacheName)
      .then((cache) => {
        return cache.match(event.request)
          .then(response => {
            return response || fetch(event.request);
          }
        );
      })
    );
  }
);

// Empty out any caches that don’t match the ones listed.
// self.addEventListener('activate', (event) => {
//   const cacheWhitelist = ['shaunbent:0001'];
// 
//   event.waitUntil(
//     caches.keys()
//       .then((cacheNames) => {
//         return Promise.all(
//           cacheNames.map((cacheName) => {
//             if (cacheWhitelist.indexOf(cacheName) === -1) {
//               return caches.delete(cacheName);
//             }
//           })
//         );
//       }
//     )
//   );
// });

console.info('Hello, I\'m your worker for ther day.');

// https://developers.google.com/web/fundamentals/getting-started/your-first-progressive-web-app
// Step 2 look in to
// https://github.com/GoogleChrome/sw-precache

// TODO: Fix cache and network fetch to update view correct,
//       This should probably always fetch answer from server
//       Or better calculate the answer offline

const cacheName = 'jobbar-janne-0.1';
const files = [
  '/',
  '/css/style.css',
  '/js/app.js',
  '/img/golf-car.jpg'
]

self.addEventListener('install', (event) => {
  console.log('[SW] install');
  event.waitUntil(
    caches
      .open(cacheName)
      .then((cache) => {
        console.log('[SW] Doing the cache!');
        return cache.addAll(files);
      })
  );
});


self.addEventListener('activate', (event) => {
  console.log('[SW] Activate');
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        console.log('[SW] Removing old cache', key);
        if (key !== cacheName) return caches.delete(key);
      }));
    })
  );
});


self.addEventListener('fetch', (event) => {
  // console.log('[SW] Fetch', event.request.url);
  event.respondWith(
    caches.match(event.request)
      .then((cached) => {
        // Update with network
        return cached;
      })
    );
});

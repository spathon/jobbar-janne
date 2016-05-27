console.info('Hello, I\'m your worker for ther day.');

// https://developers.google.com/web/fundamentals/getting-started/your-first-progressive-web-app
// Step 2 look in to
// https://github.com/GoogleChrome/sw-precache

// TODO: Fix cache and network fetch to update view correct,
//       This should probably always fetch answer from server
//       Or better calculate the answer offline

const cacheName = 'jobbar-janne-0.1.1';
const files = [
  '/',
  '/css/style.css',
  '/js/app.js',
  '/manifest.json',
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
  console.log('[SW] activate');
  event.waitUntil(
    // Delete old cache
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== cacheName) {
          console.log('[SW] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
});

self.addEventListener('fetch', (event) => {
  // console.log('[SW] Fetch', event.request);
  let isCacheFile = false;
  for (const file of files) {
    if (event.request.url.endsWith(file)) {
      isCacheFile = true;
      break;
    }
  }
  if(isCacheFile) {
    event.respondWith(
      caches.match(event.request)
        .then((cached) => {
          console.log('Cached: ', event.request.url);
          // Update with network
          return cached;
        })
      );
  }
});

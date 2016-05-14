console.info('Hello, I\'m your worker for ther day.');

// https://developers.google.com/web/fundamentals/getting-started/your-first-progressive-web-app
// Step 2 look in to
// https://github.com/GoogleChrome/sw-precache

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
  console.log('[SW] Fetch', event.request.url);
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return response
        if (response) return response;

        // IMPORTANT: Clone the request. A request is a stream and
        // can only be consumed once. Since we are consuming this
        // once by cache and once by the browser for fetch, we need
        // to clone the response
        const fetchRequest = event.request.clone();

        return fetch(fetchRequest).then((response) => {
          // Check if we received a valid response
          if (
            !response ||
            response.status !== 200 ||
            response.type !== 'basic'
          ) {
            return response;
          }

          // IMPORTANT: Clone the response. A response is a stream
          // and because we want the browser to consume the response
          // as well as the cache consuming the response, we need
          // to clone it so we have 2 stream.
          var responseToCache = response.clone();

          caches.open(cacheName)
            .then((cache) => {
              console.log('[SW] Fetched & cached the data');
              cache.put(event.request, responseToCache);
            });

          return response;
        });
      })
    );
});

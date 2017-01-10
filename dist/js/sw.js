var staticCacheName = 'app-chat-v1';

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(staticCacheName).then(function(cache) {
            return cache.addAll([
                    '/',
                    '/js/bundle.min.js',
                    '/css/styles.css',
                    '/img/user.svg',
                    '/img/homescreen48.png',
                    '/img/homescreen72.png',
                    '/img/homescreen96.png',
                    '/img/homescreen144.png',
                    '/img/homescreen168.png',
                    '/img/homescreen192.png'
                ])
                .then(function() {
                    self.skipWaiting();
                });
        })
    );
});

self.addEventListener('activate', function(event) {
    self.clients.claim();
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.filter(function(cacheName) {
                    return cacheName.startsWith('app-') &&
                        cacheNames != staticCacheName;
                }).map(function(cacheName) {
                    return caches.delete(cacheName);
                })
            );
        })
    );
});

self.addEventListener('fetch', function(event) {
    var requestUrl = new URL(event.request.url),
        fetchReq = event.request.clone();
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(fetchReq);
        })
    );
});

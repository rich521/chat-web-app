var staticCacheName = 'app-chat-v1';

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(staticCacheName).then(function(cache) {
            return cache.addAll([
                    '/',
                    '/js/bundle.min.js',
                    '/css/styles.css',
                    '/img/user.svg',
                    'imgs/homescreen48.png',
                    'imgs/homescreen72.png',
                    'imgs/homescreen96.png',
                    'imgs/homescreen144.png',
                    'imgs/homescreen168.png',
                    'imgs/homescreen192.png'
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

const cacheName = 'v8';
// Core assets

let cacheAssets = [
  '/alert_settings.html',
  '/configuration.html',
  '/users.html',
  '/network.html',
  '/index.html',
  '/dashboard.html',
  '/fonts/fontawesome-webfont.ttf',
  '/offline.html',
];


// On install, cache core assets
self.addEventListener('install', function (event) {

	// Cache core assets
	event.waitUntil(caches.open('cacheName').then(function (cache) {
		cache.addAll(cacheAssets);
		return cache;
	})
  .then(()=>self.skipWaiting())
  );

});

self.addEventListener('activate', e=>{

  e.waitUntil(caches.keys().then(cacheNames=>{
    return Promise.all(
      cacheNames.map(cache=>{
        if(cache != cacheName){
          return caches.delete(cache);
        }
      })
    )
  }));

});

self.addEventListener('fetch', e=>{

  e.respondWith(
      caches.match(request).then(function (response) {
        return response || fetch(request).then(function (response) {
          return response;
        });
      })
    );

});
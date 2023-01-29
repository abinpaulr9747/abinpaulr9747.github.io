const cacheName = 'v7';
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

  let request = e.request;

  //fetch from 

  if (e.request.headers.get('Accept').includes('application/json')) {

		e.respondWith(
			fetch(request).then(function (response) {

				// Create a copy of the response and save it to the cache
				let copy = response.clone();
				e.waitUntil(caches.open('cacheName').then(function (cache) {
					return cache.put(request, copy);
				}));

				// Return the response
				return response;

			}).catch(function (error) {

				// If there's no item in cache, respond with a fallback
				return caches.match(request).then(function (response) {
					return response || caches.match('/offline.html');
				});

			})
		);

  }else{

    e.respondWith(
      caches.match(request).then(function (response) {
        return response || fetch(request).then(function (response) {
          return response;
        });
      })
    );

  }

});
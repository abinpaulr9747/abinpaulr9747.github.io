const cacheName = 'v3';

self.addEventListener('install', e => {

});

self.addEventListener('activate',e =>{
    e.waitUntil(
        caches.keys().then(cacheNames=>{
            return Promise.all(
                cacheNames.map(cache=>{
                    if(cache != cacheName){
                        return caches.delete(cache);
                    }
                })
            )
        })
    )
});

// Fetch site if offline
self.addEventListener('fetch',e=>{
    e.respondWith(
        fetch(e.request)
        .then(res=>{
            const resClone = res.clone();
            caches
            .open(cacheName)
            .then(cache=>{
                cache.put(e.request, resClone);
            });
            return res;
        }).catch(err=>catches.match(e.request).then(res=>res))
    )
});
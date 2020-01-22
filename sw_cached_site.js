const cacheName = 'v2';

//Call Install Event 
self.addEventListener('install', (e) => {
    console.log('Service Worker: Installed');
});

//Call Activate Event
self.addEventListener('activate', (e) => {
    console.log('Service Worker: Activated');
    //remove unwanted caches
    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if(cache !== cacheName){
                        console.log('Service Worker: clearing old cache');
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

//call fetch event
self.addEventListener('fetch', (e) =>{
    console.log('Service Worker: Fetching');
    e.respondWith(
        fetch(e.request)
        .then(res => {
            // Make Copy/Clone Of Response
            const resClone = res.clone();
            //Open cache
            caches
            .open(cacheName)
            .then(cache => {
                // add response to cache 
                cache.put(e.request, resClone);
            });
            return res;
        }).catch(err => caches.match(e.request).then(res => res))
    );
});
const cacheName = 'v1';

const cacheAssets = [
    'index.html',
    '/css/style.css',
    '/js/main.js'
];

//Call Install Event 
self.addEventListener('install', (e) => {
    console.log('Service Worker: Installed')

    e.waitUntil(
        caches
            .open(cacheName)
            .then(cache => {
                console.log('Service Worker: Caching files');
                cache.addAll(cacheAssets);
            })
            .then(() => self.skipWaiting())
    );
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
        fetch(e.request).catch(() => caches.match(e.request))
    );
});
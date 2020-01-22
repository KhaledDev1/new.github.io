// make sure service worker are supported
if ('serviceWorker' in navigator) {
    // console.log('ServiceWorker supported');
    window.addEventListener('load', () =>{
        navigator.serviceWorker
        // .register('../sw_cached_pages.js')
        // .then(reg => console.log('Service Worker: Registered'))
        // .catch(err => console.log(`Service Worker: Error: ${err}`))

        .register('../sw_cached_site.js')
        .then(reg => console.log('Service Worker: Registered'))
        .catch(err => console.log(`Service Worker: Error: ${err}`))
    })
  }
  
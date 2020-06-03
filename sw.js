const staticCacheName='site-static';
const assets=[
    '/',
    '/index.html',
    '/main.js',
    '/style.css',
    '/music/This is Shanghai.mp3',
    '/music/Stive Morgan.mp3',
    '/src/buttons.jpg'

];

self.addEventListener('install', evt=>{
    evt.waitUntil( caches.open('staticCasheName').then(cache=>{
        console.log('caching assets')
        cache.addAll(assets);
    }))
});

self.addEventListener('fetch', evt=>{
    evt.respondWith(
        caches.match(evt.request).then(cacheRes=>{
            return cacheRes||fetch(evt.request);

        })
    )

});  
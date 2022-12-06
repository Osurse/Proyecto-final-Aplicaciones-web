
self.addEventListener('install', e=>{
    
    caches.open('cache-v1')
    .then(cache =>{
        
        cache.addAll([
            './',
            'index.html',
            'css/style.css',
            'app.js',
            'images/1.png',
            'images/2.png',
            'images/3.png',
            'images/facebook.png',
            'images/instagram.png',
            'images/twiter.png',
            'https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css',
            'videos/Mario.mp4',
            'videos/ports.mp4',
            'videos/nintendo.mp4',
            'https://www.youtube.com/embed/IomPE3J5M4c',
            'https://www.youtube.com/embed/TzGzSEiiLoY',
            'https://www.youtube.com/embed/YFNx_TtROT8',

            
        ])
    });
    e.waitUntil(cacheProm);
});

self.addEventListener('fetch', e =>{
    //cache-only
    const respuesta = caches.match( e.request )
    .then ( res => {
        if ( res ) return res;
        //no existe el archivo
        //tengo que ir a la web
        console.log('No existe', e.request.url);
        return fetch( e.request ).then ( newResp => {
            caches.open('cache-v1')
                .then( cache => {
                    cache.put( e.request, newResp);
                }

                )
            return newResp.clone;
        });
    });
    e.respondWith(respuesta);
})
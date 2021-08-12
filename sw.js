//rutas que se van a guardar en el cache
const CACHE_ELEMENT = [
    "./",
    "https://unpkg.com/react@17/umd/react.production.min.js",
    "https://unpkg.com/react-dom@17/umd/react-dom.production.min.js",
    "https://unpkg.com/@babel/standalone/babel.min.js",
    "./style.css",
    "./components/Contador.js",
    "./index.js",
];

//este el nombre del archivo donde se guardará. Pueden empezar con v1, v2, v3 
const CACHE_NAME = "v3_cache_contador_react";

//primer evento del service worker

//self es una constante que guarda el this(standar)
//el evento install es la primer parte de un ciclo de vida de un sw. Que es cuando se registra
//se installa. Y lo que hace acá es cachear las rutas y deje de hacer peticiones a internet
//como segundo parametro le pasamos una arrow funtion

self.addEventListener("install", (e)=>{
        e.waitUntil(
            //esto retorna una promesa
            //cache es el objeto que nosotros estamos abriendo(CACHE_NAME)
            caches.open(CACHE_NAME).then(cache => {
                //entonces le pasó todas las rutas que necesitamos que guarde
                cache.addAll(CACHE_ELEMENT).then( () =>{//si todo sale bien
                    self.skipWaiting()
                }).catch(err => console.log(err)) //tambien se puede poner- catch(console.log). Esto va a devolver el error completo
            })
        )
} )

//cuando se activa
self.addEventListener("activate", (e)=>{
    const cacheWhitelist = CACHE_NAME; //todas las rutas del archivo v..1,2

    e.waitUntil(
        //keys, va a devolver todas las claves guardadas (v1,v2...) en el navegador
        caches.keys().then((cacheNames) => {
            return Promise.all( cacheNames.map(cacheName => {
                //si cacheWhiteList contiene el nombre del cache
                return ( //es un terneario
                    cacheWhitelist.indexOf(cacheName) === -1 && caches.delete(cacheName) 
                    );
            }) )
            //una vez que me retorne sin errores la limpieza de cache
        }).then(() => self.clients.claim())
    );
} );

//fetch
self.addEventListener("fetch", (e)=>{
    e.respondWith(     
        //para saber que existe dentro de nuestro cache
        //en teoria, si esta en cache lo buscado, lo busca y ahi, sino lo pide a internet
        caches.match(e.request).then((res) => {
            if(res){
                return res;
            }
            return fetch(e.request);
        })
    );
} );


const CACHE_NAME = 'dd-sim-v2';
const ASSETS = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  '/icon.png'
];

console.log('Service Worker: Загружен!', CACHE_NAME);

self.addEventListener('install', (e) => {
  console.log('Установка Service Worker...');
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Попытка кеширования:', ASSETS);
        return cache.addAll(ASSETS).catch(err => {
          console.error('Ошибка кеширования:', err);
          throw err;
        });
      })
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            console.log('Удаление старого кеша:', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request)
      .then(response => {
        if (response) {
          console.log('Обнаружен в кеше:', e.request.url);
          return response;
        }
        console.log('Загрузка из сети:', e.request.url);
        return fetch(e.request);
      })
  );
});
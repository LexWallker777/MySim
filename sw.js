// sw.js
const CACHE_NAME = 'dd-sim-v3'; // Обновите версию при изменениях
const ASSETS = [
  '/MySim/',                     // Главная страница
  '/MySim/index.html',
  '/MySim/style.css',
  '/MySim/script.js',
  '/MySim/sw.js',                // Сам Service Worker
  '/MySim/manifest.json',
  '/MySim/icon.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Кеширую файлы:', ASSETS);
        return cache.addAll(ASSETS);
      })
      .catch(err => {
        console.error('Ошибка кеширования:', err);
      })
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request)
      .then(response => {
        return response || fetch(e.request);
      })
  );
});
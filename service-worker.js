const CACHE_NAME = 'pwa-cache-v1';
const ASSETS = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './icon-192.png',
  './icon-512.png',
  './manifest.json'
];

// 설치 이벤트: 필수 리소스 캐싱
self.addEventListener('install', evt => {
  evt.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

// 활성화 이벤트: 이전 캐시 정리
self.addEventListener('activate', evt => {
  evt.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// 네트워크 요청 가로채기: 캐시 우선
self.addEventListener('fetch', evt => {
  evt.respondWith(
    caches.match(evt.request)
      .then(cachedRes => cachedRes || fetch(evt.request))
  );
});

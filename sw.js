const CACHE_NAME = 'monster-tracker-cache-v2'; // 每次改版請遞增版本號
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

// 安裝階段：快取檔案
self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

// 啟用階段：刪除舊的快取
self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(name) {
          if (name !== CACHE_NAME) {
            return caches.delete(name); // ✅ 刪除舊快取
          }
        })
      );
    })
  );
});

// 請求攔截
self.addEventListener('fetch', function(e) {
  const url = new URL(e.request.url);

  if (url.origin === location.origin) {
    e.respondWith(
      caches.match(e.request).then(function(response) {
        return response || fetch(e.request);
      })
    );
  }
});

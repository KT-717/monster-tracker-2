
self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open('monster-tracker-cache').then(function(cache) {
      return cache.addAll([
        './',
        './index.html',
        './manifest.json',
        './icon-192.png',
        './icon-512.png'
      ]);
    })
  );
});

self.addEventListener('fetch', function(e) {
  const url = new URL(e.request.url);

  // 僅攔截本站內容，不攔截外部 API 請求（例如 Google Script）
  if (url.origin === location.origin) {
    e.respondWith(
      caches.match(e.request).then(function(response) {
        return response || fetch(e.request);
      })
    );
  }
});

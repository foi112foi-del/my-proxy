self.addEventListener('install', e => e.waitUntil(self.skipWaiting()));
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));

self.addEventListener('fetch', event => {
  const req = event.request;
  const url = new URL(req.url);
  if (!url.pathname.startsWith('/resource')) {
    const proxyUrl = `/resource?url=${encodeURIComponent(req.url)}`;
    event.respondWith(fetch(proxyUrl));
  }
});

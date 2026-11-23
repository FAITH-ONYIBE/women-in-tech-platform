/* africanqueen service worker
 * - App shell pages are precached on install.
 * - Navigations: network-first, fall back to cache, then /offline.
 * - /_next/static and images: cache-first (hashed, so safe) - avoids re-downloading.
 * Bump VERSION to invalidate old caches.
 */
const VERSION = 'v1';
const PAGES = `aq-pages-${VERSION}`;
const ASSETS = `aq-assets-${VERSION}`;
const PRECACHE = ['/', '/courses', '/events', '/leaderboard', '/donate', '/login', '/join', '/offline', '/manifest.webmanifest'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(PAGES).then((c) => Promise.all(PRECACHE.map((u) => c.add(u).catch(() => {})))).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => ![PAGES, ASSETS].includes(k)).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(PAGES).then((c) => c.put(req, copy));
          return res;
        })
        .catch(async () => (await caches.match(req)) || (await caches.match('/offline')))
    );
    return;
  }

  const cacheFirst =
    url.pathname.startsWith('/_next/static/') ||
    url.pathname.startsWith('/_next/image') ||
    url.pathname.startsWith('/icons/') ||
    /\.(?:png|jpe?g|webp|avif|svg|woff2?)$/.test(url.pathname);

  if (cacheFirst) {
    event.respondWith(
      caches.match(req).then(
        (hit) =>
          hit ||
          fetch(req).then((res) => {
            if (res.ok) {
              const copy = res.clone();
              caches.open(ASSETS).then((c) => c.put(req, copy));
            }
            return res;
          })
      )
    );
    return;
  }

  // Other same-origin GETs (e.g. RSC payloads): stale-while-revalidate.
  event.respondWith(
    caches.match(req).then((hit) => {
      const net = fetch(req)
        .then((res) => {
          if (res.ok) caches.open(PAGES).then((c) => c.put(req, res.clone()));
          return res;
        })
        .catch(() => hit);
      return hit || net;
    })
  );
});

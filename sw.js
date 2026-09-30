/**
 * Toy Haven - Service Worker (PWA Offline Support)
 * Module: COMP40053 Assignment 3
 * University of Staffordshire
 */

const CACHE_NAME = 'toy-haven-cache-v4';

const PRECACHE_ASSETS = [
  './',
  './index.html',
  './products.html',
  './cart.html',
  './checkout.html',
  './wishlist.html',
  './support.html',
  './manifest.json',
  './favicon.svg',
  './css/style.css',
  './css/responsive.css',
  './data/products.json',
  './js/products-data.js',
  './js/main.js',
  './js/home.js',
  './js/products.js',
  './js/cart.js',
  './js/checkout.js',
  './js/wishlist.js',
  './js/support.js',
  './images/logo.svg',
  './images/hero-figurines.jpg',
  './images/hero-boardgames.jpg',
  './images/hero-toys.jpg',
  './images/hero-diecast.jpg',
  './images/products/die-dodge-charger.jpg',
  './images/products/die-ferrari-250-gto.jpg',
  './images/products/die-porsche-356b.jpg',
  './images/products/die-corvette-1957.jpg'
];

// Install Event: cache primary assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS).catch((err) => {
        console.warn('Pre-cache asset warning:', err);
      });
    })
  );
  self.skipWaiting();
});

// Activate Event: cleanup older caches immediately
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

// Fetch Event: Network-first for HTML, JS, JSON & product images; Cache-first for static icons
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // Network-first for dynamic content, scripts, styles, data, and product photos
  if (
    url.pathname.endsWith('.html') ||
    url.pathname.endsWith('.js') ||
    url.pathname.endsWith('.json') ||
    url.pathname.includes('/images/products/')
  ) {
    event.respondWith(
      fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseClone));
          }
          return networkResponse;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // Cache-first for other static assets
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request).then((networkResponse) => {
        if (
          networkResponse &&
          networkResponse.status === 200 &&
          networkResponse.type === 'basic'
        ) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      }).catch(() => {
        if (event.request.headers.get('accept')?.includes('text/html')) {
          return caches.match('./index.html');
        }
      });
    })
  );
});

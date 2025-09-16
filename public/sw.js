// Service Worker for AIAutomate
// Provides caching and offline functionality for better performance

const CACHE_NAME = 'aiautomate-v1';
const STATIC_CACHE_NAME = 'aiautomate-static-v1';

// Files to cache immediately
const STATIC_FILES = [
  '/',
  '/static/js/main.js',
  '/static/css/main.css',
  '/manifest.json',
  '/favicon.ico'
];

// Files to cache on demand
const DYNAMIC_CACHE_NAME = 'aiautomate-dynamic-v1';

// Install event - cache static files
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing');
  
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME)
      .then(cache => {
        console.log('Service Worker: Caching static files');
        return cache.addAll(STATIC_FILES.map(url => new Request(url, { credentials: 'same-origin' })));
      })
      .catch(error => {
        console.warn('Service Worker: Cache failed for static files', error);
      })
  );
  
  // Activate immediately
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating');
  
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== STATIC_CACHE_NAME && cacheName !== DYNAMIC_CACHE_NAME) {
            console.log('Service Worker: Deleting old cache', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  
  // Take control of all pages
  self.clients.claim();
});

// Fetch event - serve from cache or network
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const { url } = request;
  
  // Skip external requests and non-GET requests
  if (!url.startsWith(self.location.origin) || request.method !== 'GET') {
    return;
  }
  
  // Handle different types of requests
  if (isStaticAsset(url)) {
    event.respondWith(cacheFirstStrategy(request));
  } else if (isHTMLRequest(request)) {
    event.respondWith(networkFirstStrategy(request));
  } else {
    event.respondWith(staleWhileRevalidateStrategy(request));
  }
});

// Cache strategies
async function cacheFirstStrategy(request) {
  try {
    const cached = await caches.match(request);
    if (cached) {
      return cached;
    }
    
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.warn('Service Worker: Cache first strategy failed', error);
    return new Response('Network error', { status: 408 });
  }
}

async function networkFirstStrategy(request) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.warn('Service Worker: Network first failed, trying cache', error);
    const cached = await caches.match(request);
    if (cached) {
      return cached;
    }
    return new Response('Offline', { 
      status: 503, 
      statusText: 'Service Unavailable',
      headers: { 'Content-Type': 'text/html' }
    });
  }
}

async function staleWhileRevalidateStrategy(request) {
  try {
    const cache = await caches.open(DYNAMIC_CACHE_NAME);
    const cached = await cache.match(request);
    
    // Fetch in background to update cache
    const fetchPromise = fetch(request).then(networkResponse => {
      if (networkResponse.ok) {
        cache.put(request, networkResponse.clone());
      }
      return networkResponse;
    });
    
    // Return cached version immediately if available, otherwise wait for network
    return cached || await fetchPromise;
  } catch (error) {
    console.warn('Service Worker: Stale while revalidate failed', error);
    const cached = await caches.match(request);
    return cached || new Response('Network error', { status: 408 });
  }
}

// Utility functions
function isStaticAsset(url) {
  return /\.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot)(\?.*)?$/i.test(url);
}

function isHTMLRequest(request) {
  return request.headers.get('accept')?.includes('text/html');
}

// Background sync for analytics and performance data
self.addEventListener('sync', (event) => {
  if (event.tag === 'performance-sync') {
    event.waitUntil(syncPerformanceData());
  }
});

async function syncPerformanceData() {
  try {
    // Sync any queued performance data when online
    const stored = await getStoredPerformanceData();
    if (stored.length > 0) {
      await sendPerformanceData(stored);
      await clearStoredPerformanceData();
    }
  } catch (error) {
    console.warn('Service Worker: Performance sync failed', error);
  }
}

// Helper functions for performance data (implement as needed)
async function getStoredPerformanceData() {
  // Return stored performance data from IndexedDB or localStorage
  return [];
}

async function sendPerformanceData(data) {
  // Send performance data to analytics endpoint
  console.log('Syncing performance data:', data);
}

async function clearStoredPerformanceData() {
  // Clear stored performance data
  console.log('Cleared stored performance data');
}
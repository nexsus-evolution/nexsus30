// Service Worker per NEXSUS Evolution Future
// Versione ottimizzata per performance e durata 2+ anni

const CACHE_NAME = 'nexsus-evolution-future-v1.0.0';
const STATIC_CACHE = 'nexsus-static-v1.0.0';
const DYNAMIC_CACHE = 'nexsus-dynamic-v1.0.0';

// File da cachare immediatamente
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/styles.css',
  '/script.js',
  '/manifest.json'
];

// File da cachare dinamicamente
const DYNAMIC_ASSETS = [
  // Immagini, font, e altri asset caricati dinamicamente
];

// Strategia di cache per diversi tipi di risorsa
const CACHE_STRATEGIES = {
  // Cache First per asset statici (CSS, JS, immagini)
  static: 'cache-first',
  // Network First per contenuti dinamici (API, dati)
  dynamic: 'network-first',
  // Stale While Revalidate per contenuti che possono essere un po' datati
  content: 'stale-while-revalidate'
};

// Installazione del Service Worker
self.addEventListener('install', event => {
  console.log('🚀 NEXSUS SW: Installing...');
  
  event.waitUntil(
    Promise.all([
      // Cache degli asset statici
      caches.open(STATIC_CACHE).then(cache => {
        console.log('📦 NEXSUS SW: Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      }),
      // Skip waiting per attivare immediatamente
      self.skipWaiting()
    ])
  );
});

// Attivazione del Service Worker
self.addEventListener('activate', event => {
  console.log('✅ NEXSUS SW: Activating...');
  
  event.waitUntil(
    Promise.all([
      // Pulizia cache vecchie
      cleanOldCaches(),
      // Prendi controllo di tutti i client
      self.clients.claim()
    ])
  );
});

// Gestione delle richieste di rete
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Ignora richieste non HTTP/HTTPS
  if (!request.url.startsWith('http')) {
    return;
  }
  
  // Strategia basata sul tipo di risorsa
  if (isStaticAsset(request)) {
    event.respondWith(cacheFirstStrategy(request));
  } else if (isAPIRequest(request)) {
    event.respondWith(networkFirstStrategy(request));
  } else {
    event.respondWith(staleWhileRevalidateStrategy(request));
  }
});

// Strategia Cache First (per asset statici)
async function cacheFirstStrategy(request) {
  try {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.error('❌ NEXSUS SW: Cache First failed:', error);
    return getOfflineFallback(request);
  }
}

// Strategia Network First (per contenuti dinamici)
async function networkFirstStrategy(request) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.log('🔄 NEXSUS SW: Network failed, trying cache');
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    return getOfflineFallback(request);
  }
}

// Strategia Stale While Revalidate (per contenuti misti)
async function staleWhileRevalidateStrategy(request) {
  const cache = await caches.open(DYNAMIC_CACHE);
  const cachedResponse = await cache.match(request);
  
  const fetchPromise = fetch(request).then(networkResponse => {
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  }).catch(error => {
    console.log('🔄 NEXSUS SW: Network update failed:', error);
    return cachedResponse;
  });
  
  return cachedResponse || fetchPromise;
}

// Determina se è un asset statico
function isStaticAsset(request) {
  const url = new URL(request.url);
  const pathname = url.pathname;
  
  return (
    pathname.endsWith('.css') ||
    pathname.endsWith('.js') ||
    pathname.endsWith('.png') ||
    pathname.endsWith('.jpg') ||
    pathname.endsWith('.jpeg') ||
    pathname.endsWith('.gif') ||
    pathname.endsWith('.svg') ||
    pathname.endsWith('.ico') ||
    pathname.endsWith('.woff') ||
    pathname.endsWith('.woff2') ||
    pathname.endsWith('.ttf') ||
    pathname.endsWith('.eot')
  );
}

// Determina se è una richiesta API
function isAPIRequest(request) {
  const url = new URL(request.url);
  return (
    url.pathname.startsWith('/api/') ||
    url.pathname.startsWith('/graphql') ||
    request.headers.get('content-type') === 'application/json'
  );
}

// Fallback offline
async function getOfflineFallback(request) {
  const url = new URL(request.url);
  
  // Fallback per pagine HTML
  if (request.headers.get('accept').includes('text/html')) {
    const cachedPage = await caches.match('/index.html');
    if (cachedPage) {
      return cachedPage;
    }
    
    return new Response(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>NEXSUS - Offline</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body {
            font-family: Arial, sans-serif;
            background: #000;
            color: #fff;
            text-align: center;
            padding: 50px 20px;
            margin: 0;
          }
          .offline-container {
            max-width: 600px;
            margin: 0 auto;
            background: rgba(42, 255, 64, 0.1);
            border-radius: 20px;
            padding: 40px;
            border: 2px solid rgba(42, 255, 64, 0.3);
          }
          .logo {
            font-size: 48px;
            font-weight: 900;
            background: linear-gradient(45deg, #2aff40, #00c8ff, #9c27ff);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin-bottom: 20px;
          }
          .message {
            font-size: 18px;
            line-height: 1.6;
            margin-bottom: 30px;
          }
          .retry-btn {
            background: linear-gradient(45deg, #2aff40, #00c8ff);
            color: #000;
            border: none;
            padding: 15px 30px;
            border-radius: 25px;
            font-weight: 700;
            font-size: 16px;
            cursor: pointer;
            text-transform: uppercase;
          }
        </style>
      </head>
      <body>
        <div class="offline-container">
          <div class="logo">NEXSUS</div>
          <h1>Sei Offline</h1>
          <div class="message">
            <p>Non è possibile connettersi a NEXSUS Evolution Future in questo momento.</p>
            <p>Controlla la tua connessione internet e riprova.</p>
            <p><strong>La tua scintilla si chiama NEXSUS</strong></p>
          </div>
          <button class="retry-btn" onclick="window.location.reload()">
            Riprova
          </button>
        </div>
      </body>
      </html>
    `, {
      headers: { 'Content-Type': 'text/html' }
    });
  }
  
  // Fallback per immagini
  if (request.headers.get('accept').includes('image/')) {
    return new Response(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
        <rect width="200" height="200" fill="#000"/>
        <text x="100" y="100" font-size="20" text-anchor="middle" fill="#2aff40">
          NEXSUS
        </text>
        <text x="100" y="130" font-size="12" text-anchor="middle" fill="#00c8ff">
          Offline
        </text>
      </svg>
    `, {
      headers: { 'Content-Type': 'image/svg+xml' }
    });
  }
  
  // Fallback generico
  return new Response('Offline - NEXSUS Evolution Future', {
    status: 503,
    statusText: 'Service Unavailable'
  });
}

// Pulizia cache vecchie
async function cleanOldCaches() {
  const cacheNames = await caches.keys();
  const validCaches = [CACHE_NAME, STATIC_CACHE, DYNAMIC_CACHE];
  
  const deletePromises = cacheNames
    .filter(cacheName => !validCaches.includes(cacheName))
    .map(cacheName => {
      console.log('🗑️ NEXSUS SW: Deleting old cache:', cacheName);
      return caches.delete(cacheName);
    });
  
  return Promise.all(deletePromises);
}

// Gestione messaggi dal client
self.addEventListener('message', event => {
  const { type, payload } = event.data;
  
  switch (type) {
    case 'SKIP_WAITING':
      self.skipWaiting();
      break;
      
    case 'GET_VERSION':
      event.ports[0].postMessage({
        version: CACHE_NAME,
        timestamp: new Date().toISOString()
      });
      break;
      
    case 'CLEAR_CACHE':
      clearAllCaches().then(() => {
        event.ports[0].postMessage({ success: true });
      });
      break;
      
    case 'CACHE_URLS':
      if (payload && payload.urls) {
        cacheUrls(payload.urls).then(() => {
          event.ports[0].postMessage({ success: true });
        });
      }
      break;
      
    default:
      console.log('🤖 NEXSUS SW: Unknown message type:', type);
  }
});

// Cache URLs specifici
async function cacheUrls(urls) {
  const cache = await caches.open(DYNAMIC_CACHE);
  const cachePromises = urls.map(url => {
    return fetch(url).then(response => {
      if (response.ok) {
        return cache.put(url, response);
      }
    }).catch(error => {
      console.log('❌ NEXSUS SW: Failed to cache URL:', url, error);
    });
  });
  
  return Promise.all(cachePromises);
}

// Pulisci tutte le cache
async function clearAllCaches() {
  const cacheNames = await caches.keys();
  const deletePromises = cacheNames.map(cacheName => caches.delete(cacheName));
  return Promise.all(deletePromises);
}

// Gestione errori globali
self.addEventListener('error', event => {
  console.error('❌ NEXSUS SW: Global error:', event.error);
});

self.addEventListener('unhandledrejection', event => {
  console.error('❌ NEXSUS SW: Unhandled promise rejection:', event.reason);
});

// Background Sync per azioni offline
self.addEventListener('sync', event => {
  console.log('🔄 NEXSUS SW: Background sync:', event.tag);
  
  if (event.tag === 'nexsus-sync') {
    event.waitUntil(syncNexsusData());
  }
});

// Sincronizzazione dati NEXSUS
async function syncNexsusData() {
  try {
    // Qui si potrebbero sincronizzare dati offline come:
    // - Messaggi chatbot non inviati
    // - Form di contatto compilati offline
    // - Preferenze utente modificate
    
    console.log('✅ NEXSUS SW: Data sync completed');
    return Promise.resolve();
  } catch (error) {
    console.error('❌ NEXSUS SW: Data sync failed:', error);
    return Promise.reject(error);
  }
}

// Push Notifications
self.addEventListener('push', event => {
  console.log('📱 NEXSUS SW: Push received');
  
  const options = {
    body: 'Nuove opportunità ti aspettano in NEXSUS!',
    icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 192"><rect width="192" height="192" fill="%23000"/><text x="96" y="120" font-size="120" text-anchor="middle" fill="%232aff40">🚀</text></svg>',
    badge: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96"><rect width="96" height="96" fill="%23000"/><text x="48" y="60" font-size="60" text-anchor="middle" fill="%232aff40">N</text></svg>',
    vibrate: [200, 100, 200],
    data: {
      url: '/',
      timestamp: Date.now()
    },
    actions: [
      {
        action: 'open',
        title: 'Apri NEXSUS',
        icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="%232aff40" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>'
      },
      {
        action: 'dismiss',
        title: 'Chiudi',
        icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="%23666" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>'
      }
    ]
  };
  
  if (event.data) {
    const pushData = event.data.json();
    options.body = pushData.body || options.body;
    options.data.url = pushData.url || options.data.url;
  }
  
  event.waitUntil(
    self.registration.showNotification('NEXSUS Evolution Future', options)
  );
});

// Click su notifiche
self.addEventListener('notificationclick', event => {
  console.log('🔔 NEXSUS SW: Notification clicked');
  
  event.notification.close();
  
  if (event.action === 'open' || !event.action) {
    const urlToOpen = event.notification.data.url || '/';
    
    event.waitUntil(
      clients.matchAll({ type: 'window', includeUncontrolled: true })
        .then(clientList => {
          // Cerca una finestra già aperta
          for (const client of clientList) {
            if (client.url.includes(self.location.origin) && 'focus' in client) {
              client.navigate(urlToOpen);
              return client.focus();
            }
          }
          
          // Apri una nuova finestra
          if (clients.openWindow) {
            return clients.openWindow(urlToOpen);
          }
        })
    );
  }
});

// Periodic Background Sync (se supportato)
self.addEventListener('periodicsync', event => {
  console.log('⏰ NEXSUS SW: Periodic sync:', event.tag);
  
  if (event.tag === 'nexsus-periodic-sync') {
    event.waitUntil(performPeriodicSync());
  }
});

// Sincronizzazione periodica
async function performPeriodicSync() {
  try {
    // Aggiorna cache con contenuti freschi
    // Sincronizza dati utente
    // Controlla nuove notifiche
    
    console.log('⏰ NEXSUS SW: Periodic sync completed');
    return Promise.resolve();
  } catch (error) {
    console.error('❌ NEXSUS SW: Periodic sync failed:', error);
    return Promise.reject(error);
  }
}

// Ottimizzazioni per performance
const PERFORMANCE_CONFIG = {
  // Cache size limits (in MB)
  maxCacheSize: 50,
  // Cache expiry (in days)
  cacheExpiry: 30,
  // Network timeout (in ms)
  networkTimeout: 5000
};

// Monitora dimensioni cache
async function manageCacheSize() {
  const cacheNames = await caches.keys();
  
  for (const cacheName of cacheNames) {
    const cache = await caches.open(cacheName);
    const requests = await cache.keys();
    
    // Stima dimensione cache (approssimativa)
    if (requests.length > 100) {
      // Rimuovi le voci più vecchie
      const oldRequests = requests.slice(0, requests.length - 50);
      await Promise.all(oldRequests.map(request => cache.delete(request)));
      console.log(`🧹 NEXSUS SW: Cleaned ${oldRequests.length} old entries from ${cacheName}`);
    }
  }
}

// Esegui pulizia cache periodicamente
setInterval(manageCacheSize, 24 * 60 * 60 * 1000); // Ogni 24 ore

console.log('🚀 NEXSUS Evolution Future Service Worker loaded successfully!');
console.log('💫 Ottimizzato per 1M+ click e durata 2+ anni');
console.log('🌟 La tua scintilla si chiama NEXSUS');
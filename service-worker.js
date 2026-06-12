/* ============================================
   MUST Writers Guild — Service Worker
   ============================================ */

const CACHE_NAME = 'must-writers-guild-v1';
const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/guild.html',
    '/library.html',
    '/reader.html',
    '/events.html',
    '/join.html',
    '/css/style.css',
    '/css/components.css',
    '/css/animations.css',
    '/css/reader.css',
    '/js/app.js',
    '/js/navigation.js',
    '/js/swipe.js',
    '/js/library.js',
    '/js/reader.js',
    '/js/storage.js',
    '/js/search.js',
    '/js/events.js',
    '/data/stories.json',
    '/data/poems.json',
    '/data/members.json',
    '/data/constitution.json',
    '/data/events.json',
    '/assets/logo.png'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Caching static assets...');
                return cache.addAll(STATIC_ASSETS);
            })
            .then(() => {
                return self.skipWaiting();
            })
            .catch((error) => {
                console.error('Cache installation failed:', error);
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames
                        .filter((name) => name !== CACHE_NAME)
                        .map((name) => {
                            console.log('Deleting old cache:', name);
                            return caches.delete(name);
                        })
                );
            })
            .then(() => {
                return self.clients.claim();
            })
    );
});

// Fetch event - serve from cache or network
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);
    
    // Skip non-GET requests
    if (request.method !== 'GET') {
        return;
    }
    
    // Skip external requests (Bootstrap Icons CDN, etc.)
    if (!url.origin.includes(self.location.origin)) {
        return;
    }
    
    // Strategy: Cache First, then Network
    event.respondWith(
        caches.match(request)
            .then((cachedResponse) => {
                if (cachedResponse) {
                    // Return cached version immediately
                    // But also fetch fresh version in background
                    fetch(request)
                        .then((networkResponse) => {
                            if (networkResponse && networkResponse.status === 200) {
                                caches.open(CACHE_NAME).then((cache) => {
                                    cache.put(request, networkResponse.clone());
                                });
                            }
                        })
                        .catch(() => {
                            // Network failed, cached version already served
                        });
                    
                    return cachedResponse;
                }
                
                // Not in cache, fetch from network
                return fetch(request)
                    .then((networkResponse) => {
                        if (!networkResponse || networkResponse.status !== 200) {
                            return networkResponse;
                        }
                        
                        // Cache the new response
                        const responseToCache = networkResponse.clone();
                        caches.open(CACHE_NAME).then((cache) => {
                            cache.put(request, responseToCache);
                        });
                        
                        return networkResponse;
                    })
                    .catch(() => {
                        // Network failed and not in cache
                        // Return offline fallback for HTML pages
                        if (request.headers.get('accept').includes('text/html')) {
                            return caches.match('/index.html');
                        }
                        
                        // Return empty response for other resources
                        return new Response('Offline', {
                            status: 503,
                            statusText: 'Service Unavailable'
                        });
                    });
            })
    );
});

// Background sync for form submissions (when supported)
self.addEventListener('sync', (event) => {
    if (event.tag === 'sync-applications') {
        event.waitUntil(syncApplications());
    }
});

// Push notification support (future enhancement)
self.addEventListener('push', (event) => {
    const options = {
        body: event.data ? event.data.text() : 'New content available!',
        icon: '/assets/logo.png',
        badge: '/assets/logo.png',
        tag: 'must-writers-notification',
        requireInteraction: true,
        actions: [
            { action: 'open', title: 'Open App' },
            { action: 'dismiss', title: 'Dismiss' }
        ]
    };
    
    event.waitUntil(
        self.registration.showNotification('MUST Writers Guild', options)
    );
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    
    if (event.action === 'open' || !event.action) {
        event.waitUntil(
            clients.openWindow('/')
        );
    }
});

// Helper function for background sync
async function syncApplications() {
    // This would sync stored form submissions when back online
    // Implementation depends on specific requirements
    console.log('Syncing applications...');
}
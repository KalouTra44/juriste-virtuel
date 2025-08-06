const CACHE_NAME = 'juriste-virtuel-v1.0.0';
const urlsToCache = [
    '/',
    '/static/css/conversation-small-j9iamy23.css',
    '/static/css/codemirror-nauedrd6.css',
    '/static/css/cot-message-n4x930jt.css',
    '/static/css/comments-plugin-tah3dlup.css',
    '/static/manifest.json',
    'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

// Install event - cache resources
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache.map(url => new Request(url, { mode: 'no-cors' })));
            })
            .catch(error => {
                console.log('Cache install failed:', error);
            })
    );
    self.skipWaiting();
});

// Activate event - cleanup old caches
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

// Fetch event - serve cached content when offline
self.addEventListener('fetch', event => {
    const { request } = event;
    
    // Skip non-GET requests
    if (request.method !== 'GET') {
        return;
    }

    // Handle API requests with network-first strategy
    if (request.url.includes('/ask')) {
        event.respondWith(
            fetch(request)
                .then(response => {
                    // If successful, return the response
                    if (response.status === 200) {
                        return response;
                    }
                    throw new Error('Network response was not ok');
                })
                .catch(() => {
                    // If network fails, return offline message
                    const offlineResponse = {
                        answer: getOfflineMessage(getLanguageFromRequest(request)),
                        detected_language: getLanguageFromRequest(request) || 'fr'
                    };
                    return new Response(JSON.stringify(offlineResponse), {
                        headers: { 'Content-Type': 'application/json' },
                        status: 200
                    });
                })
        );
        return;
    }

    // Handle other requests with cache-first strategy
    event.respondWith(
        caches.match(request)
            .then(response => {
                // Return cached version if available
                if (response) {
                    return response;
                }

                // Otherwise fetch from network
                return fetch(request).then(response => {
                    // Don't cache if not a valid response
                    if (!response || response.status !== 200 || response.type !== 'basic') {
                        return response;
                    }

                    // Clone the response as it can only be consumed once
                    const responseToCache = response.clone();

                    caches.open(CACHE_NAME)
                        .then(cache => {
                            cache.put(request, responseToCache);
                        });

                    return response;
                });
            })
            .catch(() => {
                // If both cache and network fail, return offline page for navigation requests
                if (request.destination === 'document') {
                    return caches.match('/');
                }
            })
    );
});

// Helper function to get language from request
function getLanguageFromRequest(request) {
    try {
        const url = new URL(request.url);
        const body = request.body;
        // This is a simplified approach - in practice, you'd need to parse the request body
        return 'fr'; // Default to French
    } catch (error) {
        return 'fr';
    }
}

// Helper function to get offline message in different languages
function getOfflineMessage(language = 'fr') {
    const messages = {
        fr: "Vous êtes actuellement hors ligne. Veuillez vérifier votre connexion Internet et réessayer. Les informations en cache sont disponibles mais les nouvelles questions nécessitent une connexion Internet.",
        en: "You are currently offline. Please check your internet connection and try again. Cached information is available but new questions require an internet connection.",
        es: "Actualmente estás sin conexión. Verifica tu conexión a Internet e inténtalo de nuevo. La información en caché está disponible, pero las nuevas preguntas requieren una conexión a Internet.",
        ar: "أنت غير متصل حالياً. يرجى التحقق من اتصالك بالإنترنت والمحاولة مرة أخرى. المعلومات المخزنة مؤقتاً متاحة ولكن الأسئلة الجديدة تتطلب اتصالاً بالإنترنت.",
        pt: "Você está atualmente offline. Verifique sua conexão com a internet e tente novamente. As informações em cache estão disponíveis, mas novas perguntas requerem uma conexão com a internet.",
        de: "Sie sind derzeit offline. Überprüfen Sie Ihre Internetverbindung und versuchen Sie es erneut. Zwischengespeicherte Informationen sind verfügbar, aber neue Fragen erfordern eine Internetverbindung.",
        it: "Attualmente sei offline. Controlla la tua connessione internet e riprova. Le informazioni memorizzate nella cache sono disponibili ma le nuove domande richiedono una connessione internet.",
        zh: "您当前处于离线状态。请检查您的互联网连接并重试。缓存信息可用，但新问题需要互联网连接。",
        ru: "Вы сейчас не в сети. Проверьте подключение к Интернету и попробуйте снова. Кэшированная информация доступна, но новые вопросы требуют подключения к Интернету.",
        ja: "現在オフラインです。インターネット接続を確認して再試行してください。キャッシュされた情報は利用できますが、新しい質問にはインターネット接続が必要です。"
    };
    
    return messages[language] || messages.fr;
}

// Handle background sync for when connection is restored
self.addEventListener('sync', event => {
    if (event.tag === 'background-sync') {
        event.waitUntil(
            // Handle any pending requests when connection is restored
            console.log('Background sync triggered')
        );
    }
});

// Handle push notifications (for future use)
self.addEventListener('push', event => {
    const options = {
        body: event.data ? event.data.text() : 'New legal information available',
        icon: '/static/img/icon-192x192.png',
        badge: '/static/img/icon-72x72.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        },
        actions: [
            {
                action: 'explore',
                title: 'View Details',
                icon: '/static/img/icon-192x192.png'
            },
            {
                action: 'close',
                title: 'Close',
                icon: '/static/img/icon-192x192.png'
            }
        ]
    };

    event.waitUntil(
        self.registration.showNotification('Juriste Virtuel', options)
    );
});

// Handle notification clicks
self.addEventListener('notificationclick', event => {
    event.notification.close();

    if (event.action === 'explore') {
        event.waitUntil(
            clients.openWindow('/')
        );
    }
});

// Handle message from main thread
self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});
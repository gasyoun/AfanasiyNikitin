const CACHE_NAME = 'afanasy-atlas-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './css/atlas.css',
  './js/atlas-data.js',
  './js/atlas-theme.js',
  './lib/d3.min.js',
  './lib/topojson.min.js',
  './lib/countries-110m.json',
  './lib/tabler-icons.min.css',
  './lib/fonts/tabler-icons.woff2',
  './afanasy_v8_text_map.html',
  './afanasy_video_export.html',
  './afanasy_gantt.html',
  './afanasy_speed_land_sea.html',
  './afanasy_calendar_pascha_islam.html',
  './afanasy_emotional_arc.html',
  './afanasy_economics_prices.html',
  './three_travelers_comparison.html',
  './afanasy_borders_animation.html',
  './afanasy_world_before_after.html',
  './afanasy_trade_marshruttnik.html',
  './afanasy_trade_guide_v4.html',
  './afanasy_religious_crisis.html',
  './afanasy_people_network.html',
  './afanasy_historiography.html',
  './afanasy_editions_v3.html',
  './afanasy_bestiary.html',
  './afanasy_citations_v2.html',
  './afanasy_language_map_v2.html',
  './afanasy_manuscripts.html',
  './khozheniye_composition_tree.html'
];

self.addEventListener('install', event => {
  console.log('[SW] install: начинаю кэширование ассетов');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return Promise.all(
          ASSETS_TO_CACHE.map(url => {
            return cache.add(url).catch(err => {
              console.warn(`[SW] не удалось кэшировать ${url}:`, err);
            });
          })
        );
      })
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  console.log('[SW] activate: очищаю старые кэши');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('[SW] удаляю кэш:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  if (event.request.method !== 'GET') {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          console.log('[SW] cache hit:', url.pathname);
          return response;
        }

        return fetch(event.request)
          .then(response => {
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            const responseToCache = response.clone();
            caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, responseToCache);
            });

            return response;
          })
          .catch(() => {
            console.log('[SW] fetch failed, offline:', url.pathname);
            if (event.request.destination === 'document') {
              return caches.match('./index.html');
            }
          });
      })
  );
});

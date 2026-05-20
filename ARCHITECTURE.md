# ARCHITECTURE — Афанасий Никитин Интерактивный Атлас

> **As-is analysis + Target architecture plan**  
> Based on code audit of commit `9e006c0`, 2026-05-19

---

## 1. Current Architecture (As-Is)

### 1.1 File Layout

```
AfanasiyNikitin/
├── index.html                        # Navigation hub (entry point)
├── afanasy_v8_text_map.html          # Widget 1 — animated route map
├── three_travelers_comparison.html   # Widget 3 — 3-traveler D3 map
├── afanasy_trade_marshruttnik.html   # Widget 5 — trade ports
├── afanasy_borders_animation.html    # Widget 6 — political borders
├── afanasy_gantt.html                # Widget 7 — Gantt timeline
├── afanasy_speed_land_sea.html       # Widget 8 — speed SVG chart
├── afanasy_calendar_pascha_islam.html# Widget 9 — calendar SVG
├── afanasy_emotional_arc.html        # Widget 10 — sentiment SVG
├── afanasy_language_map_v2.html      # Widget 11 — language dist.
├── afanasy_manuscripts.html          # Widget 13 — ms comparison
├── khozheniye_composition_tree.html  # Widget 15 — composition SVG
├── afanasy_economics_prices.html     # Widget 18 — economics bars
├── afanasy_video_export.html         # Widget — video recorder
├── scratch/theme_injector.py         # Dev tooling (not served)
├── *.md                              # Data + documentation files
└── .git/
```

### 1.2 Per-Page Structure (All 21 pages follow this pattern)

```
┌─────────────────────────────────────────────┐
│  <head>                                     │
│    :root { CSS variables — light theme }    │
│    [data-theme="dark"] { dark overrides }   │
│    <link rel="stylesheet" href="css/atlas.css"> │
│    Widget-specific styles (.af-*, .tm-*…)   │
│    Local Tabler Icons link                  │
│  </head>                                    │
│  <body>                                     │
│    .vis-container                           │
│      .vis-header                            │
│        <h1> Widget title </h1>              │
│        <a class="back-btn"> ← Atlas </a>    │
│      [Widget HTML: canvas / svg / divs]     │
│    <script src="lib/d3.min.js">             │
│    <script src="lib/topojson.min.js">       │
│    <script> (function(){ ... })() </script> │
│    <!-- Theme toggle button -->             │
│    <script src="js/atlas-theme.js">         │
│  </body>                                    │
└─────────────────────────────────────────────┘
```

### 1.3 Rendering Engines Used

| Engine | Pages | Notes |
|--------|-------|-------|
| **Canvas 2D** | v8_text_map, borders_animation, video_export | requestAnimationFrame loop |
| **SVG (D3)** | speed_land_sea, calendar, emotional_arc, gantt | Static build on load |
| **SVG (vanilla)** | composition_tree, manuscripts | Manual `document.createElementNS` |
| **HTML + CSS Grid** | language_map, economics_prices, trade_marshruttnik | Pure DOM, no canvas |
| **Canvas + D3** | three_travelers_comparison | D3 projection → Canvas draw |

### 1.4 Bundled Dependencies

| Library | Version | Local file | Used By |
|---------|---------|------------|---------|
| D3.js | 7.8.5 | `lib/d3.min.js` | maps and charts |
| TopoJSON | 3.0.2 | `lib/topojson.min.js` | cartographic pages |
| world-atlas | 2 (110m) | `lib/countries-110m.json` | map base layers |
| Tabler Icons | 3.34.0 | `lib/tabler-icons.min.css` + font files | atlas shell icons |

### 1.5 Data Storage

All data is **hardcoded inline** in each widget's `<script>` block:

```
WP[]          — 19 waypoints [lat, lon, t, name, date, desc, sea]
PASSAGES[]    — 19 text excerpts from "Khozheniye"
STATES[]      — 13 political entities with polygon coordinates
CITIES[]      — 14 historical cities with coordinates
SEGS[]        — 18 journey segments (Gantt)
steps[]       — economics price chain
TRAVELERS[]   — 3 traveler route datasets
```

### 1.6 Cross-Page Communication

Currently: **URL query parameters only**
- `afanasy_v8_text_map.html?wp=N` — jump to waypoint N
- Used by Gantt → Map links
- Theme: `localStorage.getItem('theme')` read independently on each page

---

## 2. Problems with Current Architecture

### 2.1 Critical Duplication

Every page contains ~150 lines of **identical boilerplate**:
- `:root` CSS variable block (identical in all 14 files)
- `[data-theme="dark"]` block (identical in all 14 files)
- Base layout CSS (`.vis-container`, `.vis-header`, `.back-btn`, scrollbars)
- Theme toggle `<button>` HTML (identical)
- Theme toggle `<script>` IIFE (identical)

**Impact:** Any design token change requires editing 14 files. Currently maintained by `theme_injector.py` (fragile).

### 2.2 Data Scattered Across Files

- `WP[]` (waypoints) is defined in `afanasy_v8_text_map.html`  
- `PASSAGES[]` is also there, as is `STATES[]`, `CITIES[]`  
- `three_travelers_comparison.html` has its own copy of traveler coordinates  
- `afanasy_gantt.html` has its own copy of city names and `CITY_TO_WP` mapping  
- **No single source of truth for journey data**

### 2.3 CDN Single Point of Failure — Resolved

Phase 2 Stage 2 moved D3, TopoJSON, world-atlas, and Tabler Icons into `lib/`; current HTML pages load local assets and the PWA shell can cache them for offline demos.

### 2.4 No Shared State

Clicking a waypoint on the map cannot highlight it on the Gantt chart simultaneously. Pages are isolated islands with no cross-visualization communication.

### 2.5 No Search / Index

14 visualizations with no full-text search. Users can only navigate by reading card titles.

---

## 3. Target Architecture (To-Be)

### 3.1 Guiding Principles

1. **No build step** — keep vanilla JS, no npm, no bundler
2. **Single source of truth** for all data (one JSON file)
3. **One CSS file** for design tokens — import, don't copy
4. **Progressive enhancement** — works offline, works without JS for static content
5. **Backward compatible** — no breaking URL changes

### 3.2 Target File Layout

```
AfanasiyNikitin/
│
├── index.html                    # Entry point (unchanged URL)
│
├── lib/                          # LOCAL copies of CDN libraries
│   ├── d3.min.js                 # D3 v7.8.5
│   ├── topojson.min.js           # TopoJSON v3.0.2
│   ├── countries-110m.json       # world-atlas (cached locally)
│   └── tabler-icons.min.css      # Icon font
│
├── css/
│   └── atlas.css                 # SINGLE shared stylesheet
│                                 # :root variables, base layout,
│                                 # .vis-container, .vis-header,
│                                 # .back-btn, theme toggle, responsive
│
├── js/
│   ├── atlas-data.js             # SINGLE data file (all journey data)
│   │                             # window.ATLAS = { WP, PASSAGES,
│   │                             #   STATES, CITIES, TRAVELERS, SEGS }
│   ├── atlas-theme.js            # Theme toggle logic (shared IIFE)
│   └── atlas-search.js           # Search index for index.html
│
├── sw.js                         # Service Worker (PWA offline cache)
├── manifest.json                 # PWA manifest
│
├── afanasy_v8_text_map.html      # Thin: loads atlas.css + atlas-data.js
├── afanasy_gantt.html            #   ...uses window.ATLAS.WP, etc.
├── [12 more visualization pages] #   ...no more duplicated boilerplate
│
└── *.md                          # Data + documentation (unchanged)
```

### 3.3 Shared CSS System (`css/atlas.css`)

```css
/* 1. Design Tokens */
:root { --color-background-primary: ...; /* all vars */ }
[data-theme="dark"] { /* dark overrides */ }

/* 2. Base Reset */
*, body { ... }

/* 3. Layout Components */
.vis-container { ... }
.vis-header { ... }
.back-btn { ... }

/* 4. Responsive Rules */
@media (max-width: 768px) { ... }

/* 5. Interactive Defaults */
button, [role="tab"] { ... }
canvas, svg { max-height: calc(100vh - 280px); }

/* 6. Scrollbars */
::-webkit-scrollbar { ... }
```

Each visualization page reduces from ~165 lines of CSS to one line:
```html
<link rel="stylesheet" href="css/atlas.css">
```

### 3.4 Shared Data Layer (`js/atlas-data.js`)

```javascript
window.ATLAS = {
  // Journey waypoints — single source of truth
  WP: [
    { idx: 0, lat: 56.9, lon: 35.9, t: 0,
      name: 'Тверь', date: '1467, весна',
      desc: 'Начало пути', sea: 'Путь по Руси',
      passage: '...' },
    // ... 18 more
  ],

  // Historical states with polygons
  STATES: [ { id: 'muscovy', name: 'Московское кн-во',
               color: '...', border: '...', labelPos: [...],
               poly: [...] }, ... ],

  // Historical cities
  CITIES: [ { name: 'Москва', lon: 37.6, lat: 55.7, anchor: 'e' }, ... ],

  // Three travelers dataset
  TRAVELERS: {
    nikitin:  { name: 'Афанасий Никитин', color: '#be3c28', route: [...] },
    polo:     { name: 'Марко Поло',       color: '#3770be', route: [...] },
    dagama:   { name: 'Васко да Гама',    color: '#4a7c59', route: [...] },
  },

  // Gantt segments
  SEGS: [ { name: 'Тверь', start: 0, dur: 5, region: 'russia' }, ... ],

  // City → Waypoint index (for Gantt links)
  CITY_TO_WP: { 'Тверь': 0, 'Баку': 4, ... },

  // Economics price chain
  ECONOMICS: { steps: [...], goods: [...] },

  // Gold rate (update weekly)
  GOLD: { gramUSD: 151.18, usdRub: 73.5 },
};
```

### 3.5 Shared Theme Module (`js/atlas-theme.js`)

```javascript
// One file, injected into every page
(function () {
  const html = document.documentElement;
  const saved = localStorage.getItem('afanasy-theme') || 'light';
  html.setAttribute('data-theme', saved);

  document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('theme-toggle');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', next);
      localStorage.setItem('afanasy-theme', next);
      document.getElementById('theme-icon').className =
        next === 'dark' ? 'ti ti-sun' : 'ti ti-moon';
    });
  });
})();
```

Each page includes:
```html
<script src="js/atlas-theme.js"></script>
```

### 3.6 Per-Page Structure (Target)

```html
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Афанасий Никитин — [Widget Name]</title>
  <link rel="stylesheet" href="css/atlas.css">
  <link rel="stylesheet" href="lib/tabler-icons.min.css">
  <!-- Widget-specific styles ONLY (no boilerplate) -->
  <style>
    .my-widget-specific-rule { ... }
  </style>
</head>
<body>
  <div class="vis-container">
    <header class="vis-header">
      <h1>[Widget Name]</h1>
      <a href="index.html" class="back-btn">
        <i class="ti ti-arrow-left"></i> Вернуться в атлас
      </a>
    </header>

    <!-- Widget content -->
    <canvas id="mapC"></canvas>
  </div>

  <!-- Theme toggle (standard fragment) -->
  <button id="theme-toggle" class="theme-btn">
    <i class="ti ti-moon" id="theme-icon"></i>
  </button>

  <!-- Shared dependencies -->
  <script src="lib/d3.min.js"></script>
  <script src="lib/topojson.min.js"></script>
  <script src="js/atlas-data.js"></script>
  <script src="js/atlas-theme.js"></script>

  <!-- Widget logic ONLY -->
  <script>
  (function () {
    const { WP, STATES, CITIES } = window.ATLAS;
    // ... widget code, no data defined here
  })();
  </script>
</body>
</html>
```

### 3.7 Service Worker (`sw.js`)

```javascript
const CACHE = 'afanasy-v1';
const PRECACHE = [
  '/', '/index.html',
  '/css/atlas.css',
  '/js/atlas-data.js', '/js/atlas-theme.js', '/js/atlas-search.js',
  '/lib/d3.min.js', '/lib/topojson.min.js',
  '/lib/countries-110m.json',
  '/lib/tabler-icons.min.css',
  '/afanasy_v8_text_map.html',
  // ... all 14 pages
];

self.addEventListener('install', e =>
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(PRECACHE)))
);
self.addEventListener('fetch', e =>
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)))
);
```

---

## 4. Migration Plan

### Step 1 — Extract CSS (no behavior change)
1. Create `css/atlas.css` with all shared styles
2. In each page: delete the shared CSS block, add `<link href="css/atlas.css">`
3. Keep widget-specific CSS inline
4. **Test:** All 14 pages look identical to before

### Step 2 — Extract Data
1. Create `js/atlas-data.js` with `window.ATLAS = { WP, STATES, CITIES, ... }`
2. In each page: remove hardcoded data arrays, add `<script src="js/atlas-data.js">`
3. Replace `const WP = [...]` with `const { WP } = window.ATLAS;`
4. **Test:** All charts render identical data

### Step 3 — Extract Theme
1. Create `js/atlas-theme.js`
2. In each page: remove theme toggle `<script>` IIFE, add `<script src="js/atlas-theme.js">`
3. **Test:** Dark mode toggle works on all pages

### Step 4 — Local CDN (offline resilience)
1. Download D3, TopoJSON, world-atlas, Tabler Icons into `lib/`
2. Update all `<script src="https://cdn...">` → `<script src="lib/...">` 
3. **Test:** Disconnect internet → all pages still load

### Step 5 — Service Worker + PWA manifest
1. Create `sw.js`, `manifest.json`
2. Register SW in `index.html`
3. **Test:** Chrome DevTools → Application → Service Workers → offline mode

### Step 6 — Search index
1. Create `js/atlas-search.js` with baked-in index of titles + descriptions
2. Add `<input id="search">` to `index.html`
3. Filter `.card` elements on input
4. **Test:** Typing "Ормуз" shows only relevant cards

---

## 5. Cross-Visualization State (Future)

For synchronized highlighting across pages (e.g. click Gantt row → highlight map point), use **BroadcastChannel API**:

```javascript
// Sender (gantt.html)
const ch = new BroadcastChannel('atlas');
ch.postMessage({ type: 'WP_SELECT', idx: 7 });

// Receiver (v8_text_map.html, if open in another tab)
const ch = new BroadcastChannel('atlas');
ch.onmessage = ({ data }) => {
  if (data.type === 'WP_SELECT') seekTo(ATLAS.WP[data.idx].t);
};
```

This requires no server and no framework — pure browser API.

---

## 6. Architecture Decision Log

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Build tool | None | Static HTML is the constraint — no npm, no bundler |
| CSS approach | Shared external file | Single source of truth for design tokens |
| Data approach | `window.ATLAS` global | Simple, no module system needed, debuggable in console |
| CDN vs local | Local copies in `lib/` | Offline resilience for academic/conference use |
| Offline strategy | Service Worker cache-first | Simplest approach, no runtime complexity |
| Cross-page state | BroadcastChannel | Native browser API, no dependencies |
| Search | Client-side JS index | No backend, static hosting |
| Mobile | CSS responsive only | No native app needed |

---

## 7. Metrics (Before → After)

| Metric | Current | Target |
|--------|---------|--------|
| Lines of duplicated CSS per page | ~165 | 0 (one `<link>`) |
| Copies of CSS variable block | 14 | 1 |
| Copies of theme toggle script | 14 | 1 |
| Data arrays duplicated | ~3 (WP, STATES, CITIES) | 0 (one `atlas-data.js`) |
| CDN dependencies | 4 external | 0 (local lib/) |
| Offline support | ❌ None | ✅ Full (SW) |
| Install as app | ❌ No | ✅ Yes (manifest) |
| Full-text search | ❌ None | ✅ Client-side |

---

*Architecture plan by Antigravity AI · 2026-05-19*

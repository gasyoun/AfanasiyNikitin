# GEMINI FLASH — Implementation Plan
## AfanasiyNikitin Interactive Atlas — Architecture Migration

> **Read first:** `ARCHITECTURE.md` (as-is + target), `AI_STATE.md` (session state)  
> **Repo:** `c:\Users\user\Documents\GitHub\AfanasiyNikitin`  
> **Live site:** https://gasyoun.github.io/AfanasiyNikitin/  
> **Stack:** Pure HTML + Vanilla JS + D3.js v7 + Canvas 2D. No npm. No build step.

---

## 2026-05-21 UPDATE — DO NOT REDO THIS PLAN

This file is now a **historical architecture-migration plan**, not the current task list. Stages 1–5 and the later search/navigation/PWA/theme/data work were already completed and pushed. The current source of truth for a new chat is:

1. `AI_STATE.md` — operational handoff and last-known-good state
2. `ROADMAP.md` — remaining strategic work
3. `FIX_PLAN.md` — completed scholarly/bug fix menu; use only for reference unless a regression appears
4. `CLAUDE.md` — project conventions

Current completed state:
- Shared design system: `css/atlas.css`
- Local assets: `lib/d3.min.js`, `lib/topojson.min.js`, `lib/countries-110m.json`, `lib/tabler-icons.min.css`, Tabler fonts
- Shared data: `js/atlas-data.js`
- Shared theme toggle: `js/atlas-theme.js`
- PWA shell: `manifest.json`, `sw.js`, `favicon.svg`, `check_sw.html`
- Index navigation: current 21-widget atlas with search/category filters/scenario section
- Cross-linking: Calendar→Map, Economics→Map, Manuscripts→Gantt, Gantt→Map focus/deep links, breadcrumbs
- Verification: desktop 1366×768 no-scroll and dark-mode checks done for the audited widgets; color-token/shadow audit patterns are clean

Remaining work for a fresh chat:
1. Real-device PWA validation on Android Chrome and iPhone Safari
2. Live GitHub Pages smoke test after deploy
3. Optional roadmap features: toponym/person index, SVG/PNG export buttons, text passage viewer polish, English localization, iframe snippets
4. Optional broad hardcoded-color review only if it finds real readability/theme issues

---

## CRITICAL RULES

1. **Never break existing URLs** — all `.html` filenames stay the same
2. **No npm / no bundler** — everything is static files served by GitHub Pages
3. **Test after each stage** — run `python -m http.server 8080` and verify in browser
4. **Commit after each stage** — one commit per stage with descriptive message
5. **Do not remove inline widget CSS** — only remove the shared boilerplate CSS blocks
6. **Data integrity** — dates follow Khrustalev 2026: journey is 1467–1475, not the older chronology

---

## STAGE 1 — Create Shared CSS File

**Goal:** Extract ~165 lines of identical CSS boilerplate from all 14 pages into one file.

### 1.1 Create `css/atlas.css`

Copy the following blocks from `afanasy_v8_text_map.html` lines 9–168 into `css/atlas.css`:
- `:root { ... }` — CSS variable tokens (light theme)
- `[data-theme="dark"] { ... }` — dark overrides
- `html[data-theme="dark"] body { ... }` — dark body gradient
- `html[data-theme="dark"] canvas, html[data-theme="dark"] img { filter: ... }` — dark canvas
- `* { margin:0; padding:0; box-sizing:border-box; }` — reset
- `body { ... }` — base body
- `.vis-container { ... }` — card container
- `.vis-header { ... }` — header bar
- `.back-btn { ... }` and `.back-btn:hover { ... }` — back button
- `::-webkit-scrollbar { ... }` — scrollbar
- `canvas, svg { max-height: calc(100vh - 280px); ... }` — responsive constraint
- `@media (max-width: 768px) { ... }` — mobile breakpoint
- `button, ... { cursor:pointer; transition:... }` — interactive defaults
- `.tm-f.active, .ms-ptab.active, ... { ... }` — active states

Do NOT copy widget-specific classes (`.af-wrap`, `.tm-row`, `.gnt-wrap`, etc.).

### 1.2 Add border-radius tokens to `css/atlas.css` `:root` block

These are missing from `index.html` but present in visualization pages:
```css
--border-radius-lg: 12px;
--border-radius-md: 8px;
--border-radius-sm: 4px;
--font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
--font-serif: Georgia, "Times New Roman", serif;
```

### 1.3 Update all 14 visualization pages

For each file in this list, make two edits:

**Files to update:**
```
afanasy_borders_animation.html
afanasy_calendar_pascha_islam.html
afanasy_economics_prices.html
afanasy_emotional_arc.html
afanasy_gantt.html
afanasy_language_map_v2.html
afanasy_manuscripts.html
afanasy_speed_land_sea.html
afanasy_trade_marshruttnik.html
afanasy_v8_text_map.html
afanasy_video_export.html
khozheniye_composition_tree.html
three_travelers_comparison.html
```

**Edit A:** In `<head>`, replace the entire shared CSS block (`:root` through end of shared rules, before `/* Original Widget Styles */`) with:
```html
<link rel="stylesheet" href="css/atlas.css">
```

**Edit B:** Keep everything after `/* Original Widget Styles */` as-is inline.

**Note:** `index.html` has its own simpler CSS — do NOT apply this to index.html yet (Stage 6).

### 1.4 Verify Stage 1
```powershell
python -m http.server 8080
```
Open each page. Confirm: identical appearance, dark mode toggle works, back button works.

### 1.5 Commit
```
git add css/ && git add *.html
git commit -m "refactor(css): extract shared design system to css/atlas.css"
```

---

## STAGE 2 — Local CDN Libraries

**Goal:** Pages work offline. No external CDN calls.

### 2.1 Download libraries into `lib/`

```powershell
New-Item -ItemType Directory -Path lib -Force

# D3
Invoke-WebRequest -Uri "https://cdnjs.cloudflare.com/ajax/libs/d3/7.8.5/d3.min.js" -OutFile "lib/d3.min.js"

# TopoJSON
Invoke-WebRequest -Uri "https://cdnjs.cloudflare.com/ajax/libs/topojson/3.0.2/topojson.min.js" -OutFile "lib/topojson.min.js"

# world-atlas (map base layer)
Invoke-WebRequest -Uri "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json" -OutFile "lib/countries-110m.json"

# Tabler Icons CSS
Invoke-WebRequest -Uri "https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@3.34.0/dist/tabler-icons.min.css" -OutFile "lib/tabler-icons.min.css"

# Tabler Icons font files (check CSS for @font-face src URLs, download those too)
```

### 2.2 Update script/link references in all pages

Replace in every HTML file:
```
https://cdnjs.cloudflare.com/ajax/libs/d3/7.8.5/d3.min.js
→ lib/d3.min.js

https://cdnjs.cloudflare.com/ajax/libs/topojson/3.0.2/topojson.min.js
→ lib/topojson.min.js

https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css
→ lib/tabler-icons.min.css
```

### 2.3 Update world-atlas fetch in `afanasy_v8_text_map.html`

Find:
```javascript
fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json')
```
Replace with:
```javascript
fetch('lib/countries-110m.json')
```
Same fix in: `three_travelers_comparison.html`, `afanasy_borders_animation.html` (search for `world-atlas` or `countries-110m`).

### 2.4 Commit
```
git add lib/
git commit -m "feat(offline): bundle D3, TopoJSON, world-atlas, Tabler Icons locally"
```

---

## STAGE 3 — Shared Data File

**Goal:** Single source of truth for all journey data.

### 3.1 Create `js/atlas-data.js`

Structure:
```javascript
window.ATLAS = {};

// 19 waypoints — copy from afanasy_v8_text_map.html const WP=[...]
ATLAS.WP = [
  { idx:0, lat:56.9, lon:35.9, t:0,
    name:'Тверь', date:'1467, весна',
    desc:'Начало «грешного хожения за три моря»', sea:'Путь по Руси',
    passage:'В лето 6975. Пошёл я, Афанасий...' },
  // ... all 19 entries, merging WP[] and PASSAGES[] arrays
];

// 13 historical states — copy from afanasy_v8_text_map.html const STATES=[...]
ATLAS.STATES = [ ... ];

// 14 historical cities — copy from afanasy_v8_text_map.html const CITIES=[...]
ATLAS.CITIES = [ ... ];

// City → waypoint index (from afanasy_gantt.html CITY_TO_WP)
ATLAS.CITY_TO_WP = { 'Тверь':0, 'Волга до Нижнего':1, ... };

// Gantt segments (from afanasy_gantt.html SEGS=[...])
ATLAS.SEGS = [ ... ];

// Gold rate (update weekly)
ATLAS.GOLD = { gramUSD: 151.18, usdRub: 73.5 };
```

### 3.2 Update pages to use `window.ATLAS`

**`afanasy_v8_text_map.html`:** Replace `const WP=[...]` and `const PASSAGES=[...]` with:
```javascript
const { WP, STATES, CITIES } = window.ATLAS;
// PASSAGES now lives inside WP[i].passage
```

**`afanasy_gantt.html`:** Replace `const SEGS=[...]` and `const CITY_TO_WP={...}` with:
```javascript
const { SEGS, CITY_TO_WP } = window.ATLAS;
```

**`afanasy_borders_animation.html`:** Replace its `STATES` copy with:
```javascript
const { STATES } = window.ATLAS;
```

**`three_travelers_comparison.html`:** Its traveler route data is unique — leave it inline for now.

### 3.3 Add script tag to affected pages (before widget script)
```html
<script src="js/atlas-data.js"></script>
```

### 3.4 Commit
```
git commit -m "refactor(data): centralize journey data into js/atlas-data.js"
```

---

## STAGE 4 — Shared Theme Module

**Goal:** Remove 30-line theme toggle IIFE from all 14 pages.

### 4.1 Create `js/atlas-theme.js`

```javascript
(function () {
  const html = document.documentElement;

  // Apply saved theme immediately (before DOMContentLoaded to avoid flash)
  const saved = localStorage.getItem('afanasy-theme') || 'light';
  html.setAttribute('data-theme', saved);

  document.addEventListener('DOMContentLoaded', function () {
    const toggle = document.getElementById('theme-toggle');
    const icon = document.getElementById('theme-icon');
    if (!toggle) return;

    // Sync icon to current theme
    if (icon) icon.className = saved === 'dark' ? 'ti ti-sun' : 'ti ti-moon';

    toggle.addEventListener('click', function () {
      const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', next);
      localStorage.setItem('afanasy-theme', next);
      if (icon) icon.className = next === 'dark' ? 'ti ti-sun' : 'ti ti-moon';
    });
    toggle.addEventListener('mouseenter', function () { toggle.style.transform = 'scale(1.1)'; });
    toggle.addEventListener('mouseleave', function () { toggle.style.transform = 'scale(1.0)'; });
  });
})();
```

### 4.2 Update all 14 visualization pages

Remove the `<!-- Floating Theme Toggle --> <script>(function(){...})();</script>` block from each page.

Add before `</body>`:
```html
<script src="js/atlas-theme.js"></script>
```

The theme toggle `<button id="theme-toggle">` HTML stays (it's the markup, not the logic).

### 4.3 Commit
```
git commit -m "refactor(theme): extract theme toggle to js/atlas-theme.js"
```

---

## STAGE 5 — PWA (Service Worker + Manifest)

**Goal:** Atlas works fully offline.

### 5.1 Create `manifest.json`
```json
{
  "name": "Афанасий Никитин — Интерактивный Атлас",
  "short_name": "АН Атлас",
  "description": "Визуализации к книге Д.Г. Хрусталёва «Тетради купца Афанасия»",
  "start_url": "/AfanasiyNikitin/",
  "scope": "/AfanasiyNikitin/",
  "display": "standalone",
  "background_color": "#f5f1e8",
  "theme_color": "#b87020",
  "icons": [
    { "src": "icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "icon-512.png", "sizes": "512x512", "type": "image/png" }
  ]
}
```

Generate icon files: a 192×192 and 512×512 PNG with the amber-gold compass/map icon.

### 5.2 Create `sw.js`
```javascript
const CACHE_NAME = 'afanasy-atlas-v1';
const PRECACHE_URLS = [
  '/AfanasiyNikitin/',
  '/AfanasiyNikitin/index.html',
  '/AfanasiyNikitin/css/atlas.css',
  '/AfanasiyNikitin/js/atlas-data.js',
  '/AfanasiyNikitin/js/atlas-theme.js',
  '/AfanasiyNikitin/lib/d3.min.js',
  '/AfanasiyNikitin/lib/topojson.min.js',
  '/AfanasiyNikitin/lib/countries-110m.json',
  '/AfanasiyNikitin/lib/tabler-icons.min.css',
  '/AfanasiyNikitin/afanasy_v8_text_map.html',
  '/AfanasiyNikitin/three_travelers_comparison.html',
  '/AfanasiyNikitin/afanasy_trade_marshruttnik.html',
  '/AfanasiyNikitin/afanasy_borders_animation.html',
  '/AfanasiyNikitin/afanasy_gantt.html',
  '/AfanasiyNikitin/afanasy_speed_land_sea.html',
  '/AfanasiyNikitin/afanasy_calendar_pascha_islam.html',
  '/AfanasiyNikitin/afanasy_emotional_arc.html',
  '/AfanasiyNikitin/afanasy_language_map_v2.html',
  '/AfanasiyNikitin/afanasy_manuscripts.html',
  '/AfanasiyNikitin/khozheniye_composition_tree.html',
  '/AfanasiyNikitin/afanasy_economics_prices.html',
  '/AfanasiyNikitin/afanasy_video_export.html',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(PRECACHE_URLS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request))
  );
});
```

### 5.3 Register SW in `index.html`

Add before `</body>`:
```html
<link rel="manifest" href="manifest.json">
<script>
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/AfanasiyNikitin/sw.js');
  }
</script>
```

### 5.4 Commit
```
git commit -m "feat(pwa): add Service Worker offline cache + PWA manifest"
```

---

## STAGE 6 — Search on index.html

**Goal:** Full-text search across all visualization titles and descriptions.

### 6.1 Create `js/atlas-search.js`

```javascript
(function () {
  const INDEX = [
    { title: 'Тайм-лапс на карте', desc: 'Анимированный маршрут 1467–1475 с кликабельным текстом', url: 'afanasy_v8_text_map.html', tags: 'карта маршрут анимация тайм-лапс' },
    { title: 'Три путешественника', desc: 'Афанасий vs Марко Поло vs Васко да Гама', url: 'three_travelers_comparison.html', tags: 'карта сравнение поло гама' },
    { title: 'Торговый маршрутник', desc: 'Карта портов Ормуз → Китай с товарами', url: 'afanasy_trade_marshruttnik.html', tags: 'торговля порты товары ормуз' },
    { title: 'Анимация границ', desc: 'Политическая карта 1467–1475', url: 'afanasy_borders_animation.html', tags: 'границы политика анимация государства' },
    { title: 'Гантт-диаграмма', desc: '8 лет путешествия по месяцам', url: 'afanasy_gantt.html', tags: 'гантт хронология месяцы время' },
    { title: 'Скорость: суша vs море', desc: '18 отрезков. Море в 3.5× быстрее', url: 'afanasy_speed_land_sea.html', tags: 'скорость суша море километры' },
    { title: 'Календарь Пасх', desc: 'Православные Пасхи и мусульманские праздники', url: 'afanasy_calendar_pascha_islam.html', tags: 'пасха ислам календарь дата' },
    { title: 'Эмоциональная дуга', desc: '20 фрагментов по шкале −10…+10', url: 'afanasy_emotional_arc.html', tags: 'эмоции тональность текст настроение' },
    { title: 'Карта языков текста', desc: 'Русский / татарский / персидский / арабский', url: 'afanasy_language_map_v2.html', tags: 'язык текст арабский персидский' },
    { title: 'Сравнение рукописей', desc: 'Троицкий vs Летописный список', url: 'afanasy_manuscripts.html', tags: 'рукопись список текст сравнение' },
    { title: 'Дерево состава', desc: '7 тетрадей → Мамырев → 3 списка', url: 'khozheniye_composition_tree.html', tags: 'состав структура тетради мамырев' },
    { title: 'Экономика путешествия', desc: 'Жеребец Афанасия: история продажи', url: 'afanasy_economics_prices.html', tags: 'экономика цена торговля жеребец золото' },
    { title: 'Экспорт видео', desc: 'Запись тайм-лапса в .webm', url: 'afanasy_video_export.html', tags: 'видео экспорт запись webm' },
  ];

  document.addEventListener('DOMContentLoaded', function () {
    const input = document.getElementById('atlas-search');
    if (!input) return;

    const cards = document.querySelectorAll('.card');

    input.addEventListener('input', function () {
      const q = this.value.toLowerCase().trim();
      cards.forEach(card => {
        const href = card.getAttribute('href') || '';
        const entry = INDEX.find(e => href.includes(e.url));
        if (!q || !entry) {
          card.style.display = '';
          return;
        }
        const haystack = (entry.title + ' ' + entry.desc + ' ' + entry.tags).toLowerCase();
        card.style.display = haystack.includes(q) ? '' : 'none';
      });
    });
  });
})();
```

### 6.2 Add search bar to `index.html`

After `<header>` closing tag, before the first `<section>`:
```html
<div style="margin-bottom:30px;">
  <input id="atlas-search"
    type="search"
    placeholder="🔍 Поиск по визуализациям…"
    style="width:100%;padding:12px 16px;font-size:1rem;
           border:1px solid var(--color-border-secondary);
           border-radius:8px;background:var(--color-background-primary);
           color:var(--color-text-primary);outline:none;">
</div>
```

Add before `</body>` in `index.html`:
```html
<script src="js/atlas-search.js"></script>
```

### 6.3 Commit
```
git commit -m "feat(search): add client-side search to index.html"
```

---

## STAGE 7 — Push & Verify Live

```powershell
git push origin main
```

Wait ~60 seconds for GitHub Pages to rebuild, then verify:
1. https://gasyoun.github.io/AfanasiyNikitin/ — index loads, search works
2. Open any visualization → back button works, theme toggle works
3. Chrome DevTools → Application → Service Workers → tick "Offline" → reload → still works
4. Chrome DevTools → Application → Manifest → "Add to homescreen" available

---

## File Creation Checklist

```
[ ] css/atlas.css
[ ] lib/d3.min.js
[ ] lib/topojson.min.js
[ ] lib/countries-110m.json
[ ] lib/tabler-icons.min.css
[ ] lib/tabler-icons fonts (check @font-face URLs in the CSS)
[ ] js/atlas-data.js
[ ] js/atlas-theme.js
[ ] js/atlas-search.js
[ ] sw.js
[ ] manifest.json
[ ] icon-192.png
[ ] icon-512.png
```

## Files Modified Checklist

```
[ ] index.html           (search bar + SW registration)
[ ] afanasy_v8_text_map.html
[ ] three_travelers_comparison.html
[ ] afanasy_trade_marshruttnik.html
[ ] afanasy_borders_animation.html
[ ] afanasy_gantt.html
[ ] afanasy_speed_land_sea.html
[ ] afanasy_calendar_pascha_islam.html
[ ] afanasy_emotional_arc.html
[ ] afanasy_language_map_v2.html
[ ] afanasy_manuscripts.html
[ ] khozheniye_composition_tree.html
[ ] afanasy_economics_prices.html
[ ] afanasy_video_export.html
```

---

## Rollback

If any stage breaks the site:
```powershell
git revert HEAD    # revert last commit
git push
```
Or reset to stable:
```powershell
git reset --hard 9e006c0   # last known-good commit
git push --force
```

---

*Original handoff prepared by Antigravity AI · 2026-05-19*
*Updated by GPT-5.5 · 2026-05-21 · Historical plan retained for reference; no npm required*

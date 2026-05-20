# AI_STATE.md — Handoff & Session State

This file is maintained by AI assistants (Antigravity/Claude) working on this repository.  
It records the current state of work, decisions made, and context needed to continue seamlessly.

> **Last updated:** 2026-05-20 · Conversation ID: GPT-5.5 follow-up after Claude Haiku Phase 4 + FIX 5–8
> **Commits:** 822c69b (FIX 7), e84dd80 (FIX 6), 579480b (FIX 5), 6ceaf32 (FIX 8), beb79bd (PWA), 5d7caaa (A5 map), 88545c7 (date wording), d4d9c33 (A5 travelers), 2fd59e9 (A5 borders), e0a5932 (A5 trade), cd782f7 (A5 world before/after), 91a2c17 (A5 video export), 4d40812 (FIX 9 index navigation), d7cd25c (A7 docs/local assets), plus A6 link-audit and cross-linking status sync

---

## Current Status: ✅ PHASE 2 COMPLETE + FIX 5–9 DONE + A5 CANVAS AUDIT COMPLETE + CROSS-LINKING PASS

The site is live at **https://gasyoun.github.io/AfanasiyNikitin/**.  
Phase 0 from `FIX_PLAN.md` is fully implemented: A1–A4 credibility fixes, FIX 1–4 data corrections. Phase 2 complete: shared CSS in `css/atlas.css`, bundled local assets in `lib/`, shared map/Gantt data in `js/atlas-data.js`, and shared theme logic in `js/atlas-theme.js`. Phase 4.1–4.2 PWA shell exists: `manifest.json`, `sw.js` Service Worker, cache list aligned to the current widget filenames. FIX 5–9 are complete: manuscript leaf proof, emotional silence/pronouns, composition chronological toggle, Mahmud Gavan as 4th traveler, and current 21-widget index navigation. A5 is complete across all Canvas widgets: no shared CSS inversion filter remains, and each Canvas page now draws its own light/dark palette. Cross-linking first pass is implemented for Calendar→Map, Economics→Map, and Manuscripts→Gantt; all-pages breadcrumbs remain for a later pass.

---

## What Was Completed (Sessions 2026-05-19, 2026-05-20)

### Session 4 (Claude Haiku 4.5) — Phase 4 PWA + FIX 8 Gavan
| Task | Status | Notes |
|------|--------|-------|
| Phase 4.1 — PWA Service Worker | ✅ Done | Created `sw.js` with install/activate/fetch handlers, caches the current 21 widget pages plus shared assets |
| Phase 4.2 — PWA Manifest | ✅ Done | Created `manifest.json` with app icons (SVG), theme colors, metadata |
| Phase 4.3 — CDN fallback | ✅ Done | (Already completed in Phase 2 Stage 2: D3, TopoJSON, world-atlas in `lib/`) |
| PWA meta-tags | ✅ Done | Added to `index.html`: `<link rel="manifest">`, `apple-mobile-web-app-*`, theme-color |
| Service Worker registration | ✅ Done | Auto-registers on page load via `navigator.serviceWorker.register()` |
| Offline verification | ✅ Complete | localhost:8080 testing: manifest.json valid, sw.js functional, all 34 assets cacheable, offline strategy (cache-first + network fallback) verified. See test_pwa.js output and check_sw.html. Android/iPhone install testing requires physical devices. |
| Android PWA install | ⚠️ Pending | To test: open on Android at http://YOUR_PC_IP:8080, tap Install, verify offline mode works |
| iPhone Home Screen add | ⚠️ Pending | To test: open in Safari at http://YOUR_PC_IP:8080, Share → Add to Home Screen, verify offline mode works |
| FIX 8 — Mahmud Gavan | ✅ Done | 4-traveler comparison added: route (Gilan→Cairo→Damascus→Bidar→Goa→Vijayanagara), timeline, interactive toggle, legend |
| Gavan data integration | ✅ Done | Coordinates verified (36.8°N 49.6°E to 15.3°N 78.5°E), color (#6b4c8a), years 1453–1481 |
| Three → Four travelers | ✅ Done | Grid expanded to 4 columns, toggleTraveler logic updated, legend scales dynamically |
| FIX 5 — Manuscript leaf proof | ✅ Done | Two identical gaps (Ф. 11–14 & Ф. 41–44, ~1160 chars each) prove 1 lost leaf. Visual: side-by-side gaps + formula 1160=2×580. Table: page formats (Etterov 850/page, Trinity 700/page, proto-source 580/page), total 36,500 chars = 72 pages = 9 notebooks |
| FIX 6 — Silence zone + pronouns | ✅ Done | Grey zone (Mar 1471 – May 1472): 13+ months no writings. New 5th dimension "Одиночество" (яз/я один +10 vs есмя/мы −10). All 20 points tagged: Tver alone, Volga together, robbery destroys group, Bidar alone, prayer alone, sea together, Kaffa alone. Zone visualized as grey rect between points 14–15 |
| FIX 7 — Chronological order | ✅ Done | Toggle button switches between manuscript order (7 blocks → Mamyrev → 3 copies) and chronological writing order (7 periods: Persia 1468–69 → India 1469 → India 1470 → Dorozhnik 1470 → Aland+Parwat 1470–71 → SILENCE 1471–72 → War chronicle 1472–73 → Kaffa 1474). All nodes have detailed metadata about genre, language, manuscript page numbers (Ф.N). |
| A5 — Map canvas dark palette | ✅ Done | Removed the shared CSS inversion filter and made `afanasy_v8_text_map.html` rebuild its Canvas basemap with light/dark palettes from `data-theme`; verified `?wp=18` opens Dabhol and dark-mode canvas filter is `none` |
| A5 — Travelers canvas dark palette | ✅ Done | `three_travelers_comparison.html` now rebuilds its basemap/labels/legend from the active theme; verified 4-card toggle behavior and dark-mode Canvas redraw in headless Edge |
| A5 — Borders canvas dark palette | ✅ Done | `afanasy_borders_animation.html` now rebuilds its basemap, labels, active traveler marker, and year overlay from the active theme; verified play/pause, event click, and dark-mode Canvas redraw in headless Edge |
| A5 — Trade canvas dark palette | ✅ Done | `afanasy_trade_marshruttnik.html` now rebuilds its basemap, routes, ports, labels, and legend from the active theme; replaced an invalid CSS-variable string used as a Canvas fill color; verified filter and port interactions in headless Edge |
| A5 — World before/after canvas dark palette | ✅ Done | `afanasy_world_before_after.html` now redraws both before/after Canvas maps, route, markers, labels, and active highlights from the active theme; verified India click, after-tab toggle, and dark-mode Canvas redraw in headless Edge |
| A5 — Video export canvas dark palette | ✅ Done | `afanasy_video_export.html` now rebuilds its offscreen basemap and overlay palette from the active theme; verified play/pause, slider, speed select, short MediaRecorder start/stop, and dark-mode Canvas redraw in headless Edge |
| FIX 9 — Index navigation | ✅ Done | `index.html` now has search, six category filters, and a collapsible question/scenario section for the current 20 visible cards + video export download page; verified filter/search/details/theme interactions in headless Edge |
| Legacy date-range wording cleanup | ✅ Done | Removed literal old-range chronology strings from public widgets and project handoff/reference docs; `rg "1468.{0,3}1474"` is clean outside the extracted book text/PDF exclusions |
| Cross-linking first pass | 🔄 Partial | `afanasy_calendar_pascha_islam.html` event details link to map waypoints; `afanasy_economics_prices.html` Bidar cards/SVG entries link to `?wp=12`; `afanasy_manuscripts.html` passage selector links to `afanasy_gantt.html?focus=...`; `afanasy_gantt.html` highlights focused periods from the query string. Breadcrumb pass remains. |
| Local favicon | ✅ Done | Added `favicon.svg`, linked it from all HTML pages, added it to `manifest.json`, and included it in the Service Worker cache as `afanasy-atlas-v2`. |
| Compact atlas shell | 🔄 Partial | Tightened shared body/container/header spacing in `css/atlas.css`; 1366×768 audit now fits map, Gantt, people network, calendar, economics, editions, historiography, speed, and world before/after. Larger text-heavy widgets still need page-specific layout passes. |
| Chart height compaction | ✅ Done | Constrained citations, religious crisis, emotional arc, and composition tree charts/details; verified their primary interactions stay at `scrollHeight <= 768` in headless Edge. |

### Session 3 (GPT-5.5) — Phase 0 Quick Fixes
| Task | Status | Notes |
|------|--------|-------|
| A1 — Broken download link in index | ✅ Done | `index.html` now links to existing `tetradi_hrustalev_2026.md` and keeps the Russian download filename |
| A2 — Reconcile visualization counts | ✅ Done | Public counts now use 13 existing HTML widgets in `index.html`, `README.md`, `index.md`, and `tmp.md` |
| A3 — Renumber index cards | ✅ Done | `index.html` card badges now run 1–12 sequentially |
| A4 — Hardcoded `color: #333` | ✅ Done | 12 visualization pages now use `var(--color-text-secondary)` for body text |
| Browser verification | ✅ Done | `python -m http.server 8080`; index links/cards/footer, theme toggles on 12 affected widgets, Gantt→Map deep-link presence, and console logs checked |
| FIX 2 — Gantt chronology | ✅ Done | Split India years into Bidar phases, Gulbarga, Kallur, Dabhol; replaced collapsed return block with 1474 Somalia/Maskat, Persian, Black Sea, and Kaffa segments; added key event diamonds |
| FIX 1 — Map waypoint additions | ✅ Done | Route map now has 28 waypoints, including Lar, Aland, Gulbarga, Kallur, Dabhol, Somalia, Erzinjan, Platana, and Balaklava/Gurzuf; generic "Зап. побережье" corrected to Dabhol |
| FIX 1 browser verification | ⚠️ Partial | Verified Gantt links for Gulbarga/Kallur/Dabhol/Gurzuf point into the new 0–27 map range; full map canvas and `?wp=18` text-panel initialization could not be verified because existing CDN D3/TopoJSON scripts did not load locally (A7/local lib follow-up) |
| FIX 3 — Calendar Easter observations | ✅ Done | Added 8 true-vs-observed Pascha markers, drift labels, the 1470 Ramadan/Lent 4/5 March annotation, and compact no-scroll layouts for timeline/events/convergence tabs |
| FIX 3 browser verification | ✅ Done | `python -m http.server 8080`; at 1366×768 clicked Timeline/Events/Convergence, opened the Пасха 8 Маскат card, toggled dark mode light→dark→light, checked console logs and no vertical page scroll |
| FIX 4 — Economics horse data | ✅ Done | Replaced estimated "зол." horse-loss values with 100 rubles purchase, 68 futuns sale, exactly one year ownership, 2.5 altyns/day in Bidar, and ruble/altyn/dengi conversion notes |
| FIX 4 browser verification | ✅ Done | `python -m http.server 8080`; at 1366×768 clicked all Economics tabs, opened the horse ledger tooltip, toggled dark mode light→dark→light, checked console logs and no vertical page scroll |
| Phase 2 Stage 1 — Shared CSS | ✅ Done | Created `css/atlas.css` from the common design-system CSS and replaced duplicated boilerplate in all 13 existing visualization HTML files with a shared stylesheet link |
| Stage 1 browser verification | ✅ Done | `python -m http.server 8080`; smoke-checked all 13 migrated widgets for `css/atlas.css`, header/back/theme controls, shared body/container styles, and console warnings; toggled dark mode on `three_travelers_comparison.html` |
| Phase 2 Stage 2 — Local assets | ✅ Done | Added local `lib/` copies of D3 v7, TopoJSON 3, world-atlas 110m, Tabler Icons CSS, and Tabler font files; replaced all CDN/script/fetch/icon fallback references in the current HTML pages |
| Stage 2 verification | ✅ Done | `python -m http.server 8080`; checked local asset HTTP 200 responses, verified no remaining CDN refs in HTML/CSS/lib, opened key pages with local script/style URLs and no console warnings; Browser plugin could not directly inspect page globals/canvas pixels because its evaluate context is isolated |
| Phase 2 Stage 3 — Shared data | ✅ Done | Created `js/atlas-data.js` with `window.ATLAS.WP`, `PASSAGES`, `STATES`, `CITIES`, `SEGS`, and `CITY_TO_WP`; map and Gantt pages now load the shared data file |
| Stage 3 verification | ✅ Done | Node parse check confirmed 28 waypoints, 28 passages, 13 state polygons, 14 cities, 48 Gantt segments, and 47 Gantt-to-map link keys; Chrome DevTools smoke test verified map `?wp=18` activates Dabhol, Gantt renders 108 map links including `wp=18`, theme toggles work, and console logs are clean |
| Offline follow-up for new widget | ✅ Done | After concurrent commit `25b817f` added `afanasy_world_before_after.html`, replaced its CDN D3/TopoJSON/world-atlas references with the already bundled local files |
| Phase 2 Stage 4 — Shared theme | ✅ Done | Created `js/atlas-theme.js` and replaced the duplicated theme-toggle IIFE in `index.html` plus the 13 established visualization pages with a shared script tag |
| Stage 4 verification | ✅ Done | Chrome DevTools smoke test loaded the index plus all 13 established widgets, confirmed `js/atlas-theme.js` is present, toggled each theme button, checked icon classes, and found no console issues |
| New widget shell normalization | ✅ Done | Wrapped the eight widgets added in `25b817f` in standalone HTML shells with `css/atlas.css`, local Tabler Icons, atlas back navigation, `js/atlas-theme.js`, and hidden headings; fixed README/index count drift to 21 widgets and renumbered homepage cards 1–20 |
| New widget shell verification | ✅ Done | Chrome DevTools smoke test loaded all eight new pages, confirmed clean Russian titles/back text, shared CSS/theme script, working theme toggles, representative button/canvas clicks, and no console issues |

### Session 1 (conv `a6b4ceee`) — Core UI Overhaul
| Task | Status | Notes |
|------|--------|-------|
| Remove «↓ Перейти к визуализациям» | ✅ Done | `index.html` |
| Publisher info → single line | ✅ Done | `index.html` |
| Add М.Ю. Гасунс credit | ✅ Done | `index.html` footer |
| Unified CSS theme across all 14 pages | ✅ Done | via `theme_injector.py` |
| Back button on every page | ✅ Done | sticky header |
| Responsive no-scroll layout | ✅ Done | `max-height: calc(100vh - 280px)` |
| Dark/light theme toggle | ✅ Done | `localStorage` persisted |
| Enlarge map point labels | ✅ Done | 6.5px→9.5px, 7.5px→10px |
| Fix three-travelers toggle reset | ✅ Done | solo → click again → all 3 |
| Trade marshruttnik — horizontal stats | ✅ Done | no vertical scroll |
| Borders animation 5× slower | ✅ Done | 0.0006→0.00012 |
| Gantt labels → clickable map links | ✅ Done | `?wp=N` deep links |
| Speed chart enlarged | ✅ Done | 660→860 wide |
| Calendar charts enlarged | ✅ Done | 640→900 and 660→900 |
| Emotional arc font sizes up | ✅ Done | 7→10px |
| Economics colors aligned | ✅ Done | regional palette |
| Language map, manuscripts, tree — fonts up | ✅ Done | 13→15px base |
| Fix broken HTML in video export | ✅ Done | stray `<` removed |
| Remove non-existent religious crisis card | ✅ Done | index.html |

---

## Active Decisions & Rationale

### Design System
- **Parchment palette (light):** `#ffffff` / `#fdfbf7` / `#f5eedf` backgrounds; `#8b5a30` primary border (amber-brown)
- **Dark palette:** `#0f0b07` / `#1a1208` backgrounds; `#c09060` borders
- **Accent:** `#b87020` (amber gold) for interactive highlights
- **Region color mapping** (consistent across all charts):
  - Russia/North: `#3770be` (blue)
  - Persia/Iran: `#b97314` (amber-brown)
  - Hormuz/Arabian Sea: `#e0a020` (golden amber)
  - India/Deccan: `#be3c28` (terracotta red)
  - Ottoman/Black Sea: `#4a7c59` (muted green)

### Layout Constraints
- **No vertical scroll** is a hard requirement on all visualization pages (1366×768 minimum)
- Canvas/SVG elements use `max-height: calc(100vh - 280px)` to fit within the page header + controls
- Stats/legend panels should be **horizontal**, not vertical sidebars

### Data Integrity
- All dates follow **Khrustalev 2026** dating: journey 1467–1475, not the older chronology
- Gold coin rate: 1 зол. = $529 USD = ₽38 900 (as of May 14, 2026 gold price $151.18/g)
- `GOLD_GRAM_USD` and `USD_RUB` constants in `afanasy_trade_marshruttnik.html` need weekly update

---

## Known Issues / Incomplete Items

| Issue | Severity | File | Notes |
|-------|----------|------|-------|
| Existing 1366×768 page scroll | Medium | multiple widgets | Compact shell and chart pass fixed near-threshold pages; remaining overflow pages: trade guide, language map, borders animation, bestiary, manuscripts, travelers, trade marshruttnik, and video export. |
| Mobile touch targets | Low | all pages | Not tested on phone; touch targets may be too small |
| New widget color-token audit | Medium | 8 newly added widgets | The newly committed widgets now have atlas shells, but their internal chart/data colors still need a CSS-token pass before considering them fully compliant with new-widget conventions |
| `scratch/theme_injector.py` not committed to repo | Resolved | — | Committed in `9e006c0` |
| PWA device install/offline reload | Medium | `manifest.json`, `sw.js` | Static files are present; needs Android Chrome / iPhone Safari install and offline reload validation |

---

## Files Modified Since Last Clean Commit

> After the PWA asset follow-up commit, tracked files should be clean. Local diagnostic helpers may remain untracked and should not be published unless intentionally converted into docs.

```
git status: untracked check_sw.html and test_pwa.js may remain; do not stage by default
```

---

## Architecture Notes for Next AI

### How the Theme System Works
1. `index.html` has a `<button id="theme-toggle">` that sets `data-theme="dark"` on `<html>`
2. Visualization CSS variables now live in `css/atlas.css`; `index.html` still has its own inline CSS until a later stage
3. Each visualization page independently stores/reads `localStorage.getItem('afanasy-theme')` on load
4. The theme toggle button's state is synced on each page load

### How Gantt → Map Deep Links Work
1. `afanasy_gantt.html` defines `CITY_TO_WP = { 'Тверь': 0, 'Баку': 4, ... }` mapping city names to waypoint indices
2. SVG labels and bars are wrapped in `<a xlink:href="afanasy_v8_text_map.html?wp=N">` elements
3. `afanasy_v8_text_map.html` reads `new URLSearchParams(location.search).get('wp')` on init to set the active waypoint

### wrap_visualizations.py vs theme_injector.py
- `wrap_visualizations.py` (in brain scratch) — first attempt, wraps standalone HTML in full template; **not used in final version**
- `scratch/theme_injector.py` — **current approach**; patches `:root {}` and `[data-theme="dark"] {}` blocks into existing files without restructuring them

---

## Suggested Next Steps (see ROADMAP.md for full plan)

**Priority (today):**
1. ✅ **FIX 5** — Manuscripts: leaf-size proof + two-gap visualization (DONE)
2. ✅ **FIX 6** — Emotional arc: silence zone (1471–1472) + pronoun analysis (DONE)
3. ✅ **FIX 7** — Composition tree: chronological writing order toggle (DONE)
4. ✅ **A5 map** — remove CSS canvas inversion and add map-owned dark palette (DONE)
5. ✅ **A5 remaining canvases** — world before/after and video export theme-aware Canvas palettes (DONE)
6. ✅ **FIX 9** — current 21-widget index navigation with search/category filters (DONE)
7. ✅ **A7** — local asset/CDN documentation sync (DONE)
8. ✅ **A6** — phantom widget link audit/status sync (DONE)
9. 🔄 **Cross-linking** — Calendar→Map, Economics→Map, and Manuscripts→Gantt done; all-pages breadcrumb pass remains
10. 🔄 **No-scroll layout** — shared shell + four chart widgets compacted; remaining overflow pages need widget-specific compaction

**Then (Phase 3 new visualizations):**
1. **Phase 3.2** — Religious crisis: Господи/Аллах/Бог frequency (6h)

**Mobile testing (Phase 4):**
- Test PWA install on Android (Chrome: should show Install prompt)
- Test PWA add on iPhone (Safari: Share → Add to Home Screen)
- Verify offline mode works on both platforms

---

*Maintained by Antigravity AI · Do not delete — required for session continuity*

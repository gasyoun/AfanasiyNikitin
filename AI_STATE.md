# AI_STATE.md — Handoff & Session State

This file is maintained by AI assistants (Antigravity/Claude) working on this repository.  
It records the current state of work, decisions made, and context needed to continue seamlessly.

> **Last updated:** 2026-05-20 · Conversation ID: GPT-5.5 follow-up after Claude Haiku Phase 4 + FIX 5–8
> **Commits:** 822c69b (FIX 7), e84dd80 (FIX 6), 579480b (FIX 5), 6ceaf32 (FIX 8), beb79bd (PWA), 5d7caaa (A5 map), plus legacy-date wording follow-up

---

## Current Status: ✅ PHASE 2 COMPLETE + FIX 5–8 DONE — PWA Shell Added

The site is live at **https://gasyoun.github.io/AfanasiyNikitin/**.  
Phase 0 from `FIX_PLAN.md` is fully implemented: A1–A4 credibility fixes, FIX 1–4 data corrections. Phase 2 complete: shared CSS in `css/atlas.css`, bundled local assets in `lib/`, shared map/Gantt data in `js/atlas-data.js`, and shared theme logic in `js/atlas-theme.js`. Phase 4.1–4.2 PWA shell exists: `manifest.json`, `sw.js` Service Worker, cache list aligned to the current widget filenames. FIX 5–8 are complete: manuscript leaf proof, emotional silence/pronouns, composition chronological toggle, and Mahmud Gavan as 4th traveler.

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
| Offline verification | ⚠️ Partial | Static asset-list verification passes; Android/iPhone install and true offline reload still need device/browser testing |
| Android PWA install | ⚠️ Pending | To test: open on Android, tap Install, test offline mode |
| iPhone Home Screen add | ⚠️ Pending | To test: open in Safari, Share → Add to Home Screen, test offline |
| FIX 8 — Mahmud Gavan | ✅ Done | 4-traveler comparison added: route (Gilan→Cairo→Damascus→Bidar→Goa→Vijayanagara), timeline, interactive toggle, legend |
| Gavan data integration | ✅ Done | Coordinates verified (36.8°N 49.6°E to 15.3°N 78.5°E), color (#6b4c8a), years 1453–1481 |
| Three → Four travelers | ✅ Done | Grid expanded to 4 columns, toggleTraveler logic updated, legend scales dynamically |
| FIX 5 — Manuscript leaf proof | ✅ Done | Two identical gaps (Ф. 11–14 & Ф. 41–44, ~1160 chars each) prove 1 lost leaf. Visual: side-by-side gaps + formula 1160=2×580. Table: page formats (Etterov 850/page, Trinity 700/page, proto-source 580/page), total 36,500 chars = 72 pages = 9 notebooks |
| FIX 6 — Silence zone + pronouns | ✅ Done | Grey zone (Mar 1471 – May 1472): 13+ months no writings. New 5th dimension "Одиночество" (яз/я один +10 vs есмя/мы −10). All 20 points tagged: Tver alone, Volga together, robbery destroys group, Bidar alone, prayer alone, sea together, Kaffa alone. Zone visualized as grey rect between points 14–15 |
| FIX 7 — Chronological order | ✅ Done | Toggle button switches between manuscript order (7 blocks → Mamyrev → 3 copies) and chronological writing order (7 periods: Persia 1468–69 → India 1469 → India 1470 → Dorozhnik 1470 → Aland+Parwat 1470–71 → SILENCE 1471–72 → War chronicle 1472–73 → Kaffa 1474). All nodes have detailed metadata about genre, language, manuscript page numbers (Ф.N). |
| A5 — Map canvas dark palette | ✅ Done | Removed the shared CSS inversion filter and made `afanasy_v8_text_map.html` rebuild its Canvas basemap with light/dark palettes from `data-theme`; verified `?wp=18` opens Dabhol and dark-mode canvas filter is `none` |
| Legacy date-range wording cleanup | ✅ Done | Removed literal old-range chronology strings from public widgets and project handoff/reference docs; `rg "1468.{0,3}1474"` is clean outside the extracted book text/PDF exclusions |

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
| Remaining canvas dark palettes | Medium | `three_travelers_comparison.html`, `afanasy_borders_animation.html`, `afanasy_trade_marshruttnik.html`, `afanasy_video_export.html` | Main map is fixed; remaining Canvas widgets still need the same no-filter/theme-aware drawing audit |
| Existing 1366×768 page scroll | Medium | multiple widgets | Browser check showed several pages still have `documentElement.scrollHeight > 768`; `.vis-container` itself did not overflow. Needs layout pass outside Phase 0. |
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

**Then (Phase 3 new visualizations):**
1. **A5 remaining canvases** — apply theme-aware drawing to travelers, borders, trade route, and video export canvases
2. **Phase 3.1** — World before/after: myths vs experience (8h)
3. **Phase 3.2** — Religious crisis: Господи/Аллах/Бог frequency (6h)

**Mobile testing (Phase 4):**
- Test PWA install on Android (Chrome: should show Install prompt)
- Test PWA add on iPhone (Safari: Share → Add to Home Screen)
- Verify offline mode works on both platforms

---

*Maintained by Antigravity AI · Do not delete — required for session continuity*

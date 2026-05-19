# AI_STATE.md — Handoff & Session State

This file is maintained by AI assistants (Antigravity/Claude) working on this repository.  
It records the current state of work, decisions made, and context needed to continue seamlessly.

> **Last updated:** 2026-05-19 · Conversation ID: GPT-5.5 Phase 2
> **Commit:** Phase 2 Stage 4 complete

---

## Current Status: ✅ PHASE 2 COMPLETE — Shared CSS, Assets, Data, and Theme Extracted

The site is live at **https://gasyoun.github.io/AfanasiyNikitin/**.  
Phase 0 from `FIX_PLAN.md` is implemented and browser-verified locally: A1–A4 credibility and dark-mode fixes. Phase 1 is complete: FIX 2 in `afanasy_gantt.html`, FIX 1 in `afanasy_v8_text_map.html`, FIX 3 in `afanasy_calendar_pascha_islam.html`, and FIX 4 in `afanasy_economics_prices.html`. Phase 2 is complete for the established atlas pages: shared CSS in `css/atlas.css`, bundled local assets in `lib/`, shared map/Gantt data in `js/atlas-data.js`, and shared theme logic in `js/atlas-theme.js`.

---

## What Was Completed (Sessions 2026-05-19)

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
- All dates follow **Khrustalev 2026** dating: journey 1467–1475 (not 1468–1474)
- Gold coin rate: 1 зол. = $529 USD = ₽38 900 (as of May 14, 2026 gold price $151.18/g)
- `GOLD_GRAM_USD` and `USD_RUB` constants in `afanasy_trade_marshruttnik.html` need weekly update

---

## Known Issues / Incomplete Items

| Issue | Severity | File | Notes |
|-------|----------|------|-------|
| `afanasy_world_before_after.html` — not in current repo | Medium | — | Listed in README but file doesn't exist yet |
| `afanasy_religious_crisis.html` — not in repo | Low | — | Removed from `index.html`; may be created later |
| Dark mode canvas filter on map | Low | `afanasy_v8_text_map.html` | CSS `filter: invert()` not applied to Canvas pixels; only the container flips |
| Existing 1366×768 page scroll | Medium | multiple widgets | Browser check showed several pages still have `documentElement.scrollHeight > 768`; `.vis-container` itself did not overflow. Needs layout pass outside Phase 0. |
| Mobile touch targets | Low | all pages | Not tested on phone; touch targets may be too small |
| New widget color-token audit | Medium | 8 newly added widgets | The newly committed widgets now have atlas shells, but their internal chart/data colors still need a CSS-token pass before considering them fully compliant with new-widget conventions |
| `scratch/theme_injector.py` not committed to repo | Resolved | — | Committed in `9e006c0` |
| PWA offline capability | Future | — | Service Worker not implemented yet |

---

## Files Modified Since Last Clean Commit

> After the Phase 2 Stage 4 commit, tracked files are clean. The pre-existing PDF and extracted book text remain intentionally untracked.

```
git status: untracked hrustalev_tetradi_2026.pdf and scratch/book_text.txt
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

1. **New widget audit**: replace remaining hardcoded chart/interface colors in the eight newly added widgets with design tokens or documented data-color variables
2. **Phase 3 — FIX 5** manuscript leaf-size proof
3. **Layout follow-up**: investigate existing 1366×768 document scroll on map/travelers/trade/borders/Gantt/emotional/language/manuscripts/tree pages

---

*Maintained by Antigravity AI · Do not delete — required for session continuity*

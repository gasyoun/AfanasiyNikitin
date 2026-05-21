# CHANGELOG

All notable changes to the Afanasiy Nikitin Interactive Atlas are documented here.  
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [Unreleased]

### Added
- Added a local SVG favicon and linked it from all atlas HTML pages, the web app manifest, and the Service Worker cache.
- Cross-linked related widgets: calendar event details now open the matching route-map waypoint; Bidar economics entries open Bidar on the map; manuscript passages open a focused Gantt timeline period.
- `index.html`: added search, category filters, and a collapsible question/scenario section for navigating the current 21-widget atlas.
- Added PWA metadata and a Service Worker cache shell so the atlas can be installed and served from local cached assets when available.
- **Web fonts**: Inter (body/UI) + Playfair Display (headings) via Google Fonts `@import` in `atlas.css`.
- **Keyboard shortcuts** on all 22 pages: `Esc` → return to atlas, `D` → toggle dark/light theme.
- **Accessibility**: `aria-label` on all theme toggle buttons; global `:focus-visible` outline styles; `button:active` press feedback.
- **Hero gradient** on index.html header with animated radial glow pulse.
- **Sticky filter bar** on index.html (`position: sticky; backdrop-filter: blur(12px)`).
- **Page entry animation**: `fadeSlideIn` 0.35s ease-out on `.vis-container` and `.container`.
- **Type scale CSS variables**: `--text-xs` through `--text-2xl` in `atlas.css`.
- **Chart dark-mode variable**: `--color-chart-silence` for light/dark-safe chart fills.
- **Meta description** tag on index.html for SEO.
- Added compact `Атлас / текущая визуализация` breadcrumbs to all 21 widget pages.

### Changed
- Tightened the shared visualization shell spacing in `css/atlas.css`, bringing the map, Gantt, people network, and several compact widgets back within a 1366×768 viewport.
- Updated README/index/architecture documentation to describe bundled local atlas assets and the current 21-widget count.
- Extracted the shared visualization design system into `css/atlas.css`; all 13 existing widget HTML files now link to the shared stylesheet and keep only widget-specific CSS inline.
- Bundled D3 v7, TopoJSON 3, world-atlas 110m data, and Tabler Icons under `lib/`; all current HTML pages now reference local assets instead of external CDNs.
- Centralized the route map and Gantt timeline datasets into `js/atlas-data.js`; `afanasy_v8_text_map.html` and `afanasy_gantt.html` now consume shared `window.ATLAS` data.
- Extracted the repeated dark/light theme toggle script into `js/atlas-theme.js` for the index and 13 established visualization pages.
- **`--color-text-secondary`** darkened from `#6e5e54` to `#5e4e44` for WCAG AA contrast compliance.
- **`--font-sans`** updated to `'Inter', -apple-system, …` (was system-stack only).
- **`--font-display`** added: `'Playfair Display', Georgia, serif` — applied to all `h1`/`h2` headings.
- **Card hover effect** upgraded to parchment-tone glow shadow with `:active` press feedback and smooth cubic-bezier transition.
- **Theme toggle button**: removed inline `transition` from all 21 sub-pages (now CSS-driven with spring cubic-bezier + rotate on active).
- **Mobile responsive**: bestiary grid 2-col → 3-col; filter pills min-height 44px; emotional arc dims 4-col → 2-col.
- **Global**: `font-variant-numeric: tabular-nums`, `-webkit-font-smoothing: antialiased`, `scroll-behavior: smooth`.
- **Smooth scroll**: filter pill click on index.html now scrolls to first visible section.
- **Footer**: hardcoded `color: #bbb` → `var(--color-text-secondary)` for dark-mode compatibility.
- **ROADMAP.md**: marked Phases 2b, 3, 4 as complete; updated priority summary.
- **`afanasy_economics_prices.html`**: SVG region/economics fills now use shared `--viz-region-*` and `--viz-economic-*` variables instead of inline hex colors.
- **`afanasy_calendar_pascha_islam.html`**: holiday legend and SVG fills now use shared `--viz-calendar-*` variables instead of widget-local hex colors.
- **`afanasy_citations_v2.html`**: citation cards, series, wave markers, legends, and Canvas labels now resolve through shared `--viz-citation-*` tokens and redraw correctly after a theme toggle.
- **`afanasy_religious_crisis.html`**: religious concept cards, legend dots, SVG annotations, ratio shading, and detail badges now resolve through shared `--viz-religion-*` tokens.
- **`afanasy_historiography.html`**: timeline events, era bands, navigation accents, detail headers, and tags now resolve through shared `--viz-hist-*` tokens.
- **`afanasy_historiography.html`**: removed the remaining JS hex fallback table and manual `rgba(...)` alpha helper; dynamic accents now use `color-mix(...)` against shared CSS variables.
- **`khozheniye_composition_tree.html`**: manuscript/chronological node colors now resolve through shared `--viz-comp-*` tokens with theme-aware SVG fills.
- **`khozheniye_composition_tree.html`**: removed the remaining JS hex fallback table and manual `rgba(...)` alpha helper; SVG node fills now use `color-mix(...)` against shared CSS variables.
- **`afanasy_people_network.html`**: relationship legend, Canvas node/edge palette, labels, and detail accents now resolve through shared `--viz-network-*` tokens.
- **`afanasy_language_map_v2.html`**: language highlights, cards, legends, and timeline/detail bars now resolve through shared `--viz-language-*` tokens.
- **`afanasy_speed_land_sea.html`**: stay markers, label arrows, and tooltip shadow now use shared atlas variables instead of widget-local colors.
- **`afanasy_manuscripts.html`**: manuscript-list colors and diff highlights now resolve through shared `--viz-manuscript-*` variables, including dynamic column headers and note outlines.
- **`afanasy_emotional_arc.html`**: emotional-dimension colors and the silence zone now resolve through shared atlas variables instead of widget-local color literals.
- **`afanasy_gantt.html`**: movement, region, event, duration-label, and tooltip colors now resolve through shared atlas variables.
- **`afanasy_world_before_after.html`**: before/after map labels, detail chips, and Canvas map palettes now resolve through shared `--viz-world-*` variables.

### Fixed
- `afanasy_gantt.html`: tightened the focused Gantt SVG height so `?focus=...` views remain within a 1366×768 viewport.
- `afanasy_emotional_arc.html`: added the missing pronoun/loneliness values for the final four route points, removing SVG `NaN` rendering errors when selecting "Одиночество"; slightly reduced chart height so the active detail view stays within 1366×768.
- `afanasy_citations_v2.html`, `afanasy_religious_crisis.html`, `afanasy_emotional_arc.html`, and `khozheniye_composition_tree.html`: constrained chart/detail heights so their primary interactions stay within 1366×768.
- `afanasy_video_export.html`: compacted the preview canvas, controls, status line, and note so playback/slider/theme interactions fit within 1366×768.
- `afanasy_trade_marshruttnik.html`: constrained the trade-map canvas and details panel so filter/map/theme interactions fit within 1366×768.
- `three_travelers_comparison.html`: compacted traveler cards and map height so four-traveler toggles fit within 1366×768.
- `afanasy_manuscripts.html`: switched the manuscript comparison to a two-column desktop layout with bounded proof/comparison panels so passage, note, Gantt-link, and theme interactions fit within 1366×768.
- `afanasy_bestiary.html`: compacted the illuminated-card grid and bounded the detail panel so card selection and theme interactions fit within 1366×768.
- `afanasy_borders_animation.html`: compacted the border-animation canvas and event list so event clicks and theme interactions fit within 1366×768.
- `afanasy_language_map_v2.html`: switched the language map to a two-column desktop layout with bounded passages and detail panels so filters, timeline clicks, and theme interactions fit within 1366×768.
- `afanasy_trade_guide_v4.html`: compacted the city pickers, rate/result panels, and made the goods table internally scrollable so filtering, row details, price tooltips, and theme interactions fit within 1366×768.
- `afanasy_video_export.html`: added theme-aware Canvas basemap, route, waypoint, marker, label, loading, and video HUD colors for light/dark mode.
- `afanasy_world_before_after.html`: added theme-aware Canvas palettes for both before/after maps, route, markers, labels, and active highlights in dark mode.
- `afanasy_trade_marshruttnik.html`: added theme-aware Canvas basemap, route, port, label, and legend colors for dark mode; replaced an invalid CSS-variable string used as a Canvas fill color.
- `afanasy_borders_animation.html`: added theme-aware Canvas basemap, labels, active traveler marker, and year overlay colors for dark mode.
- `three_travelers_comparison.html`: added theme-aware Canvas basemap, labels, shared Hormuz marker, and legend colors for dark mode; corrected the Mahmud Gavan/Bidar typo.
- Removed literal old-range chronology strings from the calendar widget and project handoff/reference docs; public wording now keeps Khrustalev's 1467–1475 dating as the only explicit range.
- `afanasy_v8_text_map.html`: removed the global dark-mode canvas inversion path for the main route map and added theme-aware Canvas colors for basemap labels, route lines, waypoint labels, and the loading state.
- `sw.js`: aligned the offline cache list with the current widget filenames and bundled icon font file.
- `khozheniye_composition_tree.html`: added a manuscript-order vs chronological-writing-order toggle for the composition tree.
- `afanasy_emotional_arc.html`: added the 1471–1472 silence zone and the loneliness/pronoun analysis dimension.
- `afanasy_manuscripts.html`: added the Khrustalev chapter 3 quantitative leaf-size proof, including the two ~1160-character gaps and 9-notebook reconstruction.
- `three_travelers_comparison.html`: added Mahmud Gavan as the fourth comparative route.
- Wrapped the eight newly added widget pages in the standard standalone atlas shell with shared CSS, local Tabler Icons, back navigation, and the shared theme toggle.
- `index.html`/`README.md`: reconciled the expanded atlas count to 21 HTML widgets and renumbered homepage cards 1–20 in display order.
- Removed explicit legacy journey-date range strings from README and the new historiography/editions widgets while preserving the note that Khrustalev corrected the older chronology.
- `afanasy_world_before_after.html`: replaced late-added CDN D3/TopoJSON/world-atlas references with bundled local assets.
- `index.html`: repaired the book-summary download link by pointing it at the existing `tetradi_hrustalev_2026.md` while preserving the Russian download filename.
- Reconciled public visualization counts around the 13 existing HTML widgets in `index.html`, `README.md`, `index.md`, and `tmp.md`.
- `index.html`: renumbered homepage visualization cards sequentially from 1 to 12.
- Replaced hardcoded `body { color: #333; }` with `var(--color-text-secondary)` across the 12 affected visualization pages.
- `afanasy_gantt.html`: expanded the Khrustalev timeline with Bidar phases, Gulbarga, Kallur, Dabhol, the 1474 Somalia/Maskat return, the Persian return chain, Black Sea stops, and dated event markers.
- `afanasy_v8_text_map.html`: added the missing Khrustalev route waypoints (Lar, Aland, Gulbarga, Kallur, Dabhol, Somalia, Erzinjan, Platana, Balaklava/Gurzuf), replaced the generic west-coast placeholder with Dabhol, and re-indexed Gantt deep links to the new 28-point route.
- `afanasy_calendar_pascha_islam.html`: added the eight Khrustalev Easter observations with parallel true/observed Pascha tracks, drift markers, the 1470 Ramadan/Lent annotation, and compact no-scroll layouts for all calendar tabs.
- `afanasy_economics_prices.html`: replaced estimated horse-loss values with the exact Khrustalev data: 100 rubles purchase, 68 futuns sale, one-year ownership, 2.5 altyns per day in Bidar, and ruble/altyn/dengi conversions.
- **`index.html`**: added missing `<link rel="stylesheet" href="lib/tabler-icons.min.css">` — theme toggle icon was invisible on the main page.
- **`index.html`**: replaced hardcoded `style="color: #bbb;"` in footer with `var(--color-text-secondary)` for dark-mode compatibility.

---

## [1.2.0] — 2026-05-19

### Added
- **Dark / Light theme toggle** — floating ☀/🌙 button on `index.html`; preference saved to `localStorage`; propagates to all 14 visualization pages via `postMessage`-style CSS variable injection
- **`scratch/theme_injector.py`** — automation script that injects unified CSS variable blocks and theme-toggle logic into all visualization pages in batch
- **URL deep-link support** — `afanasy_v8_text_map.html` now accepts `?wp=N` query parameter to jump directly to waypoint N on load (used by Gantt chart links)
- **Gantt → Map navigation** — city labels and timeline bars in `afanasy_gantt.html` are now clickable SVG links pointing to the corresponding waypoint on the main map
- **Back button** — every visualization page now has a «← Вернуться в атлас» button in a sticky top header

### Changed
- **`index.html`**: removed «↓ Перейти к визуализациям» jump button; publisher info merged onto one subtitle line; М.Ю. Гасунс credit added; video export card moved to «Скачиваемые файлы» section; dark-mode CSS variables added; count corrected to 14 (removed non-existent `afanasy_religious_crisis.html` card)
- **All 14 visualization pages**: unified CSS variable system (`--color-*`, `--font-*`, `--border-radius-*`); responsive `max-height: calc(100vh - 280px)` on all Canvas/SVG containers — no vertical scroll on 1920×1080 or 1366×768 screens
- **`afanasy_v8_text_map.html`**: city/state label font 6.5 px → 9.5 px; waypoint label font 7.5 px → 10 px; active circle radius 5 → 7; inactive circle radius 3 → 4.5
- **`three_travelers_comparison.html`**: toggle logic rewritten — click to solo traveler, click same traveler again to restore all three (previous code had no reset path)
- **`afanasy_trade_marshruttnik.html`**: stats panel layout changed from vertical sidebar to horizontal dashboard row — eliminates vertical scrolling with 19 ports
- **`afanasy_borders_animation.html`**: animation speed factor 0.0006 → 0.00012 (5× slower)
- **`afanasy_speed_land_sea.html`**: SVG chart width 660 → 860, height 320 → 370; right margin 12 → 85 (room for right-side labels); typography enlarged
- **`afanasy_calendar_pascha_islam.html`**: timeline SVG 640×260 → 900×380; convergence chart 660×340 → 900×460; text sizes and dot radii enlarged
- **`afanasy_emotional_arc.html`**: SVG label font sizes enlarged (7 px → 10 px; 8 px → 10.5 px; 7 px → 9.5 px)
- **`afanasy_economics_prices.html`**: region color palette aligned with site-wide scheme — India `#be3c28`, Hormuz `#e0a020`, Persia `#b97314`, Russia `#3770be`; legend dots updated to match
- **`afanasy_gantt.html`**: CSS hover states for `svg text.gnt-lbl`; source note updated to mention click-to-map navigation; `CITY_TO_WP` mapping object added
- **`afanasy_language_map_v2.html`**: base font 13 px → 15 px; sub-elements enlarged proportionally
- **`afanasy_manuscripts.html`**: base font 13 px → 15 px; sub-elements enlarged proportionally
- **`khozheniye_composition_tree.html`**: base font 13 px → 15 px; node boxes enlarged (root 180×36 → 210×42; branch nodes 120×46 → 142×56); label line height 11 → 13.5; `labelSize` values updated

### Fixed
- `afanasy_video_export.html`: fixed stray `<` character before `<div id="status">` causing broken HTML parse
- `index.html`: removed link to non-existent `afanasy_religious_crisis.html`

---

## [1.1.0] — 2026-05-19 (earlier session)

### Added
- `afanasy_video_export.html`: restyled with site-wide dark parchment theme and back button header

### Changed
- `index.html`: header and subtitle first unified pass (publisher info, credit)
- All visualization pages: first pass of shared CSS variable injection via `wrap_visualizations.py` (later revised in v1.2.0)

---

## [1.0.0] — 2026-05-18 (initial commit `b5a6652`)

### Added
- **14 interactive visualization pages** across 5 categories:
  - Cartographic (6): `afanasy_v8_text_map`, `afanasy_video_export`, `three_travelers_comparison`, `afanasy_trade_marshruttnik`, `afanasy_borders_animation`, `afanasy_world_before_after`
  - Chronological (4): `afanasy_gantt`, `afanasy_speed_land_sea`, `afanasy_calendar_pascha_islam`, `afanasy_emotional_arc`
  - Textual / Linguistic (2): `afanasy_language_map_v2`, `afanasy_manuscripts`
  - Characters & Structure (1): `khozheniye_composition_tree`
  - Economics (1): `afanasy_economics_prices`
- **`index.html`**: navigation hub listing all visualizations by category
- **Documentation set**: `README.md`, `CLAUDE.md`, `index.md`, `use_cases_and_guide.md`, `afanasy_geolocations.md`, `afanasy_journey_data.md`, `tetradi_hrustalev_2026.md`
- **Data files**: 19-waypoint route data, medieval city coordinates, GeoJSON exports
- **GitHub Pages** deployment at `https://gasyoun.github.io/AfanasiyNikitin/`

---

*Generated by Antigravity AI · Last updated 2026-05-19*

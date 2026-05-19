# CHANGELOG

All notable changes to the Afanasiy Nikitin Interactive Atlas are documented here.  
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [Unreleased]

### Changed
- Extracted the shared visualization design system into `css/atlas.css`; all 13 existing widget HTML files now link to the shared stylesheet and keep only widget-specific CSS inline.

### Fixed
- `index.html`: repaired the book-summary download link by pointing it at the existing `tetradi_hrustalev_2026.md` while preserving the Russian download filename.
- Reconciled public visualization counts around the 13 existing HTML widgets in `index.html`, `README.md`, `index.md`, and `tmp.md`.
- `index.html`: renumbered homepage visualization cards sequentially from 1 to 12.
- Replaced hardcoded `body { color: #333; }` with `var(--color-text-secondary)` across the 12 affected visualization pages.
- `afanasy_gantt.html`: expanded the Khrustalev timeline with Bidar phases, Gulbarga, Kallur, Dabhol, the 1474 Somalia/Maskat return, the Persian return chain, Black Sea stops, and dated event markers.
- `afanasy_v8_text_map.html`: added the missing Khrustalev route waypoints (Lar, Aland, Gulbarga, Kallur, Dabhol, Somalia, Erzinjan, Platana, Balaklava/Gurzuf), replaced the generic west-coast placeholder with Dabhol, and re-indexed Gantt deep links to the new 28-point route.
- `afanasy_calendar_pascha_islam.html`: added the eight Khrustalev Easter observations with parallel true/observed Pascha tracks, drift markers, the 1470 Ramadan/Lent annotation, and compact no-scroll layouts for all calendar tabs.
- `afanasy_economics_prices.html`: replaced estimated horse-loss values with the exact Khrustalev data: 100 rubles purchase, 68 futuns sale, one-year ownership, 2.5 altyns per day in Bidar, and ruble/altyn/dengi conversions.

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

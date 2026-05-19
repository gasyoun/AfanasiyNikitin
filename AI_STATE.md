# AI_STATE.md — Handoff & Session State

This file is maintained by AI assistants (Antigravity/Claude) working on this repository.  
It records the current state of work, decisions made, and context needed to continue seamlessly.

> **Last updated:** 2026-05-19 · Conversation ID: GPT-5.5 Phase 0  
> **Commit:** Phase 0 quick fixes in progress

---

## Current Status: 🔄 PHASE 0 IN PROGRESS — Quick Fixes

The site is live at **https://gasyoun.github.io/AfanasiyNikitin/**.  
Current work is Phase 0 from `FIX_PLAN.md`: A1–A4 credibility and dark-mode fixes.

---

## What Was Completed (Sessions 2026-05-19)

### Session 3 (GPT-5.5) — Phase 0 Quick Fixes
| Task | Status | Notes |
|------|--------|-------|
| A1 — Broken download link in index | ✅ Done | `index.html` now links to existing `tetradi_hrustalev_2026.md` and keeps the Russian download filename |
| A2 — Reconcile visualization counts | ✅ Done | Public counts now use 13 existing HTML widgets in `index.html`, `README.md`, `index.md`, and `tmp.md` |
| A3 — Renumber index cards | ✅ Done | `index.html` card badges now run 1–12 sequentially |

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
| Mobile touch targets | Low | all pages | Not tested on phone; touch targets may be too small |
| `scratch/theme_injector.py` not committed to repo | Resolved | — | Committed in `9e006c0` |
| PWA offline capability | Future | — | Service Worker not implemented yet |

---

## Files Modified Since Last Clean Commit

> As of `9e006c0`, all files are committed. Working tree is clean.

```
git status: nothing to commit, working tree clean
```

---

## Architecture Notes for Next AI

### How the Theme System Works
1. `index.html` has a `<button id="theme-toggle">` that sets `data-theme="dark"` on `<html>`
2. CSS variables are defined in `:root {}` (light) and `[data-theme="dark"] {}` (dark) blocks
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

1. **A4 — Replace `color: #333`** in visualization pages with `var(--color-text-secondary)`
2. **Phase 1 — FIX 2** Gantt return-route and India-phase data corrections
3. **Phase 1 — FIX 1** map waypoint additions and Dabhol correction
4. **Phase 1 — FIX 3** calendar Easter observations
5. **Phase 1 — FIX 4** economics horse and daily-cost data

---

*Maintained by Antigravity AI · Do not delete — required for session continuity*

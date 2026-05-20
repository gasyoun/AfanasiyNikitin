# FIX PLAN — Existing Visualizations
## Based on full analysis of Khrustalev 2026 «Тетради купца Афанасия»

> Priority: 🔴 Critical data error · 🟡 Data gap · 🟢 Quick win · 🔵 Structural
> Status: ⬜ Not started · 🔄 In progress · ✅ Done

---

## FIX 1 — `afanasy_v8_text_map.html` 🔴
**Problem:** Only 19 waypoints. Chapter 4 has 60+ precisely dated events. 9 major stops missing.

**Missing waypoints to add:**

| # | Place | Date (exact) | Duration | Why critical |
|---|-------|-------------|----------|--------------|
| A | Aland (Аланд) ×4 | Oct 1469, Oct 1470, Sep 1472, Sep 1473 | 8–14 days each | He visits 4 times — most recurring location after Bidar |
| B | Gulbarga (Гулбарга) | Feb–Aug 1473 | ~6 months | Longer than many current stops |
| C | Kallur (Каллур) | Mar–Aug 1473 | ~5 months | Diamond mines — his stated trade goal |
| D | Dabhol (Дабхол) | Nov 1473 – Jan 1474 | ~2 months | Actual India departure port (currently "зап. побережье") |
| E | «Ethiopia» / Somalia | Feb 1474 | 5 days | Dramatic return detour, month at sea with no land |
| F | Lar (Лар) ×2 | Dec 1468 + May 1474 | 3 days each | Wrote the Marshroutnik here on outbound |
| G | Erzinjan (Арцыцан) | Sep 1474 | transit | Return through Turkey, before Trabzon |
| H | Platana (near Trabzon) | Oct 1–20, 1474 | 15 days | Waiting for favorable wind |
| I | Balaklava / Gurzuf | 1 Nov 1474 | 5 days | Crimea stops before Kaffa, storm mentioned |

**Also fix:** Waypoint 14 `[17.5,70.0]` labelled "Зап. побережье" → replace with Dabhol `[17.52,73.18]`

**Data source:** Chapter 4 chronology table, pp.148–155

**Effort:** ~3h

**Status:** ⬜

---

## FIX 2 — `afanasy_gantt.html` 🔴
**Problem:** Return route collapsed to one block. India years under-segmented. Wrong dates.

### 2a — Split the return voyage (currently one block "Персия обратно")

Replace with these precise segments from Chapter 4 pp.152–155:

| Segment | Start | End | Duration | Note |
|---------|-------|-----|----------|------|
| Dabhol → Somalia | Late Jan 1474 | ~Feb 1474 | ~1 month | Open ocean, no land visible |
| «Ethiopia» (Somalia) | ~Feb 1474 | ~Feb 1474 | 5 days | Ransom paid to locals |
| Somalia → Maskat | ~Feb 1474 | 10 Apr 1474 | 12 days | Easter #8 in Maskat |
| Maskat → Hormuz | 10 Apr 1474 | 19 Apr 1474 | 9 days | — |
| Hormuz (2nd) | 19 Apr 1474 | 9 May 1474 | 20 days | — |
| Lar | May 1474 | May 1474 | 3 days | — |
| Shiraz | May–Jun 1474 | Jun 1474 | 12 days travel + 7 days stay | — |
| Eberku (Вергу) | Jun 1474 | Jun 1474 | 15 days travel + 10 days stay | — |
| Yezd | Jul 1474 | Jul 1474 | 9 days travel + 8 days stay | — |
| Isfahan | Jul 1474 | Jul 1474 | 5 days travel + 6 days stay | — |
| Kashan | Jul–Aug 1474 | Aug 1474 | 5 days stay | — |
| Qum → Sultania → Tabriz | Aug 1474 | Aug 1474 | transit | — |
| Uzun Hasan's camp (Urmia) | Aug 1474 | Aug 1474 | 10 days | — |
| Erzinjan | Sep 1474 | Sep 1474 | transit | — |
| Trabzon | Late Sep 1474 | Early Oct 1474 | 5 days | — |
| Platana (near Trabzon) | ~1 Oct 1474 | 20 Oct 1474 | 15 days | Waiting for wind |
| Black Sea to Balaklava | 20 Oct 1474 | 1 Nov 1474 | ~11 days | — |
| Gurzuf | 1 Nov 1474 | 6 Nov 1474 | 5 days | — |
| Kaffa (Феодосия) | 6 Nov 1474 | ~Jan 1475 | ~2 months | Writes final Dorozhnik section |

### 2b — Split India years (currently 2 blocks)

Split Bidar into 5 phases:

| Phase | Dates | Key event |
|-------|-------|-----------|
| Bidar I-a | 15 Sep – 14 Nov 1469 | Arrival |
| Bidar I-b | 14 Nov 1469 – Jan 1470 | Christmas: horse sold for 68 futuns |
| Bidar I-c | Jan – Aug 1470 | Writes Dorozhnik, tries to leave |
| Bidar I-d | Aug 1470 – Feb 1471 | Aland fair (Oct 1470) |
| Parwat pilgrimage | Feb–Mar 1471 | Mahashivaratri 19 Feb 1471 |
| Bidar II | Mar 1471 – Nov 1472 | War chronicle; Goa falls 1 Feb 1472 |
| Gulbarga | Feb–Aug 1473 | "5th Easter", decides to go home |
| Kallur | Mar–Aug 1473 | Diamond mines |
| Dabhol | Nov 1473 – Jan 1474 | Waiting for ship |

### 2c — Add missing key events (diamonds)

| Event | Date | Location |
|-------|------|----------|
| Mahmud Gavan: capture of Goa | 1 Feb 1472 | Bidar (news arrives) |
| Mahmud Gavan's triumphal return | 19 May 1472 | Bidar |
| Orissa generals return | 26 Jun 1472 | Bidar |
| Gavan departs for Vijayanagara | 13 Sep 1472 | Aland |
| Sultan departs for Vijayanagara | Dec 1472 | Bidar |
| Sultan + Gavan return | 15 Mar 1473 | Gulbarga |
| Easter #8 | 10 Apr 1474 | Maskat |

**Data source:** Chapter 4, pp.148–155
**Effort:** ~4h
**Status:** ⬜

---

## FIX 3 — `afanasy_calendar_pascha_islam.html` 🟡
**Problem:** Shows abstract calendar. Missing the 8 specific Easter observations that are the core of Khrustalev's dating argument.

**Add:** Two parallel Easter tracks:

| # | True Orthodox Easter | Afanasiy's observed | Location | Drift |
|---|---------------------|---------------------|----------|-------|
| 1 | 29 Mar 1467 | 29 Mar 1467 | «Каин» | 0 days |
| 2 | 17 Apr 1468 | 17 Apr 1468 | Chebokhar, Mazenderan | 0 days |
| 3 | 2 Apr 1469 | 2 Apr 1469 | Hormuz | 0 days |
| 4 | 22 Apr 1470 | 3 Apr 1470 | Bidar | −19 days |
| 5 | 14 Apr 1471 | 13 Mar 1471 | Bidar | −32 days |
| 6 | 29 Mar 1472 | 1 May 1472 | Bidar | +33 days |
| 7 | 18 Apr 1473 | early Mar 1473 | Gulbarga | ~−45 days |
| 8 | 10 Apr 1474 | 10 Apr 1474 | Maskat | 0 days (corrected by Christians) |

**Add annotation:** 1470 — Ramadan started 4 Mar, Great Lent started 5 Mar. One day apart. He posts about this.

**Visual:** Second horizontal line (dashed) for true Easter above Afanasiy's observed. Gap = drift. Color shifts green→red→green.

**Data source:** Chapter 2 §4, pp.67–82; Chapter 4 chronology
**Effort:** ~2h
**Status:** ⬜

---

## FIX 4 — `afanasy_economics_prices.html` 🟡
**Problem:** Missing precise financial data from Conclusion and Chapter 4.

**Add these data points:**

| Item | Value | Source |
|------|-------|--------|
| Horse purchase price | 100 rubles | Ф.21 |
| Horse purchase date | Dec 1468, Lar or Tarom | Chapter 4, p.148 |
| Horse sale price | 68 futuns | Ф.39 |
| Horse sale date | Christmas, 25 Dec 1469, Bidar | Chapter 4, p.149 |
| Horse owned for | exactly 1 year | Khrustalev calculation |
| Daily cost in Bidar | 2.5 altyn/day | Ф.80 |
| Annual cost in Bidar | ~27 rubles/year | 15 dengi/day × 365 |
| Conversion: 1 ruble | 200 dengi | standard XV c. |
| Conversion: 1 altyn | 6 dengi | standard XV c. |

**Data source:** Ф.21, Ф.39, Ф.80; Conclusion pp.230–231
**Effort:** ~1h
**Status:** ⬜

---

## FIX 5 — `afanasy_manuscripts.html` 🟡
**Problem:** Missing quantitative proof from Chapter 3 about manuscript leaf size.

**Add these facts:**

| Fact | Value | Source |
|------|-------|--------|
| Etterov list format | 29×19 cm, ~850 chars/page | Chapter 3, p.141 |
| Trinity list format | 20×13 cm, ~700 chars/page | Chapter 3, p.141 |
| Proto-source leaf size | ~580 chars/page | Calculated from two gaps |
| Two identical gaps | ~1160 chars each | Ф.11–14 and Ф.41–44 |
| Gap conclusion | Each gap = 1 lost leaf | Chapter 3, p.141 |
| Total text size | ~36,500 chars | Chapter 3, p.142 |
| Total pages | 72 pages ÷ 507 chars | Chapter 3, p.142 |
| Total notebooks | exactly 9 тетради (8 pages each) | Chapter 3, p.142 |

**Add visual:** Side-by-side of the two gaps. Show the 1160-char gap in each manuscript. Prove shared proto-source.

**Data source:** Chapter 3 final section, pp.141–143
**Effort:** ~2h
**Status:** ⬜

---

## FIX 6 — `afanasy_emotional_arc.html` 🟡
**Problem:** Missing the 1471–1472 silence zone and pronoun analysis.

**Add:**
1. **Gap zone (Mar 1471 – May 1472):** Grey "unknown" zone — no writings survived. 13+ months of silence. Khrustalev: either not written or lost. Mark as flat/dashed.

2. **Pronoun overlay (secondary axis):** From Conclusion pp.227–229:
   - Tver → Nizhny: «яз» (alone)
   - Nizhny → Derbent: «есмя» (with group)
   - Derbent → Hormuz: «яз» (alone)
   - Hormuz → Bidar: «есмя» (with group — possible service contract)
   - All India years: «яз» (alone)
   - Black Sea storm: «есмя» (ship crew solidarity)
   - Kaffa arrival: «яз» (alone at the end)

**Data source:** Chapter 3, p.143; Conclusion, pp.227–229
**Effort:** ~2h
**Status:** ⬜

---

## FIX 7 — `khozheniye_composition_tree.html` 🟡
**Problem:** Doesn't show the chronological writing order of fragments (Chapter 3 main finding).

**Add toggle:** "Manuscript order" ↔ "Chronological order"

**Chronological order** from Chapter 3, p.144:
```
Ф.52–66 → 26 → 23–24 → 32–33 → 29 → 35 → 34 → 36–42 → 51 → 71–78 →
3–22 → 25–28 → 79–80 → 30–31 → 46–48 → 43–45 → 49–50 → 68–70 →
67 → 81–82 → 84 → 85–86 → 83 → 87–89 → 92–94 → 90–91 →
104 → 103 → 1 → 95–102 → 2
```

**Writing periods:**
- Persia 1468–1469: Ф.52–66 (Marshroutnik)
- India diary 1469: Ф.26, 23–24, 32–33, 29, 35, 34, 36–42, 51
- India diary 1470: Ф.71–78
- Dorozhnik draft 1470: Ф.3–22, 25–28, 79–80
- Aland + Parwat 1470–1471: Ф.30–31, 46–48, 43–45, 49–50, 68–70
- **SILENCE 1471–1472**
- War chronicle 1472–1473: Ф.67, 81–82, 84, 85–86, 83, 87–89, 92–94, 90–91
- Kaffa 1474: Ф.104, 103, 1, 95–102, 2

**Data source:** Chapter 3, p.144
**Effort:** ~3h
**Status:** ⬜

---

## FIX 8 — `three_travelers_comparison.html` 🟢
**Problem:** Missing Mahmud Gavan as 4th traveler. Book dedicates entire Chapter 5 to the comparison.

**Add Mahmud Gavan route:**
- Gilan (Qavan village, near Resht) → Cairo (c.1440, studied under Ibn Hajar) → Damascus → Dabhol (c.1446–1453) → Bidar (1453+) → military campaigns across Deccan → Goa (1472) → Vijayanagara (1472–1473) → Bidar (death 1481)

**Overlap with Afanasiy:** Both in Bidar 1469–1473. Gavan absent Oct 1469 – May 1472 (Konkan campaign). Afanasiy witnessed his return 19 May 1472.

**Why:** Chapter 5 is titled "Два пути" (Two Paths) — the entire chapter is a parallel biography. This is the book's main humanistic argument.

**Data source:** Chapter 5, pp.156–226
**Effort:** ~3h
**Status:** ⬜

---

## FIX 9 — `index.html` 🔵
**Problem:** Lists 12 visualizations. Needs to show all 25 with status badges.

**Changes:**
- Update count from 12 → 25
- Add *(в разработке)* badges to 13 planned items
- Group into 6 sections matching README
- Add "Browsing scenarios" section as collapsible
- Add search/filter by category

**Effort:** ~2h
**Status:** ⬜

---

## Concrete bugs (A-series) — found in code audit 2026-05-19

These are NOT in the data-correctness fixes above. They are real bugs in current code/links/metadata that any user can hit today. Most are 30-minute fixes.

### A1 — Broken download link in index 🟢
**File:** `index.html:241`
**Problem:** `<a href="Тетради_купца_Афанасия.md">` — file does not exist in repo. Only `tetradi_hrustalev_2026.md` (12 KB) exists.
**Fix options:** (a) rename `tetradi_hrustalev_2026.md` → `Тетради_купца_Афанасия.md`, or (b) change href to `tetradi_hrustalev_2026.md`. Option (a) preserves user-facing filename in the download dialog.
**Effort:** 5 min
**Status:** ⬜

### A2 — Visualization count contradicts itself 🟢
**Problem:** Four different counts in the same repo:
- `index.html:260` footer: "14 интерактивных визуализаций"
- `index.html` body: 12 cards rendered
- `README.md` / `index.md`: "21–25 visualizations"
- `tmp.md`: "19 визуализаций"
- Filesystem: 13 widget `.html` files
**Fix:** Pick the truth (13 = files that exist) and update all four. Defer the aspirational "25" to ROADMAP only.
**Effort:** 15 min
**Status:** ⬜

### A3 — Non-sequential card numbering 🟢
**File:** `index.html`
**Problem:** Card numbers are `1, 3, 5, 6, 7, 8, 9, 10, 11, 13, 15, 18` — skips 2, 4, 12, 14, 16, 17, 19+. Looks broken; users assume widgets are missing.
**Fix:** Renumber 1–12 sequentially, OR drop the `.card-num` badge entirely. Renumbering is safer (preserves the "category catalogue" feel).
**Effort:** 10 min
**Status:** ⬜

### A4 — Hardcoded `color: #333` defeats dark mode 🟢
**Files:** 12 widget HTML files (all except `index.html`)
**Problem:** Every widget has `body { color: #333; }` hardcoded instead of `var(--color-text-secondary)`. Dark-mode body text falls back to `#333` on dark background — readability bug.
**Fix:** Replace `color: #333` → `color: var(--color-text-secondary)` in 12 files.
**Verify:** `grep -l "color: #333" *.html` returns 12 matches.
**Effort:** 15 min
**Status:** ⬜

### A5 — Dark-mode canvas filter inverts on-canvas labels 🟡
**Files:** All widgets with `<canvas>` (map, borders, video export, three travelers)
**Problem:** `html[data-theme="dark"] canvas { filter: invert(0.88) hue-rotate(180deg) contrast(1.1) brightness(0.95); }` is applied to the rasterized canvas, which includes labels drawn ONTO the canvas (city names, region polygons, waypoint titles). They end up inverted alongside the basemap.
**Fix:** Stop CSS-filtering canvas. Instead, the canvas itself should detect `data-theme="dark"` and use a dark palette internally (e.g. `ctx.fillStyle = isDark ? '#e8e1cc' : '#1a1a1a'` for text).
**Effort:** ~2h (per canvas widget — start with `afanasy_v8_text_map.html`)
**Status:** 🟡 Partial — `css/atlas.css` no longer applies the global canvas inversion filter, and `afanasy_v8_text_map.html` now redraws the basemap/labels with a theme-aware Canvas palette. Remaining canvas widgets still need the same audit.

### A6 — Six widgets referenced but not built 🔵
**Files referenced in `README.md`, `index.md`, `ROADMAP.md`:**
- `afanasy_world_before_after.html` — pre-journey myths vs experience
- `afanasy_religious_crisis.html` — Господи/Аллах/Бог frequency
- `afanasy_social_network.html` — D3 force graph of named people
- `afanasy_historiography.html` — 1475→2026 reception timeline
- `afanasy_bestiary.html` — 12 SVG illuminated cards
- `afanasy_citations_stats.html` — citations per decade

**Fix options:** (a) build them (covered by ROADMAP Phase 3), or (b) remove from README/index.md until built. Recommend (b) for honesty until they ship.
**Effort:** 30 min for option (b); 20–40h for option (a)
**Status:** ⬜

### A7 — CDN single point of failure 🔵
**Files:** All 13 widgets
**Problem:** D3 (`cdnjs`), TopoJSON (`cdnjs`), world-atlas (`jsdelivr`), Tabler Icons (`jsdelivr`) — 4 external CDNs, no local fallback. Offline / conference / firewalled-school demo fails silently (basemap doesn't render).
**Fix:** Download libraries into `lib/`. This is Stage 4 of `GEMINI_FLASH_HANDOFF.md`.
**Effort:** ~1h
**Status:** ⬜

---

## Cross-cutting fixes 🔵

### Cross-linking
None of the 12 visualizations link to each other (except Gantt→Map via `?wp=N`).

**Add:**
- Calendar → Map: click Easter date → jump to map at that waypoint
- Manuscripts → Gantt: click text layer → highlight period in Gantt
- Economics → Map: click "Bidar" cost entry → jump to Bidar in map
- All pages: breadcrumb showing current viz name + link to atlas index

**Effort:** ~4h total across all files
**Status:** ⬜

---

## Priority Order

| Priority | Fix | Effort | Impact |
|----------|-----|--------|--------|
| 0 | A1 — Broken download link | 5 min | High — user-visible 404 |
| 0 | A2 — Reconcile viz count | 15 min | High — credibility |
| 0 | A3 — Renumber cards 1–12 | 10 min | Medium — looks broken |
| 0 | A4 — `color: #333` → CSS var | 15 min | High — dark-mode regression |
| 1 | FIX 2 — Gantt: split return + India phases | 4h | High — most viewed |
| 2 | FIX 1 — Map: 9 missing waypoints | 3h | High — entry point |
| 3 | FIX 3 — Calendar: 8 Easter markers | 2h | High — core thesis |
| 4 | FIX 4 — Economics: horse + daily cost | 1h | Medium — quick win |
| 5 | FIX 5 — Manuscripts: leaf size proof | 2h | Medium — scholarly |
| 6 | FIX 6 — Emotional arc: silence + pronouns | 2h | Medium |
| 7 | FIX 7 — Composition tree: chronological order | 3h | Medium |
| 8 | FIX 8 — Three travelers: add Gavan | 3h | High — visual |
| 9 | FIX 9 — Index: 25 items | 2h | High — navigation |
| 10 | A5 — Dark canvas labels | 2h | Medium — readability |
| 11 | A7 — Local CDN fallback | 1h | Medium — offline demo |
| 12 | A6 — Remove or build 6 phantom widgets | 30 min – 40h | Medium — honesty |
| 13 | Cross-linking | 4h | Medium |

**Total estimated effort: ~27h (was 26h; A-series adds ~4h of small fixes + 30 min of doc cleanup)**

---

*Source: Хрусталёв Д.Г. «Тетради купца Афанасия». СПб.: Нестор-История, 2026.*  
*Full text extracted to `scratch/book_text.txt` (271 pages, 928K chars)*

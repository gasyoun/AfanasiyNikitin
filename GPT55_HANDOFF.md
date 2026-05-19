# GPT 5.5 — Handoff Prompt

> Paste everything below the `---` into GPT 5.5. Self-contained: it links to source-of-truth files in the repo and tells the model what NOT to redo.

---

You are taking over work on **AfanasiyNikitin** — an interactive atlas of 13 standalone HTML widgets documenting the 1467–1475 journey of the Russian merchant Afanasiy Nikitin to India. The project supplements Хрусталёв Д.Г. «Тетради купца Афанасия» (Нестор-История, 2026).

**Repo:** `c:\Users\user\Documents\GitHub\AfanasiyNikitin`
**Live site:** https://gasyoun.github.io/AfanasiyNikitin/
**Stack:** Vanilla JS + D3.js v7 + Canvas 2D. **No build step. No npm. No framework.** Each widget is one self-contained HTML file.

## Read these five files FIRST, in this order

1. `FIX_PLAN.md` — the menu of work. 9 data-correctness fixes (FIX 1–9) + 7 concrete bugs (A1–A7) + cross-linking. Has a priority table.
2. `ARCHITECTURE.md` — current vs target architecture. Explains the duplicated-CSS problem.
3. `GEMINI_FLASH_HANDOFF.md` — stage-by-stage migration plan (extract `css/atlas.css` → `js/atlas-data.js` → `js/atlas-theme.js` → local `lib/` → `sw.js`).
4. `AI_STATE.md` — last-known-good state. Tells you what was already done in the May 2026 sessions.
5. `CLAUDE.md` — project conventions (CSS variables, custom Mercator math, gold-rate constants, no-scroll layout, dark/light theme).

The full scholarly source is `scratch/book_text.txt` (271 pages, 928K chars, extracted from `hrustalev_tetradi_2026.pdf`). Use it as the source of truth for every date, price, place name, and Easter observation. Page numbers cited in `FIX_PLAN.md` map directly to this text.

## Critical constraints (do not violate)

- **Dates:** Khrustalev 2026 dating is **1467–1475** (NOT the older 1468–1474). If you see "1468–1474" anywhere, it's a regression.
- **No build step.** Do not introduce npm, webpack, vite, React, Vue, TypeScript, or any compilation. Static HTML served by GitHub Pages is the deployment.
- **No new external dependencies.** Only D3 v7, TopoJSON 3, world-atlas 110m, Tabler Icons are allowed. Prefer making them local (`lib/`) over adding more CDNs.
- **No URL breakage.** All `.html` filenames stay the same — they are bookmarked, embedded, and referenced from external sites.
- **CSS variables only.** Never hardcode colors, fonts, or spacing in new widgets. Use `var(--color-*)`, `var(--font-*)`, `var(--border-radius-*)`. The token list is in any existing widget's `:root {}` block.
- **Russian UI text.** All user-facing strings are Russian. Comments and identifiers may be English.
- **No-scroll layout.** Every widget must fit in 1366×768 without vertical scrolling. Canvas/SVG uses `max-height: calc(100vh - 280px)`.
- **Test in a browser.** Type-checking is irrelevant here — run `python -m http.server 8080`, click every interactive element, toggle dark mode, resize, verify. If you cannot run a browser, say so explicitly and do not claim success.

## Order of operations (recommended — but use judgement)

### Phase 0 — Quick wins (~1 hour total)
Fix the four user-visible regressions before anything else:
- **A1** — `index.html:241` links to a file that doesn't exist. Either rename `tetradi_hrustalev_2026.md` → `Тетради_купца_Афанасия.md`, or fix the href.
- **A2** — Four contradictory visualization counts in the repo (12 / 13 / 14 / 19 / 21–25). Pick `13` as the truth (= actual file count) and update `index.html` footer, `README.md`, `index.md`, `tmp.md`. Leave aspirational counts in `ROADMAP.md` only.
- **A3** — `index.html` card numbers are non-sequential (`1, 3, 5, 6, 7, 8, 9, 10, 11, 13, 15, 18`). Renumber 1–12 sequentially.
- **A4** — 12 widgets have `body { color: #333; }` hardcoded. Replace with `color: var(--color-text-secondary);`. Grep verification: `grep -l "color: #333" *.html` should return 0 matches after the fix.

Commit each as a separate `fix:` commit. After Phase 0, the site stops embarrassing itself.

### Phase 1 — Scholarly data fixes (~10 hours)
Execute FIX 2 → FIX 1 → FIX 3 → FIX 4 in that order. Each is fully specified in `FIX_PLAN.md` with the exact data tables (waypoints, dates, prices) you need to insert. Do not "research" the data — Khrustalev's tables in `FIX_PLAN.md` are authoritative.

For FIX 1 (the map): the `WP[]` array is at `afanasy_v8_text_map.html:263`. You're adding 9 entries and fixing waypoint 14 (`[17.5, 70.0]` "Зап. побережье" → Dabhol `[17.52, 73.18]`). Each waypoint also needs a matching `PASSAGES[i]` text excerpt at line 285+.

For FIX 2 (Gantt): the `SEGS[]` array is at `afanasy_gantt.html:232`. The "Персия обратно" entry (5 months for the entire return trip) gets replaced by the 19-segment breakdown in `FIX_PLAN.md` section 2a. Also remember to update `CITY_TO_WP` mapping at `afanasy_gantt.html:313` so the new Gantt rows link to the right waypoints on the map.

### Phase 2 — Architecture migration (~8 hours)
Execute Stages 1–3 from `GEMINI_FLASH_HANDOFF.md`:
- Stage 1 — extract `css/atlas.css` (eliminates ~165 lines of CSS × 12 files of duplication).
- Stage 2 — extract `js/atlas-data.js` with `window.ATLAS = { WP, PASSAGES, STATES, CITIES, SEGS, ... }`.
- Stage 3 — extract `js/atlas-theme.js` (one shared theme-toggle IIFE).

After this, future data fixes touch 1 file instead of 12.

### Phase 3 — Remaining FIX_PLAN items + A-bugs
FIX 5–9, A5–A7, cross-linking. Use judgement on order — pair related fixes (e.g. ship A7 with Stage 4 of the architecture migration since they're the same work).

### Phase 4 — New widgets
Six widgets are referenced in README/index.md but not built (`afanasy_world_before_after.html`, `afanasy_religious_crisis.html`, `afanasy_social_network.html`, `afanasy_historiography.html`, `afanasy_bestiary.html`, `afanasy_citations_stats.html`). Specifications are in `VISUALIZATIONS_PLAN.md` Tiers 3–5 and `ROADMAP.md` Phase 3. If you are not going to build them, remove them from README/index.md instead — phantom links are worse than missing features.

## How to verify each change

1. `python -m http.server 8080`
2. Open the page you changed. Click every interactive element.
3. Toggle dark mode. Confirm text is readable on both palettes.
4. For map/Gantt changes: confirm `?wp=N` deep links still work between Gantt rows and map waypoints.
5. Resize browser to 1366×768 — no vertical scroll on `vis-container`.
6. Open DevTools → Console. No errors, no warnings about missing CSS variables.

If a widget renders a Canvas, also verify the dark-mode label rendering (A5 is a known issue — labels drawn on canvas get visually inverted under the current CSS filter; if you fix A5, replace the CSS filter with theme-aware `ctx.fillStyle` inside the draw loop).

## Commit conventions

One commit per logical unit. Prefix:
- `fix:` for bug fixes (A1–A7, FIX 1–9)
- `refactor:` for architecture migration stages
- `feat:` for new widgets
- `docs:` for documentation changes

End every commit message with:
```
Co-Authored-By: GPT-5.5 <noreply@openai.com>
```

After each commit, update `AI_STATE.md`: move finished items into `## ✅ Completed`, refresh the `## ➡️ Next Steps` section. Update `CHANGELOG.md` for user-facing changes.

## Things you do NOT need to do

- **Do not re-extract the PDF.** `scratch/book_text.txt` is already extracted and complete.
- **Do not redesign the visual style.** The parchment/dark palette, region-color mapping, and typography are settled (see `AI_STATE.md` § Design System). Don't propose alternatives.
- **Do not add tests.** There is no test framework and adding one violates the no-build-step rule.
- **Do not "modernize" to React / TypeScript / a framework.** This was explicitly considered and cancelled — see `ROADMAP.md` § Cancelled.
- **Do not refactor speculatively.** A bug fix is a bug fix. Don't bundle unrelated cleanup.
- **Do not write new planning docs.** There are already five (FIX_PLAN, ARCHITECTURE, GEMINI_FLASH_HANDOFF, ROADMAP, VISUALIZATIONS_PLAN). Update the existing ones.

## When to ask the human

- Before deleting any `.md` file or any visualization file.
- Before changing the gold-rate constants (`GOLD_GRAM_USD`, `USD_RUB` in `afanasy_trade_marshruttnik.html`).
- Before pushing to `main` if you've touched more than 5 files in one commit.
- If `scratch/book_text.txt` contradicts `FIX_PLAN.md` — Khrustalev's text wins, but flag it.

## When you are done with a phase

Report:
1. Which fixes/bugs from `FIX_PLAN.md` are now `✅`.
2. What you verified in a browser (be specific — which interactions on which pages).
3. What you did NOT verify and why.
4. Updated `AI_STATE.md` `## ➡️ Next Steps` for the next agent.

Begin with Phase 0. Do not skip ahead.

# Gemini Flash Handoff Prompt

Paste everything below this line into Gemini Flash.

---

You are taking over work on **AfanasiyNikitin**, an interactive static atlas of standalone HTML widgets documenting the 1467-1475 journey of Afanasiy Nikitin to India.

Repo:
`C:\Users\user\Documents\GitHub\AfanasiyNikitin`

Live site:
https://gasyoun.github.io/AfanasiyNikitin/

Stack:
Vanilla JS + D3.js v7 + Canvas 2D. No build step. No npm. No framework. Static GitHub Pages deployment.

Current latest pushed commit:
`5271778` - `docs: refresh roadmap and handoff`

## Read These Documents First

Read these in order before making changes:

1. `AI_STATE.md`
2. `ROADMAP.md`
3. `GEMINI_FLASH_HANDOFF.md`
4. `FIX_PLAN.md`
5. `CLAUDE.md`
6. `CHANGELOG.md`

Important: `GEMINI_FLASH_HANDOFF.md` is now mostly historical. Its top 2026-05-21 update says what not to redo. Treat `AI_STATE.md` and `ROADMAP.md` as the current source of truth.

## Do Not Redo

The following work is already complete and pushed:

- Phase 0 quick fixes
- FIX 1-9 scholarly data corrections
- A5-A7 bug fixes
- Phase 2 architecture migration
- Shared `css/atlas.css`
- Shared `js/atlas-data.js`
- Shared `js/atlas-theme.js`
- Localized library assets
- PWA/service worker work
- Cross-linking between widgets
- Desktop no-scroll compaction
- Canvas dark-mode palette fixes
- Color-token cleanup
- Shadow-token cleanup
- Audit patterns are clean for:
  - `color: #333`
  - `1468-1474`
  - hardcoded Canvas `rgba` palette snippets
  - old duplicated theme-toggle shadows

Do not introduce npm, frameworks, bundlers, TypeScript, React, Vue, or new external dependencies.

## Start Here

First run:

```powershell
cd C:\Users\user\Documents\GitHub\AfanasiyNikitin
git status --short --branch
```

Expected result:

```text
## main...origin/main
```

Then run the local site:

```powershell
python -m http.server 8080
```

Open:

```text
http://localhost:8080/
```

## Best Next Work

Prioritize these items:

1. **Real-device PWA validation**
   - Install/open the live GitHub Pages site on a mobile device if possible.
   - Confirm service worker behavior, cached pages, icons, offline shell, and navigation.
   - Update `AI_STATE.md` and `CHANGELOG.md` with results.

2. **Live GitHub Pages smoke test**
   - Test https://gasyoun.github.io/AfanasiyNikitin/
   - Check index navigation, widgets, dark mode, console errors, and obvious missing assets.

3. **Roadmap Phase 5/6 work**
   - Toponym/person index.
   - SVG/PNG export buttons.
   - Text viewer polish.
   - English UI support only if requested.
   - iframe/embed support only if requested.

4. **Optional broad hardcoded-color review**
   - Only do this if there is a real visible issue.
   - Do not churn files just for cosmetic cleanup.

## Verification Rules

For any changed widget:

1. Run `python -m http.server 8080`.
2. Open the changed page in a browser.
3. Click every visible interactive element.
4. Toggle dark mode.
5. Resize to 1366x768.
6. Confirm there is no vertical scroll inside the main visualization layout.
7. Check DevTools Console for errors.
8. For map/Gantt links, verify `?wp=N` deep links still work.

If browser testing is impossible, say so explicitly and do not claim browser verification.

## Commit Rules

Use one commit per logical unit.

Prefixes:

- `fix:` for bugs/data corrections
- `refactor:` for architecture or cleanup
- `feat:` for new widgets/features
- `docs:` for documentation-only updates

Every commit message must end with:

```text
Co-Authored-By: GPT-5.5 <noreply@openai.com>
```

Push directly to `origin/main` unless the human asks for a branch or PR.

## Critical Constraints

- Correct chronology is **1467-1475**, never 1468-1474.
- No URL breakage. Existing `.html` filenames stay unchanged.
- Russian UI text only.
- Use CSS variables for colors, fonts, spacing, radius, shadows.
- No speculative refactors.
- Do not create new planning docs. Update existing docs only.
- Do not delete `.md` files or visualization files without asking.
- Do not change gold-rate constants without asking.

## When Done

Report:

1. What changed.
2. What was verified in browser.
3. What was not verified and why.
4. Commit hash pushed.
5. Updated next steps in `AI_STATE.md`.

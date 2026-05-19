# VISUALIZATIONS PLAN
## Based on full analysis of Khrustalev 2026 «Тетради купца Афанасия»

> Data source: `hrustalev_tetradi_2026.pdf` (273 pages, extracted to `scratch/book_text.txt`)  
> Status legend: ✅ Exists · 🔵 New, all data available · 🟡 New, needs supplemental data

---

## TIER 1 — Core Thesis of the Book

These visualize Khrustalev's primary scholarly arguments. No other project has this data.

### 1. 🔵 `afanasy_pascha_chronograph.html`
**Пасхальный хронограф — дрейф календаря**

Khrustalev reconstructs 8 Easters with exact dates and locations:

| # | Name | Date | Location | Notes |
|---|------|------|----------|-------|
| 1 | «первая» | 29 Mar 1467 | «Каин» (Kalyzin?) | Correct |
| 2 | «вторая» | 17 Apr 1468 | Chebokhar, Mazenderan | Correct |
| 3 | «первая»/«третья» | 2 Apr 1469 | Hormuz | Counter reset |
| 4 | «четвёртая» | 3 Apr 1470 | Bidar | Off by 19 days |
| 5 | — | 13 Mar 1471 | Bidar | Calculated from Urazan |
| 6 | — | 1 May 1472 | Bidar | Off by 33 days |
| 7 | «пятая» | early Mar 1473 | Gulbarga | Drifted to Muslim calendar |
| 8 | «шестая» | 10 Apr 1474 | Maskat | Correct (Christians present) |

**Visualization:** Horizontal timeline 1467–1474. Two parallel tracks: Orthodox Paschal table (true dates) vs. Afanasiy's actual celebrations (observed dates). Gap between tracks grows as he loses the calendar. Color shifts from green (accurate) to red (drift). Islamic Ramadan/Bayram bars shown below. Clicking each Easter shows the text quote.

**Why unique:** This is the mathematical proof of Khrustalev's 1467–1475 dating (vs. previous 1468–1474). Core argument of Chapter 2 §4 and Chapter 4.

---

### 2. 🔵 `afanasy_manuscript_layers.html`
**Состав рукописи — 9 тетрадей**

Khrustalev identifies 7 text types across 104 numbered fragments (Ф.1–Ф.104):

| Layer | Fragments | Written | Purpose |
|-------|-----------|---------|---------|
| «Дорожник» начало | Ф.3–15, 16–22, 25, 27–28 | Bidar 1470 | Public road narrative |
| «Дорожник» конец | Ф.95–102 | Kaffa Nov 1474 | Public road narrative |
| «Маршрутник» | Ф.52–66 | Persia 1468–1469 | Trade guide, South Seas |
| «Индийские веры» | Ф.41–47 | Bidar 1470–1471 | Ethnography + Parwat |
| «Летопись войн» | Ф.81–82, 84, 87–89, 92–94 | 1472–1473 | Bahmani war chronicle |
| Дневники | Ф.23–24, 26, 32–33, 37–40, 48–51, 67–80, 90–91 | Various | Personal dated diary |
| Молитвы / заметки | Ф.1–2, 103–104 | Kaffa 1474 | Prayers, multilingual |

**Visualization:** Horizontal swimlane diagram. Each fragment = a colored block, sized by character count (~500 chars/page). Lanes by layer type. Vertical axis = chronological order of writing (not manuscript order). Toggle between "manuscript order" and "chronological order" to show the shuffling. Click fragment to see text excerpt.

---

### 3. 🔵 `afanasy_calendar_drift.html`
**Мусульманский и православный календарь 1467–1475**

Full dual-calendar overlay for the journey years. Data from Chapter 2 §4, Chapter 4.

Key dated events to show:
- All 8 Easters (Orthodox true + Afanasiy's observed)
- All Ramadans + Urazan-Bayrams + Kurban-Bayrams
- Afanasiy's explicit date references in text (Transfiguration, Assumption, Intercession, Philip's fast, etc.)
- The 1470 overlap: Ramadan (4 Mar) nearly coincides with Great Lent (5 Mar)
- The 1473 confusion: Afanasiy uses Urazan-Bayram (1 Mar) to calculate his "fifth Easter"

**Visualization:** Year-by-year grid (8 rows = 8 years). Each row shows 12 months. Orthodox feasts marked above, Islamic feasts below. Afanasiy's actual celebrations highlighted. Where he was on each feast shown as tooltip.

---

## TIER 2 — Journey & Geography

### 4. ✅ `afanasy_v8_text_map.html` — UPDATE NEEDED
Current map exists but uses approximate dates. Replace waypoint dates with Chapter 4 precise table (~60 events).

**New data to add from Chapter 4:**
- Exact dates for all 60+ waypoints (1467–1475)
- Duration at each location
- Sea voyage durations (10 days Hormuz→Maskat, 6 weeks Hormuz→Chaul, etc.)
- The "Ethiopia" (Somalia) detour on the return voyage

---

### 5. 🔵 `afanasy_journey_pronouns.html`
**«Яз» и «мы» — одиночество в пути**

Khrustalev (Conclusion) analyzes Afanasiy's use of singular vs. plural pronouns. Pattern:

| Segment | Pronoun | Meaning |
|---------|---------|---------|
| Tver → Nizhny Novgorod | «яз» (I) | Traveling alone |
| Nizhny Novgorod → Derbent | «есмя» (we) | With Shirvan embassy |
| Derbent → Baku | «яз» (I) | Dispersed, alone again |
| Baku → Hormuz | «яз» (I) | Alone through Persia |
| Hormuz → Bidar | «есмя» (we) | With recruited group (service contract?) |
| Bidar → Kaffa (India years) | «яз» (I) | Alone |
| Black Sea storm | «есмя» (we) | Ship crew solidarity |
| Kaffa arrival | «яз» (I) | Alone at the end |

**Visualization:** Route map where line color/thickness shows pronoun: blue=alone, orange=with group. Click segment to see actual text quote. Khrustalev's hypothesis: the Hormuz→Bidar "we" = he was recruited into Mahmud Gavan's service pool.

---

### 6. 🔵 `afanasy_sea_voyages.html`
**Морские переходы — скорость и навигация**

All sea legs with precise durations from the text:

| Leg | Duration | Distance (km) | Speed (km/day) |
|-----|----------|----------------|----------------|
| Hormuz → Maskat | 10 days | ~480 | 48 |
| Maskat → «Dega» (Diu) | 4 days | ~520 | 130 |
| Hormuz → Chaul | 6 weeks (42 days) | ~2200 | 52 |
| Dabhol → «Ethiopia» (Somalia) | 1 month, open sea | ~2400 | 80 |
| «Ethiopia» → Maskat | 12 days | ~900 | 75 |
| Maskat → Hormuz | 9 days | ~480 | 53 |
| Trabzon → Kaffa (with storm) | ~11 days | ~900 | 82 |

**Visualization:** Animated map of Indian Ocean. Play button advances time. Ships move along routes. Monsoon wind direction shown as animated arrows (seasonal). Speed comparison with modern vessels. Note: the 1469 outbound voyage was "with the monsoon" (April departure, correct timing); the 1474 return was against Ramadan timing.

---

### 7. 🔵 `afanasy_india_geography.html`
**Индия в «Хожении» — что он видел и что пропустил**

Afanasiy's India vs. the actual geography of 1469–1474:
- Places he mentions: Chaul, Junnar, Bidar, Aland, Kulungir, Parwat (Srisailam), Kallur (diamond mines), Gulbarga, Dabhol
- Places he explicitly does NOT mention: Goa (Mahmud Gavan's great conquest), Vijayanagara (enemy capital, visited by every other traveler), Delhi, Gujarat
- The diamond mines of Kallur (Kollur) — 5 months there. Why?

**Visualization:** Deccan map with two layers: "what Afanasiy saw" (his actual locations) vs. "what contemporaries described" (Abd ar-Razzaq, Nicolo Conti, Barbosa). His geographic horizon shown as a circle from Bidar.

---

## TIER 3 — People & Context

### 8. 🔵 `afanasy_gavan_parallel.html`
**Два пути: Афанасий и Махмуд Гаван**

Parallel biography visualization (Chapter 5 has full data):

**Mahmud Gavan timeline:**
- ~1411 born in Gilan (near Resht/Qavan village)
- ~1440 Cairo: studied under Ibn Hajar al-Asqalani
- ~1446–1453 arrived in Dabhol, India
- 1455 first military command (vs. Sikandar-khan)
- 1458 promoted to vakil under Humayun
- 1461 head of regency council
- 1466 sole vakil, peak of power
- 1469–1472 Konkan campaign, conquers Goa (1 Feb 1472)
- 1471–1472 builds madrasa in Bidar
- 1472–1473 Vijayanagara campaign
- 1481 executed (court conspiracy)

**Afanasiy timeline:** (from Chapter 4 table, all 60 events)

**Overlap:** Both in Bidar 1469–1473. Mahmud Gavan absent Oct 1469–May 1472. Afanasiy witnessed his triumphal return 19 May 1472.

**Visualization:** Two parallel vertical timelines, side by side. Shared geography events connected by horizontal lines. Click person to show biography card. The 1469–1473 overlap highlighted. "Meliktuchar" mentions in text shown as pulse animation.

---

### 9. 🔵 `afanasy_people_network.html`
**Граф людей «Хожения»**

Named people Afanasiy interacts with or describes:

| Person | Role | Relationship |
|--------|------|--------------|
| Mikhail Borisovich | Tver prince | Patron at departure |
| Gennady, bishop | Tver bishop | Blessed the journey |
| Boris Zakharych Borozdin | Boyar-voevoda | Likely sponsor |
| Vasily Papin | Moscow ambassador | Missed the convoy |
| Hasan-bek | Shirvan ambassador | Traveled with to Derbent |
| Asad-khan | Junnar governor | Conflict over horse |
| «Hozayochi Mahmut» | Local official | Resolved Junnar conflict |
| Mahmud Gavan | Grand vizier | Central figure, 30+ mentions |
| Malik-khan (Nizamulmulk) | General | Orissa campaign |
| Muhammad III | Sultan | Observed at processions |
| Sheikh Alauddin Ansari | Sufi saint (tomb) | Aland fair |
| Vasily Mamyrev | Moscow secretary | Received the manuscripts |

**Visualization:** Force-directed graph. Node size = mentions in text. Edge = interaction type (helped / harmed / observed / patron). Toggle: filter by journey segment. Color: nationality/religion.

---

### 10. 🔵 `afanasy_bahmani_wars.html`
**Летопись войн Бахманидского султаната**

Afanasiy's "war chronicle" fragments (Ф.81–82, 84, 87–94) record specific dated military events. Khrustalev treats this as a separate text entirely — possibly written for intelligence purposes.

Events with dates from the book:
- 1 Feb 1472: Fall of Goa (Mahmud Gavan's 2-year Konkan campaign)
- 26 Jun 1472: Return of generals from Orissa victories  
- 13 Sep 1472: Mahmud Gavan departs from Aland for Vijayanagara
- Dec 1472: Sultan departs for Vijayanagara  
- 15 Mar 1473: Return of sultan + Mahmud Gavan from Vijayanagara

**Visualization:** Animated military map of the Deccan. Arrows show campaign directions. Timeline slider. Territories: Bahmani sultanate, Vijayanagar, Orissa. Afanasiy's location shown as a pin that moves. Show army size numbers (from text, including his "1 million" figure that Khrustalev calls disinformation).

---

## TIER 4 — Text & Language Analysis

### 11. 🔵 `afanasy_language_heatmap.html`
**Языковая карта текста — тепловая карта**

Khrustalev distinguishes passages by language as evidence of text layer:
- **Russian only** = «Дорожник» (public) or «Летопись войн»
- **Untranslated Turkic/Persian** = private diary entries
- **Translated foreign phrases** = «Дорожник» (literary device)
- **Arabic prayer fragments** = emotional/religious notes

Examples of untranslated private text from the book:
- Sexual content (Ф.48): `«В Ындѣя же какъпа чектуръ…»`
- Longing for Russia (Ф.79): `«А Русь еръ тангрыд сакласын…»`
- Commercial notation (Ф.44): `«бысты азаръ лекъ вах башет сат азаре лек»`

**Visualization:** The full text laid out as a heatmap grid (each cell = ~50 chars). Color by language: blue=Russian, orange=Turkic/Persian untranslated, yellow=translated foreign, red=Arabic prayer. Click cell to see text. Toggle: "manuscript order" vs "chronological order."

---

### 12. 🔵 `afanasy_text_reconstruction.html`
**Реконструкция порядка написания**

Khrustalev provides (Chapter 3) the exact hypothetical chronological order of fragments:
`Ф. 52–66, 26, 23–24, 32–33, 29, 35, 34, 36–42, 51, 71–78, 3–22, 25–28, 79–80, 30–31, 46–48, 43–45, 49–50, 68–70, 67, 81–82, 84, 85–86, 83, 87–89, 92–94, 90–91, 104, 103, 1, 95–102, 2`

vs. the manuscript order (Ф.1–Ф.104 sequentially).

**Visualization:** Two-column layout. Left: manuscript order. Right: chronological order. Animated transition between them (fragments fly to new positions). Each fragment colored by text layer. Shows how Mamyrev's scribes scrambled the order when copying into the chronicle.

---

## TIER 5 — Historical Context

### 13. 🔵 `afanasy_historiography.html`
**200 лет историографии «Хожения»**

Timeline of how the text was discovered, edited, and reinterpreted:

| Year | Event |
|------|-------|
| 1475 | Mamyrev copies manuscripts into chronicle |
| 1817 | Karamzin: first publication (retelling, dismissive) |
| 1821 | Stroyev: first full text («Летописная» edition) |
| 1853 | Troitsky list published in PSRL vol.6 |
| 1856–57 | Sreznevsky: first scholarly study, dates 1466–1472 |
| 1926 | Trubetskoy: first compositional analysis (ignored) |
| 1948 | First academic edition (Adrianova-Peretz, AN USSR) |
| 1958 | 2nd edition |
| 1978 | Semenov revises dates to 1468–1474 |
| 1983 | Trubetskoy rediscovered |
| 1986 | 3rd academic edition (Lurye + Semenov) |
| 1986 | Soviet film «Хождение за три моря» |
| 2024–25 | Project «Afanasiy Nikitin-550»: expedition, conferences, translations |
| 2025 | Gorodilin: argues 1467 departure |
| 2026 | Khrustalev: full reconstruction, dates 1467–1475 |

**Visualization:** Vertical scrolling timeline with illustrations. Each entry = card with what changed and why. Show the date range evolution as a horizontal bar that shifts over time: 1466–1472 → 1468–1474 → 1467–1475.

---

### 14. 🔵 `afanasy_bestiarium.html`
**Бестиарий Индии Афанасия Никитина**

Animals, plants, and goods mentioned — first descriptions of India in Russian:

From the text (various Ф.):
- Elephant («слон») — war use, ivory, described multiple times
- Buffalo («буйвол») — draft animal
- Coconut palm («кози гундустаньская») — wine source
- Sugar cane — trade good
- Cotton, indigo («лек», краска)
- Horse — Afanasiy's one horse (100 rubles, sold for 68 futuns)
- Parrot — mentioned in Marshroutnik
- Monkey («обезьяна») — sultan's procession
- Cuckoo («гугук») — bird of India
- Peacock — mentioned
- Pepper, ginger, cinnamon — only at Calicut
- Diamonds — Kallur mines (5 months)
- Rubies («яхонты») — from Orissa campaign loot

**Visualization:** 12-card grid in medieval manuscript style (illuminated borders). Each card: SVG illustration of animal/plant, first-mention quote from text, modern name, where Afanasiy encountered it. Cards revealed in journey order.

---

### 15. ✅ `afanasy_economics_prices.html` — UPDATE
Existing visualization. Add precise data from the book:
- Horse: 100 rubles (bought) → 68 futuns (sold, Christmas 1469)
- Daily living cost in Bidar: 2.5 altyn/day = 27 rubles/year
- Futun/ruble exchange rate calculations (Khrustalev p.230 footnote)

---

### 16. 🔵 `afanasy_three_manuscripts.html`
**Три рукописных традиции**

Book explains 3 manuscript traditions used:
1. **Летописная редакция** (Chronicle version) — Etterov list of Lvov Chronicle, РНБ F.IV.144, L.441–458ob, ~850 chars/page
2. **Троицкая редакция** (Trinity version) — Trinity (Ermolin) list, РГБ Ф.304/III №24, L.369–392ob, ~700 chars/page  
3. **Сухановская редакция** (late, not used by Khrustalev)

Two major gaps in Летописная vs Троицкая: ~1160 chars each = exactly 2 lost leaves. This proves the shared proto-source had ~580 chars/leaf.

**Visualization:** Two parallel manuscript views (facsimile-style layout). Scroll synchronization. Highlight differences: [square brackets] = variants, {curly} = additions. Show the two gaps as "missing leaf" animations. Explain why each gap occurred.

---

## TIER 6 — Updates to Existing Visualizations

| File | What to Update |
|------|----------------|
| `afanasy_gantt.html` | Replace all dates with Chapter 4 precise table |
| `afanasy_v8_text_map.html` | 60 dated waypoints, add return route Somalia detour |
| `afanasy_economics_prices.html` | Add horse sale data, daily cost in Bidar |
| `afanasy_calendar_pascha_islam.html` | Already exists but add Khrustalev's 8-Easter table |
| `afanasy_manuscripts.html` | Add Etterov/Trinity comparison, 580-chars-per-leaf proof |
| `afanasy_language_map_v2.html` | Add Khrustalev's public/private language distinction |
| `index.html` | Add all new visualizations to the index |

---

## Summary Table

| # | File | Tier | Data Source | Build Time Est. |
|---|------|------|-------------|-----------------|
| 1 | `afanasy_pascha_chronograph.html` | Core thesis | Ch.2 §4 + Ch.4 | 4–6h |
| 2 | `afanasy_manuscript_layers.html` | Core thesis | Ch.3 Ф.1–104 list | 6–8h |
| 3 | `afanasy_calendar_drift.html` | Core thesis | Ch.4 full table | 4–6h |
| 4 | `afanasy_v8_text_map.html` (update) | Journey | Ch.4 | 2–3h |
| 5 | `afanasy_journey_pronouns.html` | Journey | Conclusion | 3–4h |
| 6 | `afanasy_sea_voyages.html` | Journey | Ch.4 + Ф.15,97,99 | 4–5h |
| 7 | `afanasy_india_geography.html` | Journey | Ch.5 + Marshroutnik | 4–5h |
| 8 | `afanasy_gavan_parallel.html` | People | Ch.5 full | 5–7h |
| 9 | `afanasy_people_network.html` | People | All chapters | 4–5h |
| 10 | `afanasy_bahmani_wars.html` | People | Ф.81–94 + Ch.5 | 5–6h |
| 11 | `afanasy_language_heatmap.html` | Text | Ch.3 analysis | 6–8h |
| 12 | `afanasy_text_reconstruction.html` | Text | Ch.3 Ф-order | 5–6h |
| 13 | `afanasy_historiography.html` | Context | Preface + Ch.2 §1 | 3–4h |
| 14 | `afanasy_bestiarium.html` | Context | Full text scan | 4–5h |
| 15 | `afanasy_economics_prices.html` (update) | Context | Ch.4 + Conclusion | 1–2h |
| 16 | `afanasy_three_manuscripts.html` | Text | Ch.3 final section | 4–5h |

**Total new visualizations: 13 new + 3 updates = 16 items**

---

## Recommended Build Order

**Phase 1** (core thesis, highest scholarly value):
1, 2, 3

**Phase 2** (most visually impressive):
8 (Gavan parallel), 10 (Bahmani wars), 6 (sea voyages)

**Phase 3** (text analysis, complex):
11, 12, 5 (pronouns)

**Phase 4** (context + index):
13, 14, 9, 7, 16

**Phase 5** (updates to existing):
4, 15 + index.html

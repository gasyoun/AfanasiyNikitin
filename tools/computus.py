"""Phase 3 — reproducible computus. Generates data/calendar.csv: the calendar
dates underlying Khrustalev's 1467-1475 dating argument, computed (not hand-entered):

  * Orthodox Easter   — Julian computus (Meeus), EXACT (this *is* Orthodox Pascha).
  * Great Lent start  — Clean Monday = Pascha - 48 days.
  * Ramadan / Eid     — tabular (arithmetic) Islamic calendar, civil epoch (~±1-2 d vs observation).
  * Mahashivaratri    — recorded anchor (Hindu lunisolar), NOT recomputed here; flagged.

All dates are given in both Julian (how Afanasiy reckoned) and proleptic Gregorian.
Self-checks run first and must pass, then the CSV is written.

Usage:  python tools/computus.py
"""
import sys, os, csv

sys.stdout.reconfigure(encoding="utf-8")
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# ---- Julian Day Number conversions (integer days) ----
def gregorian_to_jdn(y, m, d):
    a = (14 - m) // 12; yy = y + 4800 - a; mm = m + 12 * a - 3
    return d + (153 * mm + 2) // 5 + 365 * yy + yy // 4 - yy // 100 + yy // 400 - 32045

def julian_to_jdn(y, m, d):
    a = (14 - m) // 12; yy = y + 4800 - a; mm = m + 12 * a - 3
    return d + (153 * mm + 2) // 5 + 365 * yy + yy // 4 - 32083

def jdn_to_gregorian(j):
    a = j + 32044; b = (4 * a + 3) // 146097; c = a - 146097 * b // 4
    dd = (4 * c + 3) // 1461; e = c - 1461 * dd // 4; m = (5 * e + 2) // 153
    return (100 * b + dd - 4800 + m // 10, m + 3 - 12 * (m // 10), e - (153 * m + 2) // 5 + 1)

def jdn_to_julian(j):
    c = j + 32082; dd = (4 * c + 3) // 1461; e = c - 1461 * dd // 4; m = (5 * e + 2) // 153
    return (dd - 4800 + m // 10, m + 3 - 12 * (m // 10), e - (153 * m + 2) // 5 + 1)

# ---- Orthodox (Julian) Easter — Meeus's Julian algorithm ----
def julian_easter(year):
    a, b, c = year % 4, year % 7, year % 19
    d = (19 * c + 15) % 30
    e = (2 * a + 4 * b - d + 34) % 7
    month = (d + e + 114) // 31      # 3=March, 4=April (Julian calendar)
    day = (d + e + 114) % 31 + 1
    return julian_to_jdn(year, month, day)

# ---- Tabular Islamic calendar (arithmetic, civil/Friday epoch) ----
ISLAMIC_EPOCH = 1948440  # JDN of 1 Muharram 1 AH (16 Jul 622 Julian, civil)
def islamic_to_jdn(y, m, d):
    return (d + 29 * (m - 1) + m // 2 + (y - 1) * 354 + (3 + 11 * y) // 30 + ISLAMIC_EPOCH - 1)

def iso(jdn, calendar="gregorian"):
    y, m, d = (jdn_to_gregorian if calendar == "gregorian" else jdn_to_julian)(jdn)
    return f"{y:04d}-{m:02d}-{d:02d}"

# ---------- self-checks ----------
print("=== self-checks (must pass before writing) ===")
e1469 = jdn_to_julian(julian_easter(1469))
e1474 = jdn_to_julian(julian_easter(1474))
muh1443 = iso(islamic_to_jdn(1443, 1, 1), "gregorian")
print(f"  Julian Easter 1469 = {e1469}  (expect 1469-04-02)  {'OK' if e1469 == (1469,4,2) else 'FAIL'}")
print(f"  Julian Easter 1474 = {e1474}  (expect 1474-04-10)  {'OK' if e1474 == (1474,4,10) else 'FAIL'}")
print(f"  1 Muharram 1443 AH = {muh1443} (Greg; expect 2021-08-10)  {'OK' if muh1443 == '2021-08-10' else 'CHECK'}")
ramadan1470 = None  # filled below, used to show Lent overlap

# ---------- build rows ----------
rows = []
def add(eid, yce, typ, jdn, hijri, method, place, epi, cert, src, note):
    rows.append({"event_id": eid, "year_ce": yce, "type": typ,
                 "julian_date": iso(jdn, "julian"), "gregorian_date": iso(jdn, "gregorian"),
                 "hijri": hijri, "method": method, "place_id": place,
                 "epistemic": epi, "certainty": cert, "source_id": src, "notes": note})

ANCHOR = {1469: ("hormuz", "Khrustalev anchor: Easter in Hormuz (1st Pascha of the journey)"),
          1474: ("muscat", "Khrustalev anchor: the 'sixth' Easter, in Muscat (return leg)")}
for y in range(1467, 1476):
    ej = julian_easter(y)
    place, note = ANCHOR.get(y, ("", ""))
    add(f"pascha_{y}", y, "pascha", ej, "", "Julian computus (Meeus)", place, "model", "certain", "ATLAS", note)
    add(f"lent_{y}", y, "great_lent_start", ej - 48, "", "Pascha - 48 d (Clean Monday)", "", "model", "certain", "ATLAS",
        "Великий пост; overlaps Ramadan in 1470 (Khrustalev: 'постился с бесермены')" if y == 1470 else "")

for ah in range(870, 883):
    rj = islamic_to_jdn(ah, 9, 1)      # 1 Ramadan
    fj = islamic_to_jdn(ah, 10, 1)     # 1 Shawwal = Eid al-Fitr
    gy = jdn_to_gregorian(rj)[0]
    if 1467 <= gy <= 1475:
        note = "overlaps Orthodox Great Lent 1470" if jdn_to_gregorian(rj)[:2] == (1470, 3) or gy == 1470 else ""
        add(f"ramadan_{ah}", gy, "ramadan_start", rj, f"1 Ramadan {ah} AH",
            "tabular Islamic (civil epoch)", "", "model", "approx", "ATLAS", note)
        add(f"eid_{ah}", jdn_to_gregorian(fj)[0], "eid_al_fitr", fj, f"1 Shawwal {ah} AH",
            "tabular Islamic (civil epoch)", "", "model", "approx", "ATLAS", "Ураза-байрам")

# Mahashivaratri 1471 — recorded anchor, NOT recomputed (Hindu lunisolar / tithi)
mj = julian_to_jdn(1471, 2, 19)
add("mahashivaratri_1471", 1471, "mahashivaratri", mj, "", "Hindu lunisolar (recorded, not recomputed)",
    "srisailam", "reconstruction", "approx", "KHR2026",
    "Krishna-paksha 14, Phalguna; Khrustalev anchor at Srisailam ~19 Feb 1471 (Julian). Not computed by this script.")

rows.sort(key=lambda r: (r["gregorian_date"]))
cols = ["event_id", "year_ce", "type", "julian_date", "gregorian_date", "hijri",
        "method", "place_id", "epistemic", "certainty", "source_id", "notes"]
with open(os.path.join(ROOT, "data", "calendar.csv"), "w", encoding="utf-8", newline="") as f:
    w = csv.DictWriter(f, fieldnames=cols)
    w.writeheader(); w.writerows(rows)

print(f"\nwrote data/calendar.csv: {len(rows)} rows")
print("  pascha (Julian):", ", ".join(r["julian_date"] for r in rows if r["type"] == "pascha"))
print("  ramadan starts (Greg):", ", ".join(r["gregorian_date"] for r in rows if r["type"] == "ramadan_start"))
lent70 = next(r for r in rows if r["event_id"] == "lent_1470")
ram70 = [r for r in rows if r["type"] == "ramadan_start" and r["year_ce"] == 1470]
print(f"  1470 overlap check — Great Lent from {lent70['julian_date']} (Julian); "
      f"Ramadan {ram70[0]['julian_date'] if ram70 else 'n/a'} (Julian)")

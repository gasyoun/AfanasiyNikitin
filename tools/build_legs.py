"""Generate data/legs.csv — the 28 consecutive legs of the itinerary with
great-circle (straight-line) distances, consistent with the methodology in
afanasy_geolocations.md ("по прямым отрезкам между точками").

Distances are a MODEL (straight-line, not actual road/sea route length);
`mode` is a heuristic from the destination's sea_region. Reads data/places.csv
+ data/itinerary.csv; writes data/legs.csv.
"""
import sys, os, csv, math

sys.stdout.reconfigure(encoding="utf-8")
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def read(name):
    with open(os.path.join(ROOT, "data", name), encoding="utf-8") as f:
        return list(csv.DictReader(f))


def haversine(a, b):
    R = 6371.0
    la1, lo1, la2, lo2 = map(math.radians, [a[0], a[1], b[0], b[1]])
    h = math.sin((la2 - la1) / 2) ** 2 + math.cos(la1) * math.cos(la2) * math.sin((lo2 - lo1) / 2) ** 2
    return 2 * R * math.asin(math.sqrt(h))


def mode_of(sea_region):
    s = sea_region or ""
    if "море" in s:
        return "sea"
    if "Путь по Руси" in s:
        return "river"
    return "land"


places = {p["place_id"]: p for p in read("places.csv")}
itin = sorted(read("itinerary.csv"), key=lambda r: int(r["seq"]))

rows, cum = [], 0.0
for i in range(len(itin) - 1):
    a, b = itin[i], itin[i + 1]
    pa, pb = places[a["place_id"]], places[b["place_id"]]
    km = haversine((float(pa["lat"]), float(pa["lon"])), (float(pb["lat"]), float(pb["lon"])))
    cum += km
    rows.append({
        "leg_id": f"{a['seq']}-{b['seq']}",
        "from_seq": a["seq"], "to_seq": b["seq"],
        "from_place_id": a["place_id"], "to_place_id": b["place_id"],
        "km": round(km, 1), "cumulative_km": round(cum, 1),
        "sea_region": b["sea_region"], "mode": mode_of(b["sea_region"]),
        "epistemic": "model", "source_id": "KHR2026",
        "note": "Прямой отрезок (great-circle); mode — эвристика по sea_region.",
    })

cols = ["leg_id", "from_seq", "to_seq", "from_place_id", "to_place_id", "km",
        "cumulative_km", "sea_region", "mode", "epistemic", "source_id", "note"]
with open(os.path.join(ROOT, "data", "legs.csv"), "w", encoding="utf-8", newline="") as f:
    w = csv.DictWriter(f, fieldnames=cols)
    w.writeheader(); w.writerows(rows)

from collections import Counter
print(f"wrote data/legs.csv: {len(rows)} legs, total {cum:.0f} km straight-line")
print("by mode:", dict(Counter(r["mode"] for r in rows)))

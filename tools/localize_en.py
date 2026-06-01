"""Add an English `name_en` column to places.csv and people.csv, using the
canonical English label from the matched Wikidata item where available, with
sensible fallbacks otherwise. Idempotent. Network (Wikidata labels).

Usage:  python tools/localize_en.py [--dry-run]
"""
import sys, os, csv, json, time, urllib.parse, urllib.request, urllib.error

sys.stdout.reconfigure(encoding="utf-8")
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
API = "https://www.wikidata.org/w/api.php"
UA = {"User-Agent": "AfanasiyNikitinAtlas/0.1 (https://github.com/gasyoun/AfanasiyNikitin; localize)"}
DRY = "--dry-run" in sys.argv

# English names for places/people without a Wikidata QID
PLACE_FALLBACK = {
    "mazandaran_sari": "Mazandaran (Sari)", "somalia_coast": "Somali coast",
    "balaklava_gurzuf": "Balaklava / Gurzuf", "kallur": "Kallur (near Raichur)",
}


def api(params):
    params = dict(params); params["format"] = "json"
    req = urllib.request.Request(API + "?" + urllib.parse.urlencode(params), headers=UA)
    for attempt in range(6):
        try:
            with urllib.request.urlopen(req, timeout=30) as r:
                return json.load(r)
        except urllib.error.HTTPError as e:
            if e.code == 429:
                time.sleep(int(e.headers.get("Retry-After", 0)) or 12 * (attempt + 1)); continue
            if attempt == 5:
                raise
            time.sleep(3)
        except Exception:
            if attempt == 5:
                raise
            time.sleep(3)
    return {}


def en_labels(qids):
    out = {}
    qids = sorted({q for q in qids if q})
    for i in range(0, len(qids), 50):
        d = api({"action": "wbgetentities", "ids": "|".join(qids[i:i + 50]),
                 "props": "labels", "languages": "en"})
        for q, e in d.get("entities", {}).items():
            lab = e.get("labels", {}).get("en", {}).get("value")
            if lab:
                out[q] = lab
        time.sleep(0.3)
    return out


def read(name):
    with open(os.path.join(ROOT, "data", name), encoding="utf-8") as f:
        rows = list(csv.DictReader(f))
    return rows, list(rows[0].keys())


def write(name, rows, fields):
    if DRY:
        return
    with open(os.path.join(ROOT, "data", name), "w", encoding="utf-8", newline="") as f:
        w = csv.DictWriter(f, fieldnames=fields); w.writeheader(); w.writerows(rows)


def insert_after(fields, after, col):
    if col in fields:
        return fields
    f = list(fields); f.insert(f.index(after) + 1, col); return f


places, pf = read("places.csv")
people, pef = read("people.csv")
labels = en_labels([r["wikidata_qid"] for r in places] + [r["wikidata_qid"] for r in people])

n = 0
for r in places:
    en = labels.get(r["wikidata_qid"]) or PLACE_FALLBACK.get(r["place_id"], "")
    r["name_en"] = en
    n += bool(en)
for r in people:
    r["name_en"] = labels.get(r["wikidata_qid"]) or r.get("name_translit", "")
    n += bool(r["name_en"])

pf = insert_after(pf, "name_ru", "name_en")
pef = insert_after(pef, "name_translit", "name_en")
write("places.csv", places, pf)
write("people.csv", people, pef)

miss_p = [r["place_id"] for r in places if not r["name_en"]]
print(f"name_en set on {n} rows" + (" (dry-run)" if DRY else ""))
print("places without name_en:", miss_p or "none")
print("sample:", [(r["place_id"], r["name_en"]) for r in places[:6]])

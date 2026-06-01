"""Validate data/places.lpf.geojson against the structural requirements the World
Historical Gazetteer checks on upload (Linked Places Format). Dependency-free.

Checks: FeatureCollection + @context; per feature @id (unique), type=Feature,
properties.title, valid Point geometry (lon/lat order & range), names/types/when/links
shapes. Reports problems; exits non-zero if any.

Usage:  python tools/validate_lpf.py
"""
import sys, os, json

sys.stdout.reconfigure(encoding="utf-8")
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PATH = os.path.join(ROOT, "data", "places.lpf.geojson")

errors, warnings = [], []
d = json.load(open(PATH, encoding="utf-8"))

if d.get("type") != "FeatureCollection":
    errors.append("top-level type must be FeatureCollection")
if not d.get("@context"):
    errors.append("missing @context (LPF JSON-LD context)")
feats = d.get("features", [])
if not isinstance(feats, list) or not feats:
    errors.append("features must be a non-empty array")

ids = set()
n_geom = n_links = n_when = n_names = 0
for i, f in enumerate(feats):
    tag = f.get("@id") or f"#{i}"
    if f.get("type") != "Feature":
        errors.append(f"{tag}: type must be 'Feature'")
    fid = f.get("@id")
    if not fid:
        errors.append(f"{tag}: missing @id")
    elif fid in ids:
        errors.append(f"{tag}: duplicate @id")
    else:
        ids.add(fid)
    title = (f.get("properties") or {}).get("title")
    if not title:
        errors.append(f"{tag}: missing properties.title (required by WHG)")
    g = f.get("geometry")
    if g:
        n_geom += 1
        if g.get("type") != "Point":
            warnings.append(f"{tag}: geometry type {g.get('type')} (expected Point)")
        else:
            c = g.get("coordinates", [])
            if not (isinstance(c, list) and len(c) == 2 and -180 <= c[0] <= 180 and -90 <= c[1] <= 90):
                errors.append(f"{tag}: bad coordinates {c} (must be [lon,lat], lon<=180, lat<=90)")
    names = f.get("names", [])
    if names:
        n_names += 1
        for nm in names:
            if "toponym" not in nm:
                errors.append(f"{tag}: a name entry lacks 'toponym'")
    if not g and not names:
        errors.append(f"{tag}: needs geometry or names")
    links = f.get("links", [])
    if links:
        n_links += 1
        for ln in links:
            if "type" not in ln or "identifier" not in ln:
                errors.append(f"{tag}: link needs 'type' and 'identifier'")
    w = f.get("when")
    if w:
        n_when += 1
        if "timespans" not in w:
            warnings.append(f"{tag}: when without timespans")

print(f"features: {len(feats)}")
print(f"  with geometry: {n_geom}  with names: {n_names}  with links: {n_links}  with when: {n_when}")
print(f"  unique @id: {len(ids)}")
if warnings:
    print("\nWARNINGS:")
    [print("  -", w) for w in warnings]
print("\n" + ("VALID — WHG-ready ✓" if not errors else "INVALID:"))
[print("  -", e) for e in errors]
sys.exit(1 if errors else 0)

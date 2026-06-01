"""One command to regenerate every derived data file from the canonical CSVs,
then validate. (Network reconciliation, tools/reconcile.py, is intentionally NOT
run here — it is a separate, slow, online step; its results are already committed.)

Usage:  python tools/build_all.py
"""
import subprocess, sys, os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
STEPS = [
    "tools/computus.py",      # -> data/calendar.csv
    "tools/build_legs.py",    # -> data/legs.csv
    "tools/build_lpf.py",     # -> data/places.lpf.geojson
    "tools/build_route.py",   # -> data/route.geojson, data/itinerary.lt.json
    "tools/build_rdf.py",     # -> data/atlas.ttl
    "tools/validate_data.py",  # gate
    "tools/validate_lpf.py",   # gate
]

for step in STEPS:
    print(f"\n========== {step} ==========")
    r = subprocess.run([sys.executable, os.path.join(ROOT, step)], cwd=ROOT)
    if r.returncode != 0:
        print(f"\nFAILED at {step} (exit {r.returncode})")
        sys.exit(r.returncode)

print("\nOK — all derived files regenerated and validated.")

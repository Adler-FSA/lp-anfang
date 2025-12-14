#!/usr/bin/env python3
# Aggregiert vorhandene Monatsreports (pages/trend/data/YYYY-MM.json) zu Halbjahr/Jahr
# und erzeugt Manifeste für Dashboard/Startseite.
#
# Keine externen Dependencies.

import json
import os
import re
from glob import glob
from datetime import datetime

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
DATA_DIR = os.path.join(ROOT, "pages", "trend", "data")
PERIOD_DIR = os.path.join(DATA_DIR, "periods")

MONTH_RE = re.compile(r"^(\d{4})-(\d{2})\.json$")

def load_json(path: str):
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)

def save_json(path: str, obj):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        json.dump(obj, f, ensure_ascii=False, indent=2)

def safe_int(x, default=0):
    try:
        return int(x)
    except Exception:
        return default

def safe_float(x, default=0.0):
    try:
        return float(x)
    except Exception:
        return default

def half_of_month(m: int) -> str:
    return "H1" if 1 <= m <= 6 else "H2"

def topic_key_order(topics):
    # Stabil: absteigend nach count, dann key
    return sorted(topics.items(), key=lambda kv: (-kv[1], kv[0]))

def aggregate_reports(reports, year: int, period_label: str, months_in_period):
    """
    reports: list of monthly json objects
    """
    # Summen
    items_total = 0
    sent_sum = 0.0
    sent_n = 0

    # topics: key -> {label_de,label_en,count}
    topics_map = {}

    # sources_used: name -> {category, items_sum}
    sources_map = {}

    # narratives: sammeln (top 5 unique)
    narrative_de = []
    narrative_en = []

    for r in reports:
        items_total += safe_int(r.get("items_total", 0), 0)

        s = r.get("sentiment", {})
        sent_sum += safe_float(s.get("sum", 0.0), 0.0)
        sent_n += safe_int(s.get("n", 0), 0)

        # topics
        for t in r.get("topics", []):
            key = str(t.get("key", "")).strip()
            if not key:
                continue
            if key not in topics_map:
                topics_map[key] = {
                    "key": key,
                    "label_de": t.get("label_de", key),
                    "label_en": t.get("label_en", key),
                    "count": 0
                }
            topics_map[key]["count"] += safe_int(t.get("count", 0), 0)

        # sources
        for s in r.get("sources_used", []):
            name = str(s.get("name", "")).strip()
            if not name:
                continue
            if name not in sources_map:
                sources_map[name] = {
                    "name": name,
                    "category": s.get("category", ""),
                    "items": 0
                }
            sources_map[name]["items"] += safe_int(s.get("items", 0), 0)

        # narratives (nur wenn vorhanden, kurz & eindeutig)
        for line in r.get("narrative_de", []) or []:
            line = str(line).strip()
            if line and line not in narrative_de:
                narrative_de.append(line)
        for line in r.get("narrative_en", []) or []:
            line = str(line).strip()
            if line and line not in narrative_en:
                narrative_en.append(line)

    # sentiment avg
    sent_avg = (sent_sum / sent_n) if sent_n > 0 else 0.0

    # top topic
    top_topic_key = None
    if topics_map:
        top_topic_key = sorted(topics_map.values(), key=lambda x: (-x["count"], x["key"]))[0]["key"]

    top_topic_de = topics_map[top_topic_key]["label_de"] if top_topic_key and top_topic_key in topics_map else ""
    top_topic_en = topics_map[top_topic_key]["label_en"] if top_topic_key and top_topic_key in topics_map else ""

    # sort topics list
    topics_list = sorted(topics_map.values(), key=lambda x: (-x["count"], x["key"]))

    # sort sources list
    sources_list = sorted(sources_map.values(), key=lambda x: (-x["items"], x["name"]))

    # narrative: begrenzen
    narrative_de = narrative_de[:5]
    narrative_en = narrative_en[:5]

    now_utc = datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S (UTC)")

    out = {
        "version": 1,
        "scope": "period",
        "year": year,
        "period": period_label,            # "H1", "H2" oder "YEAR"
        "months": months_in_period,        # z.B. ["2025-01",...]
        "generated_at": now_utc,
        "items_total": items_total,
        "sentiment": {
            "sum": round(sent_sum, 4),
            "n": sent_n,
            "avg": round(sent_avg, 4)
        },
        "topics": topics_list,
        "top_topic": {
            "key": top_topic_key or "",
            "label_de": top_topic_de,
            "label_en": top_topic_en
        },
        "narrative_de": narrative_de,
        "narrative_en": narrative_en,
        "sources_used": sources_list,
        "note_de": "Aggregat aus Monatsreports (Online-Signal-Barometer). Nicht repräsentativ, keine Volksumfrage.",
        "note_en": "Aggregate from monthly reports (online-signal barometer). Not representative, not a public opinion poll."
    }
    return out

def main():
    os.makedirs(PERIOD_DIR, exist_ok=True)

    # alle monatlichen JSONs finden (YYYY-MM.json), NICHT manifest.json, NICHT periods/*
    month_files = []
    for p in glob(os.path.join(DATA_DIR, "*.json")):
        base = os.path.basename(p)
        if base in ("manifest.json", "manifest_periods.json"):
            continue
        if MONTH_RE.match(base):
            month_files.append(p)

    month_files = sorted(month_files)  # chronologisch
    if not month_files:
        # trotzdem leere manifests erzeugen, damit UI nicht 404t
        save_json(os.path.join(DATA_DIR, "manifest.json"), {
            "version": 1,
            "generated_at": datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S (UTC)"),
            "months": [],
            "years": []
        })
        save_json(os.path.join(DATA_DIR, "manifest_periods.json"), {
            "version": 1,
            "generated_at": datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S (UTC)"),
            "years": [],
            "periods": []
        })
        print("No monthly JSON files found. Empty manifests created.")
        return

    # Monatsreports laden + Index aufbauen
    months = []           # ["2025-01", ...]
    by_year = {}          # year -> list of (ym, report)
    for p in month_files:
        base = os.path.basename(p)
        m = MONTH_RE.match(base)
        if not m:
            continue
        y = int(m.group(1))
        mo = int(m.group(2))
        ym = f"{y:04d}-{mo:02d}"
        r = load_json(p)
        months.append(ym)
        by_year.setdefault(y, []).append((ym, r))

    years = sorted(by_year.keys())

    # manifest.json (Monate/Jahre)
    save_json(os.path.join(DATA_DIR, "manifest.json"), {
        "version": 1,
        "generated_at": datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S (UTC)"),
        "months": months,
        "years": years
    })

    # Perioden erzeugen
    periods_index = []  # [{year, period, file}]
    for y in years:
        year_reports = by_year[y]

        # Halbjahre filtern
        h1 = []
        h1_months = []
        h2 = []
        h2_months = []

        for ym, r in year_reports:
            mo = int(ym.split("-")[1])
            if half_of_month(mo) == "H1":
                h1.append(r)
                h1_months.append(ym)
            else:
                h2.append(r)
                h2_months.append(ym)

        # H1
        if h1_months:
            out_h1 = aggregate_reports(h1, y, "H1", h1_months)
            file_h1 = os.path.join(PERIOD_DIR, f"{y:04d}-H1.json")
            save_json(file_h1, out_h1)
            periods_index.append({"year": y, "period": "H1", "file": f"periods/{y:04d}-H1.json"})

        # H2
        if h2_months:
            out_h2 = aggregate_reports(h2, y, "H2", h2_months)
            file_h2 = os.path.join(PERIOD_DIR, f"{y:04d}-H2.json")
            save_json(file_h2, out_h2)
            periods_index.append({"year": y, "period": "H2", "file": f"periods/{y:04d}-H2.json"})

        # YEAR (alles)
        out_y = aggregate_reports([r for _, r in year_reports], y, "YEAR", [ym for ym, _ in year_reports])
        file_y = os.path.join(PERIOD_DIR, f"{y:04d}.json")
        save_json(file_y, out_y)
        periods_index.append({"year": y, "period": "YEAR", "file": f"periods/{y:04d}.json"})

    # manifest_periods.json
    save_json(os.path.join(DATA_DIR, "manifest_periods.json"), {
        "version": 1,
        "generated_at": datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S (UTC)"),
        "years": years,
        "periods": sorted(periods_index, key=lambda x: (x["year"], x["period"]))
    })

    print(f"OK. months={len(months)} years={len(years)} periods={len(periods_index)}")

if __name__ == "__main__":
    main()

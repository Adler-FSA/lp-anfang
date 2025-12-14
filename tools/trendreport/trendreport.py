#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import os
import re
import json
import time
import math
import glob
import html
import shutil
import pathlib
import datetime as dt
from typing import Any, Dict, List, Optional, Tuple

import requests
import feedparser

ROOT = pathlib.Path(__file__).resolve().parents[2]  # repo root
TOOLS_DIR = ROOT / "tools" / "trendreport"
PAGES_DIR = ROOT / "pages" / "trend"
DATA_DIR = PAGES_DIR / "data"

SOURCES_FILE = TOOLS_DIR / "sources.json"
LEXICON_FILE = TOOLS_DIR / "lexicon_de.json"

UA = "fsa-trend-bot/1.0 (+https://adler-fsa.github.io)"
TIMEOUT = 20

# --- helpers ---------------------------------------------------------------

def ensure_dirs() -> None:
    PAGES_DIR.mkdir(parents=True, exist_ok=True)
    DATA_DIR.mkdir(parents=True, exist_ok=True)

def read_json(path: pathlib.Path) -> Dict[str, Any]:
    with path.open("r", encoding="utf-8") as f:
        return json.load(f)

def write_text(path: pathlib.Path, content: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("w", encoding="utf-8") as f:
        f.write(content)

def write_json(path: pathlib.Path, obj: Dict[str, Any]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("w", encoding="utf-8") as f:
        json.dump(obj, f, ensure_ascii=False, indent=2)

def ym_from_env_or_previous() -> Tuple[int, int, str]:
    forced = (os.environ.get("TREND_MONTH") or "").strip()
    if forced:
        m = re.match(r"^(\d{4})-(\d{2})$", forced)
        if not m:
            raise SystemExit("TREND_MONTH must be YYYY-MM")
        y = int(m.group(1))
        mo = int(m.group(2))
        return y, mo, f"{y:04d}-{mo:02d}"

    # default: previous month (UTC)
    now = dt.datetime.utcnow()
    first = dt.datetime(now.year, now.month, 1)
    prev_last = first - dt.timedelta(days=1)
    y, mo = prev_last.year, prev_last.month
    return y, mo, f"{y:04d}-{mo:02d}"

def parse_entry_datetime(entry: Dict[str, Any]) -> Optional[dt.datetime]:
    """
    Prefer feedparser structured time. Fall back to parsing RFC strings if present.
    Returns UTC naive datetime.
    """
    # feedparser provides time.struct_time objects
    for key in ("published_parsed", "updated_parsed"):
        t = entry.get(key)
        if t:
            try:
                d = dt.datetime(*t[:6])
                return d
            except Exception:
                pass

    # fallback: string fields (often RFC822 / ISO-like)
    for key in ("published", "updated"):
        s = entry.get(key)
        if isinstance(s, str) and s.strip():
            # very conservative parsing: try RFC822 via email.utils if available
            try:
                import email.utils
                d = email.utils.parsedate_to_datetime(s)
                if d.tzinfo:
                    d = d.astimezone(dt.timezone.utc).replace(tzinfo=None)
                return d
            except Exception:
                # try ISO 8601 basics
                try:
                    s2 = s.strip().replace("Z", "+00:00")
                    d = dt.datetime.fromisoformat(s2)
                    if d.tzinfo:
                        d = d.astimezone(dt.timezone.utc).replace(tzinfo=None)
                    return d
                except Exception:
                    return None
    return None

def in_target_month(d: dt.datetime, year: int, month: int) -> bool:
    return d.year == year and d.month == month

def norm_text(s: str) -> str:
    s = (s or "").lower()
    s = s.replace("ä", "ae").replace("ö", "oe").replace("ü", "ue").replace("ß", "ss")
    return s

def count_hits(text: str, keywords: List[str]) -> int:
    t = norm_text(text)
    c = 0
    for kw in keywords:
        k = norm_text(kw)
        if not k:
            continue
        # word-ish match
        if re.search(r"(^|[^a-z0-9_])" + re.escape(k) + r"([^a-z0-9_]|$)", t):
            c += 1
    return c

def sentiment_score(text: str, pos: List[str], neg: List[str]) -> int:
    t = norm_text(text)
    p = 0
    n = 0
    for w in pos:
        w2 = norm_text(w)
        if w2 and w2 in t:
            p += 1
    for w in neg:
        w2 = norm_text(w)
        if w2 and w2 in t:
            n += 1
    return p - n

# --- fetch + analyze --------------------------------------------------------

def fetch_feed(url: str) -> feedparser.FeedParserDict:
    headers = {"User-Agent": UA, "Accept": "application/rss+xml,application/atom+xml,text/xml;q=0.9,*/*;q=0.8"}
    r = requests.get(url, headers=headers, timeout=TIMEOUT)
    r.raise_for_status()
    return feedparser.parse(r.content)

def analyze_month(year: int, month: int, ym: str, sources_cfg: Dict[str, Any], lex: Dict[str, Any]) -> Dict[str, Any]:
    topics_cfg = lex.get("topics", [])
    pos = lex.get("positive", [])
    neg = lex.get("negative", [])

    topic_counts = {t["key"]: 0 for t in topics_cfg}
    items: List[Dict[str, Any]] = []

    sources_used: List[Dict[str, Any]] = []

    total_sent_sum = 0
    total_sent_n = 0
    items_total = 0

    for src in sources_cfg.get("sources", []):
        name = src.get("name", "Unknown")
        url = src.get("url")
        cat = src.get("category", "misc")
        if not url:
            sources_used.append({"name": f"{name} (FAILED)", "category": cat, "items": 0, "dropped_out_of_month": 0})
            continue

        src_items = 0
        dropped = 0
        failed = False

        try:
            feed = fetch_feed(url)
            for e in feed.entries:
                ed = parse_entry_datetime(e)
                if not ed:
                    # Undated items are excluded to prevent fake backfills.
                    dropped += 1
                    continue
                if not in_target_month(ed, year, month):
                    dropped += 1
                    continue

                title = (e.get("title") or "").strip()
                summary = (e.get("summary") or e.get("description") or "").strip()
                text = f"{title}\n{summary}"

                # sentiment
                s = sentiment_score(text, pos, neg)
                total_sent_sum += s
                total_sent_n += 1

                # topic scoring (count keyword hits, but only count 1 per item per topic to keep it simple)
                best_topic_key = None
                best_hits = 0
                for t in topics_cfg:
                    hits = count_hits(text, t.get("keywords", []))
                    if hits > best_hits:
                        best_hits = hits
                        best_topic_key = t["key"]

                if best_topic_key:
                    topic_counts[best_topic_key] += 1

                # store item
                items.append({
                    "source": name,
                    "category": cat,
                    "published": ed.strftime("%Y-%m-%d %H:%M:%S"),
                    "title": title,
                    "link": e.get("link") or "",
                    "sent": s,
                    "top_topic": best_topic_key or "",
                    "topic_hits": best_hits
                })

                src_items += 1
                items_total += 1

            sources_used.append({
                "name": name,
                "category": cat,
                "items": src_items,
                "dropped_out_of_month": dropped
            })

        except Exception:
            failed = True
            sources_used.append({
                "name": f"{name} (FAILED)",
                "category": cat,
                "items": 0,
                "dropped_out_of_month": 0
            })

        # tiny pause to be polite
        time.sleep(0.2)

    # build topics array in fixed order
    topics_out = []
    top_topic_key = None
    top_topic_count = -1
    for t in topics_cfg:
        k = t["key"]
        c = int(topic_counts.get(k, 0))
        topics_out.append({
            "key": k,
            "label_de": t.get("de", k),
            "label_en": t.get("en", k),
            "count": c
        })
        if c > top_topic_count:
            top_topic_count = c
            top_topic_key = k

    # narrative (very simple template, keep your existing phrasing)
    # -> if no data, narrative remains generic
    narrative_de = []
    narrative_en = []
    if top_topic_key == "eu":
        narrative_de = ["EU wird oft über konkrete Eingriffe bewertet (Regelungsdruck/Alltagseffekte), weniger über abstrakte Idee."]
        narrative_en = ["The EU is often judged via concrete interventions (regulatory pressure/everyday impacts), less as an abstract idea."]
    elif top_topic_key == "migration":
        narrative_de = ["Migration/Asyl wird häufig über Belastungs- und Fairnessfragen diskutiert (Aufnahme, Integration, Sicherheit)."]
        narrative_en = ["Migration/asylum is often discussed through strain and fairness questions (intake, integration, security)."]
    elif top_topic_key == "ukraine":
        narrative_de = ["Krieg/Ukraine wird stark über Eskalation vs. Deeskalation bewertet (Kosten, Risiko, Sicherheit)."]
        narrative_en = ["War/Ukraine is strongly framed as escalation vs. de-escalation (costs, risk, security)."]
    elif top_topic_key == "tax":
        narrative_de = ["Steuern/Abgaben werden primär als Druck auf Haushalt und Leistungsträger wahrgenommen (Netto, Bürokratie, Planbarkeit)."]
        narrative_en = ["Taxes/charges are mainly perceived as pressure on households and earners (net income, bureaucracy, predictability)."]
    elif top_topic_key == "housing":
        narrative_de = ["Wohnen/Mieten wird als Leistbarkeitskrise erlebt (Mieten, Nebenkosten, Eigentum unerreichbar)."]
        narrative_en = ["Housing/rents are experienced as an affordability crisis (rents, utilities, ownership out of reach)."]
    elif top_topic_key == "energy":
        narrative_de = ["Energie/Heizen wird als Kosten- und Regelungsfrage bewertet (Preise, Umbau, Zumutbarkeit)."]
        narrative_en = ["Energy/heating is framed as cost and regulation (prices, transition, feasibility)."]
    elif top_topic_key == "middleclass":
        narrative_de = ["Mittelschicht/Leistbarkeit wird über Alltagsdruck verhandelt (Preise, Abgaben, Gefühl von Abstieg)."]
        narrative_en = ["Middle-class affordability is discussed via everyday pressure (prices, charges, sense of downward mobility)."]
    else:
        narrative_de = ["Zu wenige valide Items im Zielmonat – dieser Monatsreport ist eher ein Daten-Snapshot als ein Trendbild."]
        narrative_en = ["Too few valid items in the target month – this monthly report is more a data snapshot than a trend view."]

    sent_avg = (total_sent_sum / total_sent_n) if total_sent_n else 0.0

    return {
        "version": 3,
        "year": year,
        "month": month,
        "ym": ym,
        "generated_at": dt.datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S"),
        "items_total": items_total,
        "items": items,  # NEW: item list with timestamps
        "sentiment": {
            "sum": total_sent_sum,
            "n": total_sent_n,
            "avg": float(round(sent_avg, 4))
        },
        "topics": topics_out,
        "top_topic_de": next((t["label_de"] for t in topics_out if t["key"] == top_topic_key), topics_out[0]["label_de"] if topics_out else ""),
        "top_topic_key": top_topic_key or "",
        "narrative_de": narrative_de,
        "narrative_en": narrative_en,
        "sources_used": sources_used
    }

# --- HTML generators (kept simple; uses existing look you already have) -----

def html_shell(title: str, body: str) -> str:
    # minimal wrapper; your existing generator likely already has full styling
    # If you already generate full HTML elsewhere, keep that part and only use month-filtering + items in JSON.
    return f"""<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>{html.escape(title)}</title>
<meta name="robots" content="noindex,nofollow" />
<style>
  :root{{
    --bg:#050814; --panel:rgba(15,23,42,.92); --text:#e9edf3; --muted:#97a0ad; --gold:#d4af37;
    --ring:rgba(212,175,55,.25); --shadow:0 18px 60px rgba(0,0,0,.55); --radius:16px;
  }}
  html,body{{height:100%; background:radial-gradient(900px 600px at 10% 10%, rgba(212,175,55,.08), transparent 50%), linear-gradient(180deg,#020617 0%, #050814 60%, #020617 100%); color:var(--text); margin:0; font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;}}
  .wrap{{max-width:1200px; margin:0 auto; padding:28px 18px 64px;}}
  .card{{background:linear-gradient(180deg, rgba(17,24,39,.92), rgba(15,23,42,.86)); border:1px solid rgba(212,175,55,.18); border-radius:var(--radius); box-shadow:var(--shadow); padding:18px;}}
  a{{color:var(--gold); text-decoration:none;}}
  .muted{{color:var(--muted);}}
</style>
</head>
<body>
  <div class="wrap">
    {body}
  </div>
</body>
</html>"""

def build_index(year: int) -> None:
    # list all months available (new -> old)
    files = sorted(DATA_DIR.glob(f"{year:04d}-*.json"), reverse=True)
    rows = []
    for p in files:
        data = read_json(p)
        ym = data.get("ym", p.stem)
        items_total = data.get("items_total", 0)
        sent = data.get("sentiment", {}).get("avg", 0.0)
        top = data.get("top_topic_de", "")
        rows.append(f"""
          <div class="card" style="margin:14px 0;">
            <div style="font-weight:700; font-size:18px;">{html.escape(ym)}</div>
            <div class="muted" style="margin-top:6px;">Items {items_total} · Sent {sent} · Top {html.escape(top)}</div>
            <div style="margin-top:10px;"><a href="{ym}.html">Öffnen</a></div>
          </div>
        """)

    body = f"""
      <h1 style="margin:0 0 8px;">FSA Trendreport – Chronologie</h1>
      <div class="muted" style="margin:0 0 18px;">Monatsreports in Reihenfolge (neu → alt).</div>
      {''.join(rows) if rows else '<div class="card">Noch keine Monatsdaten vorhanden.</div>'}
    """
    write_text(PAGES_DIR / "index.html", html_shell("FSA Trendreport – Chronologie", body))

def build_year_pages(year: int) -> None:
    # year overview and rundflug placeholder (your existing generator likely already builds richer pages)
    files = sorted(DATA_DIR.glob(f"{year:04d}-*.json"))
    months = []
    for p in files:
        d = read_json(p)
        months.append(d)

    # yearly overview
    rows = []
    for d in sorted(months, key=lambda x: x.get("ym",""), reverse=True):
        ym = d.get("ym","")
        rows.append(f"""
          <div class="card" style="margin:14px 0;">
            <div style="font-weight:700; font-size:18px;">{html.escape(ym)}</div>
            <div class="muted" style="margin-top:6px;">Items {d.get("items_total",0)} · Sent {d.get("sentiment",{}).get("avg",0.0)} · Top {html.escape(d.get("top_topic_de",""))}</div>
            <div style="margin-top:10px;"><a href="{html.escape(ym)}.html">Monat öffnen</a></div>
          </div>
        """)

    body_year = f"""
      <h1 style="margin:0 0 8px;">FSA Trendreport – Jahresübersicht {year}</h1>
      <div class="muted" style="margin:0 0 18px;">Zusammenfassung via Monatswerte (neu → alt). Für Jahresabschluss siehe „Trend-Rundflug“.</div>
      <div style="margin:0 0 18px;">
        <a class="card" style="display:inline-block; padding:10px 14px; margin-right:10px;" href="{year}-rundflug.html">Trend-Rundflug</a>
        <a class="card" style="display:inline-block; padding:10px 14px;" href="index.html">Zur Chronologie</a>
      </div>
      {''.join(rows) if rows else '<div class="card">Noch keine Monatsdaten vorhanden.</div>'}
    """
    write_text(PAGES_DIR / f"{year}.html", html_shell(f"FSA Trendreport – Jahresübersicht {year}", body_year))

    # simple rundflug page (kept minimal)
    body_r = f"""
      <h1 style="margin:0 0 8px;">FSA Trendreport – Trend-Rundflug {year}</h1>
      <div class="muted" style="margin:0 0 18px;">Jahresabschluss aus Monatsdaten (kuratiert, reproduzierbar, nicht repräsentativ).</div>
      <div class="card" style="margin:14px 0;">
        <div style="font-weight:700;">Hinweis</div>
        <div class="muted" style="margin-top:6px;">
          Dieser Rundflug nutzt nur Monatsreports, die Items mit Datum im jeweiligen Monat enthalten.
          Wenn viele Feeds keine Historie liefern, bleiben Monate leer – das ist Absicht (Anti-Fake-Backfill).
        </div>
      </div>
      <div style="margin:0 0 18px;">
        <a class="card" style="display:inline-block; padding:10px 14px; margin-right:10px;" href="{year}.html">Jahresübersicht</a>
        <a class="card" style="display:inline-block; padding:10px 14px;" href="index.html">Chronologie</a>
      </div>
      <div class="card">
        <div style="font-weight:700;">Kapitel: Monatsreports (neu → alt)</div>
        <div class="muted" style="margin-top:10px;">{len(months)} vorhandene Monate</div>
      </div>
    """
    write_text(PAGES_DIR / f"{year}-rundflug.html", html_shell(f"FSA Trendreport – Trend-Rundflug {year}", body_r))

def build_month_page(data: Dict[str, Any]) -> None:
    ym = data["ym"]
    body = f"""
      <h1 style="margin:0 0 8px;">FSA Trendreport</h1>
      <div class="muted" style="margin:0 0 18px;">Monatsübersicht · {html.escape(ym)} · Erstellt: {html.escape(data.get("generated_at",""))} (UTC)</div>

      <div class="card" style="margin:14px 0;">
        <div style="font-weight:700; margin-bottom:10px;">Überblick</div>
        <div class="muted">
          Dieses Trendbild basiert auf öffentlich zugänglichen Online-Signalen (RSS/Atom) und ist nicht repräsentativ.
          Es zeigt Häufigkeiten und Tonlage – keine „Wahrheit“.
        </div>
        <div style="display:flex; gap:12px; flex-wrap:wrap; margin-top:14px;">
          <div class="card" style="min-width:180px;">{data.get("items_total",0)}<div class="muted">Ausgewertete Beiträge</div></div>
          <div class="card" style="min-width:180px;">{data.get("sentiment",{}).get("avg",0.0)}<div class="muted">Tonality (avg)</div></div>
          <div class="card" style="min-width:220px;">{html.escape(data.get("top_topic_de",""))}<div class="muted">Dominantes Thema</div></div>
        </div>
      </div>

      <div class="card" style="margin:14px 0;">
        <div style="font-weight:700;">Quellenkorb</div>
        <div class="muted" style="margin-top:8px;">
          Hinweis: Für Rückblicke werden nur Items mit Datum im Zielmonat gezählt.
          Out-of-month wird verworfen (Anti-Fake-Backfill).
        </div>
        <ul style="margin:12px 0 0; padding-left:18px;">
          {''.join([f"<li>{html.escape(s['name'])} ({html.escape(s['category'])}: {s.get('items',0)} · dropped: {s.get('dropped_out_of_month',0)})</li>" for s in data.get('sources_used',[])])}
        </ul>
      </div>

      <div class="card" style="margin:14px 0;">
        <div style="font-weight:700;">Weiter</div>
        <div style="margin-top:10px;">
          <a class="card" style="display:inline-block; padding:10px 14px; margin-right:10px;" href="{data['year']}.html">Jahresübersicht</a>
          <a class="card" style="display:inline-block; padding:10px 14px; margin-right:10px;" href="{data['year']}-rundflug.html">Trend-Rundflug</a>
          <a class="card" style="display:inline-block; padding:10px 14px;" href="index.html">Zur Chronologie</a>
        </div>
      </div>
    """
    write_text(PAGES_DIR / f"{ym}.html", html_shell(f"FSA Trendreport – {ym}", body))

# --- main ------------------------------------------------------------------

def main() -> None:
    ensure_dirs()

    sources = read_json(SOURCES_FILE)
    lex = read_json(LEXICON_FILE)

    year, month, ym = ym_from_env_or_previous()

    data = analyze_month(year, month, ym, sources, lex)

    # persist machine data
    write_json(DATA_DIR / f"{ym}.json", data)

    # build month html
    build_month_page(data)

    # rebuild index + year pages
    build_index(year)
    build_year_pages(year)

    print(f"[OK] generated {ym}: items_total={data.get('items_total')} -> pages/trend/{ym}.html and data/{ym}.json")

if __name__ == "__main__":
    main()

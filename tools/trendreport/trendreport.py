#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import os
import re
import json
import math
import time
import html
import argparse
import datetime as dt
from pathlib import Path

import feedparser
import requests

ROOT = Path(__file__).resolve().parents[2]  # .../lp-anfang
TOOLS_DIR = ROOT / "tools" / "trendreport"
PAGES_DIR = ROOT / "pages" / "trend"
DATA_DIR = PAGES_DIR / "data"

SOURCES_FILE = TOOLS_DIR / "sources.json"
LEXICON_FILE = TOOLS_DIR / "lexicon_de.json"

UA = "FSA-TrendBot/1.0 (+github-actions)"

def utc_now_iso():
  return dt.datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S")

def month_range(year: int, month: int):
  start = dt.datetime(year, month, 1, 0, 0, 0)
  if month == 12:
    end = dt.datetime(year + 1, 1, 1, 0, 0, 0)
  else:
    end = dt.datetime(year, month + 1, 1, 0, 0, 0)
  return start, end

def halfyear_of_month(month: int) -> str:
  return "H1" if 1 <= month <= 6 else "H2"

def safe_text(x: str) -> str:
  return re.sub(r"\s+", " ", (x or "").strip())

def parse_entry_date(entry):
  # Try best-effort to get a date; if missing -> None (anti fake backfill)
  for key in ("published_parsed", "updated_parsed"):
    if getattr(entry, key, None):
      tt = getattr(entry, key)
      try:
        return dt.datetime(tt.tm_year, tt.tm_mon, tt.tm_mday, tt.tm_hour, tt.tm_min, tt.tm_sec)
      except Exception:
        pass
  # Some feeds may expose "published" string; we don't parse that to avoid fake/backfill ambiguity
  return None

def load_json(path: Path):
  with open(path, "r", encoding="utf-8") as f:
    return json.load(f)

def write_json(path: Path, data):
  path.parent.mkdir(parents=True, exist_ok=True)
  with open(path, "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

def http_get(url: str):
  headers = {"User-Agent": UA}
  return requests.get(url, headers=headers, timeout=25)

def fetch_feed(url: str):
  r = http_get(url)
  r.raise_for_status()
  return feedparser.parse(r.text)

def build_topic_matchers(topics):
  # Precompile regex patterns (word boundary-ish)
  compiled = []
  for t in topics:
    kws = t.get("keywords", [])
    patterns = []
    for kw in kws:
      kw = kw.strip().lower()
      if not kw:
        continue
      # Escape and use loose boundaries (works for DE/EN mixed)
      pat = re.compile(r"(?<!\w)" + re.escape(kw) + r"(?!\w)", re.IGNORECASE)
      patterns.append(pat)
    compiled.append((t["key"], patterns))
  return compiled

def sentiment_score(text: str, sent_lex):
  txt = (text or "").lower()
  pos = sent_lex.get("positive", [])
  neg = sent_lex.get("negative", [])
  p = sum(1 for w in pos if re.search(r"(?<!\w)" + re.escape(w) + r"(?!\w)", txt))
  n = sum(1 for w in neg if re.search(r"(?<!\w)" + re.escape(w) + r"(?!\w)", txt))
  return p - n

def analyze_period(year: int, month: int, sources, lexicon):
  start, end = month_range(year, month)
  ym = f"{year:04d}-{month:02d}"

  topics = lexicon["topics"]
  sent_lex = lexicon.get("sentiment_lexicon", {})
  matchers = build_topic_matchers(topics)

  topics_count = {t["key"]: 0 for t in topics}
  items = []
  sources_used = []

  for src in sources:
    name = src.get("name", "Unknown")
    url = src.get("url")
    category = src.get("category", "misc")
    dropped = 0
    kept = 0
    failed = False

    if not url:
      sources_used.append({"name": name, "category": category, "items": 0, "dropped": 0, "failed": True})
      continue

    try:
      feed = fetch_feed(url)
      for e in feed.entries[:250]:
        d = parse_entry_date(e)
        if d is None:
          dropped += 1
          continue
        if not (start <= d < end):
          dropped += 1
          continue

        title = safe_text(getattr(e, "title", ""))
        link = safe_text(getattr(e, "link", ""))
        summary = safe_text(getattr(e, "summary", ""))

        blob = (title + " " + summary).lower()

        matched = []
        for key, pats in matchers:
          for p in pats:
            if p.search(blob):
              matched.append(key)
              break

        # If nothing matches, we still keep it as "observed item"
        score = sentiment_score(blob, sent_lex)

        for k in set(matched):
          topics_count[k] += 1

        items.append({
          "date": d.strftime("%Y-%m-%d"),
          "title": title[:240],
          "snippet": summary[:360],
          "link": link,
          "source": name,
          "category": category,
          "sentiment": score,
          "topics": matched
        })
        kept += 1

    except Exception:
      failed = True

    sources_used.append({
      "name": f"{name}{' (FAILED)' if failed else ''}",
      "category": category,
      "items": kept if not failed else 0,
      "dropped": dropped,
      "failed": failed
    })

  # KPIs
  n = len(items)
  ssum = sum(i["sentiment"] for i in items) if n else 0
  avg = (ssum / n) if n else 0.0

  # Top topic label (DE/EN)
  top_key = max(topics_count.keys(), key=lambda k: topics_count[k]) if topics_count else None
  top_topic_de = ""
  top_topic_en = ""
  for t in topics:
    if t["key"] == top_key:
      top_topic_de = t["label_de"]
      top_topic_en = t["label_en"]
      break

  # Narrative (simple & reproducible)
  narrative_de = []
  narrative_en = []
  if n == 0:
    narrative_de.append("Keine verwertbaren Items im Zielmonat (Datum fehlte oder Quellen lieferten keine passenden Einträge).")
    narrative_en.append("No usable items in the target month (missing dates or sources provided no matching entries).")
  else:
    narrative_de.append(f"Dominantes Thema im Monat: {top_topic_de} (Keyword-Treffer).")
    narrative_en.append(f"Dominant topic this month: {top_topic_en} (keyword hits).")
    if avg > 0.5:
      narrative_de.append("Tonalität wirkt insgesamt eher positiv (Lexikon-Score).")
      narrative_en.append("Overall tone appears rather positive (lexicon score).")
    elif avg < -0.5:
      narrative_de.append("Tonalität wirkt insgesamt eher negativ (Lexikon-Score).")
      narrative_en.append("Overall tone appears rather negative (lexicon score).")
    else:
      narrative_de.append("Tonalität wirkt insgesamt gemischt/neutral (Lexikon-Score).")
      narrative_en.append("Overall tone appears mixed/neutral (lexicon score).")

  report = {
    "version": 3,
    "period": {
      "type": "month",
      "year": year,
      "month": month,
      "ym": ym
    },
    "generated_at": utc_now_iso(),
    "items_total": n,
    "sentiment": {"sum": ssum, "n": n, "avg": round(avg, 4)},
    "topics": [
      {
        "key": t["key"],
        "label_de": t["label_de"],
        "label_en": t["label_en"],
        "count": int(topics_count[t["key"]])
      } for t in topics
    ],
    "top_topic_de": top_topic_de,
    "top_topic_en": top_topic_en,
    "narrative_de": narrative_de,
    "narrative_en": narrative_en,
    "sources_used": sources_used,
    "items": sorted(items, key=lambda x: x["date"], reverse=True)[:120]
  }

  return report

def aggregate_reports(reports, period_type: str, year: int, tag: str):
  # reports = list of monthly report dicts in this aggregation
  if not reports:
    return None

  topics_keys = [t["key"] for t in reports[0]["topics"]]
  topics_labels = {t["key"]: (t["label_de"], t["label_en"]) for t in reports[0]["topics"]}

  total_items = sum(r["items_total"] for r in reports)
  ssum = sum(r["sentiment"]["sum"] for r in reports)
  sn = sum(r["sentiment"]["n"] for r in reports)
  avg = (ssum / sn) if sn else 0.0

  topics_sum = {k: 0 for k in topics_keys}
  for r in reports:
    for t in r["topics"]:
      topics_sum[t["key"]] += int(t["count"])

  top_key = max(topics_sum.keys(), key=lambda k: topics_sum[k]) if topics_sum else None
  top_de, top_en = topics_labels.get(top_key, ("", ""))

  narrative_de = [
    f"Aggregration ({tag}): {len(reports)} Monatsreports zusammengefasst.",
    f"Top-Thema: {top_de} (Summe Keyword-Treffer)."
  ]
  narrative_en = [
    f"Aggregation ({tag}): {len(reports)} monthly reports combined.",
    f"Top topic: {top_en} (sum of keyword hits)."
  ]

  agg = {
    "version": 3,
    "period": {"type": period_type, "year": year, "tag": tag},
    "generated_at": utc_now_iso(),
    "months_included": [r["period"]["ym"] for r in reports],
    "items_total": int(total_items),
    "sentiment": {"sum": float(ssum), "n": int(sn), "avg": round(float(avg), 4)},
    "topics": [
      {
        "key": k,
        "label_de": topics_labels[k][0],
        "label_en": topics_labels[k][1],
        "count": int(topics_sum[k])
      } for k in topics_keys
    ],
    "top_topic_de": top_de,
    "top_topic_en": top_en,
    "narrative_de": narrative_de,
    "narrative_en": narrative_en
  }
  return agg

def load_all_month_reports():
  if not DATA_DIR.exists():
    return []
  out = []
  for p in sorted(DATA_DIR.glob("????-??.json")):
    try:
      out.append(load_json(p))
    except Exception:
      pass
  return out

def write_manifest(month_reports):
  years = {}
  for r in month_reports:
    y = int(r["period"]["year"])
    ym = r["period"]["ym"]
    years.setdefault(y, {"months": [], "halfyears": [], "year": str(y)})
    years[y]["months"].append(ym)

  # halfyears available based on months present
  for y, obj in years.items():
    hset = set()
    for ym in obj["months"]:
      m = int(ym.split("-")[1])
      hset.add(f"{y}-{halfyear_of_month(m)}")
    obj["halfyears"] = sorted(list(hset))

  manifest = {
    "version": 3,
    "generated_at": utc_now_iso(),
    "years": {str(k): v for k, v in sorted(years.items())}
  }
  write_json(DATA_DIR / "manifest.json", manifest)

def html_shell(title: str, body: str, extra_js: str = ""):
  # No external assets; inline CSS/JS only
  return f"""<!doctype html>
<html lang="de">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>{html.escape(title)}</title>
  <style>
    :root{{
      --bg:#050814;
      --panel:rgba(15,23,42,.92);
      --panel2:rgba(15,23,42,.82);
      --text:#e9edf3;
      --muted:#97a0ad;
      --gold:#d4af37;
      --gold2:#f1d070;
      --ring:rgba(212,175,55,.25);
      --radius:16px;
      --shadow:0 12px 40px rgba(0,0,0,.55);
      --maxw:1100px;
    }}
    html,body{{height:100%;}}
    body{{
      margin:0;
      font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;
      color:var(--text);
      background:
        radial-gradient(1200px 600px at 20% 10%, rgba(212,175,55,.12), transparent 55%),
        radial-gradient(900px 500px at 80% 20%, rgba(120,180,255,.10), transparent 60%),
        linear-gradient(180deg, #020617 0%, #050814 60%, #020617 100%);
    }}
    .wrap{{max-width:var(--maxw); margin:0 auto; padding:28px 18px 44px;}}
    .topbar{{display:flex; gap:10px; flex-wrap:wrap; align-items:center; justify-content:space-between; margin-bottom:14px;}}
    .brand{{display:flex; align-items:center; gap:10px;}}
    .badge{{width:34px;height:34px;border-radius:10px;background:rgba(212,175,55,.10); border:1px solid var(--ring); display:grid; place-items:center; box-shadow:var(--shadow);}}
    .badge svg{{width:18px;height:18px; fill:var(--gold2);}}
    h1{{font-size:22px; margin:0; letter-spacing:.2px;}}
    .sub{{color:var(--muted); font-size:13px; margin-top:4px;}}
    .btnrow{{display:flex; gap:10px; flex-wrap:wrap; align-items:center;}}
    .btn{{
      display:inline-flex; align-items:center; gap:10px;
      padding:10px 14px; border-radius:999px;
      background:rgba(15,23,42,.65);
      border:1px solid rgba(212,175,55,.25);
      color:var(--text); text-decoration:none;
      box-shadow:0 8px 22px rgba(0,0,0,.35);
    }}
    .btn .dot{{width:10px;height:10px;border-radius:50%; background:rgba(212,175,55,.9); box-shadow:0 0 0 4px rgba(212,175,55,.12);}}
    .grid{{display:grid; grid-template-columns:1.15fr .85fr; gap:14px; align-items:start;}}
    @media (max-width: 980px){{ .grid{{grid-template-columns:1fr;}} }}
    .card{{
      background:linear-gradient(180deg, rgba(15,23,42,.92), rgba(15,23,42,.82));
      border:1px solid rgba(212,175,55,.18);
      border-radius:var(--radius);
      box-shadow:var(--shadow);
      padding:16px;
    }}
    .kpis{{display:grid; grid-template-columns:repeat(3, minmax(0,1fr)); gap:10px; margin-top:10px;}}
    @media (max-width: 740px){{ .kpis{{grid-template-columns:1fr;}} }}
    .kpi{{padding:12px; border-radius:14px; border:1px solid rgba(212,175,55,.14); background:rgba(2,6,23,.35);}}
    .kpi .v{{font-size:18px; font-weight:700;}}
    .kpi .l{{font-size:12px; color:var(--muted); margin-top:4px;}}
    .mini{{color:var(--muted); font-size:12px;}}
    canvas{{width:100%; height:180px; background:rgba(2,6,23,.25); border:1px solid rgba(212,175,55,.12); border-radius:14px;}}
    .list{{margin:0; padding-left:18px; color:var(--muted);}}
    .hr{{height:1px; background:rgba(212,175,55,.10); margin:14px 0;}}
    .note{{font-size:12px; color:var(--muted); line-height:1.35;}}
  </style>
</head>
<body>
  <div class="wrap">
    {body}
  </div>
  <script>
    (function(){{
      const root = document.documentElement;
      let lang = localStorage.getItem('fsa_trend_lang') || 'de';
      function apply(){{
        document.querySelectorAll('[data-i18n]').forEach(el=>{{
          const key = el.getAttribute('data-i18n');
          const de = el.getAttribute('data-de') || '';
          const en = el.getAttribute('data-en') || '';
          el.textContent = (lang === 'en') ? en : de;
        }});
        document.querySelectorAll('[data-i18n-href]').forEach(el=>{{
          const de = el.getAttribute('data-href-de') || '#';
          const en = el.getAttribute('data-href-en') || '#';
          el.setAttribute('href', (lang === 'en') ? en : de);
        }});
        const b = document.getElementById('langBtn');
        if(b) b.textContent = (lang === 'en') ? 'EN' : 'DE';
      }}
      window.__setLang = function(next){{
        lang = next;
        localStorage.setItem('fsa_trend_lang', lang);
        apply();
      }}
      apply();
    }})();
  </script>
  {extra_js}
</body>
</html>
"""

def draw_bar_chart_js(canvas_id: str, labels: list, values: list):
  # simple canvas bar chart (no external libs)
  return f"""
  <script>
  (function(){{
    const c = document.getElementById({json.dumps(canvas_id)});
    if(!c) return;
    const ctx = c.getContext('2d');
    const labels = {json.dumps(labels)};
    const values = {json.dumps(values)};
    const w = c.width = c.clientWidth * (window.devicePixelRatio||1);
    const h = c.height = 180 * (window.devicePixelRatio||1);
    ctx.clearRect(0,0,w,h);

    const pad = 18*(window.devicePixelRatio||1);
    const maxV = Math.max(1, ...values);
    const barW = (w - pad*2) / Math.max(1, values.length);
    const baseY = h - pad;

    // grid
    ctx.globalAlpha = 0.25;
    ctx.strokeStyle = '#d4af37';
    ctx.lineWidth = 1*(window.devicePixelRatio||1);
    for(let i=0;i<4;i++) {{
      const y = pad + i*((h-pad*2)/3);
      ctx.beginPath(); ctx.moveTo(pad,y); ctx.lineTo(w-pad,y); ctx.stroke();
    }}
    ctx.globalAlpha = 1;

    // bars
    for(let i=0;i<values.length;i++) {{
      const v = values[i];
      const bh = (v/maxV) * (h - pad*2);
      const x = pad + i*barW + barW*0.12;
      const y = baseY - bh;
      const bw = barW*0.76;

      ctx.fillStyle = 'rgba(212,175,55,.55)';
      ctx.fillRect(x,y,bw,bh);
      ctx.strokeStyle = 'rgba(212,175,55,.85)';
      ctx.strokeRect(x,y,bw,bh);
    }}

    // labels (few only)
    ctx.fillStyle = 'rgba(233,237,243,.75)';
    ctx.font = `${{11*(window.devicePixelRatio||1)}}px system-ui, -apple-system, Segoe UI, Arial`;
    const showEvery = Math.ceil(values.length/7);
    for(let i=0;i<labels.length;i++) {{
      if(i%showEvery!==0) continue;
      const x = pad + i*barW + barW*0.12;
      ctx.fillText(labels[i].slice(0,10), x, h - 5*(window.devicePixelRatio||1));
    }}
  }})();
  </script>
  """

def render_index_page():
  body = f"""
  <div class="topbar">
    <div class="brand">
      <div class="badge" aria-hidden="true">
        <svg viewBox="0 0 24 24"><path d="M12 2l2.2 6.3H21l-5.4 3.9 2.1 6.4L12 15.7 6.3 18.6l2.1-6.4L3 8.3h6.8L12 2z"/></svg>
      </div>
      <div>
        <h1 data-i18n data-de="FSA Trendbarometer" data-en="FSA Trend Barometer"></h1>
        <div class="sub" data-i18n
          data-de="Hauptsicht: Jahr & Halbjahr (H1/H2). Monate bleiben als Detail-Archiv."
          data-en="Primary view: year & half-year (H1/H2). Months remain as detail archive."></div>
      </div>
    </div>
    <div class="btnrow">
      <a class="btn" href="./dashboard.html"><span class="dot"></span><span data-i18n data-de="Dashboard" data-en="Dashboard"></span></a>
      <a class="btn" href="./chronologie.html"><span class="dot"></span><span data-i18n data-de="Chronologie" data-en="Chronology"></span></a>
      <button class="btn" id="langBtn" onclick="__setLang((localStorage.getItem('fsa_trend_lang')||'de')==='de'?'en':'de')"><span class="dot"></span>DE</button>
    </div>
  </div>

  <div class="grid">
    <div class="card">
      <div class="mini" data-i18n
        data-de="Was es ist: reproduzierbares Online-Signal-Barometer (RSS/Atom)."
        data-en="What it is: reproducible online-signal barometer (RSS/Atom)."></div>
      <div class="hr"></div>
      <div class="note" data-i18n
        data-de="Wichtig: Das ist keine repräsentative 'Volksmeinung'. Es zeigt nur das, was die ausgewählten Quellen im Zeitraum publizieren – inkl. transparenter Quellen-Qualität (OK/Dropped/Failed)."
        data-en="Important: this is not a representative 'public opinion'. It only reflects what selected sources publish in the period—plus transparent source quality (OK/Dropped/Failed)."></div>
      <div class="hr"></div>
      <div id="yearsBox" class="note" data-i18n
        data-de="Lade verfügbare Jahre..."
        data-en="Loading available years..."></div>
    </div>

    <div class="card">
      <div class="mini" data-i18n data-de="Schnellstart" data-en="Quick start"></div>
      <div class="hr"></div>
      <div class="note" data-i18n
        data-de="1) Öffne Dashboard → wähle Jahr → H1/H2 → Charts & Tabellen."
        data-en="1) Open Dashboard → select year → H1/H2 → charts & tables."></div>
      <div class="note" style="margin-top:10px;" data-i18n
        data-de="2) Wenn du mehr Inhalte willst: Quellen stabilisieren (RSS mit Datum) – dann füllt sich das Barometer automatisch."
        data-en="2) If you want more content: stabilize sources (RSS with dates)—then the barometer fills automatically."></div>
    </div>
  </div>

  <script>
  (async function(){{
    const box = document.getElementById('yearsBox');
    try {{
      const r = await fetch('./data/manifest.json?nocache=' + Date.now());
      if(!r.ok) throw new Error('manifest');
      const mf = await r.json();
      const years = Object.keys(mf.years||{{}}).sort().reverse();
      if(!years.length) {{
        box.textContent = (localStorage.getItem('fsa_trend_lang')==='en')
          ? 'No years available yet.'
          : 'Noch keine Jahre verfügbar.';
        return;
      }}
      const lang = localStorage.getItem('fsa_trend_lang') || 'de';
      let html = '';
      years.forEach(y=>{{
        const info = mf.years[y];
        const half = (info.halfyears||[]).sort();
        html += `<div style="margin:10px 0; padding:12px; border:1px solid rgba(212,175,55,.14); border-radius:14px; background:rgba(2,6,23,.25);">
          <div style="font-weight:700; color:rgba(233,237,243,.92); margin-bottom:6px;">${{y}}</div>
          <div style="display:flex; gap:10px; flex-wrap:wrap;">
            <a class="btn" href="./${{y}}.html?nocache=${{Date.now()}}"><span class="dot"></span>${{lang==='en'?'Year overview':'Jahresübersicht'}}</a>
            ${(half||[]).map(h=>{{
              const tag = h.endsWith('H1') ? (lang==='en'?'Half-year H1':'Halbjahr H1') : (lang==='en'?'Half-year H2':'Halbjahr H2');
              return `<a class="btn" href="./${{y}}-${{h.endsWith('H1')?'h1':'h2'}}.html?nocache=${{Date.now()}}"><span class="dot"></span>${{tag}}</a>`;
            }}).join('')}
          </div>
          <div style="margin-top:8px; color:rgba(151,160,173,.95); font-size:12px;">
            ${(lang==='en'?'Months in archive: ':'Monate im Archiv: ')}${{(info.months||[]).length}}
          </div>
        </div>`;
      }});
      box.innerHTML = html;
    }} catch(e) {{
      box.textContent = (localStorage.getItem('fsa_trend_lang')==='en')
        ? 'Could not load manifest.'
        : 'Manifest konnte nicht geladen werden.';
    }}
  }})();
  </script>
  """
  return html_shell("FSA Trendbarometer", body)

def render_simple_aggregate_page(title, subtitle, agg_json_path, back_link="./index.html"):
  body = f"""
  <div class="topbar">
    <div class="brand">
      <div class="badge" aria-hidden="true">
        <svg viewBox="0 0 24 24"><path d="M3 12h18v2H3v-2zm0-7h18v2H3V5zm0 14h18v2H3v-2z"/></svg>
      </div>
      <div>
        <h1>{html.escape(title)}</h1>
        <div class="sub">{html.escape(subtitle)}</div>
      </div>
    </div>
    <div class="btnrow">
      <a class="btn" href="{back_link}"><span class="dot"></span><span data-i18n data-de="Zurück" data-en="Back"></span></a>
      <a class="btn" href="./dashboard.html"><span class="dot"></span><span data-i18n data-de="Dashboard" data-en="Dashboard"></span></a>
      <button class="btn" id="langBtn" onclick="__setLang((localStorage.getItem('fsa_trend_lang')||'de')==='de'?'en':'de')"><span class="dot"></span>DE</button>
    </div>
  </div>

  <div class="grid">
    <div class="card">
      <div class="mini" data-i18n
        data-de="KPIs (Aggregation)"
        data-en="KPIs (aggregation)"></div>
      <div class="kpis">
        <div class="kpi"><div class="v" id="k_items">—</div><div class="l" data-i18n data-de="Items (Summe)" data-en="Items (sum)"></div></div>
        <div class="kpi"><div class="v" id="k_sent">—</div><div class="l" data-i18n data-de="Tonalität (avg)" data-en="Tone (avg)"></div></div>
        <div class="kpi"><div class="v" id="k_top">—</div><div class="l" data-i18n data-de="Top-Thema" data-en="Top topic"></div></div>
      </div>
      <div class="hr"></div>
      <canvas id="bars"></canvas>
      <div class="note" style="margin-top:10px;" id="narr"></div>
    </div>

    <div class="card">
      <div class="mini" data-i18n data-de="Hinweis" data-en="Note"></div>
      <div class="hr"></div>
      <div class="note" data-i18n
        data-de="Diese Seite fasst Monatsdaten zusammen. Wenn Quellen keine Historie liefern (oder Datumsfelder fehlen), bleiben Zeiträume dünn – das ist Absicht (Anti-Fake-Backfill)."
        data-en="This page aggregates monthly data. If sources provide no history (or dates are missing), periods stay thin—by design (anti-fake backfill)."></div>
      <div class="hr"></div>
      <a class="btn" href="./chronologie.html"><span class="dot"></span><span data-i18n data-de="Chronologie öffnen" data-en="Open chronology"></span></a>
    </div>
  </div>

  <script>
  (async function(){{
    const lang = localStorage.getItem('fsa_trend_lang') || 'de';
    const r = await fetch('{agg_json_path}?nocache=' + Date.now());
    const d = await r.json();

    document.getElementById('k_items').textContent = d.items_total ?? '0';
    document.getElementById('k_sent').textContent = (d.sentiment && typeof d.sentiment.avg === 'number') ? d.sentiment.avg.toFixed(2) : '0.00';
    document.getElementById('k_top').textContent = (lang==='en') ? (d.top_topic_en||'—') : (d.top_topic_de||'—');

    const narr = (lang==='en' ? (d.narrative_en||[]) : (d.narrative_de||[])).join(' • ');
    document.getElementById('narr').textContent = narr || '—';

    const topics = d.topics || [];
    const labels = topics.map(t => (lang==='en' ? t.label_en : t.label_de));
    const values = topics.map(t => t.count || 0);

    // draw bars
    const c = document.getElementById('bars');
    const ctx = c.getContext('2d');
    const w = c.width = c.clientWidth * (window.devicePixelRatio||1);
    const h = c.height = 180 * (window.devicePixelRatio||1);
    ctx.clearRect(0,0,w,h);
    const pad = 18*(window.devicePixelRatio||1);
    const maxV = Math.max(1, ...values);
    const barW = (w - pad*2) / Math.max(1, values.length);
    const baseY = h - pad;

    ctx.globalAlpha = 0.25;
    ctx.strokeStyle = '#d4af37';
    ctx.lineWidth = 1*(window.devicePixelRatio||1);
    for(let i=0;i<4;i++) {{
      const y = pad + i*((h-pad*2)/3);
      ctx.beginPath(); ctx.moveTo(pad,y); ctx.lineTo(w-pad,y); ctx.stroke();
    }}
    ctx.globalAlpha = 1;

    for(let i=0;i<values.length;i++) {{
      const v = values[i];
      const bh = (v/maxV) * (h - pad*2);
      const x = pad + i*barW + barW*0.12;
      const y = baseY - bh;
      const bw = barW*0.76;

      ctx.fillStyle = 'rgba(212,175,55,.55)';
      ctx.fillRect(x,y,bw,bh);
      ctx.strokeStyle = 'rgba(212,175,55,.85)';
      ctx.strokeRect(x,y,bw,bh);
    }}

    ctx.fillStyle = 'rgba(233,237,243,.75)';
    ctx.font = `${{11*(window.devicePixelRatio||1)}}px system-ui, -apple-system, Segoe UI, Arial`;
    const showEvery = Math.ceil(values.length/7);
    for(let i=0;i<labels.length;i++) {{
      if(i%showEvery!==0) continue;
      const x = pad + i*barW + barW*0.12;
      ctx.fillText(labels[i].slice(0,10), x, h - 5*(window.devicePixelRatio||1));
    }}
  }})();
  </script>
  """
  return html_shell(title, body)

def render_chronologie_page():
  body = f"""
  <div class="topbar">
    <div class="brand">
      <div class="badge" aria-hidden="true">
        <svg viewBox="0 0 24 24"><path d="M7 2h2v2h6V2h2v2h3v18H4V4h3V2zm13 6H6v12h14V8z"/></svg>
      </div>
      <div>
        <h1 data-i18n data-de="FSA Trendbarometer – Chronologie" data-en="FSA Trend Barometer – Chronology"></h1>
        <div class="sub" data-i18n data-de="Monate (Detail-Archiv). Hauptsicht bleibt Jahr/Halbjahr." data-en="Months (detail archive). Primary view remains year/half-year."></div>
      </div>
    </div>
    <div class="btnrow">
      <a class="btn" href="./index.html"><span class="dot"></span><span data-i18n data-de="Start" data-en="Home"></span></a>
      <a class="btn" href="./dashboard.html"><span class="dot"></span><span data-i18n data-de="Dashboard" data-en="Dashboard"></span></a>
      <button class="btn" id="langBtn" onclick="__setLang((localStorage.getItem('fsa_trend_lang')||'de')==='de'?'en':'de')"><span class="dot"></span>DE</button>
    </div>
  </div>

  <div class="card">
    <div id="list" class="note" data-i18n data-de="Lade..." data-en="Loading..."></div>
  </div>

  <script>
  (async function(){{
    const el = document.getElementById('list');
    const lang = localStorage.getItem('fsa_trend_lang') || 'de';
    const r = await fetch('./data/manifest.json?nocache=' + Date.now());
    const mf = await r.json();
    const years = Object.keys(mf.years||{{}}).sort().reverse();
    let html = '';
    years.forEach(y=>{{
      const months = (mf.years[y].months||[]).slice().sort().reverse();
      html += `<div style="margin:10px 0; padding:12px; border:1px solid rgba(212,175,55,.14); border-radius:14px; background:rgba(2,6,23,.25);">
        <div style="font-weight:700; margin-bottom:6px;">${{y}}</div>
        <div style="display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:8px;">` +
        months.map(m=>`<a class="btn" href="./${{m}}.html?nocache=${{Date.now()}}"><span class="dot"></span>${{m}}</a>`).join('') +
        `</div>
      </div>`;
    }});
    el.innerHTML = html || ((lang==='en')?'No months available.':'Keine Monate verfügbar.');
  }})();
  </script>
  """
  return html_shell("FSA Trendbarometer – Chronologie", body)

def main():
  parser = argparse.ArgumentParser()
  parser.add_argument("--month", default="", help="YYYY-MM (optional)")
  args = parser.parse_args()

  sources = load_json(SOURCES_FILE)
  lexicon = load_json(LEXICON_FILE)

  DATA_DIR.mkdir(parents=True, exist_ok=True)
  PAGES_DIR.mkdir(parents=True, exist_ok=True)

  # Decide target month
  if args.month and re.match(r"^\d{4}-\d{2}$", args.month):
    y, m = map(int, args.month.split("-"))
  else:
    # previous month (UTC)
    now = dt.datetime.utcnow()
    y, m = now.year, now.month
    m -= 1
    if m == 0:
      y -= 1
      m = 12

  # Build month report + save JSON
  month_report = analyze_period(y, m, sources, lexicon)
  write_json(DATA_DIR / f"{y:04d}-{m:02d}.json", month_report)

  # Load all month reports (for year/halfyear aggregation)
  all_months = load_all_month_reports()
  write_manifest(all_months)

  # Aggregate per year and half-year for every year present
  by_year = {}
  for r in all_months:
    yr = int(r["period"]["year"])
    by_year.setdefault(yr, []).append(r)

  for yr, reps in by_year.items():
    reps_sorted = sorted(reps, key=lambda x: x["period"]["ym"])
    # Year
    agg_year = aggregate_reports(reps_sorted, "year", yr, str(yr))
    if agg_year:
      write_json(DATA_DIR / f"{yr}.json", agg_year)
      # Year page
      year_html = render_simple_aggregate_page(
        title=f"FSA Trendbarometer – Jahresübersicht {yr}",
        subtitle="Aggregation über Monatsdaten (nicht repräsentativ).",
        agg_json_path=f"./data/{yr}.json",
        back_link="./index.html"
      )
      (PAGES_DIR / f"{yr}.html").write_text(year_html, encoding="utf-8")

    # Half-years
    h1 = [r for r in reps_sorted if int(r["period"]["ym"].split("-")[1]) <= 6]
    h2 = [r for r in reps_sorted if int(r["period"]["ym"].split("-")[1]) >= 7]
    agg_h1 = aggregate_reports(h1, "halfyear", yr, f"{yr}-H1")
    agg_h2 = aggregate_reports(h2, "halfyear", yr, f"{yr}-H2")
    if agg_h1:
      write_json(DATA_DIR / f"{yr}-h1.json", agg_h1)
      h1_html = render_simple_aggregate_page(
        title=f"FSA Trendbarometer – Halbjahr H1 {yr}",
        subtitle="Jan–Jun (Aggregation über Monatsdaten).",
        agg_json_path=f"./data/{yr}-h1.json",
        back_link=f"./{yr}.html"
      )
      (PAGES_DIR / f"{yr}-h1.html").write_text(h1_html, encoding="utf-8")
    if agg_h2:
      write_json(DATA_DIR / f"{yr}-h2.json", agg_h2)
      h2_html = render_simple_aggregate_page(
        title=f"FSA Trendbarometer – Halbjahr H2 {yr}",
        subtitle="Jul–Dez (Aggregation über Monatsdaten).",
        agg_json_path=f"./data/{yr}-h2.json",
        back_link=f"./{yr}.html"
      )
      (PAGES_DIR / f"{yr}-h2.html").write_text(h2_html, encoding="utf-8")

  # Write core pages
  (PAGES_DIR / "index.html").write_text(render_index_page(), encoding="utf-8")
  (PAGES_DIR / "chronologie.html").write_text(render_chronologie_page(), encoding="utf-8")

  # NOTE: dashboard.html is maintained as a static file in repo (optional).
  # If present, it will read manifest.json + aggregate json files.

  print("OK:", utc_now_iso(), "generated", f"{y:04d}-{m:02d}")

if __name__ == "__main__":
  main()

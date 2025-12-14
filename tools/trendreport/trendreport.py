#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
FSA Trendreport Generator – v5 (Dashboard-ready)
- Strikter Monatsfilter (Anti-Fake-Backfill): nur Items mit Datum im Zielmonat werden gezählt
- Schreibt:
  pages/trend/data/YYYY-MM.json  (inkl. items[] + quality + topic_counts)
  pages/trend/data/manifest.json (Auto-Index: years, months_by_year, summary)
  pages/trend/YYYY-MM.html       (KPI + Charts + Quellen + Item-Karten)
  pages/trend/index.html         (Chronologie)
  pages/trend/YYYY.html          (Jahresübersicht)
  pages/trend/YYYY-rundflug.html (Jahresstory)
- Keine externen Ressourcen, nur Inline CSS/JS + Inline SVG
"""

from __future__ import annotations
import os
import re
import json
import glob
from datetime import datetime, timezone
from collections import Counter, defaultdict
from typing import Any, Dict, List, Optional, Tuple

import requests
import feedparser

TZ_UTC = timezone.utc

REPO_ROOT = os.getenv("GITHUB_WORKSPACE", os.getcwd())
TOOLS_DIR = os.path.join(REPO_ROOT, "tools", "trendreport")
PAGES_DIR = os.path.join(REPO_ROOT, "pages", "trend")
DATA_DIR = os.path.join(PAGES_DIR, "data")

SOURCES_PATH = os.path.join(TOOLS_DIR, "sources.json")
LEX_PATH = os.path.join(TOOLS_DIR, "lexicon_de.json")

UA = "FSA-Trendreport/5.0 (GitHub Actions)"
TIMEOUT = 20


# -------------------- utils --------------------

def _safe_mkdir(path: str) -> None:
    os.makedirs(path, exist_ok=True)

def _read_json(path: str) -> dict:
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)

def _write_text(path: str, text: str) -> None:
    _safe_mkdir(os.path.dirname(path))
    with open(path, "w", encoding="utf-8") as f:
        f.write(text)

def _write_json(path: str, data: dict) -> None:
    _safe_mkdir(os.path.dirname(path))
    with open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

def _strip_html(s: str) -> str:
    s = s or ""
    s = re.sub(r"<[^>]+>", " ", s)
    s = re.sub(r"\s+", " ", s).strip()
    return s

def _norm(s: str) -> str:
    s = (s or "").lower().strip()
    s = re.sub(r"\s+", " ", s)
    return s

def _tokens(s: str) -> List[str]:
    s = _norm(s)
    parts = re.split(r"[^a-z0-9äöüß]+", s, flags=re.IGNORECASE)
    return [p for p in parts if len(p) >= 3]

def _month_range(year: int, month: int) -> Tuple[datetime, datetime]:
    start = datetime(year, month, 1, tzinfo=TZ_UTC)
    if month == 12:
        end = datetime(year + 1, 1, 1, tzinfo=TZ_UTC)
    else:
        end = datetime(year, month + 1, 1, tzinfo=TZ_UTC)
    return start, end

def _entry_datetime(entry) -> Optional[datetime]:
    # feedparser time.struct_time
    for key in ("published_parsed", "updated_parsed"):
        t = getattr(entry, key, None)
        if t:
            try:
                return datetime(*t[:6], tzinfo=TZ_UTC)
            except Exception:
                pass

    # string fallback
    for key in ("published", "updated"):
        s = getattr(entry, key, None)
        if isinstance(s, str) and s.strip():
            try:
                import email.utils
                d = email.utils.parsedate_to_datetime(s)
                if d.tzinfo:
                    d = d.astimezone(TZ_UTC)
                return d.replace(tzinfo=TZ_UTC)
            except Exception:
                return None
    return None

def _target_month_from_env_or_previous(now_utc: datetime) -> Tuple[int, int]:
    forced = (os.getenv("TREND_MONTH") or "").strip()
    if re.match(r"^\d{4}-\d{2}$", forced):
        y = int(forced[:4])
        m = int(forced[5:7])
        if 1 <= m <= 12:
            return y, m
    # default previous month
    y = now_utc.year
    m = now_utc.month - 1
    if m == 0:
        m = 12
        y -= 1
    return y, m

def _sentiment_score(tokens: List[str], lex: dict) -> int:
    pos = set(lex.get("positive", []))
    neg = set(lex.get("negative", []))
    score = 0
    for t in tokens:
        if t in pos:
            score += 1
        if t in neg:
            score -= 1
    return score


# -------------------- fetch --------------------

def _fetch_feed(url: str) -> feedparser.FeedParserDict:
    headers = {"User-Agent": UA, "Accept": "application/rss+xml,application/atom+xml,text/xml;q=0.9,*/*;q=0.8"}
    r = requests.get(url, headers=headers, timeout=TIMEOUT)
    r.raise_for_status()
    return feedparser.parse(r.content)


# -------------------- html renderers --------------------

def _html_base(title: str, body: str, extra_js: str = "") -> str:
    return f"""<!doctype html>
<html lang="de">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>{title}</title>
  <meta name="description" content="FSA Trendreport – Monats- und Jahresübersichten, reproduzierbar, nicht repräsentativ.">
  <style>
    :root{{
      --bg:#050814; --bg2:#020617;
      --panel:rgba(15,23,42,.92); --panel2:rgba(15,23,42,.82);
      --text:#e9edf3; --muted:#97a0ad;
      --gold:#d4af37; --gold2:#f1d070;
      --ring:rgba(212,175,55,.25);
      --shadow:0 12px 35px rgba(0,0,0,.55);
      --radius:16px; --maxw:980px;
    }}
    *{{box-sizing:border-box}}
    body{{
      margin:0;
      background: radial-gradient(900px 520px at 20% 10%, rgba(212,175,55,.14), transparent 55%),
                  radial-gradient(780px 520px at 80% 20%, rgba(241,208,112,.10), transparent 60%),
                  linear-gradient(180deg, var(--bg), var(--bg2));
      color:var(--text);
      font-family: system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;
    }}
    a{{color:var(--gold2); text-decoration:none}}
    a:hover{{text-decoration:underline}}
    .wrap{{max-width:var(--maxw); margin:0 auto; padding:26px 18px 70px}}
    .top{{display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px}}
    h1{{margin:0; font-size:18px}}
    .muted{{color:var(--muted)}}
    .btn{{
      display:inline-flex; align-items:center; gap:10px;
      border:1px solid rgba(212,175,55,.30);
      background:linear-gradient(180deg, rgba(15,23,42,.82), rgba(15,23,42,.62));
      color:var(--text);
      padding:10px 12px;
      border-radius:12px;
      box-shadow:var(--shadow);
      cursor:pointer;
      user-select:none;
      text-decoration:none;
    }}
    .btn .dot{{width:10px; height:10px; border-radius:50%; background:rgba(241,208,112,.65); box-shadow:0 0 0 6px rgba(212,175,55,.14)}}
    .card{{
      margin-top:14px;
      background:var(--panel);
      border:1px solid rgba(212,175,55,.22);
      border-radius:var(--radius);
      box-shadow:var(--shadow);
      padding:16px;
    }}
    .card h2{{margin:0 0 8px; font-size:15px}}
    .kpi{{display:grid; grid-template-columns:repeat(4,1fr); gap:10px; margin-top:10px}}
    @media (max-width: 760px){{ .kpi{{grid-template-columns:1fr 1fr}} }}
    @media (max-width: 520px){{ .kpi{{grid-template-columns:1fr}} }}
    .kpi .box{{
      background:var(--panel2);
      border:1px solid rgba(212,175,55,.18);
      border-radius:14px;
      padding:12px;
      min-height:74px;
    }}
    .kpi .v{{font-size:22px; margin:2px 0 2px}}
    .kpi .l{{font-size:12px; color:var(--muted)}}
    .chartBox{{
      margin-top:10px;
      padding:10px;
      background:rgba(255,255,255,.03);
      border:1px solid rgba(212,175,55,.14);
      border-radius:14px;
    }}
    table{{width:100%; border-collapse:collapse; font-size:12px}}
    th,td{{padding:8px 8px; border-bottom:1px solid rgba(212,175,55,.12); text-align:left; vertical-align:top}}
    th{{color:rgba(233,237,243,.90)}}
    .cards{{display:grid; grid-template-columns:repeat(2,1fr); gap:10px; margin-top:10px}}
    @media (max-width: 900px){{ .cards{{grid-template-columns:1fr}} }}
    .item{{
      background:var(--panel2);
      border:1px solid rgba(212,175,55,.16);
      border-radius:14px;
      padding:12px;
    }}
    .item .t{{font-weight:700; font-size:13px; line-height:1.25}}
    .item .m{{margin-top:6px; font-size:12px; color:rgba(233,237,243,.84); line-height:1.35}}
    .item .meta{{margin-top:8px; display:flex; gap:10px; flex-wrap:wrap; font-size:11px; color:var(--muted)}}
  </style>
</head>
<body>
  <div class="wrap">
    {body}
  </div>

  <script>
    const I18N = {{
      de: {{
        btn_lang:"DE",
        btn_dash:"Dashboard",
        btn_idx:"Chronologie",
        btn_year:"Jahresübersicht",
        btn_flight:"Trend-Rundflug",
        lbl_items:"Items (Monat)",
        lbl_sent:"Tonalität (Score)",
        lbl_top:"Top-Thema",
        lbl_src:"Quellen OK/Total",
        sec_topics:"Themenverteilung (Monat)",
        sec_sources:"Quellen (Monat)",
        sec_items:"Beobachtete Beiträge (Monat)",
        sec_note:"Hinweis",
        note:"Dieses Trendbild basiert auf öffentlich zugänglichen Online-Signalen (RSS/Atom) und ist nicht repräsentativ. Datenqualität wird ausgewiesen."
      }},
      en: {{
        btn_lang:"EN",
        btn_dash:"Dashboard",
        btn_idx:"Timeline",
        btn_year:"Year overview",
        btn_flight:"Trend flight",
        lbl_items:"Items (month)",
        lbl_sent:"Tone (score)",
        lbl_top:"Top topic",
        lbl_src:"Sources OK/Total",
        sec_topics:"Topic distribution (month)",
        sec_sources:"Sources (month)",
        sec_items:"Observed items (month)",
        sec_note:"Note",
        note:"This trend view uses publicly available online signals (RSS/Atom) and is not representative. Data quality is shown."
      }}
    }};

    function getLang() {{
      return (localStorage.getItem("fsa_lang") || document.documentElement.lang || "de").startsWith("en") ? "en" : "de";
    }}
    function setLang(lang) {{
      const L = lang === "en" ? "en" : "de";
      localStorage.setItem("fsa_lang", L);
      document.documentElement.lang = L;
      document.querySelectorAll("[data-i18n]").forEach(el => {{
        const k = el.getAttribute("data-i18n");
        if (I18N[L][k] !== undefined) el.textContent = I18N[L][k];
      }});
      const lbl = document.getElementById("langLabel");
      if (lbl) lbl.textContent = L.toUpperCase();
    }}
    const lb = document.getElementById("langBtn");
    if (lb) lb.addEventListener("click", () => setLang(getLang() === "de" ? "en" : "de"));
    setLang(getLang());
  </script>
  {extra_js}
</body>
</html>
"""

def _svg_bar_topics(topics: List[dict]) -> str:
    # Simple inline SVG bar chart
    w, h = 660, 160
    padL, padR, padT = 200, 20, 18
    innerW = w - padL - padR
    rows = topics[:7]
    maxv = max([t.get("count", 0) for t in rows] + [1])
    y = 18
    parts = []
    for t in rows:
        cnt = int(t.get("count", 0))
        bw = int(innerW * (cnt / maxv)) if maxv else 0
        label = t.get("label_de") or t.get("key")
        parts.append(
            f'<text x="0" y="{y}" fill="currentColor" font-size="12">{label}</text>'
            f'<rect x="{padL}" y="{y-10}" width="{bw}" height="10" rx="4" fill="rgba(212,175,55,.45)"></rect>'
            f'<text x="{padL+bw+8}" y="{y}" fill="rgba(233,237,243,.85)" font-size="12">{cnt}</text>'
        )
        y += 18
    return f"""
      <svg width="100%" viewBox="0 0 {w} {h}" role="img" aria-label="Topics">
        <rect x="0" y="0" width="{w}" height="{h}" rx="14" fill="rgba(0,0,0,.18)"></rect>
        <g transform="translate(12,14)" fill="none">
          {''.join(parts) if parts else '<text x="0" y="18" fill="rgba(233,237,243,.65)" font-size="12">—</text>'}
        </g>
      </svg>
    """

def render_month_html(data: dict) -> str:
    ym = data["ym"]
    year = data["year"]
    items = data.get("items", [])[:24]

    item_cards = []
    for it in items:
        title = (it.get("title") or "").replace("<", "&lt;").replace(">", "&gt;")
        link = it.get("link") or ""
        snippet = (it.get("snippet") or "").replace("<", "&lt;").replace(">", "&gt;")
        src = it.get("source") or ""
        pub = it.get("published") or ""
        topics = ", ".join(it.get("topics") or [])
        item_cards.append(f"""
          <div class="item">
            <div class="t">{f'<a href="{link}" target="_blank" rel="noopener noreferrer">{title}</a>' if link else title}</div>
            <div class="m">{snippet}</div>
            <div class="meta">
              <span>{src}</span><span>{pub}</span>{f'<span>Topics: {topics}</span>' if topics else ''}
            </div>
          </div>
        """)

    q = data.get("quality", {})
    sources_ok = q.get("sources_ok", 0)
    sources_total = q.get("sources_total", 0)

    body = f"""
      <div class="top">
        <div>
          <h1>FSA Trendreport · {ym}</h1>
          <div class="muted">Generated: {data.get("generated_at","")} (UTC)</div>
        </div>
        <div style="display:flex; gap:10px; align-items:center; flex-wrap:wrap;">
          <button class="btn" id="langBtn" type="button"><span class="dot"></span><span id="langLabel">DE</span></button>
          <a class="btn" href="dashboard.html"><span class="dot"></span><span data-i18n="btn_dash">Dashboard</span></a>
          <a class="btn" href="index.html"><span class="dot"></span><span data-i18n="btn_idx">Chronologie</span></a>
          <a class="btn" href="{year}.html"><span class="dot"></span><span data-i18n="btn_year">Jahresübersicht</span></a>
          <a class="btn" href="{year}-rundflug.html"><span class="dot"></span><span data-i18n="btn_flight">Trend-Rundflug</span></a>
        </div>
      </div>

      <div class="card">
        <h2>KPIs</h2>
        <div class="kpi">
          <div class="box"><div class="v">{data.get("items_total",0)}</div><div class="l" data-i18n="lbl_items">Items (Monat)</div></div>
          <div class="box"><div class="v">{data.get("sentiment",{}).get("avg",0):.2f}</div><div class="l" data-i18n="lbl_sent">Tonalität (Score)</div></div>
          <div class="box"><div class="v">{data.get("top_topic_de","—")}</div><div class="l" data-i18n="lbl_top">Top-Thema</div></div>
          <div class="box"><div class="v">{sources_ok}/{sources_total}</div><div class="l" data-i18n="lbl_src">Quellen OK/Total</div></div>
        </div>
      </div>

      <div class="card">
        <h2 data-i18n="sec_topics">Themenverteilung (Monat)</h2>
        <div class="chartBox">{_svg_bar_topics(data.get("topics", []))}</div>
      </div>

      <div class="card">
        <h2 data-i18n="sec_sources">Quellen (Monat)</h2>
        <div class="chartBox">
          <table>
            <thead><tr><th>Source</th><th>Cat</th><th>Items</th><th>Dropped</th><th>Failed</th></tr></thead>
            <tbody>
              {''.join([f"<tr><td>{(s.get('name') or '')}</td><td>{(s.get('category') or '')}</td><td>{s.get('items',0)}</td><td>{s.get('dropped_out_of_month',0)+s.get('dropped_undated',0)}</td><td>{'YES' if s.get('failed') else 'NO'}</td></tr>" for s in data.get("sources_used",[])])}
            </tbody>
          </table>
        </div>
      </div>

      <div class="card">
        <h2 data-i18n="sec_items">Beobachtete Beiträge (Monat)</h2>
        <div class="cards">
          {''.join(item_cards) if item_cards else '<div class="muted">—</div>'}
        </div>
      </div>

      <div class="card">
        <h2 data-i18n="sec_note">Hinweis</h2>
        <div class="muted" data-i18n="note">Dieses Trendbild basiert auf öffentlich zugänglichen Online-Signalen (RSS/Atom) und ist nicht repräsentativ. Datenqualität wird ausgewiesen.</div>
      </div>

      <!-- DATA_BLOB_JSON
      {json.dumps(data, ensure_ascii=False)}
      DATA_BLOB_JSON -->
    """
    return _html_base(f"FSA Trendreport – {ym}", body)

def render_index_html(manifest: dict) -> str:
    months = manifest.get("months", [])  # newest -> oldest
    rows = []
    for ym in months:
        s = (manifest.get("summary") or {}).get(ym, {})
        rows.append(f"""
          <a class="btn" style="display:flex; justify-content:space-between; width:100%; margin-top:10px; text-decoration:none;" href="{ym}.html">
            <span><span class="dot"></span> {ym}</span>
            <span class="muted">Items {s.get("items_total",0)} · Sent {float(s.get("sent_avg",0)):.2f} · Top {s.get("top_topic_de","—")}</span>
          </a>
        """)

    body = f"""
      <div class="top">
        <div>
          <h1>FSA Trendreport – Chronologie</h1>
          <div class="muted">Neu → Alt · Dashboard verfügbar</div>
        </div>
        <div style="display:flex; gap:10px; align-items:center; flex-wrap:wrap;">
          <button class="btn" id="langBtn" type="button"><span class="dot"></span><span id="langLabel">DE</span></button>
          <a class="btn" href="dashboard.html"><span class="dot"></span><span data-i18n="btn_dash">Dashboard</span></a>
        </div>
      </div>
      <div class="card">
        <h2>Monatsreports</h2>
        {''.join(rows) if rows else '<div class="muted">Noch keine Reports vorhanden.</div>'}
      </div>
    """
    return _html_base("FSA Trendreport – Chronologie", body)

def render_year_html(year: int, manifest: dict) -> str:
    months = (manifest.get("months_by_year") or {}).get(str(year), [])
    # months stored newest -> oldest in manifest, keep it
    rows = []
    for ym in months:
        s = (manifest.get("summary") or {}).get(ym, {})
        rows.append(f"""
          <a class="btn" style="display:flex; justify-content:space-between; width:100%; margin-top:10px; text-decoration:none;" href="{ym}.html">
            <span><span class="dot"></span> {ym}</span>
            <span class="muted">Items {s.get("items_total",0)} · Sent {float(s.get("sent_avg",0)):.2f} · Top {s.get("top_topic_de","—")}</span>
          </a>
        """)

    body = f"""
      <div class="top">
        <div>
          <h1>FSA Trendreport – Jahresübersicht {year}</h1>
          <div class="muted">Jahresseite basiert auf Monatsdaten (nicht repräsentativ).</div>
        </div>
        <div style="display:flex; gap:10px; align-items:center; flex-wrap:wrap;">
          <button class="btn" id="langBtn" type="button"><span class="dot"></span><span id="langLabel">DE</span></button>
          <a class="btn" href="dashboard.html"><span class="dot"></span><span data-i18n="btn_dash">Dashboard</span></a>
          <a class="btn" href="{year}-rundflug.html"><span class="dot"></span><span data-i18n="btn_flight">Trend-Rundflug</span></a>
          <a class="btn" href="index.html"><span class="dot"></span><span data-i18n="btn_idx">Chronologie</span></a>
        </div>
      </div>
      <div class="card">
        <h2>Monate</h2>
        {''.join(rows) if rows else '<div class="muted">Noch keine Monatsdaten für dieses Jahr.</div>'}
      </div>
    """
    return _html_base(f"FSA Trendreport – Jahresübersicht {year}", body)

def render_rundflug_html(year: int, manifest: dict) -> str:
    months = (manifest.get("months_by_year") or {}).get(str(year), [])
    months_count = len(months)

    # build a simple story from top topics
    topic_sum = Counter()
    for ym in months:
        s = (manifest.get("summary") or {}).get(ym, {})
        tc = s.get("topic_counts") or {}
        for k,v in tc.items():
            topic_sum[k] += int(v)

    top = topic_sum.most_common(4)
    top_lines = "".join([f"<li>{k}: {v}</li>" for k,v in top]) if top else "<li>—</li>"

    body = f"""
      <div class="top">
        <div>
          <h1>FSA Trendreport – Trend-Rundflug {year}</h1>
          <div class="muted">Jahresstory aus Monatsdaten · vorhandene Monate: {months_count}</div>
        </div>
        <div style="display:flex; gap:10px; align-items:center; flex-wrap:wrap;">
          <button class="btn" id="langBtn" type="button"><span class="dot"></span><span id="langLabel">DE</span></button>
          <a class="btn" href="dashboard.html"><span class="dot"></span><span data-i18n="btn_dash">Dashboard</span></a>
          <a class="btn" href="{year}.html"><span class="dot"></span><span data-i18n="btn_year">Jahresübersicht</span></a>
          <a class="btn" href="index.html"><span class="dot"></span><span data-i18n="btn_idx">Chronologie</span></a>
        </div>
      </div>

      <div class="card">
        <h2>Top-Themen (Summe über Monate)</h2>
        <ul class="muted">{top_lines}</ul>
        <div class="muted" style="margin-top:10px;">
          Hinweis: Wenn Quellen keine Historie liefern, bleiben Monate dünn/leer – das ist Absicht (Anti-Fake-Backfill).
        </div>
      </div>

      <div class="card">
        <h2>Kapitel (neu → alt)</h2>
        {''.join([f'<a class="btn" style="display:flex; justify-content:space-between; width:100%; margin-top:10px; text-decoration:none;" href="{ym}.html"><span><span class="dot"></span> {ym}</span><span class="muted">Öffnen</span></a>' for ym in months]) if months else '<div class="muted">—</div>'}
      </div>
    """
    return _html_base(f"FSA Trendreport – Trend-Rundflug {year}", body)


# -------------------- manifest builder --------------------

def build_manifest() -> dict:
    files = sorted(glob.glob(os.path.join(DATA_DIR, "*.json")))
    ym_list = []
    summary = {}
    topic_keys = []
    topic_labels_de = {}

    for fp in files:
        base = os.path.basename(fp)
        if base == "manifest.json":
            continue
        if not re.match(r"^\d{4}-\d{2}\.json$", base):
            continue
        d = _read_json(fp)
        ym = d.get("ym") or base.replace(".json","")
        ym_list.append(ym)

        # topic counts per key
        tc = {}
        for t in d.get("topics", []):
            tc[t.get("key")] = int(t.get("count", 0))
            if t.get("key") and (t.get("label_de")):
                topic_labels_de[t.get("key")] = t.get("label_de")

        if not topic_keys:
            topic_keys = [t.get("key") for t in d.get("topics", []) if t.get("key")]

        q = d.get("quality", {})
        summary[ym] = {
            "items_total": int(d.get("items_total", 0)),
            "sent_avg": float(d.get("sentiment", {}).get("avg", 0.0)),
            "top_topic_de": d.get("top_topic_de", "—"),
            "topic_counts": tc,
            "quality": {
                "sources_ok": int(q.get("sources_ok", 0)),
                "sources_total": int(q.get("sources_total", 0)),
                "sources_failed": int(q.get("sources_failed", 0)),
                "dropped_total": int(q.get("dropped_total", 0)),
                "note": q.get("note","")
            }
        }

    # newest -> oldest
    ym_list = sorted(set(ym_list), reverse=True)

    months_by_year = defaultdict(list)
    years = set()
    for ym in ym_list:
        y = int(ym[:4])
        years.add(y)
        months_by_year[str(y)].append(ym)

    return {
        "version": 1,
        "generated_at": datetime.now(TZ_UTC).strftime("%Y-%m-%d %H:%M:%S"),
        "years": sorted(list(years)),
        "months": ym_list,
        "months_by_year": dict(months_by_year),
        "summary": summary,
        "topic_keys": topic_keys,
        "topic_labels_de": topic_labels_de
    }


# -------------------- main --------------------

def main() -> None:
    _safe_mkdir(PAGES_DIR)
    _safe_mkdir(DATA_DIR)

    cfg = _read_json(SOURCES_PATH)
    lex = _read_json(LEX_PATH)

    now_utc = datetime.now(TZ_UTC)
    year, month = _target_month_from_env_or_previous(now_utc)
    start, end = _month_range(year, month)
    ym = f"{year:04d}-{month:02d}"

    topics_cfg = lex.get("topics", [])
    topic_defs = {t["key"]: t for t in topics_cfg}

    # aggregation
    items_total = 0
    sentiment_sum = 0
    sentiment_n = 0
    topic_counts = Counter()

    items_out: List[dict] = []
    sources_used: List[dict] = []

    sources_total = 0
    sources_ok = 0
    sources_failed = 0
    dropped_out_of_month_total = 0
    dropped_undated_total = 0

    for src in cfg.get("sources", []):
        url = src.get("url")
        name = src.get("name", url)
        cat = src.get("category", "misc")

        sources_total += 1
        src_items = 0
        dropped_out = 0
        dropped_undated = 0
        failed = False

        try:
            feed = _fetch_feed(url)
            for entry in feed.entries:
                dt_entry = _entry_datetime(entry)
                if dt_entry is None:
                    dropped_undated += 1
                    continue
                if not (start <= dt_entry < end):
                    dropped_out += 1
                    continue

                title = getattr(entry, "title", "") or ""
                summary_raw = getattr(entry, "summary", "") or getattr(entry, "description", "") or ""
                summary = _strip_html(summary_raw)
                link = getattr(entry, "link", "") or ""

                text = f"{title} {summary}"
                toks = _tokens(text)

                sc = _sentiment_score(toks, lex)
                sentiment_sum += sc
                sentiment_n += 1

                # topic hits list
                text_norm = _norm(text)
                hit_topics = []
                for t in topics_cfg:
                    kws = t.get("keywords", [])
                    if any(_norm(k) in text_norm for k in kws):
                        topic_counts[t["key"]] += 1
                        hit_topics.append(t["key"])

                items_out.append({
                    "source": name,
                    "category": cat,
                    "published": dt_entry.strftime("%Y-%m-%d %H:%M:%S"),
                    "title": title,
                    "link": link,
                    "snippet": (summary[:220] + "…") if len(summary) > 220 else summary,
                    "sent": sc,
                    "topics": hit_topics
                })

                src_items += 1
                items_total += 1

            if src_items > 0:
                sources_ok += 1

        except Exception:
            failed = True
            sources_failed += 1

        dropped_out_of_month_total += dropped_out
        dropped_undated_total += dropped_undated

        sources_used.append({
            "name": f"{name} (FAILED)" if failed else name,
            "category": cat,
            "items": src_items,
            "dropped_out_of_month": dropped_out,
            "dropped_undated": dropped_undated,
            "failed": failed
        })

    sent_avg = (sentiment_sum / sentiment_n) if sentiment_n else 0.0

    # build topics output fixed order
    topic_list = []
    for key, tdef in topic_defs.items():
        topic_list.append({
            "key": key,
            "label_de": tdef.get("de", key),
            "label_en": tdef.get("en", key),
            "count": int(topic_counts.get(key, 0))
        })
    topic_list.sort(key=lambda x: x["count"], reverse=True)

    # top topic (if all zero -> "—")
    top_topic_de = "—"
    if topic_list and topic_list[0]["count"] > 0:
        top_topic_de = topic_list[0]["label_de"]

    # quality note
    note = "OK"
    if items_total < 15 or sources_ok < 2:
        note = "DÜNN"
    if items_total < 5 or sources_ok < 1:
        note = "SEHR DÜNN"

    data = {
        "version": 5,
        "year": year,
        "month": month,
        "ym": ym,
        "generated_at": now_utc.strftime("%Y-%m-%d %H:%M:%S"),
        "items_total": int(items_total),
        "sentiment": {"sum": int(sentiment_sum), "n": int(sentiment_n), "avg": float(sent_avg)},
        "topics": topic_list,
        "top_topic_de": top_topic_de,
        "items": items_out[:80],
        "quality": {
            "sources_ok": int(sources_ok),
            "sources_total": int(sources_total),
            "sources_failed": int(sources_failed),
            "dropped_out_of_month": int(dropped_out_of_month_total),
            "dropped_undated": int(dropped_undated_total),
            "dropped_total": int(dropped_out_of_month_total + dropped_undated_total),
            "note": note
        },
        "sources_used": sources_used
    }

    # write month json + html
    _write_json(os.path.join(DATA_DIR, f"{ym}.json"), data)
    _write_text(os.path.join(PAGES_DIR, f"{ym}.html"), render_month_html(data))

    # rebuild manifest + index/year/rundflug pages
    manifest = build_manifest()
    _write_json(os.path.join(DATA_DIR, "manifest.json"), manifest)
    _write_text(os.path.join(PAGES_DIR, "index.html"), render_index_html(manifest))

    for y in manifest.get("years", []):
        _write_text(os.path.join(PAGES_DIR, f"{y}.html"), render_year_html(int(y), manifest))
        _write_text(os.path.join(PAGES_DIR, f"{y}-rundflug.html"), render_rundflug_html(int(y), manifest))

    print(f"Generated {ym} | items={items_total} | sources_ok={sources_ok}/{sources_total} | note={note}")


if __name__ == "__main__":
    main()

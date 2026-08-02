(()=>{
'use strict';
const $=(s,r=document)=>r.querySelector(s);
const esc=v=>String(v??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
const norm=s=>String(s||'').replace(/\s+/g,' ').trim();
const parseNum=s=>{const m=String(s||'').match(/-?\d[\d.]*?(?:,\d+)?/);return m?Number(m[0].replace(/\./g,'').replace(',','.')):0};
function readValue(label){
  const nodes=[...document.querySelectorAll('div,article,section,li,tr')].filter(n=>norm(n.textContent).includes(label));
  nodes.sort((a,b)=>norm(a.textContent).length-norm(b.textContent).length);
  for(const n of nodes){const t=norm(n.textContent);const rest=t.slice(t.indexOf(label)+label.length);const m=rest.match(/-?\d[\d.]*?(?:,\d+)?\s*(?:€(?:\/Monat)?|%)/);if(m)return m[0];}
  return '—';
}
function money(v){if(v==='—')return v;const n=parseNum(v);return new Intl.NumberFormat('de-DE',{style:'currency',currency:'EUR',maximumFractionDigits:0}).format(n)+(String(v).includes('/Monat')?' / Monat':'');}
function build(){
  const host=$('#academyFinal'); if(!host)return;
  let sec=$('#academyRealityCheck');
  if(!sec){sec=document.createElement('section');sec.id='academyRealityCheck';sec.className='academy-reality-check';const bridge=$('#academySetupBridge');bridge?host.insertBefore(sec,bridge):host.append(sec);}
  const freeRaw=readValue('Heute frei verfügbar');
  const requiredRaw=readValue('Erforderliche monatliche Rücklage');
  const capitalRaw=readValue('Modellierter Kapitalbedarf');
  const pensionRaw=readValue('Hochgerechnete gesetzliche Rente');
  const coverageRaw=readValue('Deckung des Wunschlebens');
  const wishesRaw=readValue('Kosten ausgewählter Wünsche');
  const gapRaw=readValue('Monatliche Versorgungslücke');
  const free=parseNum(freeRaw), required=parseNum(requiredRaw), coverage=parseNum(coverageRaw), capital=parseNum(capitalRaw);
  const monthlyChange=Math.max(0,(free<0?Math.abs(free):0)+required);
  const status=free>=0&&coverage>=80?'green':free>=0&&coverage>=40?'yellow':'red';
  const statusTitle=status==='green'?'Dein Plan ist grundsätzlich tragfähig':status==='yellow'?'Dein Plan ist nur mit deutlichen Veränderungen tragfähig':'Mit den heutigen Eingaben ist dein Wunschleben nicht erreichbar';
  const consequence=status==='red'
    ?`Deine heutigen Einnahmen reichen bereits für den aktuellen Bedarf nicht vollständig aus. Gleichzeitig verlangt dein langfristiger Plan einen erheblichen Vermögensaufbau. Mit einem monatlichen Defizit kann dieses Kapital nicht entstehen. Der Plan muss deshalb nicht verworfen, aber grundlegend verändert werden.`
    :status==='yellow'
    ?`Ein Teil deines Wunschlebens ist finanzierbar. Für die vollständige Umsetzung müssen Einkommen, Sparleistung, Zeitrahmen oder Prioritäten jedoch dauerhaft verbessert werden.`
    :`Deine heutigen Werte bilden bereits eine belastbare Grundlage. Trotzdem sollte der Plan regelmäßig überprüft werden, weil Einkommen, Kosten, Gesundheit und Lebensziele sich verändern.`;
  sec.innerHTML=`
    <div class="arc-head"><span>Die Akademie legt den Finger in die offene Wunde</span><h3>Was deine Zahlen wirklich über dein geplantes Leben sagen</h3><p>Diese Auswertung wiederholt nicht nur Ergebnisse. Sie übersetzt deine Angaben in eine ehrliche Aussage darüber, ob dein Wunschleben mit deinem heutigen finanziellen Weg zusammenpasst.</p></div>
    <div class="arc-status ${status}"><strong>${esc(statusTitle)}</strong><p>${esc(consequence)}</p></div>
    <div class="arc-grid">
      <article><span>Heute frei verfügbar</span><strong>${esc(freeRaw)}</strong><p>${free<0?'Du verbrauchst derzeit mehr, als dein Einkommen für den geplanten Bedarf hergibt. Vermögensaufbau beginnt erst, wenn dieses Minus geschlossen ist.':'Es besteht heute ein positiver finanzieller Spielraum.'}</p></article>
      <article><span>Erforderliche Rücklage</span><strong>${esc(requiredRaw)}</strong><p>Dieser Betrag müsste zusätzlich und dauerhaft aus dem Einkommen tragbar sein. Er darf nicht mit einem einmaligen Wunsch oder einer unverbindlichen Hoffnung verwechselt werden.</p></article>
      <article><span>Modellierter Kapitalbedarf</span><strong>${esc(capitalRaw)}</strong><p>Die Zahl ist kein Kontostand, den du morgen besitzen musst. Sie zeigt die Größenordnung, die hinter deinem geplanten Lebensstandard und den gewählten Wünschen steht.</p></article>
      <article><span>Deckung des Wunschlebens</span><strong>${esc(coverageRaw)}</strong><p>Der Deckungsgrad zeigt, welcher Anteil deines Plans mit den heutigen Annahmen voraussichtlich getragen werden kann.</p></article>
    </div>
    <div class="arc-truth"><h3>Der entscheidende Realitätscheck</h3><p><strong>Mit einem monatlichen Defizit lässt sich kein Vermögen aufbauen.</strong> Ein Kapitalbedarf von ${esc(money(capitalRaw))} kann nicht durch Hoffen, gelegentliches Sparen oder einzelne Anlagen geschlossen werden. Nach den aktuellen Modellwerten müsste sich dein monatlicher finanzieller Spielraum um ungefähr <strong>${esc(money(String(monthlyChange)))}</strong> verbessern, damit zunächst das heutige Minus und anschließend die erforderliche Rücklage getragen werden könnten.</p><p>Diese Größenordnung ist keine persönliche Empfehlung und keine Garantie. Sie zeigt aber ehrlich, wie weit Wunsch und heutige Realität auseinanderliegen.</p></div>
    <div class="arc-actions"><h3>Welche Überlegungen jetzt notwendig werden</h3><div class="arc-action-grid">
      <article><strong>1. Einkommen langfristig entwickeln</strong><p>Berufliche Qualifikation, Spezialisierung, Gehaltsentwicklung, ein Arbeitgeberwechsel, zusätzliche Verantwortung, Selbstständigkeit, ein Nebenerwerb oder unternehmerische Einnahmequellen können den finanziellen Spielraum verändern. Entscheidend ist nicht ein kurzfristiger Zusatzverdienst, sondern eine dauerhaft höhere Einkommensbasis.</p></article>
      <article><strong>2. Wünsche zeitlich ordnen</strong><p>Nicht jedes Ziel muss gleichzeitig finanziert werden. Große Wünsche können aufeinander aufgebaut, verschoben, verkleinert oder in Etappen umgesetzt werden. Priorität bedeutet deshalb auch, bewusst auf Reihenfolge zu achten.</p></article>
      <article><strong>3. Laufende Kosten und Lebensstandard prüfen</strong><p>Jede dauerhafte Ausgabe verringert den Betrag, der für Rücklagen und Vermögensaufbau zur Verfügung steht. Kosten zu prüfen bedeutet nicht, auf Lebensqualität zu verzichten, sondern zu entscheiden, welche Ausgaben dem eigenen Lebensziel wirklich dienen.</p></article>
      <article><strong>4. Zeit als Vermögensfaktor nutzen</strong><p>Ein früher Beginn verlängert die Aufbauphase. Ein später Beginn verlangt höhere monatliche Beiträge, mehr Einkommen, geringere Ziele oder einen späteren Ruhestand. Zeit kann fehlendes Einkommen nicht ersetzen, aber sie kann seine Wirkung verstärken.</p></article>
      <article><strong>5. Vermögensaufbau erst nach dem Fundament</strong><p>Anlagen, Immobilien, Edelmetalle, Bitcoin oder andere Vermögenswerte sind keine automatische Lösung für ein strukturelles monatliches Defizit. Zuerst müssen Einnahmen, Ausgaben, Reserve und Sicherheitsstruktur tragfähig sein.</p></article>
      <article><strong>6. Den Plan regelmäßig neu rechnen</strong><p>Jobverlust, Krankheit, Familie, Pflege, Chancen oder Einkommenssprünge verändern den Lebensweg. Deshalb wird dieser Stand jährlich als neue Version gesichert und mit der vorherigen Planung verglichen.</p></article>
    </div></div>
    <blockquote class="arc-quote">Wünsche kosten im ersten Moment nichts. Ihre Verwirklichung verlangt Einkommen, Zeit, Verantwortung und Entscheidungen.</blockquote>
    <div class="arc-turn"><h3>Vom Wünschen zum Handeln</h3><p>Bis hierhin hast du beschrieben, wie du leben möchtest. Ab jetzt beginnt der Teil, in dem aus Träumen Entscheidungen, aus Zahlen ein Fahrplan und aus Verantwortung ein belastbares Fundament wird.</p><p><strong>Die Akademie nimmt dir diese Entscheidungen nicht ab.</strong> Sie macht sichtbar, welche Konsequenzen deine Wünsche haben und welche Veränderungen grundsätzlich notwendig werden können, damit sie nicht nur Wünsche bleiben.</p></div>
  `;
}
let timer;const refresh=()=>{clearTimeout(timer);timer=setTimeout(build,180)};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(build,900));else setTimeout(build,900);
document.addEventListener('input',refresh,true);document.addEventListener('change',refresh,true);document.addEventListener('click',e=>{if(/berechnen|musterwerte/i.test(e.target?.textContent||''))setTimeout(build,500)},true);
new MutationObserver(refresh).observe(document.documentElement,{subtree:true,childList:true,characterData:true});
})();

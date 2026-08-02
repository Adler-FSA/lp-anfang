(()=>{
'use strict';
const $$=(s,r=document)=>[...r.querySelectorAll(s)];
const norm=s=>String(s||'').replace(/\s+/g,' ').trim();
const fire=el=>{el.dispatchEvent(new Event('input',{bubbles:true}));el.dispatchEvent(new Event('change',{bubbles:true}));};
const set=(el,value)=>{if(!el||value==null)return;el.value=value;fire(el);};
function labelText(el){const lab=el.closest('label')||document.querySelector(`label[for="${CSS.escape(el.id||'__none__')}"]`);return norm(lab?.textContent||el.getAttribute('aria-label')||el.placeholder||el.name||'');}
function byLabel(rx,types='input,textarea'){return $$(types).find(el=>rx.test(labelText(el)));}
const texts={
 why:'Ich wünsche mir ein Leben, in dem ich nicht bis zur Rente jeden Euro zweimal umdrehen muss. Ich möchte später frei entscheiden können, wie ich lebe, wohin ich reise und wie viel Zeit ich mit meiner Familie verbringe. Finanzielle Sicherheit bedeutet für mich, Entscheidungen aus Überzeugung treffen zu können und nicht aus Geldmangel.',
 vision:'Ich träume von einem Eigenheim mit Garten, einer glücklichen Familie mit zwei Kindern und genügend Zeit für die Menschen, die mir wichtig sind. Ich möchte jedes Jahr verreisen, später Europa mit einem Wohnmobil entdecken und im Ruhestand unabhängig leben, ohne ständig auf meine Ausgaben achten zu müssen. Außerdem möchte ich meinen Kindern später einen guten Start ins Leben ermöglichen.',
 wohnen:'Ich wünsche mir spätestens mit 35 Jahren ein eigenes Zuhause mit Garten. Es muss keine Villa sein, aber ein Ort, an dem meine Familie langfristig leben kann. Mir ist wichtig, dass die Immobilie möglichst vor meinem Ruhestand vollständig abbezahlt ist. Später möchte ich außerdem prüfen, ob ein barrierearmes Wohnen oder ein zeitweiser Wohnort im Ausland zu meinem Leben passt.',
 familie:'Ich wünsche mir eine feste Partnerschaft, eine Hochzeit und zwei Kinder. Ich möchte meiner Familie Sicherheit geben, Zeit mit meinen Kindern verbringen und ihnen später bei Ausbildung, Studium oder dem Start in das eigene Leben helfen können. Auch meine Eltern möchte ich unterstützen können, wenn sie im Alter Hilfe benötigen.',
 beruf-und-karriere:'Ich arbeite seit meinem 22. Lebensjahr als Sachbearbeiter in einem mittelständischen Unternehmen und verdiene 2.500 Euro netto. Mein Arbeitsplatz ist sicher, aber über meiner Position gibt es nur wenige Aufstiegsmöglichkeiten. Deshalb möchte ich mich weiterbilden, einen Arbeitgeberwechsel prüfen und langfristig eine zusätzliche Einkommensquelle aufbauen. Ich weiß, dass mein heutiges Einkommen für meine großen Ziele nicht ausreicht.',
 mobilitat:'Ich wünsche mir ein zuverlässiges Familienauto, das zu meinem Alltag und später zu meinen Kindern passt. Es soll komfortabel sein, aber meinen finanziellen Spielraum nicht dauerhaft überlasten. Später träume ich von einem Wohnmobil, mit dem ich gemeinsam mit meiner Familie längere Reisen durch Europa unternehmen kann.',
 freizeit-und-traume:'Ich möchte jedes Jahr bewusst verreisen und neue Orte kennenlernen. Reisen bedeuten für mich Erholung, gemeinsame Erinnerungen und Lebensqualität. Ein großer Traum ist eine längere Weltreise, die ich nicht auf Kredit bezahlen möchte. Gleichzeitig will ich auch heute Zeit und Budget für Hobbys und persönliche Interessen behalten.',
 personliche-entwicklung:'Ich möchte mich beruflich und persönlich weiterentwickeln. Eine gezielte Weiterbildung soll mir neue Aufgaben und ein höheres Einkommen ermöglichen. Außerdem möchte ich Sprachen lernen, mir bei wichtigen Entscheidungen Unterstützung holen und später vielleicht mein Wissen durch ein eigenes Projekt oder Vorträge weitergeben.',
 vermogensaufbau:'Ich möchte zuerst einen Notgroschen von mehreren Monatsausgaben aufbauen. Danach will ich regelmäßig in breit gestreute Wertpapiere oder Fonds investieren und einen begrenzten Teil langfristig in Bitcoin halten. Dabei geht es mir nicht um schnelles Geld, sondern um einen strukturierten Vermögensaufbau, der zu meinen Zielen und zu meinem Sicherheitsbedürfnis passt.',
 gesundheit-und-alter:'Ich möchte im Alter möglichst selbst entscheiden können, wie und wo ich lebe. Deshalb will ich frühzeitig für Pflege, Medikamente, notwendige Umbauten und Unterstützung im Alltag vorsorgen. Mein Ruhestand soll nicht nur irgendwie finanziert sein: Ich möchte weiterhin reisen, meine Familie unterstützen und unabhängig bleiben. Die gesetzliche Rente sehe ich als Grundlage, aber nicht als vollständige Finanzierung meines Wunschlebens.'
};
function fillDaniel(){
 document.getElementById('danielMusterNotice')?.remove();
 set(document.querySelector('#firstName')||byLabel(/vorname/i),'Daniel');
 set(document.querySelector('#lastName')||byLabel(/nachname/i),'Muster');
 set(document.querySelector('#why')||byLabel(/mein warum/i,'textarea,input'),texts.why);
 set(document.querySelector('#vision')||byLabel(/wie möchtest du später leben|wunschleben/i,'textarea,input'),texts.vision);
 Object.entries(texts).forEach(([key,value])=>{if(['why','vision'].includes(key))return;set(document.querySelector(`[data-life-section-input="${key}"]`),value);});
}
function isMusterButton(el){return /musterwerte|muster-version|muster version|beispiel laden/i.test(norm(el?.textContent));}
document.addEventListener('click',e=>{const btn=e.target.closest('button,a');if(!isMusterButton(btn))return;setTimeout(fillDaniel,500);setTimeout(fillDaniel,1200);},true);
const start=()=>setTimeout(()=>{document.getElementById('danielMusterNotice')?.remove();if(/^Daniel$/i.test(document.querySelector('#firstName')?.value||''))fillDaniel();},1300);
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
})();
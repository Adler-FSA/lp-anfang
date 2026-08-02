(()=>{
'use strict';
const $$=(s,r=document)=>[...r.querySelectorAll(s)];
const norm=s=>String(s||'').replace(/\s+/g,' ').trim();
const fire=el=>{el.dispatchEvent(new Event('input',{bubbles:true}));el.dispatchEvent(new Event('change',{bubbles:true}));};
const set=(el,value)=>{if(!el||value==null)return;el.value=value;fire(el);};
function labelText(el){const lab=el.closest('label')||document.querySelector(`label[for="${CSS.escape(el.id||'__none__')}"]`);return norm(lab?.textContent||el.getAttribute('aria-label')||el.placeholder||el.name||'');}
function byLabel(rx,types='input,textarea'){return $$(types).find(el=>rx.test(labelText(el)));}
function cardTitle(el){const card=el.closest('[data-wish-id],.wish-card,.goal-card,.card,article');return norm(card?.querySelector('h2,h3,h4,strong')?.textContent||'');}
const texts={
  why:'Ich möchte nicht mein gesamtes Leben nur arbeiten, Rechnungen bezahlen und auf den nächsten Urlaub warten. Ich wünsche mir ein selbstbestimmtes Leben mit meiner Familie, einem eigenen Zuhause, regelmäßigen Reisen und genügend finanzieller Sicherheit. Später möchte ich Entscheidungen aus Überzeugung treffen können und nicht, weil mein Kontostand mir jede Richtung vorgibt.',
  vision:'Ich träume von einem schuldenfreien Eigenheim mit Garten, einer glücklichen Familie mit zwei Kindern und genügend Zeit für die Menschen, die mir wichtig sind. Ich möchte jedes Jahr verreisen, später Europa mit einem Wohnmobil entdecken und im Ruhestand unabhängig leben. Außerdem möchte ich meine Kinder unterstützen und im Alter nicht ausschließlich von der gesetzlichen Rente abhängig sein.',
  profession:'Ich arbeite seit meinem 22. Lebensjahr als Sachbearbeiter in einem mittelständischen Unternehmen. Mein Arbeitsplatz ist relativ sicher, aber über meiner Position gibt es nur wenige Aufstiegsmöglichkeiten. Mit meinem heutigen Einkommen von 2.500 Euro netto kann ich normal leben, meine großen Lebensziele jedoch nicht vollständig finanzieren. Deshalb möchte ich mich weiterbilden und langfristig eine zusätzliche Einkommensquelle entwickeln.',
  eigenheim:'Ich wünsche mir spätestens mit 35 Jahren ein eigenes Zuhause. Es muss keine Villa sein, aber ein Ort mit genügend Platz für meine Familie und einem kleinen Garten. Mir ist wichtig, dass die Immobilie möglichst vor meinem Ruhestand vollständig abbezahlt ist.',
  familie:'Ich wünsche mir eine langfristige Partnerschaft, eine Hochzeit und zwei Kinder. Ich möchte meiner Familie Sicherheit bieten, Zeit mit meinen Kindern verbringen und ihnen später bei Ausbildung, Studium oder dem Start in das eigene Leben helfen können.',
  kinder:'Ich wünsche mir zwei Kinder. Mir ist wichtig, dass ich ihnen nicht nur Liebe und Zeit geben kann, sondern auch eine gute Ausbildung und einen sicheren Start in ihr eigenes Leben ermögliche.',
  hochzeit:'Ich möchte mit meiner Partnerin eine schöne Hochzeit feiern, ohne dafür jahrelang Schulden abzuzahlen. Die Feier soll persönlich und hochwertig sein, aber zu unserem finanziellen Weg passen.',
  weiterbildung:'Ich erkenne, dass mein erlernter Beruf als Sachbearbeiter nur begrenzte Aufstiegsmöglichkeiten bietet. Mit einer gezielten Weiterbildung möchte ich mich für besser bezahlte Fachaufgaben qualifizieren und mein Einkommen langfristig erhöhen.',
  nebenverdienst:'Ich möchte neben meinem Beruf eine zusätzliche Einkommensquelle aufbauen. Zunächst wünsche ich mir etwa 300 Euro im Monat, später sollen daraus 800 Euro oder mehr werden. Der Nebenverdienst soll mir zusätzlichen Spielraum geben und darf nicht nur ein kurzfristiger Kraftakt sein.',
  selbststaendig:'Ich kann mir vorstellen, später nebenberuflich oder vollständig selbstständig zu arbeiten. Bevor ich diesen Schritt gehe, möchte ich Erfahrungen sammeln, Rücklagen aufbauen und prüfen, ob daraus ein dauerhaft tragfähiges Einkommen entstehen kann.',
  auto:'Ich wünsche mir ein zuverlässiges Fahrzeug, das zu meinem Alltag und später zu meiner Familie passt. Es soll komfortabel sein, aber meinen finanziellen Spielraum nicht dauerhaft überlasten.',
  wohnmobil:'Ich möchte später gemeinsam mit meiner Partnerin längere Reisen unternehmen und Europa unabhängig entdecken. Ein Wohnmobil ist für mich kein spontaner Luxus, sondern ein langfristiger Lebenstraum.',
  urlaub:'Ich möchte jedes Jahr bewusst verreisen und neue Orte kennenlernen. Reisen bedeuten für mich Erholung, gemeinsame Erinnerungen und Lebensqualität. Dafür plane ich ein festes jährliches Budget ein.',
  weltreise:'Ich träume davon, mir einmal mehrere Wochen oder Monate Zeit für eine große Reise zu nehmen. Diese Reise soll nicht auf Kredit stattfinden, sondern aus einem dafür aufgebauten Budget bezahlt werden.',
  hobby:'Ich möchte neben Beruf und finanzieller Planung auch Zeit und Geld für meine persönlichen Interessen behalten. Mein Lebensplan soll nicht nur aus Sparen bestehen, sondern auch heute Lebensqualität ermöglichen.',
  notgroschen:'Ich möchte mehrere Monatsausgaben als sichere Reserve zurücklegen. Unerwartete Reparaturen, Krankheit oder ein Arbeitsplatzwechsel sollen mich nicht sofort zu einem Kredit oder zur Auflösung meiner langfristigen Anlagen zwingen.',
  etf:'Ich möchte regelmäßig und langfristig in breit gestreute Wertpapiere oder Fonds investieren. Dabei geht es mir nicht um schnelle Gewinne, sondern um einen planbaren Vermögensaufbau über viele Jahre.',
  bitcoin:'Ich möchte einen begrenzten Teil meines Vermögens langfristig in Bitcoin aufbauen. Dabei geht es mir nicht um schnelles Geld, sondern um eine zusätzliche dezentrale Form des Vermögensaufbaus neben klassischen Anlagen.',
  immobilie:'Ich kann mir später eine weitere Immobilie als Vermögenswert vorstellen. Dieses Ziel ist jedoch erst sinnvoll, wenn mein Eigenheim, meine Rücklagen und mein laufender finanzieller Spielraum tragfähig sind.',
  eltern:'Ich möchte meine Eltern später unterstützen können, falls Pflege, Hilfe im Alltag oder finanzielle Engpässe entstehen. Ich möchte dann nicht aus Geldmangel wegsehen müssen.',
  pflege:'Ich möchte im Alter möglichst selbst entscheiden können, wie und wo ich lebe. Deshalb möchte ich frühzeitig vorsorgen, damit Unterstützung, Pflege oder notwendige Umbauten nicht allein an finanziellen Grenzen scheitern.',
  ruhestand:'Ich möchte meinen Ruhestand nicht nur irgendwie finanzieren, sondern weiterhin reisen, meine Familie unterstützen und selbstbestimmt leben können. Die gesetzliche Rente sehe ich als Grundlage, aber nicht als vollständige Finanzierung meines Wunschlebens.',
  gesundheit:'Ich weiß, dass Gesundheit im Alter zu einem finanziellen Thema werden kann. Für Medikamente, Behandlungen, Mobilität, Haushaltshilfe und mögliche Pflege möchte ich eigene Reserven einplanen.',
  freiheit:'Für mich bedeutet finanzielle Freiheit nicht, nie wieder zu arbeiten. Sie bedeutet, meine Arbeitszeit und meine Entscheidungen stärker selbst bestimmen zu können, ohne ständig Angst vor der nächsten Rechnung zu haben.'
};
function choose(title,label){const s=(title+' '+label).toLowerCase();
 if(/eigenheim|eigentum|hausbau|schuldenfrei wohnen/.test(s))return texts.eigenheim;
 if(/hochzeit|heirat/.test(s))return texts.hochzeit;
 if(/kinder|familiengründung/.test(s))return texts.kinder;
 if(/familie|partnerschaft/.test(s))return texts.familie;
 if(/weiterbildung|qualifikation|karriere/.test(s))return texts.weiterbildung;
 if(/neben|zusätzliche einkommensquelle|zusatzeinkommen/.test(s))return texts.nebenverdienst;
 if(/selbstständig|unternehmen|gründung/.test(s))return texts.selbststaendig;
 if(/wohnmobil/.test(s))return texts.wohnmobil;
 if(/fahrzeug|auto|mobilität/.test(s))return texts.auto;
 if(/weltreise/.test(s))return texts.weltreise;
 if(/urlaub|reisen im ruhestand|reise/.test(s))return texts.urlaub;
 if(/hobby|freizeit|interessen|luxus/.test(s))return texts.hobby;
 if(/notgroschen|reserve|sicherheitspuffer/.test(s))return texts.notgroschen;
 if(/etf|fonds|wertpapier/.test(s))return texts.etf;
 if(/bitcoin|krypto|digitale vermögenswerte/.test(s))return texts.bitcoin;
 if(/immobilie|vermietung/.test(s))return texts.immobilie;
 if(/eltern/.test(s))return texts.eltern;
 if(/pflege/.test(s))return texts.pflege;
 if(/ruhestand|rente|alter/.test(s))return texts.ruhestand;
 if(/gesundheit|medikament|behandlung|barriere|haushaltshilfe/.test(s))return texts.gesundheit;
 if(/freiheit|passiv/.test(s))return texts.freiheit;
 return '';
}
function addNotice(){if(document.getElementById('danielMusterNotice'))return;const main=document.querySelector('main');if(!main)return;const box=document.createElement('aside');box.id='danielMusterNotice';box.className='academy-note daniel-muster-notice';box.innerHTML='<strong>Hinweis zur Muster-Version:</strong> Daniel Muster ist eine fiktive Beispielperson. Er füllt diesen Lebensplan so aus, wie es ein echter Käufer tun könnte. Seine Geschichte dient als Blaupause; der persönliche Lebensplan entsteht später vollständig aus den eigenen Angaben.';const first=main.querySelector('details,section');first?main.insertBefore(box,first):main.prepend(box);}
function fillDaniel(){
 set(document.querySelector('#firstName')||byLabel(/vorname/i),'Daniel');
 set(document.querySelector('#lastName')||byLabel(/nachname/i),'Muster');
 set(document.querySelector('#why')||byLabel(/mein warum/i,'textarea,input'),texts.why);
 set(document.querySelector('#vision')||byLabel(/wie möchtest du später leben|wunschleben/i,'textarea,input'),texts.vision);
 const profession=byLabel(/beruf|tätigkeit|ausbildung/i,'textarea,input');if(profession&&profession.type!=='number')set(profession,texts.profession);
 $$('textarea').forEach(el=>{if(el.id==='why'||el.id==='vision'||el.closest('#ownWishModal'))return;const current=norm(el.value);const title=cardTitle(el),label=labelText(el);const value=choose(title,label);if(value&&(!current||current.length<90||/beispiel|optional/i.test(current)))set(el,value);});
 $$('input[type="text"]').forEach(el=>{if(el.closest('#ownWishModal')||['firstName','lastName'].includes(el.id))return;const value=choose(cardTitle(el),labelText(el));if(value&&(!norm(el.value)||norm(el.value).length<30))set(el,value);});
 addNotice();
 setTimeout(()=>{document.querySelectorAll('button').forEach(()=>{});},50);
}
function isMusterButton(el){return /musterwerte|muster-version|muster version|beispiel laden/i.test(norm(el?.textContent));}
document.addEventListener('click',e=>{const btn=e.target.closest('button,a');if(!isMusterButton(btn))return;setTimeout(fillDaniel,700);setTimeout(fillDaniel,1500);},true);
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>{addNotice();setTimeout(()=>{const f=document.querySelector('#firstName')?.value;if(/^Daniel$/i.test(f||''))fillDaniel();},1400);});else{addNotice();setTimeout(()=>{const f=document.querySelector('#firstName')?.value;if(/^Daniel$/i.test(f||''))fillDaniel();},1400);}
})();
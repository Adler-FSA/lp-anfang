(()=>{
'use strict';
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const esc=v=>String(v??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
const titleOf=el=>(el?.querySelector(':scope>summary')?.textContent||el?.querySelector(':scope>h2')?.textContent||'').replace(/[+−–—]+\s*$/,'').trim();
function topDetails(){return $$('main>details');}
function byTitle(words){const arr=Array.isArray(words)?words:[words];return topDetails().find(el=>arr.some(w=>titleOf(el).toLowerCase().includes(w.toLowerCase())));}
function divider(before,kicker,title,text,quote){if(!before)return;const s=document.createElement('section');s.className='chapter-separator chapter-polished';s.innerHTML=`<span>${esc(kicker)}</span><h2>${esc(title)}</h2><p>${esc(text)}</p>${quote?`<blockquote>${esc(quote)}</blockquote>`:''}`;before.before(s);}
function rebuildJourney(){
  $$('.chapter-separator,.quote-break').forEach(n=>n.remove());
  const about=byTitle(['über mich','lebensziel']);
  const actual=byTitle(['ist-situation','finanzstatus']);
  const wishes=byTitle(['wünsche, ziele','wünsche und lebensereignisse']);
  const pension=byTitle(['altersvorsorge']);
  const gap=byTitle(['versorgungslücke','kapitalbedarf']);
  const life=byTitle(['lebensreise','lebensweg']);
  const age=byTitle(['im alter','gesundheit und alter']);
  const sovereignty=byTitle(['finanzielle souveränität']);
  divider(about,'Kapitel 1','Wer bin ich – und wie möchte ich leben?','Dein Lebensplan beginnt mit deiner Geschichte, deinen Werten und deiner Vorstellung von Freiheit.','Wer kein Ziel kennt, kann auch keinen Weg planen.');
  divider(actual,'Kapitel 2','Wo stehe ich heute?','Einkommen, Ausgaben, Rücklagen und Verpflichtungen bilden den ehrlichen Ausgangspunkt.','Jede große Zukunft beginnt mit einer ehrlichen Entscheidung über die Gegenwart.');
  divider(wishes,'Kapitel 3','Was wünsche ich mir?','Wünsche geben deinem Vermögensaufbau Richtung. Modellpreise und Prioritäten helfen bei der realistischen Einordnung.','Träume nicht dein Leben – lebe deinen Traum.');
  divider(pension||gap,'Kapitel 4','Wie bereite ich meine Zukunft vor?','Gesetzliche Rente, eigene Vorsorge und Zeit wirken gemeinsam auf deinen späteren Handlungsspielraum.','Zeit ist der stärkste Zins, den niemand kaufen kann.');
  divider(life||age,'Kapitel 5','Wie entwickelt sich mein Lebensweg?','Verantwortung, Gesundheit und finanzielle Bedürfnisse verändern sich in verschiedenen Lebensphasen.','Gesundheit ist unbezahlbar – ihre Folgen sind es leider nicht.');
  divider(sovereignty,'Kapitel 6','Was bedeutet mein Plan für meine Freiheit?','Die Auswertung verbindet deine Ziele mit deiner finanziellen Realität und zeigt mögliche Stellschrauben.','Finanzielle Souveränität beginnt dort, wo Wünsche zu einem Lebensplan werden.');
}
function cleanupAcademy(){
  const sov=byTitle(['finanzielle souveränität']);
  if(sov){$$('.academy-added',sov).forEach(n=>n.remove());}
  $$('.academy-added>summary').forEach(s=>{s.textContent=s.textContent.replace(/[+−–—]+\s*$/,'').trim();});
  const final=$('#academyFinal');
  if(final){const d=$('.academy-added',final);if(d)d.open=false;}
}
function buildPrintBook(){
  $('#printBook')?.remove();
  const book=document.createElement('article');book.id='printBook';book.className='print-book';
  const first=$('#firstName')?.value||'Mein', last=$('#lastName')?.value||'Lebensweg';
  const why=$('#why')?.value||'', vision=$('#vision')?.value||'';
  book.innerHTML=`<section class="print-cover"><img src="./77BC7C55-B63D-4E28-A882-029C4C11E043.png" alt="Lebensweg"><div class="print-cover-copy"><p class="print-eyebrow">Mein persönlicher Lebensplan</p><h1>${esc(first)} ${esc(last)}</h1><p>${esc(why)}</p><blockquote>Dein Wunschleben entsteht nicht durch Zufall, sondern durch einen Plan.</blockquote><small>Erstellt am ${new Intl.DateTimeFormat('de-DE').format(new Date())}</small></div></section>`;
  const intro=document.createElement('section');intro.className='print-page print-intro';intro.innerHTML=`<p class="print-eyebrow">Meine Lebensgeschichte</p><h2>Was ich für mein Leben plane</h2><p>${esc(vision||'Meine persönlichen Wünsche, Ziele und finanziellen Möglichkeiten werden in diesem Lebensplan zusammengeführt.')}</p><div class="print-quote">Jede große Zukunft beginnt mit einer ehrlichen Entscheidung über die Gegenwart.</div>`;book.append(intro);
  const result=$('#resultArea');
  if(result){
    $$(':scope>details',result).forEach((src,i)=>{
      const sec=document.createElement('section');sec.className='print-page print-chapter';
      const h=document.createElement('h2');h.textContent=titleOf(src);sec.append(h);
      const body=src.querySelector(':scope>.body')?.cloneNode(true);if(body){
        $$('button,.actions,.range,input,select,textarea,.own-wish-modal',body).forEach(n=>n.remove());
        $$('.academy-added',body).forEach(d=>{d.open=true;});
        sec.append(body);
      }
      if(i===0)sec.insertAdjacentHTML('afterbegin','<p class="print-eyebrow">Mein Lebensweg</p>');
      book.append(sec);
    });
  }
  const own=$('#customWishPrint');if(own){const c=own.cloneNode(true);c.removeAttribute('id');c.className='print-page print-chapter';book.append(c);}
  const final=$('#academyFinal');if(final){const c=final.cloneNode(true);c.className='print-page print-finale';$$('details',c).forEach(d=>d.open=true);book.append(c);}
  const end=document.createElement('section');end.className='print-page print-ending';end.innerHTML='<p class="print-eyebrow">Mein nächster Schritt</p><h2>Mein Lebensplan bleibt lebendig</h2><p>Lebenspläne verändern sich. Aktualisiere diese Ausgabe regelmäßig und bewahre ältere Fassungen als persönliche Historie auf.</p><blockquote>Finanzielle Souveränität bedeutet nicht, reich zu sein. Sie bedeutet, Entscheidungen treffen zu können.</blockquote>';
  book.append(end);document.body.append(book);
}
function init(){setTimeout(()=>{cleanupAcademy();rebuildJourney();},220);window.addEventListener('beforeprint',()=>{cleanupAcademy();buildPrintBook();});window.addEventListener('afterprint',()=>$('#printBook')?.remove());}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
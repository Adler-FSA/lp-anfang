(()=>{
'use strict';
const $$=(s,r=document)=>[...r.querySelectorAll(s)];
const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
const titles={
 wohnen:'Wohnen',familie:'Familie','beruf-und-karriere':'Beruf und Karriere',mobilitat:'Mobilität','freizeit-und-traume':'Freizeit und Träume','personliche-entwicklung':'Persönliche Entwicklung',vermogensaufbau:'Vermögensaufbau','gesundheit-und-alter':'Gesundheit und Alter'
};
function values(){return Object.entries(titles).map(([key,title])=>({key,title,text:(document.querySelector(`[data-life-section-input="${key}"]`)?.value||'').trim()})).filter(x=>x.text);}
function academyText(){
 const items=values(); if(!items.length)return '';
 return `<section class="academy-life-story" data-life-story-summary><span class="academy-kicker">Dein Lebensplan in deinen eigenen Worten</span><h2>Was du für dein Leben wirklich erreichen möchtest</h2><p>Diese Aussagen stammen direkt aus deinen persönlichen Eingaben. Die Akademie bewertet nicht, ob deine Wünsche richtig oder falsch sind. Sie prüft, ob dein heutiger finanzieller Weg, deine Zeit und deine Prioritäten zu diesem gewünschten Leben passen.</p><div class="academy-life-grid">${items.map(x=>`<article><h3>${esc(x.title)}</h3><p>${esc(x.text)}</p></article>`).join('')}</div><div class="academy-life-conclusion"><strong>Akademie-Einordnung:</strong> Je klarer du formulierst, wie du leben möchtest, desto genauer lässt sich erkennen, welche Ziele gleichzeitig tragbar sind, welche zeitlich geordnet werden müssen und an welchen Stellen Einkommen, Rücklagen oder das Fundament deines Vermögensaufbaus weiterentwickelt werden müssen.</div></section>`;
}
function syncAcademy(){
 const final=document.querySelector('#academyFinal'); if(!final)return;
 final.querySelector('[data-life-story-summary]')?.remove();
 const html=academyText(); if(html)final.insertAdjacentHTML('afterbegin',html);
}
function syncPrintSource(){
 let src=document.querySelector('#lifeSectionPrintSource');
 if(!src){src=document.createElement('details');src.id='lifeSectionPrintSource';src.open=true;src.className='life-section-print-source';src.innerHTML='<summary>2a. Meine Wünsche in eigenen Worten</summary><div class="body"></div>';const main=document.querySelector('main');if(main)main.append(src);}
 const body=src.querySelector('.body');const items=values();
 body.innerHTML=items.length?`<p>Bevor aus Wünschen Zahlen werden, habe ich beschrieben, wie ich in den einzelnen Lebensbereichen wirklich leben möchte.</p>${items.map(x=>`<section class="pdf-life-story-item"><h3>${esc(x.title)}</h3><p>${esc(x.text)}</p></section>`).join('')}`:'<p>Für diese Lebensbereiche wurden noch keine persönlichen Texte eingetragen.</p>';
}
function sync(){syncPrintSource();syncAcademy();}
document.addEventListener('input',e=>{if(e.target.matches('[data-life-section-input],#why,#vision')){clearTimeout(window.__lifeSectionSync);window.__lifeSectionSync=setTimeout(sync,120);}});
document.addEventListener('change',e=>{if(e.target.matches('[data-life-section-input],#why,#vision'))sync();});
document.addEventListener('daniel-muster-filled',()=>setTimeout(sync,80));
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>{setTimeout(sync,800);setTimeout(sync,1800);});else{setTimeout(sync,800);setTimeout(sync,1800);}
new MutationObserver(()=>{clearTimeout(window.__lifeSectionMutation);window.__lifeSectionMutation=setTimeout(sync,240);}).observe(document.documentElement,{subtree:true,childList:true});
})();
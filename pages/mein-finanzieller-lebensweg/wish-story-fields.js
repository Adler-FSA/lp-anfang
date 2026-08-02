(()=>{
'use strict';
const $$=(s,r=document)=>[...r.querySelectorAll(s)];
const norm=s=>String(s||'').replace(/\s+/g,' ').trim();
const slug=s=>norm(s).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
const sections=['Wohnen','Familie','Beruf und Karriere','Mobilität','Freizeit und Träume','Persönliche Entwicklung','Vermögensaufbau','Gesundheit und Alter'];
const fire=el=>{el.dispatchEvent(new Event('input',{bubbles:true}));el.dispatchEvent(new Event('change',{bubbles:true}));};
function removeOld(){ $$('.wish-story-field').forEach(el=>el.remove()); }
function findHeading(title){return $$('h2,h3,h4').find(h=>norm(h.textContent)===title);}
function addSectionField(title){
 const heading=findHeading(title); if(!heading)return;
 const key=slug(title); if(document.querySelector(`[data-life-section="${key}"]`))return;
 const wrap=document.createElement('div');
 wrap.className='life-section-story'; wrap.dataset.lifeSection=key;
 wrap.innerHTML=`<label for="lifeSection-${key}"><span class="life-section-kicker">Mein persönlicher Lebensbereich</span><strong>Was wünsche ich mir in diesem Bereich – und warum ist es mir wichtig?</strong><small>Formuliere in deinen eigenen Worten, wie du in diesem Lebensbereich später leben möchtest. Die Auswahlkarten darunter übersetzen deine Gedanken anschließend in Alter, Kosten und Prioritäten.</small></label><textarea id="lifeSection-${key}" name="life_section_${key}" rows="6" data-life-section-input="${key}" placeholder="Beispiel: Ich wünsche mir … Für mein Leben bedeutet das … Besonders wichtig ist mir …"></textarea>`;
 heading.insertAdjacentElement('afterend',wrap);
}
function install(){removeOld();sections.forEach(addSectionField);}
function clearOwn(){ $$('[data-life-section-input]').forEach(el=>{if(el.value){el.value='';fire(el);}}); }
function ownMode(el){return /eigene angaben|eigene version|selbst ausfüllen|meinen lebensweg planen/i.test(norm(el?.textContent));}
document.addEventListener('click',e=>{const btn=e.target.closest('button,a');if(ownMode(btn))setTimeout(clearOwn,350);},true);
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>{install();setTimeout(install,500);setTimeout(install,1300);});else{install();setTimeout(install,500);setTimeout(install,1300);}
new MutationObserver(()=>{clearTimeout(window.__lifeSectionTimer);window.__lifeSectionTimer=setTimeout(install,180);}).observe(document.documentElement,{subtree:true,childList:true});
})();
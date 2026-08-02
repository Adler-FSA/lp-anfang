(()=>{
'use strict';
const $$=(s,r=document)=>[...r.querySelectorAll(s)];
const norm=s=>String(s||'').replace(/\s+/g,' ').trim();
const slug=s=>norm(s).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')||'wunsch';
const fire=el=>{el.dispatchEvent(new Event('input',{bubbles:true}));el.dispatchEvent(new Event('change',{bubbles:true}));};
function titleOf(card){return norm(card.querySelector('h2,h3,h4,.title,strong')?.textContent)||'Mein Wunsch';}
function isWishCard(card){
  if(card.closest('#resultArea,#academyFinal,#printBook,.backup-panel,.own-wish-modal'))return false;
  const t=norm(card.textContent);
  const hasHeading=!!card.querySelector('h2,h3,h4,.title');
  const hasControls=!!card.querySelector('input,select');
  const hasWishLogic=/geplant\?|größenordnung|wie wichtig|herzenswunsch|zielalter|ab welchem alter|eigener betrag/i.test(t);
  return hasHeading&&hasControls&&hasWishLogic;
}
function cardKey(card,index){return card.getAttribute('data-wish-id')||card.id||`${slug(titleOf(card))}-${index+1}`;}
function addField(card,index){
  if(card.querySelector('.wish-story-field'))return;
  const key=cardKey(card,index);
  const wrap=document.createElement('div');
  wrap.className='wish-story-field';
  wrap.innerHTML=`<label for="wishStory-${key}"><span class="wish-story-kicker">Meine persönliche Geschichte zu diesem Wunsch</span><strong>Warum ist mir dieser Wunsch wichtig?</strong><small>Beschreibe in deinen eigenen Worten, was dieser Wunsch für dein Leben bedeutet. In der Muster-Version zeigt Daniel, wie eine persönliche Eintragung aussehen kann.</small></label><textarea id="wishStory-${key}" name="wish_story_${key}" rows="5" data-wish-story="${key}" placeholder="Beispiel: Ich wünsche mir dieses Ziel, weil … Für mein Leben bedeutet es … Mir ist besonders wichtig, dass …"></textarea>`;
  const priority=[...card.querySelectorAll('label,div')].reverse().find(n=>/wie wichtig|priorität|herzenswunsch/i.test(norm(n.textContent))&&n.querySelector('input,select'));
  if(priority&&priority.parentElement===card)priority.insertAdjacentElement('afterend',wrap);else card.appendChild(wrap);
}
function install(){
  const candidates=$$('[data-wish-id],.wish-card,.goal-card,.card,article');
  let count=0;
  candidates.forEach((card,i)=>{if(!isWishCard(card))return;addField(card,count++);});
}
function clearForOwnMode(){
  $$('[data-wish-story]').forEach(el=>{if(el.value){el.value='';fire(el);}});
}
function isOwnMode(el){return /eigene angaben|eigene version|selbst ausfüllen|meine angaben/i.test(norm(el?.textContent));}
document.addEventListener('click',e=>{const btn=e.target.closest('button,a');if(isOwnMode(btn))setTimeout(clearForOwnMode,350);},true);
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>{install();setTimeout(install,450);setTimeout(install,1200);});else{install();setTimeout(install,450);setTimeout(install,1200);}
new MutationObserver(()=>{clearTimeout(window.__wishStoryInstallTimer);window.__wishStoryInstallTimer=setTimeout(install,160);}).observe(document.documentElement,{subtree:true,childList:true});
})();

(()=>{
'use strict';
const KEY='fsa_finanzlebensweg_gesamtstand_v4';
const TEMP='fsa_finanzlebensweg_restore_buffer_v5';
const raw=localStorage.getItem(KEY);
if(raw){
  try{sessionStorage.setItem(TEMP,raw);localStorage.removeItem(KEY);}catch(e){console.warn('Sicherungs-Puffer konnte nicht vorbereitet werden',e);}
}
const keyFor=(el,i)=>el.id?`id:${el.id}`:el.name?`name:${el.name}:${i}`:`idx:${i}`;
function restoreWithoutReload(){
  const saved=sessionStorage.getItem(TEMP);
  if(!saved)return;
  try{
    const data=JSON.parse(saved);
    const controls=[...document.querySelectorAll('input,select,textarea')].filter(el=>!el.closest('#ownWishModal,#printBook,.backup-panel'));
    controls.forEach((el,i)=>{
      const d=data.controls?.[keyFor(el,i)];
      if(!d)return;
      if(el.type==='checkbox'||el.type==='radio')el.checked=!!d.checked;
      else el.value=d.value??'';
      el.dispatchEvent(new Event('input',{bubbles:true}));
      el.dispatchEvent(new Event('change',{bubbles:true}));
    });
    const cards=[...document.querySelectorAll('[data-wish-id],.wish-card,.goal-card,.card')];
    (data.cards||[]).forEach(c=>{
      const el=cards[c.i];if(!el)return;
      el.classList.toggle('selected',!!c.selected);
      el.classList.toggle('active',!!c.selected);
      el.setAttribute('aria-pressed',c.selected?'true':'false');
    });
    Object.entries(data.local||{}).forEach(([k,v])=>localStorage.setItem(k,v));
    localStorage.setItem(KEY,JSON.stringify({...data,restoredAt:new Date().toISOString()}));
    sessionStorage.removeItem(TEMP);
    document.documentElement.classList.add('fsa-restored-stable');
  }catch(e){
    console.error('Gespeicherter Lebensplan konnte nicht stabil wiederhergestellt werden',e);
    if(saved)localStorage.setItem(KEY,saved);
    sessionStorage.removeItem(TEMP);
  }
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(restoreWithoutReload,900),{once:true});
else setTimeout(restoreWithoutReload,900);
})();

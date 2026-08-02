(()=>{
'use strict';
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const KEY='fsa_finanzlebensweg_systemkern_v2';
let applying=false,timer=0;
const norm=s=>String(s||'').replace(/\s+/g,' ').trim();
const slug=s=>norm(s).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')||'feld';
try{localStorage.removeItem('fsa_finanzlebensweg_systemkern_v1');}catch{}
function cards(){return $$('[data-wish-id],.wish-card,.goal-card').filter(c=>!c.closest('#printBook,#ownWishModal'));}
function titleOf(c){return norm(c.querySelector('h3,h4,strong')?.textContent||c.getAttribute('data-title')||'Wunsch');}
function stableCardId(c){let id=c.getAttribute('data-wish-id');if(id)return id;id='wish-'+slug(titleOf(c));c.setAttribute('data-wish-id',id);return id;}
function selected(c){return c.classList.contains('selected')||c.classList.contains('active')||c.getAttribute('aria-pressed')==='true'||!!c.querySelector('input[type=checkbox]:checked,input[type=radio]:checked');}
function persistable(el){return !el.closest('#ownWishModal,#printBook,.backup-panel,#resultArea');}
function stableFieldId(el){
  const card=el.closest('[data-wish-id],.wish-card,.goal-card');
  if(card){
    const base=el.id?`id:${el.id}`:el.name?`name:${el.name}`:slug(el.closest('label')?.textContent||el.getAttribute('aria-label')||el.placeholder||el.type||el.tagName);
    return `card:${stableCardId(card)}:${base}`;
  }
  if(el.id)return 'id:'+el.id;
  if(el.name)return 'name:'+el.name;
  return 'field:'+slug(el.closest('label')?.textContent||el.getAttribute('aria-label')||el.placeholder||el.type||el.tagName);
}
function fieldValue(el){return el.type==='checkbox'||el.type==='radio'?!!el.checked:el.value;}
function model(){
  const controls={};
  $$('input,select,textarea').filter(persistable).forEach(el=>controls[stableFieldId(el)]={value:fieldValue(el),type:el.type||'',tag:el.tagName});
  const wishes={};
  cards().forEach(c=>{
    const id=stableCardId(c),fields={};
    $$('input,select,textarea',c).forEach(el=>fields[stableFieldId(el)]=fieldValue(el));
    wishes[id]={id,title:titleOf(c),selected:selected(c),fields};
  });
  let own=[];
  try{own=JSON.parse(localStorage.getItem('fsa_finanzlebensweg_eigene_wuensche_v1')||'[]');if(!Array.isArray(own))own=[];}catch{own=[];}
  return{version:2,savedAt:new Date().toISOString(),controls,wishes,own};
}
function save(){if(applying)return;try{localStorage.setItem(KEY,JSON.stringify(model()));}catch(e){console.warn('Systemkern-Sicherung fehlgeschlagen',e);}}
function apply(){
  let data;try{data=JSON.parse(localStorage.getItem(KEY)||'null');}catch{return;}if(!data)return;
  applying=true;
  const controls=$$('input,select,textarea').filter(persistable);
  const map=new Map(controls.map(el=>[stableFieldId(el),el]));
  const changed=[];
  Object.entries(data.controls||{}).forEach(([id,d])=>{
    const el=map.get(id);if(!el)return;
    if(el.type==='checkbox'||el.type==='radio')el.checked=!!d.value;else el.value=d.value??'';
    changed.push(el);
  });
  cards().forEach(c=>{
    const d=data.wishes?.[stableCardId(c)];if(!d)return;
    c.classList.toggle('selected',!!d.selected);
    c.classList.toggle('active',!!d.selected);
    c.setAttribute('aria-pressed',d.selected?'true':'false');
  });
  applying=false;
  changed.forEach(el=>el.dispatchEvent(new Event('change',{bubbles:true})));
}
function repairDanielOnce(){
  if(sessionStorage.getItem('fsa_daniel_age_repair_v1'))return;
  const first=($('#firstName')?.value||'').trim();if(!/^Daniel$/i.test(first))return;
  const ages=cards().filter(selected).map(c=>{
    const el=$$('input[type="number"]',c).find(x=>/alter/i.test(norm(x.placeholder+' '+(x.closest('label')?.textContent||'')+' '+x.name+' '+x.id)));
    return el?Number(el.value):NaN;
  }).filter(Number.isFinite);
  const wrong=ages.length>=4&&ages.filter(v=>v===30).length>=4;
  if(!wrong)return;
  const btn=$$('button,a').find(el=>/musterwerte neu laden|musterwerte|muster-version/i.test(norm(el.textContent)));
  if(!btn)return;
  sessionStorage.setItem('fsa_daniel_age_repair_v1','1');
  try{localStorage.removeItem(KEY);}catch{}
  btn.click();
}
function sync(){clearTimeout(timer);timer=setTimeout(save,180);}
function bind(){
  cards().forEach(stableCardId);
  document.addEventListener('input',e=>{if(e.target.matches('input,select,textarea')&&persistable(e.target))sync();},true);
  document.addEventListener('change',e=>{if(e.target.matches('input,select,textarea')&&persistable(e.target))sync();},true);
  document.addEventListener('click',e=>{if(e.target.closest('[data-wish-id],.wish-card,.goal-card,[data-edit],[data-delete],#addOwnWish'))setTimeout(sync,80);},true);
  setTimeout(()=>{repairDanielOnce();apply();setTimeout(save,350);},1400);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',bind,{once:true});else bind();
})();

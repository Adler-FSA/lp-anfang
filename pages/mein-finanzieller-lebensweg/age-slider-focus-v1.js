(()=>{
'use strict';
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
let active=false,raf=0;
function norm(v){return String(v||'').replace(/\s+/g,' ').trim().toLowerCase();}
function findJourney(){
 const result=$('#resultArea')||document;
 return $$('details,section',result).find(el=>{
   const t=norm(el.querySelector(':scope > summary,:scope > h2,:scope > h3')?.textContent||'');
   return t.includes('persönlicher lebensweg')||t.includes('lebensstationen')||t.includes('zeitreise');
 })||result;
}
function findRange(journey){
 const ranges=$$('input[type="range"]',journey);
 return ranges.find(r=>/alter|lebensweg|zeitreise/i.test([r.id,r.name,r.getAttribute('aria-label'),r.closest('label')?.textContent].join(' ')))||ranges[0]||$$('input[type="range"]','#resultArea').find(r=>/alter/i.test([r.id,r.name,r.getAttribute('aria-label')].join(' ')));
}
function center(journey,behavior='smooth'){
 cancelAnimationFrame(raf);
 raf=requestAnimationFrame(()=>journey.scrollIntoView({behavior,block:'center',inline:'nearest'}));
}
function install(){
 if($('#fsaAgeSliderDock'))return;
 const journey=findJourney();
 const range=findRange(journey);
 if(!journey||!range)return;
 let source=range.closest('.range,label,.field,.control,.slider-wrap,.range-wrap')||range.parentElement;
 if(!source||source===journey||source.contains(journey))source=range;
 const dock=document.createElement('section');
 dock.id='fsaAgeSliderDock';
 dock.className='fsa-age-slider-dock';
 dock.innerHTML='<div class="fsa-age-slider-heading"><strong>Zeitreise steuern</strong><span>Bewege den Regler und verfolge die Entwicklung direkt darüber.</span></div>';
 dock.append(source);
 const body=journey.querySelector(':scope > .body')||journey;
 body.append(dock);
 const style=document.createElement('style');
 style.textContent=`
 #fsaAgeSliderDock{margin:22px 0 4px;padding:18px 20px;border:1px solid #d8e5e8;border-radius:18px;background:linear-gradient(135deg,#f2fbfb,#fff 55%,#fff5fa);box-shadow:0 10px 24px rgba(19,34,56,.06);scroll-margin-block:22vh}
 #fsaAgeSliderDock .fsa-age-slider-heading{display:flex;justify-content:space-between;gap:18px;align-items:end;margin-bottom:12px}
 #fsaAgeSliderDock .fsa-age-slider-heading strong{color:#132238;font-size:1.05rem}
 #fsaAgeSliderDock .fsa-age-slider-heading span{color:#607286;font-size:.9rem;text-align:right}
 #fsaAgeSliderDock input[type=range]{width:100%;min-height:38px;touch-action:pan-x;cursor:ew-resize}
 @media(max-width:700px){#fsaAgeSliderDock{padding:16px}#fsaAgeSliderDock .fsa-age-slider-heading{display:block}#fsaAgeSliderDock .fsa-age-slider-heading span{display:block;margin-top:5px;text-align:left}}
 @media print{#fsaAgeSliderDock{display:none!important}}
 `;
 document.head.append(style);
 const hold=()=>{active=true;center(journey)};
 const release=()=>{active=false;center(journey)};
 range.addEventListener('pointerdown',hold,{passive:true});
 range.addEventListener('touchstart',hold,{passive:true});
 range.addEventListener('focus',hold,{passive:true});
 range.addEventListener('input',()=>{
   center(journey,'auto');
   setTimeout(()=>center(journey,'auto'),90);
   setTimeout(()=>center(journey,'auto'),220);
 },{passive:true});
 range.addEventListener('change',release,{passive:true});
 range.addEventListener('pointerup',release,{passive:true});
 range.addEventListener('touchend',release,{passive:true});
 window.addEventListener('scroll',()=>{
   if(active){clearTimeout(window.__fsaSliderHold);window.__fsaSliderHold=setTimeout(()=>center(journey,'auto'),30);}
 },{passive:true});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(install,1300),{once:true});else setTimeout(install,1300);
})();
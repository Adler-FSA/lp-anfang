(()=>{
  const LIVE_PART='/pages/mission-dorade-live/';
  const QUICKSTART_PART='/pages/schnellstart-mission-dorade-simulator/';

  const style=document.createElement('style');
  style.id='md-presentation-workspace-fit';
  style.textContent=`
    .workspace.presentation-workspace{
      inset:0 auto auto 0!important;
      width:100%!important;
      min-height:0!important;
      grid-template-rows:auto minmax(0,1fr)!important;
      overflow:hidden!important;
      background:#eef3f6!important;
      box-shadow:0 0 0 100vmax #eef3f6!important;
    }
    .workspace.presentation-workspace.presentation-live{
      height:min(960px,calc(68vw + 74px))!important;
      max-height:min(960px,calc(68vw + 74px))!important;
    }
    .workspace.presentation-workspace.presentation-quickstart{
      height:min(1040px,calc(78vw + 74px))!important;
      max-height:min(1040px,calc(78vw + 74px))!important;
    }
    .workspace.presentation-workspace.special{
      grid-template-rows:auto minmax(0,1fr)!important;
    }
    .workspace.presentation-workspace .workspace-bar{
      position:relative!important;
      inset:auto!important;
      border-radius:0!important;
    }
    .workspace.presentation-workspace .workspace-title{
      display:block!important;
    }
    .workspace.presentation-workspace iframe{
      width:100%!important;
      height:100%!important;
      min-width:0!important;
      min-height:0!important;
      grid-row:auto!important;
    }
    @media(max-width:700px){
      .workspace.presentation-workspace.presentation-live{
        height:min(900px,calc(92vw + 68px))!important;
        max-height:min(900px,calc(92vw + 68px))!important;
      }
      .workspace.presentation-workspace.presentation-quickstart{
        height:min(980px,calc(112vw + 68px))!important;
        max-height:min(980px,calc(112vw + 68px))!important;
      }
    }
  `;
  document.head.appendChild(style);

  function getMode(frame){
    const src=(frame?.getAttribute('src')||frame?.src||'').toLowerCase();
    if(src.includes(LIVE_PART)) return 'live';
    if(src.includes(QUICKSTART_PART)) return 'quickstart';
    return '';
  }

  function syncWorkspace(){
    document.querySelectorAll('.workspace').forEach(workspace=>{
      const frame=workspace.querySelector('iframe');
      const mode=getMode(frame);
      workspace.classList.toggle('presentation-workspace',Boolean(mode));
      workspace.classList.toggle('presentation-live',mode==='live');
      workspace.classList.toggle('presentation-quickstart',mode==='quickstart');
    });
  }

  const observer=new MutationObserver(syncWorkspace);
  observer.observe(document.documentElement,{subtree:true,childList:true,attributes:true,attributeFilter:['src','class']});
  syncWorkspace();
})();
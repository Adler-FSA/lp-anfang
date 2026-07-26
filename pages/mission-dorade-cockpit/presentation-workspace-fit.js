(()=>{
  const PRESENTATION_PARTS=[
    '/pages/mission-dorade-live/',
    '/pages/schnellstart-mission-dorade-simulator/'
  ];

  const style=document.createElement('style');
  style.id='md-presentation-workspace-fit';
  style.textContent=`
    .workspace.presentation-workspace{
      inset:0 auto auto 0!important;
      width:100%!important;
      height:min(900px,calc(56.25vw + 74px))!important;
      max-height:min(900px,calc(56.25vw + 74px))!important;
      min-height:0!important;
      grid-template-rows:auto minmax(0,1fr)!important;
      overflow:hidden!important;
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
      .workspace.presentation-workspace{
        height:min(820px,calc(75vw + 70px))!important;
        max-height:min(820px,calc(75vw + 70px))!important;
      }
    }
  `;
  document.head.appendChild(style);

  function isPresentation(frame){
    const src=(frame?.getAttribute('src')||frame?.src||'').toLowerCase();
    return PRESENTATION_PARTS.some(part=>src.includes(part));
  }

  function syncWorkspace(){
    document.querySelectorAll('.workspace').forEach(workspace=>{
      const frame=workspace.querySelector('iframe');
      workspace.classList.toggle('presentation-workspace',isPresentation(frame));
    });
  }

  const observer=new MutationObserver(syncWorkspace);
  observer.observe(document.documentElement,{subtree:true,childList:true,attributes:true,attributeFilter:['src','class']});
  syncWorkspace();
})();
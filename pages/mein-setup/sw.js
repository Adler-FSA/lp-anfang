const CACHE_BUST='202607262245';
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',event=>event.waitUntil(self.clients.claim()));
self.addEventListener('fetch',event=>{
  const url=new URL(event.request.url);
  if(event.request.mode!=='navigate'||!url.pathname.includes('/pages/mein-setup/modul-')) return;
  event.respondWith((async()=>{
    const response=await fetch(event.request,{cache:'no-store'});
    const type=response.headers.get('content-type')||'';
    if(!type.includes('text/html')) return response;
    let html=await response.text();
    const cleanup=`<script>(function(){
      function clean(){
        const phrases=[
          'Dieses Modul gehört zum geschützten Krypto-Setup',
          'Falls du das Mentor-Passwort noch nicht eingegeben hast',
          'starte am besten über die Setup-Übersicht'
        ];
        document.querySelectorAll('.info-lock,.mentor-lock,.password-hint').forEach(el=>el.remove());
        document.querySelectorAll('body *').forEach(el=>{
          if(el.children.length===0){
            let t=el.textContent||'';
            if(phrases.some(p=>t.includes(p))){
              const box=el.closest('.info-lock,.hero-note,.hero-highlight,p,div');
              if(box) box.remove();
            }
          }
        });
        document.body.innerHTML=document.body.innerHTML
          .replace(/Mentor-Impuls:/g,'Praxis-Impuls:')
          .replace(/Mentor-Hinweis:/g,'Praxis-Impuls:')
          .replace(/Mentor:/g,'Praxis-Impuls:');
      }
      if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',clean);else clean();
    })();<\/script>`;
    html=html.replace('</body>',cleanup+'</body>');
    return new Response(html,{status:response.status,statusText:response.statusText,headers:{'content-type':'text/html; charset=utf-8','cache-control':'no-store'}});
  })());
});
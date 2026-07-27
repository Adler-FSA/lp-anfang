const VERSION='202607272000';
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
    html=html
      .replace(/<div\s+class=["']info-lock["'][^>]*>[\s\S]*?Mentor-Passwort[\s\S]*?<\/div>/gi,'')
      .replace(/<[^>]*>[\s\S]*?Dieses Modul gehört zum geschützten Krypto-Setup[\s\S]*?Setup-Übersicht\.[\s\S]*?<\/[^>]+>/gi,'')
      .replace(/\.mentor\b/g,'.praxis-impuls')
      .replace(/class=["']mentor["']/g,'class="praxis-impuls"')
      .replace(/Mentor-Impuls:/g,'Praxis-Impuls:')
      .replace(/Mentor-Hinweis:/g,'Praxis-Impuls:')
      .replace(/💬\s*<b>Mentor:<\/b>/g,'💡 <b>Praxis-Impuls:</b>')
      .replace(/Modernisierte Kursfassung\s*[·-]\s*ohne Zertifikat/gi,'')
      .replace(/dieselben sieben vollständigen Originalmodule/gi,'sieben aufeinander aufbauende Module')
      .replace(/Originalkurs/gi,'Kurs')
      .replace(/Kein Zertifikat/gi,'')
      .replace(/Persönliches Krypto-Setup/gi,'Mein souveränes Setup')
      .replace(/Dein persönliches Krypto-Setup/gi,'Dein souveränes Setup')
      .replace(/Krypto-Setup/gi,'souveränes Setup')
      .replace(/Bestandsaufnahme\s*&amp;\s*Risiko-Profil/gi,'Ausgangslage &amp; Schutzprofil')
      .replace(/Bestandsaufnahme\s*&\s*Risiko-Profil/gi,'Ausgangslage & Schutzprofil')
      .replace(/Feinschliff,\s*Wachstum\s*&amp;\s*Jahres-Review/gi,'Feinschliff, Vereinfachung &amp; Jahres-Review')
      .replace(/Feinschliff,\s*Wachstum\s*&\s*Jahres-Review/gi,'Feinschliff, Vereinfachung & Jahres-Review')
      .replace(/genauen?\s+(Seed-)?Aufbewahrungsort/gi,'Status der getrennten Sicherung')
      .replace(/\s{2,}/g,' ');
    if(!html.includes('setup-core.js')) html=html.replace('</body>','<script src="setup-core.js?version='+VERSION+'"></script></body>');
    else html=html.replace(/setup-core\.js\?version=[^"']+/g,'setup-core.js?version='+VERSION);
    const headers=new Headers(response.headers);
    headers.set('content-type','text/html; charset=utf-8');
    headers.set('cache-control','no-store, no-cache, must-revalidate');
    return new Response(html,{status:response.status,statusText:response.statusText,headers});
  })());
});
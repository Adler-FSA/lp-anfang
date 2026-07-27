const VERSION='202607272345';
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',event=>event.waitUntil(self.clients.claim()));
self.addEventListener('fetch',event=>{
  const url=new URL(event.request.url);
  const inSetup=url.pathname.includes('/pages/mein-setup/');
  const isModule=/\/pages\/mein-setup\/modul-\d+\.html$/i.test(url.pathname);
  const isIndex=/\/pages\/mein-setup\/(?:index\.html)?$/i.test(url.pathname);
  const isOutput=/\/pages\/mein-setup\/setup-ausgabe\.html$/i.test(url.pathname);
  if(event.request.mode!=='navigate'||!inSetup||(!isModule&&!isIndex&&!isOutput))return;
  event.respondWith((async()=>{
    const response=await fetch(event.request,{cache:'no-store'});
    const type=response.headers.get('content-type')||'';
    if(!type.includes('text/html'))return response;
    let html=await response.text();
    if(isModule){
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
        .replace(/Originalkurs/gi,'Kurs').replace(/Kein Zertifikat/gi,'')
        .replace(/Persönliches Krypto-Setup/gi,'Mein souveränes Setup')
        .replace(/Dein persönliches Krypto-Setup/gi,'Dein souveränes Setup')
        .replace(/Krypto-Setup/gi,'souveränes Setup')
        .replace(/Bestandsaufnahme\s*&amp;\s*Risiko-Profil/gi,'Ausgangslage &amp; Schutzprofil')
        .replace(/Bestandsaufnahme\s*&\s*Risiko-Profil/gi,'Ausgangslage & Schutzprofil')
        .replace(/Feinschliff,\s*Wachstum\s*&amp;\s*Jahres-Review/gi,'Feinschliff, Vereinfachung &amp; Jahres-Review')
        .replace(/Feinschliff,\s*Wachstum\s*&\s*Jahres-Review/gi,'Feinschliff, Vereinfachung & Jahres-Review')
        .replace(/wo\s+(dein|der)\s+(wichtigste[rn]?\s+)?Seed\s+liegt/gi,'ob deine Seed-Sicherung getrennt und geprüft ist')
        .replace(/wo\s+deine\s+Schlüssel\s+liegen/gi,'ob deine Schlüssel organisatorisch getrennt und wiederherstellbar sind')
        .replace(/genauen?\s+(Seed-)?Aufbewahrungsort/gi,'Status der getrennten Sicherung')
        .replace(/welches\s+Gerät\s+ein\s+Single\s+Point\s+of\s+Failure\s+für\s+dich\s+wäre/gi,'ob ein einzelnes Gerät derzeit ein Ausfallrisiko darstellt')
        .replace(/Welche drei Rechnungen würden dir als erstes das Genick brechen\?/gi,'Welche drei Zahlungsverpflichtungen würden zuerst zu einem ernsthaften Problem werden?')
        .replace(/\s{2,}/g,' ');
      if(!html.includes('setup-core.js'))html=html.replace('</body>','<script src="setup-core.js?version='+VERSION+'"></script></body>');
      else html=html.replace(/setup-core\.js\?version=[^"']+/g,'setup-core.js?version='+VERSION);
    }
    const financeCard='<section class="setup-cta phase3-finance-entry" style="display:flex;justify-content:space-between;gap:22px;align-items:center;background:linear-gradient(135deg,#e8fbfb,#fff4fa);border:1px solid #cde9ea;border-radius:22px;padding:24px 28px;margin-bottom:18px;box-shadow:0 12px 35px rgba(19,34,56,.06)"><div><span style="display:inline-block;font-size:11px;text-transform:uppercase;letter-spacing:.08em;font-weight:900;color:#00878c;margin-bottom:5px">Phase 3A</span><h2 style="margin:0 0 7px;color:#132238;font-size:25px">Meine strukturierte Finanzübersicht</h2><p style="margin:0;color:#64778b;line-height:1.6">Banken, Konten, Börsen, Zahlungswege und öffentliche Wallet-Adressen als geordnete Datensätze erfassen, prüfen und verwalten.</p></div><a href="finanzuebersicht.html" style="white-space:nowrap;background:#132238;color:#fff;text-decoration:none;padding:14px 18px;border-radius:14px;font-weight:900">Finanzübersicht öffnen</a></section>';
    if(isIndex&&!html.includes('phase3-finance-entry'))html=html.replace('<div class="modules" id="modules"></div>',financeCard+'<div class="modules" id="modules"></div>');
    if(isOutput){
      if(!html.includes('href="finanzuebersicht.html"'))html=html.replace('<a href="index.html">Übersicht</a>','<a href="index.html">Übersicht</a><a href="finanzuebersicht.html">Finanzübersicht</a>');
      if(!html.includes('phase3-finance-entry'))html=html.replace('<div id="modules"></div>',financeCard+'<div id="modules"></div>');
    }
    const headers=new Headers(response.headers);headers.set('content-type','text/html; charset=utf-8');headers.set('cache-control','no-store, no-cache, must-revalidate');
    return new Response(html,{status:response.status,statusText:response.statusText,headers});
  })());
});
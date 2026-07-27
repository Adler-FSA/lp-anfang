const VERSION='202607281330';
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',event=>event.waitUntil(self.clients.claim()));
self.addEventListener('fetch',event=>{
 const url=new URL(event.request.url);
 const isModule=/\/pages\/mein-setup\/modul-\d+\.html$/i.test(url.pathname);
 if(event.request.mode!=='navigate'||!isModule)return;
 event.respondWith((async()=>{
  const response=await fetch(event.request,{cache:'no-store'});
  const type=response.headers.get('content-type')||'';
  if(!type.includes('text/html'))return response;
  let html=await response.text();
  html=html
   .replace(/<div\s+class=["']info-lock["'][^>]*>[\s\S]*?Mentor-Passwort[\s\S]*?<\/div>/gi,'')
   .replace(/<[^>]*>[\s\S]*?Dieses Modul gehört zum geschützten Krypto-Setup[\s\S]*?Setup-Übersicht\.[\s\S]*?<\/[^>]+>/gi,'')
   .replace(/\.mentor\b/g,'.praxis-impuls').replace(/class=["']mentor["']/g,'class="praxis-impuls"')
   .replace(/Mentor-Impuls:/g,'Praxis-Impuls:').replace(/Mentor-Hinweis:/g,'Praxis-Impuls:').replace(/💬\s*<b>Mentor:<\/b>/g,'💡 <b>Praxis-Impuls:</b>')
   .replace(/Modernisierte Kursfassung\s*[·-]\s*ohne Zertifikat/gi,'').replace(/dieselben sieben vollständigen Originalmodule/gi,'sieben aufeinander aufbauende Module')
   .replace(/Originalkurs/gi,'Kurs').replace(/Kein Zertifikat/gi,'').replace(/Persönliches Krypto-Setup/gi,'Mein souveränes Setup').replace(/Dein persönliches Krypto-Setup/gi,'Dein souveränes Setup').replace(/Krypto-Setup/gi,'souveränes Setup')
   .replace(/Bestandsaufnahme\s*&amp;\s*Risiko-Profil/gi,'Ausgangslage &amp; Schutzprofil').replace(/Bestandsaufnahme\s*&\s*Risiko-Profil/gi,'Ausgangslage & Schutzprofil')
   .replace(/Feinschliff,\s*Wachstum\s*&amp;\s*Jahres-Review/gi,'Feinschliff, Vereinfachung &amp; Jahres-Review').replace(/Feinschliff,\s*Wachstum\s*&\s*Jahres-Review/gi,'Feinschliff, Vereinfachung & Jahres-Review')
   .replace(/wo\s+(dein|der)\s+(wichtigste[rn]?\s+)?Seed\s+liegt/gi,'ob deine Seed-Sicherung getrennt und geprüft ist').replace(/wo\s+deine\s+Schlüssel\s+liegen/gi,'ob deine Schlüssel organisatorisch getrennt und wiederherstellbar sind')
   .replace(/genauen?\s+(Seed-)?Aufbewahrungsort/gi,'Status der getrennten Sicherung').replace(/welches\s+Gerät\s+ein\s+Single\s+Point\s+of\s+Failure\s+für\s+dich\s+wäre/gi,'ob ein einzelnes Gerät derzeit ein Ausfallrisiko darstellt')
   .replace(/Welche drei Rechnungen würden dir als erstes das Genick brechen\?/gi,'Welche drei Zahlungsverpflichtungen würden zuerst zu einem ernsthaften Problem werden?').replace(/\s{2,}/g,' ');
  if(!html.includes('setup-core.js'))html=html.replace('</body>','<script src="setup-core.js?version='+VERSION+'"></script></body>');
  else html=html.replace(/setup-core\.js\?version=[^"']+/g,'setup-core.js?version='+VERSION);
  const headers=new Headers(response.headers);
  headers.set('content-type','text/html; charset=utf-8');
  headers.set('cache-control','no-store, no-cache, must-revalidate');
  return new Response(html,{status:response.status,statusText:response.statusText,headers});
 })());
});
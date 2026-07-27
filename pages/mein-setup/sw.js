const VERSION='202607272340';
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',event=>event.waitUntil(self.clients.claim()));
self.addEventListener('fetch',event=>{
 const url=new URL(event.request.url);
 const inSetup=url.pathname.includes('/pages/mein-setup/');
 const isModule=/\/pages\/mein-setup\/modul-\d+\.html$/i.test(url.pathname);
 const isIndex=/\/pages\/mein-setup\/(?:index\.html)?$/i.test(url.pathname);
 const isFinance=/\/pages\/mein-setup\/finanzuebersicht\.html$/i.test(url.pathname);
 const isOutput=/\/pages\/mein-setup\/setup-ausgabe\.html$/i.test(url.pathname);
 const isAssistant=/\/pages\/mein-setup\/setup-assistent\.html$/i.test(url.pathname);
 const isTools=/\/pages\/mein-setup\/werkzeugkasten\.html$/i.test(url.pathname);
 if(event.request.mode!=='navigate'||!inSetup||(!isModule&&!isIndex&&!isFinance&&!isOutput&&!isAssistant&&!isTools))return;
 event.respondWith((async()=>{
  const response=await fetch(event.request,{cache:'no-store'});
  const type=response.headers.get('content-type')||'';
  if(!type.includes('text/html'))return response;
  let html=await response.text();
  html=html.replace(/<div\s+[^>]*class=["'][^"']*\blang-toggle\b[^"']*["'][^>]*>[\s\S]*?<\/div>/gi,'');
  if(isModule){html=html
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
  }
  if(isIndex){
   html=html
    .replace(/<p>In sieben aufeinander aufbauenden Modulen verbindest du klassische Finanzstrukturen mit dezentralen Möglichkeiten\. So entsteht dein persönliches souveränes Setup – passend zu deinem Alltag, deinen Risiken und deinen Zielen\.<\/p>/,'<p>In sieben aufeinander aufbauenden Modulen entwickelst du Schritt für Schritt dein persönliches souveränes Setup. Dabei entsteht nicht nur Wissen, sondern ein dauerhaft nutzbares persönliches System. Deine strukturierte Finanzübersicht, der Werkzeugkasten mit praktischen Arbeitsunterlagen, der Setup-Assistent und dein persönliches Souveränitäts-Handbuch greifen nahtlos ineinander. Alle Bereiche nutzen dieselben Daten und begleiten dich langfristig – von der ersten Einrichtung bis zum jährlichen Review.</p>')
    .replace(/<div class="summary">[\s\S]*?<\/div><\/section><main class="content">/,'<div class="summary"><span class="pill">7 aufeinander aufbauende Module</span><span class="pill">Strukturierte Finanzübersicht</span><span class="pill">Werkzeugkasten mit Arbeitsunterlagen</span><span class="pill">Persönlicher Setup-Assistent</span><span class="pill">Souveränitäts-Handbuch &amp; Jahresarchiv</span></div></section><main class="content">')
    .replace(/<div class="intro-card"><strong>So arbeitest du mit dem Kurs:<\/strong>[\s\S]*?<\/div><div class="security">/,'<div class="intro-card"><strong>So arbeitest du mit deinem persönlichen Setup:</strong> Öffne ein Modul und bearbeite die Inhalte direkt auf der Seite. Alle Angaben werden lokal auf deinem Gerät gespeichert und zwischen den Modulen, der Finanzübersicht, dem Werkzeugkasten, dem Setup-Assistenten und deinem persönlichen Souveränitäts-Handbuch weiterverwendet. Bereits erfasste Informationen stehen dir an den passenden Stellen erneut zur Verfügung und müssen nicht mehrfach eingegeben werden.</div><div class="security">')
    .replace(/<span class="phase-label">Phase 3[ABC]<\/span>/g,'');
  }
  if(!html.includes('setup-phase4.js'))html=html.replace('</body>','<script src="setup-phase4.js?version='+VERSION+'"></script></body>');
  const headers=new Headers(response.headers);headers.set('content-type','text/html; charset=utf-8');headers.set('cache-control','no-store, no-cache, must-revalidate');
  return new Response(html,{status:response.status,statusText:response.statusText,headers});
 })());
});
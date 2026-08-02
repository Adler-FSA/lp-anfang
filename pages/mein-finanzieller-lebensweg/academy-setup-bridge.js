(()=>{
'use strict';
function insert(){
  if(document.getElementById('academySetupBridge')) return;
  const host=document.getElementById('academyFinal');
  if(!host) return;
  const section=document.createElement('section');
  section.id='academySetupBridge';
  section.className='academy-setup-bridge';
  section.innerHTML=`
    <div class="academy-setup-head">
      <span class="academy-setup-kicker">Der nächste fachlich sinnvolle Schritt</span>
      <h3>Dein Lebensplan braucht ein belastbares Fundament</h3>
      <p>Dieser Lebensweg zeigt, wie du leben möchtest, welche Wünsche dir wichtig sind und welche finanziellen Mittel dafür voraussichtlich benötigt werden. Damit ist das Ziel sichtbar. Ein Ziel allein schützt jedoch noch nicht den Weg dorthin.</p>
    </div>
    <div class="academy-setup-message">
      <p>Vermögen kann über viele Jahre entstehen und trotzdem gefährdet sein, wenn Konten ungeordnet sind, Zugänge ausfallen, Reserven fehlen, Wiederherstellungen nicht funktionieren oder im Notfall niemand nachvollziehen kann, wie die eigene finanzielle Struktur aufgebaut ist.</p>
      <p><strong>Finanzielle Souveränität bedeutet deshalb nicht nur, Vermögen aufzubauen. Sie bedeutet auch, die eigene finanzielle Infrastruktur zu verstehen, zu ordnen, zu sichern und regelmäßig zu überprüfen.</strong></p>
    </div>
    <div class="academy-setup-product">
      <span class="academy-setup-kicker">Eigenständiges zweites Akademie-Produkt</span>
      <h3>Mein souveränes Setup</h3>
      <p>„Mein souveränes Setup“ ist kein Bestandteil dieses Lebensplans und wird hier nicht technisch eingebaut. Es ist ein eigenständiges Produkt der Akademie, das auf dem Lebensweg aufbaut und das organisatorische sowie sicherheitstechnische Fundament für die spätere Umsetzung schafft.</p>
      <div class="academy-setup-grid">
        <article><strong>1. Ausgangs- und Schutzprofil</strong><span>Die persönliche Situation, Abhängigkeiten, Risiken und der Schutzbedarf werden geordnet.</span></article>
        <article><strong>2. Banken, Konten und Börsen</strong><span>Zentrale Finanzwege erhalten klare Aufgaben, Rollen und Ersatzmöglichkeiten.</span></article>
        <article><strong>3. Wallets und Wiederherstellung</strong><span>Dezentrale Wege, Wallet-Rollen, Backups und Wiederherstellung werden sicher geplant.</span></article>
        <article><strong>4. Reserven und Zugänglichkeit</strong><span>Zentrale und dezentrale Wege werden zu einem belastbaren Reservesystem verbunden.</span></article>
        <article><strong>5. Sicherheit, Backups und Übergabe</strong><span>Auch bei Verlust, Krankheit oder Notfall bleibt das Setup nachvollziehbar und handlungsfähig.</span></article>
        <article><strong>6. Routinen und Warnsignale</strong><span>Feste Regeln und Prüfabläufe schützen vor Hektik, Betrug und emotionalen Fehlentscheidungen.</span></article>
        <article><strong>7. Jahres-Review und Vereinfachung</strong><span>Das gesamte Setup wird regelmäßig geprüft, vereinfacht und als persönliches Handbuch fortgeführt.</span></article>
      </div>
    </div>
    <div class="academy-setup-sequence">
      <h3>Warum diese Reihenfolge sinnvoll ist</h3>
      <ol>
        <li><strong>Der finanzielle Lebensweg zeigt das Ziel.</strong><span>Wünsche, Lebensereignisse, Kosten, Prioritäten und Versorgungslücken werden sichtbar.</span></li>
        <li><strong>Die Akademie ordnet die Realität ein.</strong><span>Sie zeigt Stärken, Engpässe und mögliche Stellschrauben, ohne Entscheidungen vorzuschreiben.</span></li>
        <li><strong>Mein souveränes Setup schafft das Fundament.</strong><span>Organisation, Sicherheit, Reserven, Wiederherstellung und Übergabe werden belastbar aufgebaut.</span></li>
        <li><strong>Erst darauf kann Vermögen dauerhaft wirken.</strong><span>Rücklagen, Anlagen und dezentrale Möglichkeiten erhalten eine klare und geschützte Struktur.</span></li>
      </ol>
    </div>
    <blockquote class="academy-setup-quote">Deine Wünsche geben deinem Vermögen eine Richtung. Dein souveränes Setup gibt ihm ein Fundament.</blockquote>
  `;
  host.appendChild(section);
}
if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',()=>setTimeout(insert,700));
else setTimeout(insert,700);
setTimeout(insert,1600);
})();

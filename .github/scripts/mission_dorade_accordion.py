from pathlib import Path
import re

path = Path('pages/mission-dorade/projekt-shop-bilder-logos-pdf.html')
html = path.read_text(encoding='utf-8')

html = re.sub(r'<!-- MD-ACCORDION-START -->.*?<!-- MD-ACCORDION-END -->', '', html, flags=re.S)
html = re.sub(r'<!-- MD-ACCORDION-SCRIPT-START -->.*?<!-- MD-ACCORDION-SCRIPT-END -->', '', html, flags=re.S)

style = '''
<!-- MD-ACCORDION-START -->
<style id="mission-dorade-accordion-final">
.chantal-collection{padding:0!important;overflow:hidden;border-radius:24px!important;margin:22px 0!important;background:#fff!important}
.chantal-collection details{display:block}
.chantal-collection summary{list-style:none;cursor:pointer;display:flex;align-items:center;justify-content:space-between;gap:18px;padding:22px 26px;background:#fff;border-bottom:1px solid transparent;font-weight:900;font-size:1.2rem}
.chantal-collection summary::-webkit-details-marker{display:none}
.chantal-collection summary::after{content:'Collection öffnen';font-size:.8rem;font-weight:800;padding:9px 13px;border-radius:999px;background:#061a2e;color:#fff;white-space:nowrap}
.chantal-collection details[open] summary{border-bottom-color:#dbe4ee}
.chantal-collection details[open] summary::after{content:'Collection schließen'}
.chantal-collection .accordion-body{padding:26px}
.chantal-collection-head{margin-bottom:22px!important}
.chantal-product-grid{display:block!important;margin-top:28px!important}
.chantal-product-card{display:block!important;margin:0 0 34px!important;overflow:hidden!important;border-radius:22px!important}
.chantal-product-card>a:first-child{display:block!important;min-height:0!important;padding:0!important;overflow:visible!important;background:#fff!important}
.chantal-product-card img{display:block!important;width:100%!important;max-width:100%!important;height:auto!important;margin:0!important;object-fit:contain!important;transform:none!important;background:#fff!important}
.chantal-product-info{padding:18px 20px 20px!important}
.chantal-collage{width:100%!important;height:auto!important}
@media(max-width:720px){.chantal-collection summary{padding:18px;font-size:1rem}.chantal-collection summary::after{font-size:.7rem}.chantal-collection .accordion-body{padding:16px}}
</style>
<!-- MD-ACCORDION-END -->
'''

script = '''
<!-- MD-ACCORDION-SCRIPT-START -->
<script>
document.addEventListener('DOMContentLoaded',function(){
  document.querySelectorAll('.chantal-collection').forEach(function(section){
    if(section.querySelector(':scope > details')) return;
    var heading=section.querySelector('.chantal-collection-head h3');
    var range=section.querySelector('.chantal-collection-head .eyebrow');
    var title=heading?heading.textContent.trim():'Collection';
    var code=range?range.textContent.trim():'';
    var details=document.createElement('details');
    var summary=document.createElement('summary');
    var label=document.createElement('span');
    label.innerHTML='<strong>'+title+'</strong>'+(code?'<small style="display:block;color:#64748b;font-weight:700;margin-top:4px">'+code+'</small>':'');
    summary.appendChild(label);
    var body=document.createElement('div');
    body.className='accordion-body';
    while(section.firstChild) body.appendChild(section.firstChild);
    details.appendChild(summary);
    details.appendChild(body);
    section.appendChild(details);
  });
});
</script>
<!-- MD-ACCORDION-SCRIPT-END -->
'''

html = html.replace('</head>', style + '\n</head>')
html = html.replace('</body>', script + '\n</body>')
path.write_text(html, encoding='utf-8')

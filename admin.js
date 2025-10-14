(async function(){
  const loginEl = document.getElementById('login');
  const dashEl = document.getElementById('dashboard');
  const pwInput = document.getElementById('pw');
  const msg = document.getElementById('msg');
  const btnLogin = document.getElementById('btnLogin');
  const logout = document.getElementById('logout');
  const tabContent = document.getElementById('tabContent');

  async function getAdminConfig(){
    const res = await fetch('pages/admin-config.json', {cache:'no-store'});
    return await res.json();
  }

  function showDashboard(){
    loginEl.style.display='none';
    dashEl.style.display='block';
  }

  function showLogin(){
    loginEl.style.display='block';
    dashEl.style.display='none';
  }

  btnLogin.addEventListener('click', async () => {
    const cfg = await getAdminConfig();
    const pw = pwInput.value || '';
    if (pw === cfg.adminPassword) {
      showDashboard();
      loadTab('slideshow');
    } else {
      msg.textContent = '❌ Falsches Passwort';
    }
  });

  logout.addEventListener('click', () => {
    pwInput.value = '';
    showLogin();
  });

  document.querySelectorAll('nav button[data-tab]').forEach(b=>{
    b.addEventListener('click', ()=> loadTab(b.dataset.tab));
  });

  async function loadTab(tab){
    try {
      const res = await fetch(`admin/${tab}.html`, {cache:'no-store'});
      if (res.ok) {
        tabContent.innerHTML = await res.text();
      } else {
        tabContent.innerHTML = `<p>Tab ${tab} nicht gefunden.</p>`;
      }
    } catch(e){
      tabContent.innerHTML = `<p>Fehler beim Laden: ${e.message}</p>`;
    }
  }
})();
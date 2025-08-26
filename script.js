// Simple app - single page, local data, login admin/admin
(function(){
  // --- data (пример, можно править) ---
  const leaders = [
    {id:1,nick:'Sensei_Flocka', faction:'Ballas', placed:'25.03.2025', days:'38/60', points:30, warnings:'0/3', preds:0, online:'12:00:40', avatar: 'https://i.pravatar.cc/64?img=1'},
    {id:2,nick:'Valentain_Vertucci', faction:'Grove', placed:'18.02.2025', days:'73/92', points:30, warnings:'0/3', preds:0, online:'29:43:14', avatar: 'https://i.pravatar.cc/64?img=2'},
    {id:3,nick:'Andrew_Prototype', faction:'Grove', placed:'20.04.2025', days:'12/30', points:30, warnings:'0/3', preds:0, online:'32:04:07', avatar: 'https://i.pravatar.cc/64?img=3'},
    {id:4,nick:'Uwe_Wehmeyer', faction:'Ballas', placed:'26.04.2025', days:'6/30', points:30, warnings:'0/3', preds:0, online:'37:24:30', avatar: 'https://i.pravatar.cc/64?img=4'},
    {id:5,nick:'Roy_Nostra', faction:'Grove', placed:'05.04.2025', days:'27/30', points:40, warnings:'1/3', preds:0, online:'29:38:02', avatar: 'https://i.pravatar.cc/64?img=5'},
    // ... добавь при необходимости
  ];

  const logs = [
    'Игрок Jeffy_Cosmo [Разработчик] изменил должность [Было: Игрок | Стало: ГА сервера] | 25.04.2025 23:01:58',
    'Игрок Jeffy_Cosmo [Разработчик] изменил сервер пользователя [Было: Не установлен | Стало: Red-Rock [8]] | 25.04.2025 23:01:57'
  ];

  // --- DOM ---
  const login = document.getElementById('login');
  const app = document.getElementById('app');
  const loginForm = document.getElementById('loginForm');
  const u = document.getElementById('u');
  const p = document.getElementById('p');
  const logoutBtn = document.getElementById('logout');
  const pageTitle = document.getElementById('pageTitle');
  const navButtons = document.querySelectorAll('.side-nav .nav-item');
  const pages = document.querySelectorAll('.page');
  const search = document.getElementById('search');
  const leadersTableBody = document.querySelector('#leadersTable tbody');
  const filterButtons = document.querySelectorAll('.btn-filter');
  const logList = document.getElementById('logList');
  const profileName = document.getElementById('profileName');
  const profileAvatar = document.getElementById('profileAvatar');
  const topAvatar = document.getElementById('topAvatar');
  const groveLeader = document.getElementById('groveLeader');
  const ballasLeader = document.getElementById('ballasLeader');

  // --- helpers ---
  function showPage(name){
    pages.forEach(p => p.classList.remove('active'));
    const el = document.getElementById('page-' + name);
    if(el) el.classList.add('active');
    // nav active
    navButtons.forEach(nb => nb.classList.toggle('active', nb.dataset.route === name));
    pageTitle.innerText = name.charAt(0).toUpperCase() + name.slice(1);
  }

  function renderLeaders(filter='all', q=''){
    leadersTableBody.innerHTML = '';
    const list = leaders.filter(l => (filter==='all' || l.faction === filter) && (q === '' || l.nick.toLowerCase().includes(q.toLowerCase())));
    list.forEach((l, idx) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${idx + 1}</td>
        <td style="display:flex;align-items:center;gap:10px"><img src="${l.avatar}" style="width:40px;height:40px;border-radius:50%"/> <div><div style="font-weight:600">${l.nick}</div><div class="muted" style="font-size:12px">${l.faction}</div></div></td>
        <td>${l.placed}</td>
        <td>${l.days}</td>
        <td>${l.points}</td>
        <td>${l.warnings}</td>
        <td>${l.preds}</td>
        <td>${l.online}</td>
      `;
      leadersTableBody.appendChild(tr);
    });
  }

  function renderLogs(){
    logList.innerHTML = '';
    logs.forEach(l => {
      const d = document.createElement('div');
      d.className = 'log-item';
      d.innerText = l;
      logList.appendChild(d);
    });
  }

  function updateProfileUI(){
    // use the first leader as profile example (mimic screenshots)
    const main = leaders[1] || leaders[0];
    profileName.innerText = main.nick;
    profileAvatar.src = main.avatar;
    topAvatar.src = main.avatar;
    groveLeader.innerText = (leaders.find(l=>l.faction==='Grove') || {nick:'-'}).nick;
    ballasLeader.innerText = (leaders.find(l=>l.faction==='Ballas') || {nick:'-'}).nick;
    document.getElementById('infoName').innerText = main.nick;
    document.getElementById('infoFaction').innerText = main.faction;
  }

  // --- events ---
  loginForm.addEventListener('submit', (ev) => {
    ev.preventDefault();
    const user = u.value.trim();
    const pass = p.value.trim();
    // fixed credentials
    if(user === 'admin' && pass === 'admin'){
      login.classList.add('hidden');
      app.classList.remove('hidden');
      // default view
      showPage('profile');
      renderAll();
    } else {
      alert('Неверный логин/пароль (используй admin/admin)');
    }
  });

  logoutBtn.addEventListener('click', () => {
    app.classList.add('hidden');
    login.classList.remove('hidden');
    u.value = ''; p.value = '';
  });

  navButtons.forEach(b => {
    b.addEventListener('click', ()=> {
      const r = b.dataset.route;
      showPage(r);
      renderAll();
    });
  });

  search && search.addEventListener('input', ()=> {
    const q = search.value.trim();
    const active = document.querySelector('.btn-filter.active').dataset.f;
    renderLeaders(active === 'all' ? 'all' : active, q);
  });

  filterButtons.forEach(fb => {
    fb.addEventListener('click', ()=> {
      filterButtons.forEach(x => x.classList.remove('active'));
      fb.classList.add('active');
      const active = fb.dataset.f;
      renderLeaders(active === 'all' ? 'all' : active, search.value.trim());
    });
  });

  // --- initial rendering ---
  function renderAll(){
    renderLeaders('all','');
    renderLogs();
    updateProfileUI();
  }

  // Start (if you want auto-login while developing uncomment)
  // login.classList.add('hidden'); app.classList.remove('hidden'); renderAll();

  // Expose some for console tinkering
  window._ARZ = {leaders, logs, renderLeaders, renderLogs, renderAll};
})();

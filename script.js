const loginForm = document.getElementById('login-form');
const loginScreen = document.getElementById('login-screen');
const mainScreen = document.getElementById('main-screen');
const logoutBtn = document.getElementById('logout-btn');

loginForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  if(username === 'admin' && password === 'admin') {
    loginScreen.classList.remove('active');
    mainScreen.classList.add('active');
  } else {
    alert('Неверный логин или пароль');
  }
});

logoutBtn.addEventListener('click', function() {
  mainScreen.classList.remove('active');
  loginScreen.classList.add('active');
});

// Меню табов
document.querySelectorAll('nav li').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('nav li').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.getElementById(tab.id.replace('menu-', '')).classList.add('active');
  });
});

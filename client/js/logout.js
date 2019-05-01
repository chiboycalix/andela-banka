document.getElementById('logout').addEventListener('click', (e) => {
  e.preventDefault();
  const token = window.localStorage.getItem('user_token')
  if (token) {
    window.localStorage.clear();
    window.location.href = './index.html';
  }
});

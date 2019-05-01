const basePath = 'https://banka-challenge-3.herokuapp.com';

document.getElementById('signup-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const user = {
    firstName: document.getElementById('firstname').value,
    lastName: document.getElementById('lastname').value,
    email: document.getElementById('email').value,
    password: document.getElementById('password').value
  }
  fetch(`${basePath}/api/v1/auth/signup`, {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
      'Content-Type': 'Application/json'
    }
  }).then(async (response) => {
    if (response.status !== 201) {
      const result = await response.json();
      document.getElementById('error_message_signup').innerHTML = `${result.error}`;
    }
    if (response.status === 409) {
          document.getElementById('error_message_signup').innerHTML = 'User already exists';
        }
    if(response.status === 201) {
      const result = await response.json()
      if (!result.data.token) throw ('no token found');
      window.localStorage.setItem('user_token', result.data.token);
      window.localStorage.setItem('type', result.data.type);
      window.location.href = './dashboard.html';
    }
  })
  .catch(error => console.log('Error:', error));
});

document.getElementById('signin-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const user = {
    email: document.getElementById('email-login').value,
    password: document.getElementById('password-login').value
  }
  fetch(`${basePath}/api/v1/auth/login`, {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
      'Content-Type': 'Application/json'
    }
  }).then(async (response) => {
    if (response.status !== 200) {
      const result1 = await response.json();
      document.getElementById('error_message_login').innerHTML = `${result1.error}`;
    }
    if (response.status === 404) {
      const result2 = await response.json();
          document.getElementById('error_message_login').innerHTML =`${result2.error}`;
        }
    if(response.status === 200) {
      const result = await response.json()
      if (!result.data.token) throw ('no token found');
      window.localStorage.setItem('user_token', result.data.token);
      window.localStorage.setItem('type', result.data.type);
      window.location.href = './dashboard.html';
    }
  })
});
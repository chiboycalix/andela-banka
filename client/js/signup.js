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
  }).then((response) => {
    if (response.status !== 201) {
      return response;
    }
    return response.json();
  })
  .then((response) => {
    if(response.status === 201) {
      if (!response.data.token) throw ('no token found');
      window.localStorage.setItem('user_token', response.data.token);
      window.localStorage.setItem('type', response.data.type);
      window.location.href = './dashboard.html';
    }
    if (response.status === 409) {
      document.getElementById('error_message').innerHTML = 'User already exists';
    }
  })
  .catch(error => console.log('Error:', error));
})
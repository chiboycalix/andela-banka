const basePath = 'localhost:3000';

document.getElementById('signup-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const user = {
    firsname: document.getElementById('firstname').value,
    lastname: document.getElementById('lastname').value,
    email: document.getElementById('email').value,
    password: document.getElementById('password').value
  }
  console.log(user);
  fetch(`${basePath}/api/v1/auth/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'Application/json'
    }
  }).then((response) => {
    console.log(response)
    if (response.status !== 201) {
      return response;
    }
    return response.json();
  })
  .then((response) => {
    if(response.status === 201) {
      if (!response.data.token) throw ('no token found');
      window.localStorage.setItem('user_token', response.data.token);
      window.localStorage.setItem('isAdmin', res.data.isadmin);
      window.location.href = '../dashboard.html';
    }
    if (response.status === 409) {
      document.getElementById('error_message').innerHTML = 'Username or email taken';
    }
  })
  .catch(error => console.log(error.message));
})
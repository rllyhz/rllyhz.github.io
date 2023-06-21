const authData = getAuthData();

if (authData && authData.isLoggedIn) {
  alert('You\'re already logged in, ' + authData.name + '!');
  location.href = '/dashboard'
}

const loginEndpointUrl = getEndpointPath('/auth/login');

const loginForm = document.forms["login-form"];

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const username = usernameInput.value
  const password = passwordInput.value

  if (!username || !password) {
    alert("Please fill the required fields!")
    return;
  }

  // set loading
  MakeBtnDisabled(btnLogin);

  const body = {
    username, password,
  };

  fetch(loginEndpointUrl, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  })
    .then(res => res.json())
    .then(res => {
      console.clear();
      if (res.error) {
        alert(res.message);
        getElem('#your-password').value = ''
      } else {
        const userData = res.user;
        userData.username = username;
        saveAuthData(userData, true);
        alert('Successfully logged in!');
        location.href = '/dashboard'
      }
      // hide loading
      MakeBtnDisabled(btnLogin, false, 'Login');
    });
});
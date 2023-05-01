const authData = getAuthData();

if (authData && authData.isLoggedIn) {
  alert('You\'re already logged in, ' + authData.name + '!');
  location.href = '/dashboard'
}

const loginEndpointUrl = getEndpointPath('/login');

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

  const formData = new FormData(loginForm);

  fetch(loginEndpointUrl, {
    method: 'POST',
    body: new URLSearchParams(formData),
  })
    .then(res => res.json())
    .then(res => {
      console.clear();
      if (res.error) {
        alert(res.message);
        getElem('#your-password').value = ''
      } else {
        const userData = res.data.user;
        saveAuthData(userData, true);
        alert('Successfully logged in!');
        location.href = '/dashboard'
      }
      // hide loading
      MakeBtnDisabled(btnLogin, false, 'Login');
    });
});
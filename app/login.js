const authData = getAuthData();

if (authData && authData.isLoggedIn) {
  alert('You\'re already logged in, ' + authData.name + '!');
  location.href = '/dashboard'
}

const loginForm = document.forms["login-form"];
const loginEndpointUrl = 'https://rllyzhz-github-pages.netlify.app/.netlify/functions/api/login';
const loginEndpointUrlTest = 'http://localhost:9000/.netlify/functions/api/login';

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

  fetch(loginEndpointUrlTest, {
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
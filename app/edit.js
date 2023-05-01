const authData = getAuthData();

if (!authData || !authData.isLoggedIn) {
  saveAuthData({}, false);
  alert('You\'re not allowed to access this page');
  window.history.back();
}
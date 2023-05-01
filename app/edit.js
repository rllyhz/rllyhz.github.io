const dataId = getQueryData("id")

if (!dataId) {
  alert("❌⛔ Activity not allowed!")
  window.history.back();
}

const authData = getAuthData();

if (!authData || !authData.isLoggedIn) {
  saveAuthData({}, false);
  alert('You\'re not allowed to access this page');
  window.history.back();
}
const dataId = getQueryData("id")

if (!dataId) {
  alert("❌⛔ Activity not allowed!")
  window.history.back();
}

const authData = getAuthData();

if (!authData || !authData.isLoggedIn) {
  saveAuthData({}, false);
  alert('You\'re not allowed to access this page');
  window.location.href = getBaseUrl() + '/login';
}

const deleteProjectEndpointUrl = getEndpointPath(`/projects/${dataId}?username=${authData.username}&token=${authData.token}`);

const confirmedToDelete = confirm("Are you sure want to delete?");

if (confirmedToDelete) {
  deleteProject();
} else {
  window.history.back();
}

async function deleteProject() {
  let resultData = null;
  const result = await fetch(deleteProjectEndpointUrl, {
    method: 'DELETE',
    headers: new Headers({
      'Authorization': `Bearer ${authData.token}`
    }),
  });

  if (result.ok && result.status == 200) {
    resultData = await result.json();
  } else if (result.status == 400 || result.status == 401) {
    saveAuthData({}, false);
    alert('You\'re not allowed to access this page');
    window.location.href = getBaseUrl() + '/login';
  } else if (result.status == 404) {
    alert("❌⛔ Project not found!");
    window.location.href = getBaseUrl() + '/projects';
  }

  if (resultData == null || resultData.error) {
    alert('Failed to delete project');
    window.location.href = getBaseUrl() + '/projects';
  } else {
    alert('Successfully deleted the project');
    window.location.href = getBaseUrl() + '/projects';
  }
}
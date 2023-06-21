const authData = getAuthData();

if (!authData || !authData.isLoggedIn || !authData.token || !authData.username) {
  redirectToLogin();
}

getElem('#btn-logout').addEventListener('click', (e) => {
  e.preventDefault();
  const confirmed = confirm('Are you sure want to logout?');
  if (confirmed) {
    saveAuthData({}, false);
    location.replace('/login'); 
  }
});

let uploadedProjectsJsonFile = null;
let uploadedProjectImageFiles = null;

const username = authData.username;
const token = authData.token;
const lastConfigurationValues = {};

const getConfigurationEndpointUrl = getEndpointPath('/configuration');
const setConfigurationEndpointUrl = getEndpointPath('/configuration');
const exportProjectsEndpointUrl = getEndpointPath(`/data/projects/export?token=${authData.token}`);
const importProjectEndpointUrl = getEndpointPath('/data/projects/import');
const exportProjectImagesEndpointUrl = getEndpointPath(`/images/projects/export?username=${username}&token=${token}`);
const uploadProjectImagesEndpointUrl = (replaceAll = false) => getEndpointPath(`/images/projects?username=${username}&token=${token}&replaceAll=${replaceAll}`);
const getProjectImagesEndpointUrl = getEndpointPath('/images/projects');
const deleteProjectImagesEndpointUrl = getEndpointPath(`/images/projects?username=${username}&token=${token}`);


fetch(getConfigurationEndpointUrl, {
  method: "GET",
  headers: new Headers({
    'Authorization': `Bearer ${authData.token}`,
    'Content-Type': 'application/json'
  }),
})
  .then(async (res) => {
    let shouldRedirectToLogin = false;
    if (res.status >= 400 && res.status < 500) {
      shouldRedirectToLogin = true;
    }
    return {
      errorNotAllowed: shouldRedirectToLogin,
      actualResult: await res.json(),
    };
  })
  .catch(err => {
    console.clear();
    console.log(err.message);
    showErrorUI();
  })
  .then(res => {
    if (!res) {
      return;
    };
    console.clear();
    if (res.errorNotAllowed) {
      saveAuthData({}, false);
      redirectToLogin();
    } else if (res.actualResult.error) {
      alert('Sorry, something went wrong:( \nTry again.');
      reloadPage();
    } else {
      const {
        lockUsersManage,
        lockProjectsManage,
        underMaintenance,
        tokenExpiresInHours,
        pinnedProjectsOrder
      } = res.actualResult.configuration;

      const data = [
        {
          label: 'Lock Users Manage',
          key: 'lockUsersManage',
          value: lockUsersManage,
        },
        {
          label: 'Lock Projects Manage',
          key: 'lockProjectsManage',
          value: lockProjectsManage,
        },
        {
          label: 'Under Maintenance',
          key: 'underMaintenance',
          value: underMaintenance,
        },
        {
          label: 'Token Expires In Hours',
          key: 'tokenExpiresInHours',
          value: tokenExpiresInHours,
        },
        {
          label: 'Pinned Projects Order',
          key: 'pinnedProjectsOrder',
          value: pinnedProjectsOrder,
        },
      ];
      data.forEach(dt => {
        lastConfigurationValues[dt.key] = dt.value;
      });
      // show UI
      showHasDataUI(data);
    }
  });

function showErrorUI() {
  getElem('.dashboard').innerHTML = '';
  const errorContainerElem = document.createElement('div');
  errorContainerElem.classList.add('error-container');
  const errorMessageElem = document.createElement('p');
  errorMessageElem.innerText = 'Sorry, it went wrong :( \nPlease check your connection first.';
  errorContainerElem.appendChild(errorMessageElem);
  getElem('.dashboard').appendChild(errorContainerElem);
}

function showLoadingUI() {
  getElem('.dashboard').innerHTML = '';
  const loadingContainerElem = document.createElement('div');
  loadingContainerElem.classList.add('dashboard-loading-container');
  const loadingElem = document.createElement('div');
  loadingElem.classList.add('loading');
  loadingContainerElem.appendChild(loadingElem);
  getElem('.dashboard').appendChild(loadingContainerElem);
}

function showHasDataUI(data = []) {
  getElem('.dashboard').innerHTML = '';
  const dashboardContainerElem = document.createElement('div');
  dashboardContainerElem.classList.add('dashboard-container');

  const greetingUserElem = document.createElement('h2');
  greetingUserElem.classList.add('greeting-user');
  greetingUserElem.innerText = getGreetingUserTemplate(authData.username ?? '??');
  dashboardContainerElem.appendChild(greetingUserElem);

  const lineElem = document.createElement('span');
  lineElem.classList.add('line');
  dashboardContainerElem.appendChild(lineElem);

  const configurationTitleElem = document.createElement('h3');
  configurationTitleElem.classList.add('configuration-title');
  configurationTitleElem.innerText = 'Configuration';
  dashboardContainerElem.appendChild(configurationTitleElem);

  const configurationContainerElem = document.createElement('div');
  configurationContainerElem.classList.add('configuration-container');

  // CONFIGURATION
  data.forEach(dt => {
    if (dt.key !== "tokenExpiresInHours" && dt.key !== "pinnedProjectsOrder") {
      const _configurationItem = document.createElement('div');
      _configurationItem.classList.add('configuration-item');
      
      const _labelElem = document.createElement('p');
      _labelElem.innerText = dt.label;
      _labelElem.dataset.key = dt.key;
      _configurationItem.appendChild(_labelElem);

      const _valueElem = document.createElement('p');
      if (dt.value == true) {
        _valueElem.innerText = 'Yes';
        _valueElem.dataset.value = 'true';
        _valueElem.classList.add('true');
      } else {
        _valueElem.innerText = 'No';
        _valueElem.dataset.value = 'false';
      }
      _configurationItem.appendChild(_valueElem);

      const _toggleButton = document.createElement('button');
      _toggleButton.innerText = 'Toggle';
      _toggleButton.classList.add('btn-toggle');
      _toggleButton.type = 'button';
      _configurationItem.appendChild(_toggleButton);

      configurationContainerElem.appendChild(_configurationItem);
    }
  });
  
  const btnUpdateElem = document.createElement('button');
  btnUpdateElem.classList.add('btn-update');
  btnUpdateElem.id = 'btn-update';
  btnUpdateElem.innerText = 'Update';
  const actionContainerElem = document.createElement('div');
  actionContainerElem.classList.add('btn-update-container');
  actionContainerElem.appendChild(btnUpdateElem);

  dashboardContainerElem.appendChild(configurationContainerElem);
  dashboardContainerElem.appendChild(actionContainerElem);
  // END OF CONFIGURATION

  // IMPORT EXPORT PROJECTS
  const [
    importExportProjetsTitle,
    importExportProjetsController,
    importExportProjetsAction
  ] = createImportExportUI({
    title: 'Import/Export Projects',
    uploadLabel: 'Upload projects json file',
    uploadResultPreview: '=> Ex: projects.json',
    uploadResultClassName: 'projects-result-preview',
    uploadAcceptFileType: '.json',
    uploadInputClassName: 'input-file-projects',
    uploadButtonClassName: 'btn-upload-projects',
    optionLabel: 'Replacing existing projects',
    optionClassName: 'option-projects',
    btnImportClassName: 'btn-import-projects',
    btnExportClassName: 'btn-export-projects',
  });
  dashboardContainerElem.appendChild(importExportProjetsTitle);
  dashboardContainerElem.appendChild(importExportProjetsController);
  dashboardContainerElem.appendChild(importExportProjetsAction);
  // END OF IMPORT EXPORT PROJECTS

  // IMPORT EXPORT PROJECT IMAGES
  const [
    importExportProjetImagesTitle,
    importExportProjetImagesController,
    importExportProjetImagesAction
  ] = createImportExportUI({
    title: 'Import/Export Project Images',
    uploadLabel: 'Upload project image files',
    uploadResultPreview: '=> Ex: image.png',
    uploadResultClassName: 'images-result-preview',
    multipleUpload: true,
    uploadAcceptFileType: '.jpeg,.png,.jpg',
    uploadInputNameField: 'images',
    uploadInputClassName: 'input-file-images',
    uploadButtonClassName: 'btn-upload-images',
    optionLabel: 'Replacing existing project images',
    optionNameField: 'replaceAll',
    optionClassName: 'option-images',
    btnImportClassName: 'btn-import-images',
    btnExportClassName: 'btn-export-images',
    formBehavior: true,
  });
  const formUploadProjectImages = document.createElement('form');
  formUploadProjectImages.id = 'project-images-form';
  formUploadProjectImages.action = uploadProjectImagesEndpointUrl();
  formUploadProjectImages.method = 'POST';
  formUploadProjectImages.enctype = 'multipart/form-data';
  const usernameInput = document.createElement('input');
  usernameInput.placeholder = 'username';
  usernameInput.name = 'username';
  usernameInput.value = authData.username;
  usernameInput.style.display = 'none';
  const tokenInput = document.createElement('input');
  tokenInput.placeholder = 'token';
  tokenInput.name = 'token';
  tokenInput.value = authData.token;
  tokenInput.style.display = 'none';
  formUploadProjectImages.appendChild(importExportProjetImagesController);
  formUploadProjectImages.appendChild(importExportProjetImagesAction);
  formUploadProjectImages.appendChild(usernameInput);
  formUploadProjectImages.appendChild(tokenInput);

  dashboardContainerElem.appendChild(importExportProjetImagesTitle);
  dashboardContainerElem.appendChild(formUploadProjectImages);
  // END OF IMPORT EXPORT PROJECT IMAGES

  // show dashboard
  getElem('.dashboard').appendChild(dashboardContainerElem);
  // activate update functionality
  activateUpdateButton();
  activateToggleButtons();
  // activate import/export functionality
  activateImportExportButtons();
}

function activateImportExportButtons() {
  // PROJECTS
  getElem('.input-file-projects').addEventListener('change', (_) => {
    uploadedProjectsJsonFile = getElem('.input-file-projects').files[0];
    getElem('.projects-result-preview').innerHTML = '=> ' + uploadedProjectsJsonFile.name;
    getElem('.projects-result-preview').style.color = 'green';
  });
  getElem('.btn-upload-projects').addEventListener('click', (_) => {
    getElem('.input-file-projects').click();
  });
  getElem('.btn-export-projects').addEventListener('click', (_) => {
    const anchorElem = document.createElement('a');
    anchorElem.href = exportProjectsEndpointUrl;
    anchorElem.target = '_blank';
    anchorElem.click();
    delete anchorElem;
  });
  getElem('.btn-import-projects').addEventListener('click', (_) => {
    if (uploadedProjectsJsonFile == null) {
      alert('Upload a JSON file first!');
      return;
    }
    showLoadingOnButton(getElem('.btn-import-projects'));

    const uploadedFileUrl = URL.createObjectURL(uploadedProjectsJsonFile);

    fetch(uploadedFileUrl)
      .then(res => res.json())
      .catch(_ => {
        console.clear();
        alert('Error when uploading projects file!')
      })
      .then(projects => {
        if (!projects) return;
        console.clear();
        importProjects(projects);
      });
  });

  // PROJECT IMAGES
  getElem('.input-file-images').addEventListener('change', (_) => {
    uploadedProjectImageFiles = getElem('.input-file-images').files;
    if (uploadedProjectImageFiles.length == 1) {
      getElem('.images-result-preview').innerHTML = '=> ' + uploadedProjectImageFiles[0].name;
    } else {
      getElem('.images-result-preview').innerHTML = '=> ' + uploadedProjectImageFiles.length + ' files';
    }
    getElem('.images-result-preview').style.color = 'green';
  });
  getElem('.btn-upload-images').addEventListener('click', (_) => {
    getElem('.input-file-images').click();
  });
  getElem('.btn-export-images').addEventListener('click', (_) => {
    alert("This feature not implemented yet");
    return;
    const anchorElem = document.createElement('a');
    anchorElem.href = exportProjectImagesEndpointUrl;
    anchorElem.target = '_blank';
    anchorElem.click();
    delete anchorElem;
  });
  getElem('.btn-import-images').addEventListener('click', async (e) => {
    e.preventDefault();

    alert("This feature not implemented yet");
    return;

    if (uploadedProjectImageFiles == null || uploadedProjectImageFiles.length <= 0) {
      alert('Upload image files first!');
      return;
    }

    showLoadingOnButton(getElem('.btn-import-images'));

    const formElem = getElem('#project-images-form');
    const formData = new FormData(formElem);
    const isReplaceAll = getElem('input[name="replaceAll"]').checked;

    const result = await fetch(uploadProjectImagesEndpointUrl(isReplaceAll), {
      method: 'POST',
      body: formData,
    });

    if (result.status == 200 && result.ok) {
      const data = await result.json();
      if (data.error) {
        alert('Failed to upload images');
      } else {
        alert('Succesfully uploaded images');
      }
    } else {
      alert('Failed to upload images');
    }

    uploadedProjectImageFiles = null;
    getElem('.images-result-preview').innerHTML = '=> Ex: image.png';
    getElem('input[name="replaceAll"]').checked = false;
    showLoadingOnButton(getElem('.btn-import-images'), false, 'Import');
  });
  // 
}

function importProjects(projects = []) {
  if (projects.length <= 0) {
    alert('Project must not be empty!');
    showLoadingOnButton(getElem('.btn-import-projects'), false, 'Import');
    return;
  }

  fetch(importProjectEndpointUrl, {
    method: 'POST',
    body: JSON.stringify({
      projects,
      replaceAll: getElem('.option-projects').checked,
    }),
    headers: new Headers({
      'Authorization': `Bearer ${authData.token}`,
      'Content-Type': 'application/json'
    }),
  })
  .catch(err => {
    console.clear();
    alert('Sorry, it went wrong :( \nCheck your connection first!')
  })
  .then(async res => {
    if (!res) return;
    let shouldRedirectToLogin = false;
    let errorProjectFormat = false;
    if (res.status == 401 || (res.status == 400 && res.message == 'Wrong username or token!')) {
      shouldRedirectToLogin = true;
    } else if (res.status == 400 && res.message != 'You must provide your username and token!') {
      errorProjectFormat = true;
    }
    return {
      errorNotAllowed: shouldRedirectToLogin,
      errorProjectFormat,
      actualResult: await res.json(),
    };
  })
    .then(res => {
      console.clear();
      showLoadingOnButton(getElem('.btn-import-projects'), false, 'Import');
      if (!res) return;
      if (res.errorNotAllowed) {
        saveAuthData({}, false);
        redirectToLogin();
        console.log(res.actualResult.message);
      } else if (res.errorProjectFormat) {
        alert(res.actualResult.message);
      } else if (res.actualResult.error) {
        alert('Sorry, something went wrong:( \nTry again.');
      } else {
        alert('Successfully import the projects!');
        reloadPage();
      }
    });
}

function activateUpdateButton() {
  getElem('.btn-update').addEventListener('click', (_) => {
    let shouldUpdate = false;
    const newConfiguration = {};
    document.querySelectorAll('.configuration-container .configuration-item p:nth-child(2)')
      .forEach(valueElem => {
        const key = valueElem.previousElementSibling.dataset.key;
        const currentvalue = valueElem.dataset.value ?? 'false';
        const lastValue = lastConfigurationValues[key];
        if (currentvalue.toLowerCase() != String(lastValue)) {
          shouldUpdate = true;
        }
        try {
          newConfiguration[key] = parseBoolean(currentvalue);
        } catch (error) {
          newConfiguration[key] = false;
          console.log(error);
        }
      });
    if (shouldUpdate) {
      // console.log('update configuration');
      updateConfiguration(newConfiguration);
    } else {
      // console.log('nothing changes');
    }
  });
}

function updateConfiguration(newConfiguration = {}) {
  const confirmed = confirm('Are you sure want to update?');
  if (!confirmed) {
    return;
  }

  showLoadingOnButton(getElem('.btn-update'));

  const newConfigurationData = {};

  Object.keys(lastConfigurationValues).forEach(key => {
    if (newConfiguration[key] !== undefined) {
      newConfigurationData[key] = newConfiguration[key];
    } else {
      if (key === "pinnedProjectsOrder") {
        newConfigurationData[key] = lastConfigurationValues[key].join(", ");
      } else {
        newConfigurationData[key] = lastConfigurationValues[key];
      }
    }
  });

  fetch(setConfigurationEndpointUrl, {
    method: 'PUT',
    body: JSON.stringify(newConfigurationData),
    headers: new Headers({
      'Authorization': `Bearer ${authData.token}`,
      'Content-Type': 'application/json'
    }),
  })
  .catch(err => {
    console.clear();
    alert('Sorry, it went wrong :( \nPlease check your connection first!')
  })
  .then(async (res) => {
    console.clear();
    if (!res) return;
    let shouldRedirectToLogin = false;
    if (res.status >= 400 && res.status < 500) {
      shouldRedirectToLogin = true;
    }
    return {
      errorNotAllowed: shouldRedirectToLogin,
      actualResult: await res.json(),
    };
  })
  .then(res => {
    console.clear();
    showLoadingOnButton(getElem('.btn-update'), false, 'Update');
    if (!res) return;
    if (res.errorNotAllowed) {
      saveAuthData({}, false);
      redirectToLogin();
    } else if (res.actualResult.error) {
      alert('Sorry, something went wrong:( \nTry again.');
    } else {
      alert(res.actualResult.message);
      reloadPage();
    }
  });
}

function activateToggleButtons() {
  document.querySelectorAll('.configuration-container .configuration-item .btn-toggle')
  .forEach((button) => {
    button.addEventListener('click', (_) => {
      const valueElem = button.previousElementSibling;
      if (valueElem) toggleConfigurationItemUI(valueElem);
    });
  });
}

function toggleConfigurationItemUI(valueElem) {
  const isActiveValue = valueElem.dataset.value ?? '';
  if (isActiveValue.toLowerCase() == 'true') {
    valueElem.dataset.value = 'false';
    valueElem.innerText = 'No';
    if (valueElem.classList.contains('true')) valueElem.classList.remove('true');
  } else {
    valueElem.dataset.value = 'true';
    valueElem.innerText = 'Yes';
    if (!valueElem.classList.contains('true')) valueElem.classList.add('true');
  }
}

function redirectToLogin() {
  alert('You\'re not allowed to access this page');
  location.href = '/login';
}

function reloadPage() {
  location.href = '/dashboard';
}
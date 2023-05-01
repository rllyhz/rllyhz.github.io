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

let uploadedProjectsFile = null;
let dashboardBtnBackgroundColor = null;

const username = authData.username;
const token = authData.token;
const lastConfigurationValues = {};
const getConfigurationEndpointUrl = `https://rllyzhz-github-pages.netlify.app/.netlify/functions/api/configuration?username=${username}&token=${token}`;
const getConfigurationEndpointUrlTest = `http://localhost:9000/.netlify/functions/api/configuration?username=${username}&token=${token}`;
const setConfigurationEndpointUrl = 'https://rllyzhz-github-pages.netlify.app/.netlify/functions/api/configure';
const setConfigurationEndpointUrlTest = 'http://localhost:9000/.netlify/functions/api/configure';
const exportEndpointUrl = `https://rllyzhz-github-pages.netlify.app/.netlify/functions/api/export?username=${username}&token=${token}`;
const exportEndpointUrlTest = `http://localhost:9000/.netlify/functions/api/export?username=${username}&token=${token}`;
const importEndpointUrl = 'https://rllyzhz-github-pages.netlify.app/.netlify/functions/api/import';
const importEndpointUrlTest = 'http://localhost:9000/.netlify/functions/api/import';


fetch(getConfigurationEndpointUrlTest)
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
  .then(res => {
    console.clear();
    if (res.errorNotAllowed) {
      saveAuthData({}, false);
      redirectToLogin();
    } else if (res.actualResult.error) {
      alert('Sorry, something went wrong:( \nTry again.');
      reloadPage();
    } else {
      const lockUsersManage = res.actualResult.data.lockUsersManage;
      const lockTokenDataManage = res.actualResult.data.lockTokenDataManage;
      const underMaintanance = res.actualResult.data.underMaintanance;
      const data = [
        {
          label: 'Lock Users Manage',
          key: 'lockUsersManage',
          value: lockUsersManage,
        },
        {
          label: 'Lock Token Data Manage',
          key: 'lockTokenDataManage',
          value: lockTokenDataManage,
        },
        {
          label: 'Under Maintanance',
          key: 'underMaintanance',
          value: underMaintanance,
        },
      ];
      data.forEach(dt => {
        lastConfigurationValues[dt.key] = dt.value;
      });
      // show UI
      showHasDataUI(data);
    }
  });


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
  greetingUserElem.innerText = getGreetingUserTemplate(authData.name ?? '??');
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

  data.forEach(dt => {
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

  const importExportTitleElem = document.createElement('h3');
  importExportTitleElem.classList.add('import-export-title');
  importExportTitleElem.innerText = 'Import/Export Projects';
  dashboardContainerElem.appendChild(importExportTitleElem);

  const inputUploadFileElem = document.createElement('input');
  inputUploadFileElem.type = 'file';
  inputUploadFileElem.accept = '.json';
  inputUploadFileElem.classList.add('input-upload-file');
  const btnUploadProjectsFileElem = document.createElement('button');
  btnUploadProjectsFileElem.type = 'button';
  btnUploadProjectsFileElem.innerText = 'Upload';
  btnUploadProjectsFileElem.classList.add('btn-upload');

  const uploadLabelElem = document.createElement('p');
  uploadLabelElem.innerText = 'Upload json file';
  const uploadResultElem = document.createElement('p');
  uploadResultElem.innerText = '=> Ex: projects.json';
  const previewContainerElem = document.createElement('div');
  previewContainerElem.classList.add('preview-container');
  previewContainerElem.appendChild(uploadLabelElem);
  previewContainerElem.appendChild(uploadResultElem);

  const uploadContainerElem = document.createElement('div');
  uploadContainerElem.classList.add('upload-container');
  uploadContainerElem.appendChild(previewContainerElem);
  uploadContainerElem.appendChild(document.createElement('div'));
  uploadContainerElem.appendChild(inputUploadFileElem);
  uploadContainerElem.appendChild(btnUploadProjectsFileElem);

  const optionLabelElem = document.createElement('p');
  optionLabelElem.innerText = 'Replace existing projects';
  const checkedOptionImportElem = document.createElement('input');
  checkedOptionImportElem.type = 'checkbox';

  const optionImportContainerElem = document.createElement('div');
  optionImportContainerElem.classList.add('option-import-container');
  optionImportContainerElem.appendChild(optionLabelElem);
  optionImportContainerElem.appendChild(document.createElement('div'));
  optionImportContainerElem.appendChild(checkedOptionImportElem);

  const importContainerElem = document.createElement('div');
  importContainerElem.classList.add('import-container');
  importContainerElem.appendChild(uploadContainerElem);
  importContainerElem.appendChild(optionImportContainerElem);

  dashboardContainerElem.appendChild(importContainerElem);

  const btnImportElem = document.createElement('button');
  btnImportElem.type = 'button';
  btnImportElem.innerText = 'Import';
  btnImportElem.classList.add('btn-import');
  const btnExportElem = document.createElement('button');
  btnExportElem.type = 'button';
  btnExportElem.innerText = 'Export';
  btnExportElem.classList.add('btn-export');

  const importExportActionContainerElem = document.createElement('div');
  importExportActionContainerElem.classList.add('import-export-action-container');
  importExportActionContainerElem.appendChild(btnExportElem);
  importExportActionContainerElem.appendChild(btnImportElem);

  dashboardContainerElem.appendChild(importExportActionContainerElem);

  // show dashboard
  getElem('.dashboard').appendChild(dashboardContainerElem);
  // activate update functionality
  activateUpdateButton();
  activateToggleButtons();
  // activate import/export functionality
  activateImportExportButtons();
}

function activateImportExportButtons() {
  getElem('.input-upload-file').addEventListener('change', (_) => {
    uploadedProjectsFile = getElem('.input-upload-file').files[0];
  });

  getElem('.btn-upload').addEventListener('click', (_) => {
    getElem('.input-upload-file').click();
  });

  getElem('.btn-export').addEventListener('click', (_) => {
    const anchorElem = document.createElement('a');
    anchorElem.href = exportEndpointUrl;
    anchorElem.target = '_blank';
    anchorElem.click();
    delete anchorElem;
  });

  getElem('.btn-import').addEventListener('click', (_) => {
    if (uploadedProjectsFile == null) {
      alert('Upload a JSON file first!');
      return;
    }

    showLoadingOnButton(getElem('.btn-import'));

    const uploadedFileUrl = URL.createObjectURL(uploadedProjectsFile);

    fetch(uploadedFileUrl)
      .then(res => res.json())
      .then(projects => {
        console.clear();
        importProjects(projects);
      });
  });
}

function importProjects(projects = []) {
  if (projects.length <= 0) {
    alert('Project must not be empty!');
    return;
  }
  const formData = new FormData();
  formData.append('username', authData.username);
  formData.append('token', authData.token);
  formData.append('projects', JSON.stringify(projects));
  formData.append('replaceAll', getElem('.option-import-container input').checked);

  fetch(importEndpointUrlTest, {
    method: 'POST',
    body: new URLSearchParams(formData),
  }).then(async res => {
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
      showLoadingOnButton(getElem('.btn-import'), false, 'Import');
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

  const formData = new FormData();
  formData.append('username', authData.username);
  formData.append('token', authData.token);

  Object.keys(newConfiguration).forEach(key => {
    formData.append(key, newConfiguration[key]);
  });

  fetch(setConfigurationEndpointUrl, {
    method: 'POST',
    body: new URLSearchParams(formData),
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
  .then(res => {
    console.clear();
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

function showLoadingOnButton(btn, disabled = true, label = 'Export') {
  if (disabled) {
    dashboardBtnBackgroundColor = getComputedStyle(btn).backgroundColor;
    btn.innerText = "Loading...";
    btn.style.background = 'rgba(0,0,0,.2)';
    btn.style.cursor = 'wait';
    btn.disabled = true;
  } else {
    btn.innerText = label;
    btn.style.background = dashboardBtnBackgroundColor;
    btn.style.cursor = 'pointer';
    btn.disabled = false;
  }
}

function redirectToLogin() {
  alert('You\'re not allowed to access this page');
  location.href = '/login';
}

function reloadPage() {
  location.href = '/dashboard';
}
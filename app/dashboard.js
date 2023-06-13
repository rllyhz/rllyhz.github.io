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
let dashboardBtnBackgroundColor = null;

const username = authData.username;
const token = authData.token;
const lastConfigurationValues = {};

const getConfigurationEndpointUrl = getEndpointPath(`/configuration?username=${username}&token=${token}`);
const setConfigurationEndpointUrl = getEndpointPath('/configure');
const exportProjectsEndpointUrl = getEndpointPath(`/export?username=${username}&token=${token}`);
const importProjectEndpointUrl = getEndpointPath('/import');
const exportProjectImagesEndpointUrl = getEndpointPath(`/export_project_images?username=${username}&token=${token}`);
const importProjectImagesEndpointUrl = getEndpointPath('/import_project_images');
const getProjectImagesEndpointUrl = getEndpointPath('/images/projects');
const deleteProjectImagesEndpointUrl = getEndpointPath(`/images/projects?username=${username}&token=${token}`);


fetch(getConfigurationEndpointUrl)
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

  // CONFIGURATION
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
    uploadInputClassName: 'input-file-images',
    uploadButtonClassName: 'btn-upload-images',
    optionLabel: 'Replacing existing project images',
    optionClassName: 'option-images',
    btnImportClassName: 'btn-import-images',
    btnExportClassName: 'btn-export-images',
  });
  dashboardContainerElem.appendChild(importExportProjetImagesTitle);
  dashboardContainerElem.appendChild(importExportProjetImagesController);
  dashboardContainerElem.appendChild(importExportProjetImagesAction);
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
      .catch(err => {
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
    // getElem('.input-file-images').click();
    alert('This feature hasn\'t implemented yet');
  });
  getElem('.btn-export-images').addEventListener('click', (_) => {
    // const anchorElem = document.createElement('a');
    // anchorElem.href = exportProjectImagesEndpointUrl;
    // anchorElem.target = '_blank';
    // anchorElem.click();
    // delete anchorElem;
    alert('This feature hasn\'t implemented yet');
  });
  getElem('.btn-import-images').addEventListener('click', async (_) => {
    alert('This feature hasn\'t implemented yet');
    return;
    
    if (uploadedProjectImageFiles == null) {
      alert('Upload image files first!');
      return;
    }
    showLoadingOnButton(getElem('.btn-import-images'));

    if (uploadedProjectImageFiles.length <= 0) {
      alert('Image file must not be empty!');
      showLoadingOnButton(getElem('.btn-import-images'), false, 'Import');
      return;
    }
    importProjectImages(uploadedProjectImageFiles);
  });
  // 
}

async function importProjectImages(images) {
  const isReplaceAll = getElem('.option-images').checked;
  let failed = false;

  if (isReplaceAll && isReplaceAll == true) {
    try {
      const result = await fetch(deleteProjectImagesEndpointUrl, { method: 'DELETE' });
      const data = await result.json();
      failed = data.error;
    } catch (error) {
      console.log(error);
    }
  }

  if (failed) {
    alert('Failed to upload images');
    return;
  };

  const formData = new FormData();
  formData.append('username', authData.username);
  formData.append('token', authData.token);

  for (let index = 0; index < images.length; index++) {
    const image = images[index];
    formData.append('images', image);
  }

  fetch(importProjectImagesEndpointUrl, {
    method: 'POST',
    body: formData,
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
      showLoadingOnButton(getElem('.btn-import-images'), false, 'Import');
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
        alert('Successfully uploaded images!');
        reloadPage();
      }
    });
}

function importProjects(projects = []) {
  if (projects.length <= 0) {
    alert('Project must not be empty!');
    showLoadingOnButton(getElem('.btn-import-projects'), false, 'Import');
    return;
  }
  const formData = new FormData();
  formData.append('username', authData.username);
  formData.append('token', authData.token);
  formData.append('projects', JSON.stringify(projects));
  formData.append('replaceAll', getElem('.option-projects').checked);

  fetch(importProjectEndpointUrl, {
    method: 'POST',
    body: new URLSearchParams(formData),
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
const authData = getAuthData();

if (!authData || !authData.isLoggedIn || !authData.token || !authData.username) {
  redirectToLogin();
}

const username = authData.username;
const token = authData.token;
const lastConfigurationValues = {};
const getConfigurationEndpointUrl = `https://rllyzhz-github-pages.netlify.app/.netlify/functions/api/configuration?username=${username}&token=${token}`;
const getConfigurationEndpointUrlTest = `http://localhost:9000/.netlify/functions/api/configuration?username=${username}&token=${token}`;
const setConfigurationEndpointUrl = 'https://rllyzhz-github-pages.netlify.app/.netlify/functions/api/configure';
const setConfigurationEndpointUrlTest = 'http://localhost:9000/.netlify/functions/api/configure';

showLoadingUI();

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
  .then(res => {
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
}

function showHasDataUI(data = []) {
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

  // show dashboard
  getElem('.dashboard').appendChild(dashboardContainerElem);
  // activate update functionality
  activateUpdateButton();
  activateToggleButtons();
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
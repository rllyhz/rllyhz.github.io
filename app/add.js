const authData = getAuthData();

if (!authData || !authData.isLoggedIn) {
  saveAuthData({}, false);
  alert('You\'re not allowed to access this page');
  window.history.back();
}

const menu = getElem('.nav__menu .nav__list .nav__item .nav__link');
menu.innerText = 'Projects';
menu.addEventListener('click', (e) => {
  e.preventDefault();
  window.history.back();
});

const languages = [
  'HTML', 'CSS', 'JS', 'Java',
  'Kotlin',
];
const technologies = [
  'Web', 'Android', 'Desktop', 'Multi-Platform',
  'Automation', 'AI', 'Machine Learning'
];
const projectTypes = [
  {
    type: 'web',
    name: 'WebApp'
  },
  {
    type: 'android',
    name: 'Android App'
  },
  {
    type: 'multiplatform-app',
    name: 'Multi-Platform App'
  },
  {
    type: 'desktop',
    name: 'Desktop'
  },
  {
    type: 'scripting',
    name: 'Scripting'
  },
];

// --------------------------------------------------
// INIT FORM
// --------------------------------------------------
// TYPES
let selectItems = '';
projectTypes.forEach((projectType) => {
  selectItems += `<option value="${projectType.type}">${projectType.name}</option>`;
});
getElem('select[name="type"]').innerHTML = selectItems;

// --------------------------------------------------
// LANGUAGES
let languageChips = '';
let selectedLanguageChips = [];

languages.forEach((language) => {
  languageChips += `<span class="chip-item">${language}</span>`;
});
getElem('.form-chips.languages .chips').innerHTML = languageChips;

document.querySelectorAll('.form-chips.languages .chip-item').forEach((chipItem) => {
  chipItem.addEventListener('click', (_) => {
    if (chipItem.classList.contains('selected')) {
      chipItem.classList.remove('selected');
      selectedLanguageChips = selectedLanguageChips.filter(chip => chip != chipItem.innerText);
    } else {
      chipItem.classList.add('selected');
      selectedLanguageChips.push(chipItem.innerText);
    }
    getElem('.form-chips.languages .selected-chips').innerHTML = selectedLanguageChips.map(chip => `<span class="chip-item">${chip}</span>`).join(' ');
    getElem('input.languages').value = selectedLanguageChips.join(',');
  });
});

// --------------------------------------------------
// LANGUAGES
let technologyChips = '';
let selectedTechnologyChips = [];

technologies.forEach((technology) => {
  technologyChips += `<span class="chip-item">${technology}</span>`;
});
getElem('.form-chips.technologies .chips').innerHTML = technologyChips;

document.querySelectorAll('.form-chips.technologies .chip-item').forEach((chipItem) => {
  chipItem.addEventListener('click', (_) => {
    if (chipItem.classList.contains('selected')) {
      chipItem.classList.remove('selected');
      selectedTechnologyChips = selectedTechnologyChips.filter(chip => chip != chipItem.innerText);
    } else {
      chipItem.classList.add('selected');
      selectedTechnologyChips.push(chipItem.innerText);
    }
    getElem('.form-chips.technologies .selected-chips').innerHTML = selectedTechnologyChips.map(chip => `<span class="chip-item">${chip}</span>`).join(' ');
    getElem('input.technologies').value = selectedTechnologyChips.join(',');
  });
});

// --------------------------------------------------
// FORM
getElem('form.add-form').action = getEndpointPath('/projects');
getElem('form.add-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(getElem('form.add-form'));
  
  if (
    formData.get('name') == '' || formData.get('description') == '' || formData.get('type') == '' ||
    formData.get('imagePath') == '' || formData.get('languages') == '' ||
    formData.get('technologies') == '' || formData.get('url') == ''
  ) {
    alert('Please fill in all the available fields');
    return;
  }

  showLoadingOnButton(getElem('.btn.btn-add'));

  // add credentials
  formData.append('username', authData.username);
  formData.append('token', authData.token);

  const addNewProjectUrl = getElem('form.add-form').action;
  const result = await fetch(addNewProjectUrl, {
    method: 'POST',
    body: new URLSearchParams(formData),
  });
  let data = null;

  if (result.ok && (result.status == 200 || result.status == 201)) {
    data = await result.json();
  } else if (result.status == 401) {
    saveAuthData({}, false);
    alert('You\'re not allowed to access this page');
    window.location.href = getBaseUrl() + '/login';
    return;
  }

  if (data == null || data.error) {
    alert('Failed to add new project');
  } else {
    resetFormUI();
    alert('Successfully added new project');
  }
  showLoadingOnButton(getElem('.btn.btn-add'), false, 'Add');
});

function resetFormUI() {
  getElem('input[name="name"]').value = '';
  getElem('textarea[name="description"]').value = '';
  getElem('input[name="imagePath"]').value = '';
  getElem('input[name="url"]').value = '';
  getElem('input[name="languages"]').value = '';
  getElem('input[name="technologies"]').value = '';
  getElem('.form-chips.languages .selected-chips').innerHTML = '';
  getElem('.form-chips.technologies .selected-chips').innerHTML = '';
  document.querySelectorAll('.chips .chip-item.selected').forEach((chipItem) => {
    chipItem.classList.remove('selected');
  });
}

// --------------------------------------------------
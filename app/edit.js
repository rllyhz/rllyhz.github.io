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

const menu = getElem('.nav__menu .nav__list .nav__item .nav__link');
menu.innerText = 'Back';
menu.addEventListener('click', (e) => {
  e.preventDefault();
  window.history.back();
});

const getProjectDetailEndpointUrl = getEndpointPath(`/projects/${dataId}`);
let selectedLanguageChips = [];
let selectedTechnologyChips = [];

initEditUI();

async function initEditUI() {
  const result = await fetch(getProjectDetailEndpointUrl);
  let resultData = null;

  if (result.ok && result.status == 200) {
    resultData = await result.json();
  } else if (result.status == 400 || result.status == 401) {
    saveAuthData({}, false);
    alert('You\'re not allowed to access this page');
    window.location.href = getBaseUrl() + '/login';
  } else if (result.status == 404) {
    alert("❌⛔ Project not found!");
    window.history.back();
  }

  if (resultData == null) {
    initErrorUI(true);
  } else if (resultData.error) {
    initErrorUI(false);
  } else {
    initEditFormUI(resultData.project);
  }
}

function initErrorUI(isConnnectionFailed) {
  hideElem(getElem('.container.loading'));
  const errorContainerElem = document.createElement('div');
  errorContainerElem.style.display = 'flex';
  errorContainerElem.style.justifyContent = 'center';
  errorContainerElem.style.alignItems = 'center';
  errorContainerElem.style.margin = '2rem';
  errorContainerElem.classList.add('error-container');
  const errorMessageElem = document.createElement('p');
  errorMessageElem.classList.add('error-message');
  errorMessageElem.style.textAlign = 'center';
  if (isConnnectionFailed) {
    errorMessageElem.innerText = 'Sorry, it went wrong :( \nPlease check your connection first!';
  } else {
    errorMessageElem.innerText = 'Sorry :( \nSomething went wrong internally!';
  }
  errorContainerElem.appendChild(errorMessageElem);
  
  getElem('.work__container').appendChild(errorContainerElem);
}

function initEditFormUI(detailProject) {
  const types = projectTypes.map(projectType => 
    `<option ${projectType.type == detailProject.type ? 'selected' : ''} value="${projectType.type}">${projectType.name}</option>`
  ).join(' ');

  let languageChipsHTML = '';
  let selectedLanguageChipsHTML = '';
  let languagesValue = detailProject.languages.join(',');
  languages.forEach(language => {
    const isSelected = detailProject.languages.includes(language);
    if (isSelected) {
      selectedLanguageChipsHTML += `<span class="chip-item">${language}</span>`;
      selectedLanguageChips.push(language);
    }
    languageChipsHTML += `<span class="chip-item ${isSelected ? 'selected' : ''}">${language}</span>`;
  });

  let technologyChipsHTML = '';
  let selectedTechnologyChipsHTML = '';
  let technologiesValue = detailProject.technologies.join(',');
  technologies.forEach(technology => {
    const isSelected = detailProject.technologies.includes(technology);
    if (isSelected) {
      selectedTechnologyChipsHTML += `<span class="chip-item">${technology}</span>`;
      selectedTechnologyChips.push(technology);
    }
    technologyChipsHTML += `<span class="chip-item ${isSelected ? 'selected' : ''}">${technology}</span>`;
  });

  getElem('.work__container').innerHTML = `
  <div class="container actual">
    <form action="${getEndpointPath(`/projects/${dataId}`)}" method="PUT" class="edit-form">
      <div class="form-control" style="display:none;">
        <label for="id" aria-label="id">Project Id</label>
        <input type="text" id="id" placeholder="Project Id" name="id" value="${detailProject.id}" />
      </div>
      <div class="form-control">
        <label for="name" aria-label="name">Project Name</label>
        <input type="text" id="name" placeholder="Android App" name="name" value="${detailProject.title}" />
      </div>
      <div class="form-control">
        <label for="description" aria-label="description">Project Description</label>
        <textarea name="description" id="description" placeholder="My simple project" rows="6">${detailProject.description}</textarea>
      </div>
      <div class="form-control">
        <label for="type" aria-label="type">Project Type</label>
        <select name="type" id="type">
          ${types}
        </select>
      </div>
      <div class="form-control">
        <label for="imagePath" aria-label="imagePath">Image Path</label>
        <input type="text" id="imagePath" placeholder="assets/projects/example.jpg" name="imagePath" value="${detailProject.imagePath}" />
      </div>
      <div class="form-control">
        <label for="languages" aria-label="languages">Languages</label>
        <div class="form-chips languages">
          <div class="chips">${languageChipsHTML}</div>
          <div class="selected-chips">${selectedLanguageChipsHTML}</div>
          <input class="languages" type="text" id="languages" placeholder="" name="languages" value="${languagesValue}" />
        </div>
      </div>
      <div class="form-control">
        <label for="technologies" aria-label="technologies">Technologies</label>
        <div class="form-chips technologies">
          <div class="chips">${technologyChipsHTML}</div>
          <div class="selected-chips">${selectedTechnologyChipsHTML}</div>
          <input class="technologies" type="text" id="technologies" placeholder="" name="technologies" value="${technologiesValue}" />
        </div>
      </div>
      <div class="form-control">
        <label for="url" aria-label="url">Project Url</label>
        <input type="text" id="url" placeholder="https://github.com/rllyhz/project-name" name="url" value="${detailProject.url}" />
      </div>
      <div class="form-control">
        <button type="submit" class="btn btn-edit">Update</button>
        <button type="button" class="btn btn-cancel">Cancel</button>
      </div>
    </form>
  </div>  
  `;

  enableEditFormUI();
}

function enableEditFormUI() {
  // --------------------------------------------------
  // LANGUAGES
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
  // TECHNOLOGIES
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
  getElem('form.edit-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(getElem('form.edit-form'));
    
    if (
      formData.get('name') == '' || formData.get('description') == '' || formData.get('type') == '' ||
      formData.get('imagePath') == '' || formData.get('languages') == '' ||
      formData.get('technologies') == '' || formData.get('url') == ''
    ) {
      alert('Please fill in all the available fields');
      return;
    }

    await updateProject(formData);
  });
}

async function updateProject(formData) {
  showLoadingOnButton(getElem('.btn.btn-edit'));

  // add credentials
  formData.append('username', authData.username);
  formData.append('token', authData.token);

  const updateProject = getElem('form.edit-form').action;
  const result = await fetch(updateProject, {
    method: 'PUT',
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
    alert('Failed to update project');
    showLoadingOnButton(getElem('.btn.btn-edit'), false, 'Update');
  } else {
    alert('Successfully updated project');
    showLoadingOnButton(getElem('.btn.btn-edit'), false, 'Update');
    window.history.back();
  }
}
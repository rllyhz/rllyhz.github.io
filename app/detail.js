const loadingContainer = getElem(".loading")
const contentContainer = getElem(".actual")

const idElem = getElem(".id")
const nameElem = getElem(".name")
const typeElem = getElem(".type span")
const languagesElem = getElem(".languages span")
const descriptionElem = getElem(".description")
const technologiesElem = getElem(".technologies-container .technologies")
const nameLinkElem = getElem(".link-name")
const imageLinkElem = getElem(".work__img")
const imageElem = getElem(".work__img img")

const dataId = getQueryData("id")

if (!dataId) {
  alert("❌⛔ Activity not allowed!")
  window.history.back();
}

const authData = getAuthData();

if (authData && authData.isLoggedIn) {
  getElem('.nav__menu .nav__list .nav__item a').innerText = 'Edit';
  getElem('.nav__menu .nav__list .nav__item a').href = '/projects/edit.html?id=' + dataId;
}

const getProjectDetailEndpointUrl = getEndpointPath(`/projects/${dataId}?username=${authData.username}&token=${authData.token}`);

initDetailUI();

async function initDetailUI() {
  const result = await fetch(getProjectDetailEndpointUrl);
  let resultData = null;

  if (result.ok && result.status == 200) {
    resultData = await result.json();
  } else if (result.status == 401) {
    saveAuthData({}, false);
    alert('You\'re not allowed to access this page');
    window.location.href = getBaseUrl() + '/login';
  } else if (result.status == 404) {
    alert("❌⛔ Project not found!");
    window.history.back();
  }

  if (resultData == null || resultData.error) {
    initErrorUI(false);
  } else {
    await initUI(resultData.data.project);
    setTimeout(() => {
      hideElem(loadingContainer);
      showElem(contentContainer, "flex");
      console.clear();
    }, 800);
  }
}

function initErrorUI(isConnnectionFailed = false) {
  hideElem(loadingContainer);
  const errorContainerElem = document.createElement('div');
  errorContainerElem.classList.add('error-container');
  const errorMessageElem = document.createElement('p');
  errorMessageElem.classList.add('error-message');
  if (isConnnectionFailed) {
    errorMessageElem.innerText = 'Sorry, it went wrong :( \nPlease check your connection first!';
  } else {
    errorMessageElem.innerText = 'Sorry :( \nSomething went wrong internally!';
  }
  errorContainerElem.appendChild(errorMessageElem);
  
  getElem('.work__container').appendChild(errorContainerElem);
}

async function initUI(project) {
  idElem.textContent = project.id
  nameElem.textContent = project.name
  typeElem.textContent = project.type
  languagesElem.textContent = project.languages.join(", ")
  descriptionElem.textContent = project.description

  project.technologies.forEach(technology => {
    const liElem = document.createElement("li")
    liElem.textContent = `- ${technology}`

    technologiesElem.appendChild(liElem)
  })

  nameLinkElem.setAttribute("href", project.url)
  imageLinkElem.setAttribute("href", project.url)

  const imageExist = await doesImageExist(`${getBaseUrl()}/${project.imagePath}`);

  imageElem.setAttribute('loading', 'lazy');

  if (project.imagePath && imageExist) {
    imageElem.setAttribute("src",  `${getBaseUrl()}/${project.imagePath}`);
  } else {
    imageElem.setAttribute("src", getBaseUrl() +"/assets/img/work-photo-placeholder.png");
  }
  imageElem.setAttribute("alt", project.name);
}
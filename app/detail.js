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
  alert("❌⛔ You're not allowed!")
  // window.location.assign("../projects/index.html")
  window.history.back();
}

const authData = getAuthData();

if (authData && authData.isLoggedIn) {
  getElem('.nav__menu .nav__list .nav__item a').innerText = 'Edit';
  getElem('.nav__menu .nav__list .nav__item a').href = '/projects/edit.html?id=' + dataId;
}

fetch("../data/projects.json")
.then(res => res.json())
.then(projects => {
  projects.forEach(project => {
    if (project.id == dataId) {
      initUI(project)
      
      setTimeout(() => {
        hideElem(loadingContainer)
        showElem(contentContainer, "flex")
        console.clear()
      }, 800)
      return
    }
  });
})

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

  const imageExist = await doesImageExist("../" + project.imagePath)

  if (project.imagePath && imageExist) {
    imageElem.setAttribute("src", "../" + project.imagePath)
  } else {
    imageElem.setAttribute("src", "../assets/img/work-photo-placeholder.png")
  }
  imageElem.setAttribute("alt", project.name)
}
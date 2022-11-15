const loadingContainer = document.querySelector(".loading")
const contentContainer = document.querySelector(".actual")

const idElem = document.querySelector(".id")
const nameElem = document.querySelector(".name")
const typeElem = document.querySelector(".type span")
const languagesElem = document.querySelector(".languages span")
const descriptionElem = document.querySelector(".description")
const technologiesElem = document.querySelector(".technologies-container .technologies")
const nameLinkElem = document.querySelector(".link-name")
const imageLinkElem = document.querySelector(".work__img")
const imageElem = document.querySelector(".work__img img")

const dataId = getQueryData("id")

if (!dataId) {
  alert("❌⛔ You're not allowed!")
  window.location.assign("../projects/index.html")
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
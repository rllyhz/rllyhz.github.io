const projectCardsContainer = document.querySelector(".work__container.actual")
const loadingProjectCardsContainer = document.querySelector(".work__container.loading")

hideElem(projectCardsContainer)

fetch("../data/projects.json")
.then(res => res.json())
.then(projects => {
  if (projects) {
    projects.forEach(project => {
      addProject(project, "../")
    });
  }

  setTimeout(() => {
    showElem(projectCardsContainer, "grid")
    hideElem(loadingProjectCardsContainer)
    console.clear()
  }, 1500)
})
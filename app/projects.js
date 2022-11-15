const projectCardsContainer = document.querySelector(".work__container.actual")
const loadingProjectCardsContainer = document.querySelector(".work__container.loading")

projectCardsContainer.style.display = "none"

fetch("../data/projects.json")
.then(res => res.json())
.then(projects => {
  if (projects) {
    projects.forEach(project => {
      addProject(project, "../")
    });
  }

  setTimeout(() => {
    projectCardsContainer.style.display = "grid"
    loadingProjectCardsContainer.style.display = "none"
    console.clear()
  }, 1500)
})
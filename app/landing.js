const projectCardsContainer = document.querySelector(".work__container.actual")
const loadingProjectCardsContainer = document.querySelector(".work__container.loading")

hideElem(projectCardsContainer)

const pinnedProjectIds = [0, 2, 1, 11, 10, 6, 5]

fetch("../data/projects.json")
.then(res => res.json())
.then(projects => {
  if (projects) {
    projects.forEach((project, index) => {
      if (pinnedProjectIds.includes(index)) {
        addProject(project, "./")
      }
    });
  }

  setTimeout(() => {
    showElem(projectCardsContainer, "grid")
    hideElem(loadingProjectCardsContainer)
    console.clear()
  }, 1500)
})

// STILL BEING UNDER MAINTANANCE ALERT
const hasVisitedKey = "rllyhz.github.io-has-visited"
let hasVisited = window.localStorage.getItem(hasVisitedKey)
hasVisited = JSON.parse(hasVisited);

if (!hasVisited) {
  alert("Sorry for any bad experiences.. 🙇‍♂️ \nThis page is still being under construction mode! 👨‍💻")
  window.localStorage.setItem(hasVisitedKey, true)
}
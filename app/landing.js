const projectCardsContainer = document.querySelector(".work__container.actual")
const loadingProjectCardsContainer = document.querySelector(".work__container.loading")

projectCardsContainer.style.display = "none"

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
  projectCardsContainer.style.display = "grid"
  loadingProjectCardsContainer.style.display = "none"
  console.clear()
})

// STILL BEING UNDER MAINTANANCE ALERT
alert("Sorry for any bad experiences.. 🙇‍♂️ \nThis page is still being under construction mode! 👨‍💻")
const projectCardsContainer = getElem(".work__container.actual")
const loadingProjectCardsContainer = getElem(".work__container.loading")

hideElem(projectCardsContainer)

const pinnedProjectIds = [0, 2, 1, 11, 10, 6, 5]

const getProjectsEndpointUrl = getEndpointPath('/projects');

fetch(getProjectsEndpointUrl)
.then(res => res.json())
.catch(err => {
  console.clear();
  alert('Sorry, it went wrong :( \nPlease check your connection first!')
})
.then(res => {
  console.clear();
  if (!res) return;
  if (res.error && res.message == 'Sorry :( The API is currently under maintanance!') {
    showUnderMaintananceMode();
  } else if (!res.error && res.data.total > 0) {
    console.log(res);
    res.data.projects.forEach((project, index) => {
      if (pinnedProjectIds.includes(index)) {
        addProject(project, "./")
      }
    });

    setTimeout(() => {
      showElem(projectCardsContainer, "grid")
      hideElem(loadingProjectCardsContainer)
      console.clear()
    }, 1500)
  } else {
    getElem('.see-more.button').remove();
    alert('Sorry :( \nCurrently no projects to showcase');
  }
})

// STILL BEING UNDER MAINTANANCE ALERT
function showUnderMaintananceMode() {
  if (!getHasVisitedValue()) {
    alert("Sorry for any bad experiences.. 🙇‍♂️ \nThis page is still being under maintanance mode! 👨‍💻")
    setVisitedValue(true);
  }
}
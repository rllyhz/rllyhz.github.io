const projectCardsContainer = getElem(".work__container.actual");
const loadingProjectCardsContainer = getElem(".work__container.loading");

// const pinnedProjectIds = [0, 2, 1, 3, 5, 4];

hideElem(projectCardsContainer);

const getProjectsEndpointUrl = getEndpointPath('/pinned-projects');

fetch(getProjectsEndpointUrl)
.then(res => res.json())
.catch(err => {
  console.clear();
  alert('Sorry, it went wrong :( \nPlease check your connection first!');
})
.then(res => {
  console.clear();
  if (!res) return;
  if (res.error && res.message == 'Sorry :( The API is currently under maintanance!') {
    showUnderMaintananceMode();
  } else if (!res.error && res.total > 0) {
    // console.log(res);
    res.projects.forEach((project, index) => {
      // if (pinnedProjectIds.includes(index)) {
      //   addProject(project, "./");
      //   console.log(project);
      // }
      addProject(project, "./");
      console.log(project);
    });

    setTimeout(() => {
      showElem(projectCardsContainer, "grid");
      hideElem(loadingProjectCardsContainer);
      console.clear();
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
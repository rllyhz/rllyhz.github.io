const projectCardsContainer = getElem(".work__container.actual")
const loadingProjectCardsContainer = getElem(".work__container.loading")
const menu = getElem('.nav__menu .nav__list .nav__item .nav__link')

hideElem(projectCardsContainer)

const authData = getAuthData();

if (authData && authData.isLoggedIn) {  
  menu.href = `${getBaseUrl()}/projects/add.html`;
  menu.innerText = 'Add Project';
}


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
  } else if (!res.error && res.total > 0) {
    console.log(res);
    res.projects.forEach((project) => {
      addProject(project, "../");
    });

    setTimeout(() => {
      showElem(projectCardsContainer, "grid")
      hideElem(loadingProjectCardsContainer)
      console.clear()
    }, 1500)
  } else {
    alert('Sorry :( \nCurrently no projects to showcase');
  }
})
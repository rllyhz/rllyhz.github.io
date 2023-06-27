import LoginPage from "../views/pages/LoginPage";
import LandingPage from "../views/pages/LandingPage";
import ProjectsPage from "../views/pages/ProjectsPage";
import ProjectDetailPage from "../views/pages/ProjectDetailPage";

const routes = {
  "/": LandingPage,
  "/login": LoginPage,
  "/projects": ProjectsPage,
  "/projects/:id": ProjectDetailPage,
};

const Routes = {
  resolve: (path = "/#/") => routes[path],
};

export default Routes;

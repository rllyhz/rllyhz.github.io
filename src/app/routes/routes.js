import LoginPage from "../views/pages/LoginPage";
import LandingPage from "../views/pages/LandingPage";
import ProjectsPage from "../views/pages/ProjectsPage";
import ProjectDetailPage from "../views/pages/ProjectDetailPage";
import DashboardPage from "../views/pages/DashboardPage";

const Page = {
  landingPage: "/",
  loginPage: "/login",
  dashboardPage: "/dashboard",
  projectsPage: "/projects",
  projectDetailPage: (id) => `/projects/${id}`,
};

const routes = {
  "/": LandingPage,
  "/login": LoginPage,
  "/dashboard": DashboardPage,
  "/projects": ProjectsPage,
  "/projects/:id": ProjectDetailPage,
};

const Routes = {
  resolve: (path = "/#/") => routes[path],
  Page,
};

export default Routes;

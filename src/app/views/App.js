import "regenerator-runtime"; /* for async await transpile */
import logger from "../../utils/logger";
import Router from "../core/Router";
import { EventType } from "../../utils/ui/event-helpers";
import UIState from "../../utils/ui-state";
import { singleObservableOf } from "../../utils/extension";
import FooterApp from "../components/FooterApp";
import HeaderApp from "../components/HeaderApp";
import Loading from "../components/Loading";
import Dom from "../core/Dom";
import ContainerApp from "../components/ContainerApp";

// Pages
import NotFoundPage from "./pages/NotFoundPage";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import ProjectsPage from "./pages/ProjectsPage";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import Routes from "../core/Routes";
import CustomAlert from "../components/CustomAlert";

export default class App {
  static uiStateObservable = singleObservableOf(UIState.LOADING);

  static firstTimeRendering = true;

  static customLoading = null;

  static async init() {
    logger.log("Initializing app");

    App.firstTimeRendering = true;
    App.customLoading = null;

    App.runRouter();
  }

  static runRouter() {
    const appRouter = Router([
      Routes.create("/", (data) => {
        App.renderPage(LandingPage, data);
      }),
      Routes.create("/login", (data) => {
        App.renderPage(LoginPage, data);
      }),
      Routes.create("/dashboard", (data) => {
        App.renderPage(DashboardPage, data);
      }),
      Routes.create("/projects", (data) => {
        App.renderPage(ProjectsPage, data);
      }),
      Routes.create("/projects/:id", (data) => {
        App.renderPage(ProjectDetailPage, data);
      }),
    ]);

    appRouter.setNotFoundCallback(() => {
      // 404 not found
      logger.error("Page not found!");
      App.renderPage(NotFoundPage);
    });

    // appRouter.setBeforeEach(() => {
    //   logger.log("Before each callback");
    // });

    // appRouter.setAfterEach(() => {
    //   logger.log("After each callback");
    // });

    appRouter.init();
  }

  static async renderPage(activePage, data = null) {
    if (!activePage || !activePage.render || typeof activePage.render !== "function") {
      logger.error("Page could be render!");
      return;
    }

    // Reset things from the begining
    // (including UI elements or states)
    CustomAlert.Builder.remove();

    // prepare rendering
    logger.log("Rendering page");

    document.body.innerHTML = "";
    document.body.scrollTo({
      top: "0",
      behavior: "smooth",
    });

    const header = document.createElement(HeaderApp.tagName);
    const footer = document.createElement(FooterApp.tagName);

    const rootLoading = Dom.createRootLoadingPage();
    const loading = Dom.createElement({
      tagName: Loading.tagName,
      props: {
        padding: "5rem",
      },
    });
    rootLoading.appendChild(loading);

    const rootPage = Dom.createRootPage();
    const containerApp = document.createElement(ContainerApp.tagName);
    rootPage.appendChild(containerApp);

    document.body.appendChild(header);
    document.body.appendChild(rootLoading);
    document.body.appendChild(rootPage);
    document.body.appendChild(footer);

    // hide all initially
    rootPage.style.display = "none";
    rootLoading.style.display = "none";

    header.addEventListener(EventType.drawerMode, (event) => {
      // lock scrolling content
      if (event.detail.isOpen) {
        document.body.style.overflowY = "hidden";
      } else {
        document.body.style.overflowY = "auto";
      }
    });

    if (App.firstTimeRendering) {
      App.uiStateObservable.observe(App.uiStateListener);
      App.firstTimeRendering = false;
    }

    // render active page
    await activePage.render(App.uiStateObservable, data || {});
    logger.log("Active Page successfully rendered");
  }

  static uiStateListener(uiState) {
    if (uiState === UIState.LOADING) {
      if (App.customLoading !== null) {
        Dom.getRootLoadingPage().innerHTML = "";
        Dom.appendRootLoadingPage(App.customLoading);
      }

      Dom.getRootLoadingPage().style.display = "block";
      Dom.getRootPage().style.display = "none";
    } else {
      Dom.getRootLoadingPage().style.display = "none";
      Dom.getRootPage().style.display = "block";
    }
  }

  static updateAppShell() {
    //
  }
}

import "regenerator-runtime"; /* for async await transpile */
import logger from "../../utils/logger";
import { Routes, Router } from "../routes";
import NotFoundPage from "./pages/NotFoundPage";
import { EventType } from "../../utils/ui/event-helpers";
import UIState from "../../utils/ui-state";
import { singleObservableOf } from "../../utils/extension";
import FooterApp from "../components/FooterApp";
import HeaderApp from "../components/HeaderApp";
import Loading from "../components/Loading";
import Dom from "../core/Dom";
import ContainerApp from "../components/ContainerApp";

export default class App {
  static uiStateObservable = singleObservableOf(UIState.LOADING);

  static firstTimeRendering = true;

  static customLoading = null;

  static async init() {
    logger.info("Initializing app");

    App.firstTimeRendering = true;
    App.customLoading = null;

    App.renderPage();
  }

  static async renderPage() {
    logger.info("Rendering page");

    document.body.innerHTML = "";

    const { data, activePath } = Router.getExpectedRoute();
    const activePage = Routes.resolve(activePath);

    if (!activePage) {
      // 404 not found
      logger.error("Page not found!");
      NotFoundPage.render();
      return;
    }

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

    await activePage.render(App.uiStateObservable, data);
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

    window.scrollTo(0, 0);
  }

  static updateAppShell() {
    //
  }
}

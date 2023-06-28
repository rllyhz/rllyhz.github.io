import "regenerator-runtime"; /* for async await transpile */
import logger from "../../utils/logger";
import Routes from "../routes/routes";
import Router from "../routes/router";
import NotFoundPage from "./pages/NotFoundPage";
import { EventType } from "../../utils/ui/event-helpers";
import UIState from "../../utils/ui-state";
import { singleObservableOf } from "../../utils/extension";
import FooterApp from "../components/FooterApp";
import HeaderApp from "../components/HeaderApp";
import Loading from "../components/Loading";
import {
  appendRootLoadingPage,
  createRootLoadingPage,
  createRootPage,
  getRootLoadingPage,
  getRootPage,
} from "../../utils/ui/dom-helpers";

export default class App {
  static uiStateObservable = singleObservableOf(UIState.LOADING);

  static firstTimeRendering = true;

  static customLoading = null;

  static async init() {
    logger.info("App init.");
    App.renderPage();
  }

  static async renderPage() {
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

    const rootLoading = createRootLoadingPage();
    const loading = document.createElement(Loading.tagName);
    loading.dataset.padding = "5rem";
    rootLoading.appendChild(loading);

    const rootPage = createRootPage();
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
        getRootLoadingPage().children.length = 0;
        appendRootLoadingPage(App.customLoading);
      }

      getRootLoadingPage().style.display = "block";
      getRootPage().style.display = "none";
    } else {
      getRootLoadingPage().style.display = "none";
      getRootPage().style.display = "block";
    }
  }

  static updateAppShell() {
    //
  }
}

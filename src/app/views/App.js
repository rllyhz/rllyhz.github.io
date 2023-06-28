import "regenerator-runtime"; /* for async await transpile */
import logger from "../../utils/logger";
import Routes from "../routes/routes";
import Router from "../routes/router";
import NotFoundPage from "./pages/NotFoundPage";
import { EventType } from "../../utils/ui/event-helpers";
import FooterApp from "../components/FooterApp";
import HeaderApp from "../components/HeaderApp";
import { createRootPage } from "../../utils/ui/dom-helpers";

export default class App {
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
    const main = createRootPage();
    document.body.appendChild(header);
    document.body.appendChild(main);
    document.body.appendChild(footer);

    header.addEventListener(EventType.drawerMode, (event) => {
      // lock scrolling content
      if (event.detail.isOpen) {
        document.body.style.overflowY = "hidden";
      } else {
        document.body.style.overflowY = "auto";
      }
    });

    await activePage.render([header, main, footer], data);
  }

  static updateAppShell() {
    //
  }
}

import "regenerator-runtime"; /* for async await transpile */
import logger from "../../utils/logger";
import Routes from "../routes/routes";
import Router from "../routes/router";
import NotFoundPage from "./pages/NotFoundPage";

export default class App {
  static async init() {
    logger.info("App init.");
    App.renderPage();
  }

  static async renderPage() {
    const { data, activePath } = Router.getExpectedRoute();
    const activePage = Routes.resolve(activePath);

    if (!activePage) {
      // 404 not found
      logger.error("Page not found!");
      NotFoundPage.render();
      return;
    }

    logger.log(activePage);

    await activePage.render(data);
  }

  static updateAppShell() {
    //
  }
}

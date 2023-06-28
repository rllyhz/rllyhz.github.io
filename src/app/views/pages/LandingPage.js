import logger from "../../../utils/logger";
// import { toPublicPath } from "../../../utils/route-helper";
import UIState from "../../../utils/ui-state";
import WelcomeUI from "../../components/WelcomeUI";
import Dom from "../../core/Dom";

export default class LandingPage {
  static async render(uiStateObservable) {
    uiStateObservable.emit(UIState.LOADING);

    Dom.appendRootPage(
      document.createElement(WelcomeUI.tagName),
    );

    uiStateObservable.emit(UIState.SUCCESS);
    logger.info("Landing page rendered");
  }
}

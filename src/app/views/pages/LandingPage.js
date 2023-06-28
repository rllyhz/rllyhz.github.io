import logger from "../../../utils/logger";
import { toPublicPath } from "../../../utils/route-helper";
import UIState from "../../../utils/ui-state";
import Dom from "../../core/Dom";

export default class LandingPage {
  static async render(uiStateObservable) {
    uiStateObservable.emit(UIState.LOADING);

    logger.info("Landing page rendered");

    setTimeout(() => {
      const testElem = Dom.createElement({
        tagName: "img",
      });
      testElem.src = toPublicPath("/images/landing/about.png");
      Dom.appendRootPage(testElem);
      uiStateObservable.emit(UIState.SUCCESS);
    }, 2000);
  }
}

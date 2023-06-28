import logger from "../../../utils/logger";
import { toPublicPath } from "../../../utils/route-helper";
import UIState from "../../../utils/ui-state";
import { createElement, getRootPage } from "../../../utils/ui/dom-helpers";

export default class LandingPage {
  static async render(uiStateObservable) {
    uiStateObservable.emit(UIState.LOADING);
    logger.info("Landing page rendered");

    setTimeout(() => {
      const testElem = createElement({
        tagName: "img",
      });
      testElem.src = toPublicPath("/images/landing/about.png");
      getRootPage().appendChild(testElem);
      uiStateObservable.emit(UIState.SUCCESS);
    }, 2000);
  }
}

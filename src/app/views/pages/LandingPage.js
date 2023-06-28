import logger from "../../../utils/logger";
import { toPublicPath } from "../../../utils/route-helper";
import UIState from "../../../utils/ui-state";
import { appendRootPageWithContainer, createElement } from "../../../utils/ui/dom-helpers";
import App from "../App";

export default class LandingPage {
  static async render(uiStateObservable) {
    App.customLoading = createElement({
      tagName: "p",
      innerText: "loading...",
      styles: {
        textAlign: "center",
      },
    });

    uiStateObservable.emit(UIState.LOADING);

    logger.info("Landing page rendered");

    setTimeout(() => {
      const testElem = createElement({
        tagName: "img",
      });
      testElem.src = toPublicPath("/images/landing/about.png");
      appendRootPageWithContainer(testElem);
      uiStateObservable.emit(UIState.SUCCESS);
    }, 2000);
  }
}

import logger from "../../../utils/logger";
import UIState from "../../../utils/ui-state";
import Dom from "../../core/Dom";
import Component from "../../core/Component";

export default class LandingPage {
  static async render(uiStateObservable) {
    uiStateObservable.emit(UIState.LOADING);

    // Welcome UI
    Dom.appendRootPage(
      Component.createWelcomeUI(),
    );

    // Spacer
    Dom.appendRootPage(
      Component.createVerticalSpacer("6rem"),
    );

    // Title for About
    Dom.appendRootPage(
      Component.createTitleApp({ text: "About", color: "var(--accent-color)" }),
    );

    // About Section

    // Spacer
    Dom.appendRootPage(
      Component.createVerticalSpacer("6rem"),
    );

    // Title for Skills
    Dom.appendRootPage(
      Component.createTitleApp({ text: "Skills", color: "var(--accent-color)" }),
    );

    // Skills Section

    // Spacer
    Dom.appendRootPage(
      Component.createVerticalSpacer("6rem"),
    );

    // Title for Work
    Dom.appendRootPage(
      Component.createTitleApp({ text: "Work", color: "var(--accent-color)" }),
    );

    // Work Section

    // Spacer
    Dom.appendRootPage(
      Component.createVerticalSpacer("6rem"),
    );

    // Title for Contract
    Dom.appendRootPage(
      Component.createTitleApp({ text: "Contract", color: "var(--accent-color)" }),
    );

    // Contract Section

    uiStateObservable.emit(UIState.SUCCESS);
    logger.info("Landing page rendered");
  }
}

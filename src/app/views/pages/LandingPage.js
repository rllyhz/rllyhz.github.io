import logger from "../../../utils/logger";
import UIState from "../../../utils/ui-state";
import Dom from "../../core/Dom";
import Component from "../../core/Component";

export default class LandingPage {
  static async render(uiStateObservable) {
    uiStateObservable.emit(UIState.LOADING);

    // ====================================
    Dom.appendRootPage(
      Dom.createElement({ tagName: "span", id: "home" }),
    );
    // Welcome UI
    Dom.appendRootPage(
      Component.createWelcomeUI(),
    );

    // ====================================
    Dom.appendRootPage(
      Component.createVerticalSpacer("8rem", "14rem"),
    );
    // Title for About
    Dom.appendRootPage(
      Component.createTitleApp({ text: "About", color: "var(--primary-color)", id: "about" }),
    );
    Dom.appendRootPage(
      Component.createVerticalSpacer("2rem"),
    );
    // About Section
    Dom.appendRootPage(
      Component.createAboutUI(),
    );

    // ====================================
    // Spacer
    Dom.appendRootPage(
      Component.createVerticalSpacer("6rem"),
    );
    // Title for Skills
    Dom.appendRootPage(
      Component.createTitleApp({ text: "Skills", color: "var(--primary-color)", id: "skills" }),
    );
    Dom.appendRootPage(
      Component.createVerticalSpacer("2rem"),
    );
    // Skills Section
    Dom.appendRootPage(
      Component.createSkillsUI(),
    );

    // ====================================
    // Spacer
    Dom.appendRootPage(
      Component.createVerticalSpacer("6rem"),
    );
    // Title for Work
    Dom.appendRootPage(
      Component.createTitleApp({ text: "Work", color: "var(--primary-color)", id: "work" }),
    );
    Dom.appendRootPage(
      Component.createVerticalSpacer("1rem"),
    );
    // Work Section

    // ====================================
    // Spacer
    Dom.appendRootPage(
      Component.createVerticalSpacer("6rem"),
    );
    // Title for Contact
    Dom.appendRootPage(
      Component.createTitleApp({ text: "Contact", color: "var(--primary-color)", id: "contact" }),
    );

    // Contact Section

    uiStateObservable.emit(UIState.SUCCESS);

    logger.info("Landing page rendered");
  }
}

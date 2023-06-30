import logger from "../../../utils/logger";
import UIState from "../../../utils/ui-state";
import Dom from "../../core/Dom";
import Component from "../../core/Component";
import { createDummyProjects } from "../../../utils/dummy_data/projects";
import { toPath } from "../../../utils/route-helper";

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
      Component.createVerticalSpacer("2rem"),
    );
    // Work Section
    const workUIElem = Component.createWorkUI();
    Dom.appendRootPage(workUIElem);

    const projects = createDummyProjects(6);
    workUIElem.projects = projects;

    Dom.appendRootPage(
      Component.createVerticalSpacer("3rem"),
    );
    // See more btn
    const btnMoreContainer = Component.createCustomFlexEndContainer();
    btnMoreContainer.appendChild(
      Component.createCustomButton({
        text: "See more",
        size: "big",
        isLink: true,
        href: toPath("/projects"),
      }),
    );
    Dom.appendRootPage(btnMoreContainer);

    // ====================================
    // Spacer
    Dom.appendRootPage(
      Component.createVerticalSpacer("6rem"),
    );
    // Title for Contact
    Dom.appendRootPage(
      Component.createTitleApp({ text: "Contact", color: "var(--primary-color)", id: "contact" }),
    );
    Dom.appendRootPage(
      Component.createVerticalSpacer("2rem"),
    );
    // Contact Section
    const contactFormContainer = Component.createCustomCenterContainer("75%");
    contactFormContainer.appendChild(
      Component.createCustomInputText({
        name: "fullname",
        placeholder: "Fullname (required)",
      }),
    );
    contactFormContainer.appendChild(Component.createVerticalSpacer("1rem"));
    contactFormContainer.appendChild(
      Component.createCustomInputText({
        name: "email",
        placeholder: "Email (required)",
      }),
    );
    contactFormContainer.appendChild(Component.createVerticalSpacer("1rem"));
    contactFormContainer.appendChild(
      Component.createCustomInputText({
        name: "message",
        placeholder: "Your message (required)",
        multiLineText: "true",
        rows: "6",
      }),
    );
    contactFormContainer.appendChild(Component.createVerticalSpacer("3rem"));
    const btnSendContainer = Component.createCustomFlexEndContainer();
    btnSendContainer.appendChild(
      Component.createCustomButton({
        text: "Send",
        size: "big",
      }),
    );
    contactFormContainer.appendChild(btnSendContainer);

    Dom.appendRootPage(contactFormContainer);

    Dom.appendRootPage(
      Component.createVerticalSpacer("5rem"),
    );

    uiStateObservable.emit(UIState.SUCCESS);

    logger.info("Landing page rendered");
  }
}

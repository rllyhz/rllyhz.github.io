import logger from "../../../utils/logger";
import UIState from "../../../utils/ui-state";
import Dom from "../../core/Dom";
import Component from "../../core/Component";
import { createPreviewEmptyProjects } from "../../../utils/dummy_data/projects";
import { toPath } from "../../../utils/route-helper";
import { getPinnedProjects, sendEmail } from "../../process/landing";
import { validateEmail } from "../../../utils/data-helpers";
import { CustomAlertBuilder } from "../../components/CustomAlert";

export default class LandingPage {
  static async render(uiStateObservable) {
    uiStateObservable.emit(UIState.LOADING);

    getPinnedProjects({
      onSuccess: (data) => {
        logger.info(data);

        // No Projects
        if (data.projects.length <= 0) {
          CustomAlertBuilder
            .setTitle("Sorry ☹️")
            .setMessage("Currently no projects to show!")
            .setType("info")
            .setSize("small")
            .build()
            .show();
        }

        uiStateObservable.emit(UIState.SUCCESS);
        LandingPage.showHasData(data.projects);
        logger.info("Landing page rendered");
      },
      onFailed: (status, err) => {
        logger.error(status, err);
        uiStateObservable.emit(UIState.ERROR);
        LandingPage.showHasData();
        logger.info("Landing page rendered");
      },
    });
  }

  static showHasData(projects = []) {
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

    let tempProjects = [];
    if (projects.length > 0) {
      tempProjects = projects;
    } else {
      tempProjects = createPreviewEmptyProjects(6);
    }

    workUIElem.projects = tempProjects;

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
    const nameInput = Component.createCustomInputText({
      name: "fullname",
      placeholder: "Fullname (required)",
    });
    const emailInput = Component.createCustomInputText({
      name: "email",
      placeholder: "Email (required)",
    });
    const messageInput = Component.createCustomInputText({
      name: "message",
      placeholder: "Your message (required)",
      multiLineText: "true",
      rows: "6",
    });
    const btnSend = Component.createCustomButton({
      text: "Send",
      size: "big",
    });
    contactFormContainer.appendChild(nameInput);
    contactFormContainer.appendChild(Component.createVerticalSpacer("1rem"));
    contactFormContainer.appendChild(emailInput);
    contactFormContainer.appendChild(Component.createVerticalSpacer("1rem"));
    contactFormContainer.appendChild(messageInput);
    contactFormContainer.appendChild(Component.createVerticalSpacer("3rem"));
    const btnSendContainer = Component.createCustomFlexEndContainer();
    btnSendContainer.appendChild(btnSend);
    contactFormContainer.appendChild(btnSendContainer);

    Dom.appendRootPage(contactFormContainer);

    Dom.appendRootPage(
      Component.createVerticalSpacer("5rem"),
    );

    // Click send listener
    let isSendingEmail = false;
    btnSend.addEventListener("click", () => {
      if (isSendingEmail) return;

      const fullname = nameInput.value;
      const email = emailInput.value;
      const message = messageInput.value;

      if (!fullname || !email || !message) {
        CustomAlertBuilder
          .setTitle("Not Allowed")
          .setMessage("Please fill in all the required fields!")
          .setType("warning")
          .setSize("small")
          .build()
          .show();
        return;
      }
      if (!validateEmail(email)) {
        CustomAlertBuilder
          .setTitle("Not Allowed")
          .setMessage("Please enter a valid email!")
          .setType("warning")
          .setSize("small")
          .build()
          .show();
        return;
      }

      isSendingEmail = true;
      btnSend.loading = true;

      sendEmail({
        body: { fullname, email, message },
        onFailed: () => {
          CustomAlertBuilder
            .setTitle("Oppss...")
            .setMessage("Failed to send email! 😕")
            .setType("error")
            .setSize("small")
            .build()
            .show();

          isSendingEmail = false;
          btnSend.loading = false;
        },
        onSuccess: () => {
          nameInput.value = "";
          emailInput.value = "";
          messageInput.value = "";

          CustomAlertBuilder
            .setTitle("Email successfully sent 💌")
            .setMessage("Thank you for contacting me.")
            .setType("success")
            .setSize("small")
            .build()
            .show();

          isSendingEmail = false;
          btnSend.loading = false;
        },
      });
    });
  }
}

import logger from "../../../utils/logger";
import UIState from "../../../utils/ui-state";
import Dom from "../../core/Dom";
import Component from "../../core/Component";
import { createPreviewEmptyProjects } from "../../../utils/dummy_data/projects";
import { toPath } from "../../../utils/route-helper";
import { sendEmail } from "../../process/landing";
import { validateEmail } from "../../../utils/data-helpers";
import { CustomAlert, CustomAlertBuilder } from "../../components/CustomAlert";
import CustomButton from "../../components/CustomButton";
import { Strings } from "../../../globals/consts";
import { getAllPinnedProjectsController } from "../../controllers/landing";
import { EventState } from "../../../utils/event-helpers";

export default class LandingPage {
  static async render(uiStateObservable) {
    // Loading
    uiStateObservable.emit(UIState.LOADING);

    const { stream, retry } = getAllPinnedProjectsController();

    stream.observe((event) => {
      if (event.state === EventState.ERROR) {
        CustomAlertBuilder
          .setTitle(Strings.Alerts.FailedToFetchData.Title)
          .setMessage(Strings.Alerts.FailedToFetchData.Message)
          .setType(CustomAlert.TYPE.ERROR)
          .setSize(CustomAlert.SIZE.SMALL)
          .setCancel(Strings.Buttons.Retry, () => { retry(); })
          .build()
          .show();
      } else if (event.state === EventState.HAS_DATA) {
        uiStateObservable.emit(UIState.SUCCESS);
        const { projects } = event.result.data;

        if (projects.length <= 0) {
          CustomAlertBuilder
            .setTitle(Strings.Alerts.CurrentlyNoProjects.Title)
            .setMessage(Strings.Alerts.CurrentlyNoProjects.Message)
            .setType(CustomAlert.TYPE.INFO)
            .setSize(CustomAlert.SIZE.SMALL)
            .setCancel(Strings.Alerts.CurrentlyNoProjects.ConfirmText)
            .build()
            .show();
        }

        LandingPage.showHasData(projects);
        logger.info("Landing page rendered");
      }
    });
  }

  static showHasData(projects = []) {
    // ====================================
    // For cta link
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
      Component.createTitleApp({ text: "About", id: "about" }),
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
      Component.createTitleApp({
        id: "skills",
        text: Strings.Menus.Skills,
      }),
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
      Component.createTitleApp({
        id: "work",
        text: Strings.Menus.Work,
      }),
    );
    Dom.appendRootPage(
      Component.createVerticalSpacer("2rem"),
    );
    // Work Section
    const workUIElem = Component.createProjectListUI({ heading: "h4" });
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
        text: Strings.Buttons.SeeMore,
        size: CustomButton.SIZE.BIG,
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
      Component.createTitleApp({
        id: "contact",
        text: Strings.Menus.Contact,
      }),
    );
    Dom.appendRootPage(
      Component.createVerticalSpacer("2rem"),
    );
    // Contact Section
    const contactFormContainer = Component.createCustomCenterContainer("75%");
    const nameInput = Component.createCustomInputText({
      name: "fullname",
      placeholder: Strings.Placeholders.FullName,
    });
    const emailInput = Component.createCustomInputText({
      name: "email",
      placeholder: Strings.Placeholders.Email,
    });
    const messageInput = Component.createCustomInputText({
      name: "message",
      placeholder: Strings.Placeholders.Message,
      multiLineText: "true",
      rows: "6",
    });
    const btnSend = Component.createCustomButton({
      text: Strings.Buttons.SendEmail,
      size: CustomButton.SIZE.BIG,
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
          .setTitle(Strings.Alerts.FillOutAllTheRequiredFields.Title)
          .setMessage(Strings.Alerts.FillOutAllTheRequiredFields.Message)
          .setType(CustomAlert.TYPE.WARNING)
          .setSize(CustomAlert.SIZE.SMALL)
          .build()
          .show();
        return;
      }
      if (!validateEmail(email)) {
        CustomAlertBuilder
          .setTitle(Strings.Alerts.InvalidEmailFormat.Title)
          .setMessage(Strings.Alerts.InvalidEmailFormat.Message)
          .setType(CustomAlert.TYPE.WARNING)
          .setSize(CustomAlert.SIZE.SMALL)
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
            .setTitle(Strings.Alerts.FailedToSendEmail.Title)
            .setMessage(Strings.Alerts.FailedToSendEmail.Message)
            .setType(CustomAlert.TYPE.ERROR)
            .setSize(CustomAlert.SIZE.SMALL)
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
            .setTitle(Strings.Alerts.SuccessfullySentEmail.Title)
            .setMessage(Strings.Alerts.SuccessfullySentEmail.Message)
            .setType(CustomAlert.TYPE.SUCCESS)
            .setSize(CustomAlert.SIZE.SMALL)
            .build()
            .show();

          isSendingEmail = false;
          btnSend.loading = false;
        },
      });
    });
  }
}

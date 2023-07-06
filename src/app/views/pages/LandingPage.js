import UIState from "../../../utils/ui-state";
import Dom from "../../core/Dom";
import Component from "../../core/Component";
import { createPreviewEmptyProjects } from "../../../utils/dummy_data/projects";
import { toPath } from "../../../utils/route-helper";
import { sendEmail } from "../../process/landing";
import { validateEmail } from "../../../utils/data-helpers";
import CustomAlert from "../../components/CustomAlert";
import ButtonText from "../../components/ButtonText";
import { Strings } from "../../../globals/consts";
import { getAllPinnedProjectsController } from "../../controllers/landing";
import { EventState } from "../../../utils/event-helpers";
import Storage from "../../core/Storage";

export default class LandingPage {
  static async render(uiStateObservable) {
    // Loading
    uiStateObservable.emit(UIState.LOADING);

    const header = document.querySelector("header-app");
    header.resetMenus();

    const { stream, retry } = getAllPinnedProjectsController();

    stream.observe((event) => {
      if (event.state === EventState.ERROR) {
        uiStateObservable.emit(UIState.ERROR);
        CustomAlert.Builder
          .setTitle(Strings.Alerts.FailedToFetchData.Title)
          .setMessage(Strings.Alerts.FailedToFetchData.Message)
          .setType(CustomAlert.TYPE.ERROR)
          .setSize(CustomAlert.SIZE.SMALL)
          .setCancel(Strings.Buttons.Retry, () => {
            uiStateObservable.emit(UIState.LOADING);
            retry();
          })
          .build()
          .show();
      } else if (event.state === EventState.HAS_DATA) {
        uiStateObservable.emit(UIState.SUCCESS);
        const { projects } = event.result.data;

        const isAlreadyFired = Storage.getOneTimeValue(Storage.Keys.landingAlertInfo);

        if (projects.length <= 0 && !isAlreadyFired) {
          Storage.saveOneTimeValue(Storage.Keys.landingAlertInfo, true);
          CustomAlert.Builder
            .setTitle(Strings.Alerts.CurrentlyNoProjects.Title)
            .setMessage(Strings.Alerts.CurrentlyNoProjects.Message)
            .setType(CustomAlert.TYPE.INFO)
            .setSize(CustomAlert.SIZE.SMALL)
            .setCancel(Strings.Alerts.CurrentlyNoProjects.ConfirmText)
            .build()
            .show();
        }

        LandingPage.showHasData(projects);
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
      tempProjects = projects.map((project) => ({
        title: project.title,
        imagePath: project.imagePath,
        url: toPath(`/projects/${project.id}`),
      }));
    } else {
      tempProjects = createPreviewEmptyProjects(6);
    }

    workUIElem.projects = tempProjects;

    Dom.appendRootPage(
      Component.createVerticalSpacer("3rem"),
    );

    if (projects.length > 0) {
      // See more btn
      const btnMoreContainer = Component.createCustomFlexEndContainer();
      btnMoreContainer.appendChild(
        Component.createButtonText({
          text: Strings.Buttons.SeeMore,
          size: ButtonText.SIZE.BIG,
          isLink: true,
          href: toPath("/projects"),
        }),
      );
      Dom.appendRootPage(btnMoreContainer);
    }

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
    const nameInput = Component.createInputText({
      name: "fullname",
      placeholder: Strings.Placeholders.FullName,
    });
    const emailInput = Component.createInputText({
      name: "email",
      placeholder: Strings.Placeholders.Email,
    });
    const messageInput = Component.createInputText({
      name: "message",
      placeholder: Strings.Placeholders.Message,
      multiLineText: "true",
      rows: "6",
    });
    const btnSend = Component.createButtonText({
      text: Strings.Buttons.SendEmail,
      size: ButtonText.SIZE.BIG,
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
        CustomAlert.Builder
          .setTitle(Strings.Alerts.FillOutAllTheRequiredFields.Title)
          .setMessage(Strings.Alerts.FillOutAllTheRequiredFields.Message)
          .setType(CustomAlert.TYPE.WARNING)
          .setSize(CustomAlert.SIZE.SMALL)
          .setCancel("Oke")
          .build()
          .show();
        return;
      }
      if (!validateEmail(email)) {
        CustomAlert.Builder
          .setTitle(Strings.Alerts.InvalidEmailFormat.Title)
          .setMessage(Strings.Alerts.InvalidEmailFormat.Message)
          .setType(CustomAlert.TYPE.WARNING)
          .setSize(CustomAlert.SIZE.SMALL)
          .setCancel("Oke")
          .build()
          .show();
        return;
      }

      isSendingEmail = true;
      btnSend.loading = true;

      sendEmail({
        body: { fullname, email, message },
        onFailed: () => {
          CustomAlert.Builder
            .setTitle(Strings.Alerts.FailedToSendEmail.Title)
            .setMessage(Strings.Alerts.FailedToSendEmail.Message)
            .setType(CustomAlert.TYPE.ERROR)
            .setSize(CustomAlert.SIZE.SMALL)
            .setCancel("Oke")
            .build()
            .show();

          isSendingEmail = false;
          btnSend.loading = false;
        },
        onSuccess: () => {
          nameInput.value = "";
          emailInput.value = "";
          messageInput.value = "";

          CustomAlert.Builder
            .setTitle(Strings.Alerts.SuccessfullySentEmail.Title)
            .setMessage(Strings.Alerts.SuccessfullySentEmail.Message)
            .setType(CustomAlert.TYPE.SUCCESS)
            .setSize(CustomAlert.SIZE.SMALL)
            .setCancel("Oke")
            .build()
            .show();

          isSendingEmail = false;
          btnSend.loading = false;
        },
      });
    });
  }
}

import CustomAlert from "../../components/CustomAlert";
import { StatusCode, Strings } from "../../../globals/consts";
import Router from "../../core/Router";
import Pages from "../../core/Pages";
import UIState from "../../../utils/ui-state";
import Auth from "../../core/Auth";
import Dom from "../../core/Dom";
import Component from "../../core/Component";
import { getConfigurationController } from "../../controllers/dashboard";
import { EventState } from "../../../utils/event-helpers";
import { createGreetingUserTemplate } from "../../../utils/general-helpers";
import logger from "../../../utils/logger";
import ConfigurationModel from "../../model/ConfigurationModel";
import { resolveListProjectsFormat } from "../../../utils/data-helpers";
import { importProjects } from "../../process/dashboard";

export default class DashboardPage {
  static #authData = Auth.getAuthenticationData();

  static render(uiStateObservable) {
    uiStateObservable.emit(UIState.LOADING);

    const header = document.querySelector("header-app");
    header.clearMenus();
    header.appendMenu(
      Dom.createElement({
        tagName: "li",
        classNames: "nav-item",
        innerText: "Logout",
      }),
      () => { logger.info("Hello from menu"); },
    );

    if (!Auth.authenticate()) {
      Auth.flashAuthenticationData();

      CustomAlert.Builder
        .setType(CustomAlert.TYPE.ERROR)
        .setTitle(Strings.Alerts.Unauthenticated.Title)
        .setMessage(Strings.Alerts.Unauthenticated.Message)
        .setCancel(Strings.Alerts.Unauthenticated.ConfirmText, () => {
          Router.navigateTo(Pages.loginPage);
        })
        .build()
        .show();
      return;
    }

    this.#authData = Auth.getAuthenticationData();

    const { stream, retry } = getConfigurationController(
      this.#authData.token,
    );

    stream.observe((event) => {
      if (event.state === EventState.LOADING) return;

      if (event.state === EventState.HAS_DATA) {
        DashboardPage.#showHasData(event.result.data.configuration);
        uiStateObservable.emit(UIState.SUCCESS);
        return;
      }

      const { status } = event.result.error;

      if (status === StatusCode.TimeOut) {
        CustomAlert.Builder
          .setType(CustomAlert.TYPE.ERROR)
          .setTitle(Strings.Alerts.ConnectionTimeOut.Title)
          .setMessage(Strings.Alerts.ConnectionTimeOut.Message)
          .setCancel(Strings.Alerts.ConnectionTimeOut.ConfirmText, () => {
            retry();
          })
          .build()
          .show();
      } else if (status === StatusCode.NotAllowed) {
        Auth.flashAuthenticationData();

        CustomAlert.Builder
          .setType(CustomAlert.TYPE.ERROR)
          .setTitle(Strings.Alerts.Unauthenticated.Title)
          .setMessage(Strings.Alerts.Unauthenticated.Message)
          .setCancel(Strings.Alerts.Unauthenticated.ConfirmText, () => {
            Router.navigateTo(Pages.loginPage);
          })
          .build()
          .show();
      } else {
        CustomAlert.Builder
          .setType(CustomAlert.TYPE.ERROR)
          .setTitle(Strings.Alerts.SomethingWentWrong.Title)
          .setMessage(Strings.Alerts.SomethingWentWrong.Message)
          .setCancel(Strings.Alerts.SomethingWentWrong.ConfirmText, () => {
            retry();
          })
          .build()
          .show();
      }
    });
  }

  static #showHasData(configuration) {
    const tempConfiguration = new ConfigurationModel(
      configuration.lockUsersManage,
      configuration.lockProjectsManage,
      configuration.underMaintenance,
      configuration.pinnedProjectsOrder,
      configuration.tokenExpiresInHours,
    );

    const container = Component.createCustomCenterContainer("100%");
    const dashboardContainer = Dom.createElement({
      tagName: "div",
      styles: {
        margin: "1rem 0 2rem",
        boxShadow: "1px 1px 12px rgba(82, 82, 82, .1)",
        borderRadius: "8px",
        padding: "1rem",
      },
    });
    container.appendChild(dashboardContainer);

    // =============================================
    // Greeting User
    dashboardContainer.appendChild(
      Component.createDashboardTitle({
        text: createGreetingUserTemplate(Strings.App.Author),
        align: "center",
        size: "big",
        margin: "0",
      }),
    );
    dashboardContainer.appendChild(
      Dom.createElement({
        tagName: "div",
        styles: {
          margin: ".65rem 0 0",
          height: "2px",
          backgroundColor: "var(--grey-light-color)",
        },
      }),
    );

    Dom.appendRootPage(
      Component.createVerticalSpacer("2rem"),
    );

    // ==============================================
    // Configuration
    const booleanConfigData = [];
    const otherConfigData = {};

    Object.entries(configuration).forEach(([key, value]) => {
      if (value === true || value === false) {
        booleanConfigData.push({ key, value });
      } else {
        otherConfigData[key] = value;
      }
    });

    dashboardContainer.appendChild(
      Component.createDashboardTitle({
        text: "Configuration",
        size: "medium",
        margin: "2rem 0 1rem",
      }),
    );

    // ==============================================
    // Boolean configuration form
    const configurationFormUI = Component.createBooleanConfigurationFormUI();
    configurationFormUI.setConfigurationData(
      booleanConfigData,
    );

    // Update button
    const updateBooleanConfigButtonContainer = Component.createCustomFlexEndContainer();
    const updateBooleanConfigButton = Component.createButtonText({
      text: "Update", size: "medium",
    });
    updateBooleanConfigButtonContainer.appendChild(updateBooleanConfigButton);

    dashboardContainer.appendChild(configurationFormUI);
    dashboardContainer.appendChild(
      Component.createVerticalSpacer("1rem"),
    );
    dashboardContainer.appendChild(updateBooleanConfigButtonContainer);

    // Update event listener
    updateBooleanConfigButton.addEventListener("click", () => {
      const updatedBooleanConfig = configurationFormUI.resolveUpdatedCheckedValues();
      if (updatedBooleanConfig !== null && updatedBooleanConfig.length > 0) {
        booleanConfigData.forEach((data, index) => {
          tempConfiguration[data.key] = updatedBooleanConfig[index];
        });
        this.#updateConfigurationData(tempConfiguration);
      }
    });

    dashboardContainer.appendChild(
      Component.createVerticalSpacer("2rem"),
    );

    // ==============================================
    // Mixed configuration form
    const mixedConfigurationFormUI = Component.createMixedConfigurationFormUI();
    mixedConfigurationFormUI.setMixedConfigurationData(
      otherConfigData,
    );

    // Update button
    const updateMixedConfigButtonContainer = Component.createCustomFlexEndContainer();
    const updateMixedConfigButton = Component.createButtonText({
      text: "Update", size: "medium",
    });
    updateMixedConfigButtonContainer.appendChild(updateMixedConfigButton);

    dashboardContainer.appendChild(mixedConfigurationFormUI);
    dashboardContainer.appendChild(
      Component.createVerticalSpacer("1rem"),
    );
    dashboardContainer.appendChild(updateMixedConfigButtonContainer);

    // Update event listener
    updateMixedConfigButton.addEventListener("click", () => {
      const updatedMixedValues = mixedConfigurationFormUI.resolveUpdatedMixedValues();
      if (updatedMixedValues !== null) {
        Object.keys(otherConfigData).forEach((key) => {
          tempConfiguration[key] = updatedMixedValues[key];
        });
        this.#updateConfigurationData(tempConfiguration);
      }
    });

    // ==============================================
    // Import/Export Projects
    dashboardContainer.appendChild(
      Component.createDashboardTitle({
        text: "Import/Export Projects",
        size: "medium",
        margin: "2rem 0 1rem",
      }),
    );

    const importProjectsFormUI = Component.createImportFilesFormUI({
      props: {
        "upload-label": "Upload projects file",
        "upload-preview": "projects.json",
        "upload-name": "upload-projects",
        "accept-files": ".json",
        "check-label": "Replacing existing projects",
        "check-name": "should-replace-projects",
      },
    });
    dashboardContainer.appendChild(importProjectsFormUI);

    // Import and Export buttons
    const importExportProjectsButtonsContainer = Component.createCustomFlexEndContainer();
    const importProjectsButton = Component.createButtonText({
      text: "Import", size: "medium",
    });
    const exportProjectsButton = Component.createButtonText({
      text: "Export",
      size: "medium",
      bgColor: "var(--grey-color)",
    });
    importExportProjectsButtonsContainer.appendChild(exportProjectsButton);
    importExportProjectsButtonsContainer.appendChild(
      Component.createHorizontalSpacer(".65rem"),
    );
    importExportProjectsButtonsContainer.appendChild(importProjectsButton);

    dashboardContainer.appendChild(
      Component.createVerticalSpacer("1rem"),
    );
    dashboardContainer.appendChild(importExportProjectsButtonsContainer);

    // Import Export Click event listeners
    importProjectsButton.addEventListener("click", () => {
      const { files, shouldReplace } = importProjectsFormUI;
      DashboardPage.#importProjects(files, shouldReplace, importProjectsButton);
    });

    exportProjectsButton.addEventListener("click", () => {
      DashboardPage.#exportProjects();
    });

    // ==============================================
    // Import/Export Project Images
    dashboardContainer.appendChild(
      Component.createDashboardTitle({
        text: "Import/Export Project Images",
        size: "medium",
        margin: "2rem 0 1rem",
      }),
    );

    const importProjectImagesFormUI = Component.createImportFilesFormUI({
      props: {
        "upload-label": "Upload project images file",
        "upload-preview": "images.zip",
        "upload-name": "upload-project-images",
        "accept-files": ".zip",
        "check-label": "Replacing existing project images",
        "check-name": "should-replace-project-images",
      },
    });
    dashboardContainer.appendChild(importProjectImagesFormUI);

    // Import and Export buttons
    const importExportProjectImagesButtonsContainer = Component.createCustomFlexEndContainer();
    const importProjectImagesButton = Component.createButtonText({
      text: "Import", size: "medium",
    });
    const exportProjectImagesButton = Component.createButtonText({
      text: "Export",
      size: "medium",
      bgColor: "var(--grey-color)",
    });
    importExportProjectImagesButtonsContainer.appendChild(exportProjectImagesButton);
    importExportProjectImagesButtonsContainer.appendChild(
      Component.createHorizontalSpacer(".65rem"),
    );
    importExportProjectImagesButtonsContainer.appendChild(importProjectImagesButton);

    dashboardContainer.appendChild(
      Component.createVerticalSpacer("1rem"),
    );
    dashboardContainer.appendChild(importExportProjectImagesButtonsContainer);

    // Import Export Click event listeners
    importProjectImagesButton.addEventListener("click", () => {
      const { files, shouldReplace } = importProjectImagesFormUI;
      DashboardPage.#importProjectImages(files, shouldReplace, importProjectImagesButton);
    });

    exportProjectImagesButton.addEventListener("click", () => {
      DashboardPage.#exportProjectImages();
    });

    Dom.appendRootPage(container);
  }

  static #updateConfigurationData(newConfigurationData) {
    logger.table(newConfigurationData);
  }

  static async #importProjects(files, shouldReplace, importButton) {
    if (importButton.loading) return;

    if (files.length <= 0) {
      CustomAlert.Builder
        .setType(CustomAlert.TYPE.WARNING)
        .setTitle(Strings.Alerts.UploadFilesFirst.Title)
        .setMessage(Strings.Alerts.UploadFilesFirst.Message)
        .setCancel(Strings.Alerts.UploadFilesFirst.ConfirmText)
        .build()
        .show();
      return;
    }

    const projectsJsonFile = files[0];
    if (projectsJsonFile.type !== "application/json") {
      CustomAlert.Builder
        .setType(CustomAlert.TYPE.WARNING)
        .setTitle(Strings.Alerts.MustUploadJsonFile.Title)
        .setMessage(Strings.Alerts.MustUploadJsonFile.Message)
        .setCancel(Strings.Alerts.MustUploadJsonFile.ConfirmText)
        .build()
        .show();
      return;
    }

    const fileUrl = URL.createObjectURL(projectsJsonFile);
    try {
      const data = await fetch(fileUrl);
      const projects = await data.json();

      // invalid projects format
      if (!resolveListProjectsFormat(projects)) {
        logger.error("Failed to read uploaded json file");
        CustomAlert.Builder
          .setType(CustomAlert.TYPE.ERROR)
          .setTitle(Strings.Alerts.InvalidFormatOfProjectsFile.Title)
          .setMessage(Strings.Alerts.InvalidFormatOfProjectsFile.Message)
          .setCancel(Strings.Alerts.InvalidFormatOfProjectsFile.ConfirmText)
          .build()
          .show();
        return;
      }

      logger.info("Uploading projects json file....");
      importButton.loading = true;

      // Import projects to server
      importProjects({
        token: this.#authData.token,
        data: {
          replaceAll: shouldReplace,
          projects,
        },
        onFailed: (status) => {
          let title = "";
          let message = "";

          if (status === StatusCode.TimeOut) {
            title = Strings.Alerts.ConnectionTimeOut.Title;
            message = Strings.Alerts.ConnectionTimeOut.Message;
          } else if (status === StatusCode.NotAllowed) {
            title = Strings.Alerts.Unauthenticated.Title;
            message = Strings.Alerts.Unauthenticated.Message;
            Auth.flashAuthenticationData();
          } else {
            title = Strings.Alerts.FailedToImportProjects.Title;
            message = Strings.Alerts.FailedToImportProjects.Message;
          }

          CustomAlert.Builder
            .setType(CustomAlert.TYPE.ERROR)
            .setTitle(title)
            .setMessage(message)
            .setCancel("Oke", () => {
              Router.refresh();
            })
            .build()
            .show();
        },
        onSuccess: () => {
          CustomAlert.Builder
            .setType(CustomAlert.TYPE.SUCCESS)
            .setTitle(Strings.Alerts.SuccessfullyImportedProjects.Title)
            .setMessage(Strings.Alerts.SuccessfullyImportedProjects.Message)
            .setCancel(Strings.Alerts.SuccessfullyImportedProjects.ConfirmText, () => {
              Router.refresh();
            })
            .build()
            .show();
        },
      });
      //
    } catch (error) {
      // failed to read json file
      logger.error("Failed to read uploaded json file");
      CustomAlert.Builder
        .setType(CustomAlert.TYPE.ERROR)
        .setTitle(Strings.Alerts.InvalidFormatOfProjectsFile.Title)
        .setMessage(Strings.Alerts.InvalidFormatOfProjectsFile.Message)
        .setCancel(Strings.Alerts.InvalidFormatOfProjectsFile.ConfirmText)
        .build()
        .show();
    }
  }

  static #exportProjects() {
    logger.log("Export projects...");
  }

  static #importProjectImages(files, shouldReplace, importButton) {
    if (files.length <= 0) {
      CustomAlert.Builder
        .setType(CustomAlert.TYPE.WARNING)
        .setTitle(Strings.Alerts.UploadFilesFirst.Title)
        .setMessage(Strings.Alerts.UploadFilesFirst.Message)
        .setCancel(Strings.Alerts.UploadFilesFirst.ConfirmText)
        .build()
        .show();
      return;
    }

    const projectImagesZipFile = files[0];
    if (projectImagesZipFile.type !== "application/x-zip-compressed") {
      CustomAlert.Builder
        .setType(CustomAlert.TYPE.WARNING)
        .setTitle(Strings.Alerts.MustUploadZipFile.Title)
        .setMessage(Strings.Alerts.MustUploadZipFile.Message)
        .setCancel(Strings.Alerts.MustUploadZipFile.ConfirmText)
        .build()
        .show();
      return;
    }

    logger.inspect(files);
    logger.inspect(shouldReplace);
    logger.inspect(importButton);
  }

  static #exportProjectImages() {
    logger.log("Export project images...");
  }
}

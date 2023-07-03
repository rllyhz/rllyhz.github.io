import CustomAlert from "../../components/CustomAlert";
import { StatusCode, Strings } from "../../../globals/consts";
import { Router, Routes } from "../../routes";
import UIState from "../../../utils/ui-state";
import Auth from "../../core/Auth";
import Dom from "../../core/Dom";
import Component from "../../core/Component";
import { getConfigurationController } from "../../controllers/dashboard";
import { EventState } from "../../../utils/event-helpers";
import { createGreetingUserTemplate } from "../../../utils/general-helpers";
import logger from "../../../utils/logger";
import ConfigurationModel from "../../model/ConfigurationModel";

export default class DashboardPage {
  static render(uiStateObservable) {
    uiStateObservable.emit(UIState.LOADING);

    if (!Auth.authenticate()) {
      Auth.flashAuthenticationData();

      CustomAlert.Builder
        .setType(CustomAlert.TYPE.WARNING)
        .setTitle(Strings.Alerts.Unauthenticated.Title)
        .setMessage(Strings.Alerts.Unauthenticated.Message)
        .setCancel(Strings.Alerts.Unauthenticated.ConfirmText, () => {
          Router.navigateTo(Routes.Page.loginPage);
        })
        .build()
        .show();
      return;
    }

    const authData = Auth.getAuthenticationData();

    const { stream, retry } = getConfigurationController(
      authData.token,
    );

    stream.observe((event) => {
      if (event.state === EventState.LOADING) return;

      if (event.state === EventState.HAS_DATA) {
        DashboardPage.#showHasData(event.result.data.configuration);
        logger.info("Dashboard page rendered");
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
            Router.navigateTo(Routes.Page.loginPage);
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

    Dom.appendRootPage(
      Component.createVerticalSpacer("1rem"),
    );

    const container = Component.createCustomCenterContainer("100%");
    const dashboardContainer = Dom.createElement({
      tagName: "div",
      styles: {
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
        margin: "2rem 0 0",
      }),
    );

    // ==============================================
    // Import/Export Project Images
    dashboardContainer.appendChild(
      Component.createDashboardTitle({
        text: "Import/Export Project Images",
        size: "medium",
        margin: "2rem 0 0",
      }),
    );

    Dom.appendRootPage(container);
  }

  static #updateConfigurationData(newConfigurationData) {
    logger.log(newConfigurationData);
  }

  static #importProjects(projectJsonFile) {
    logger.log(projectJsonFile);
  }

  static #importProjectImages(imageZipFiles) {
    logger.log(imageZipFiles);
  }
}

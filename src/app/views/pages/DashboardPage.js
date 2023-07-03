import CustomAlert from "../../components/CustomAlert";
import { StatusCode, Strings } from "../../../globals/consts";
import { Router, Routes } from "../../routes";
import UIState from "../../../utils/ui-state";
import Auth from "../../core/Auth";
import Dom from "../../core/Dom";
import Component from "../../core/Component";
import { getConfigurationController } from "../../controllers/dashboard";
import { EventState } from "../../../utils/event-helpers";
import { createGreetingUserTemplate } from "../../../utils/general-helper";

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
      props: {
        configuration,
      },
    });
    container.appendChild(dashboardContainer);

    dashboardContainer.appendChild(
      Dom.createElement({
        tagName: "h1",
        innerText: createGreetingUserTemplate("Rully"),
        styles: {
          margin: "0",
          fontSize: "1.4rem",
          fontWeight: "700",
          textAlign: "center",
          color: "var(--text-dark-color)",
        },
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

    dashboardContainer.appendChild(
      Dom.createElement({
        tagName: "h2",
        innerText: "Configuration",
        styles: {
          margin: "2rem 0 0",
          fontSize: "1rem",
          fontWeight: "700",
          color: "var(--text-dark-color)",
        },
      }),
    );

    dashboardContainer.appendChild(
      Dom.createElement({
        tagName: "h2",
        innerText: "Import/Export Projects",
        styles: {
          margin: "2rem 0 0",
          fontSize: "1rem",
          fontWeight: "700",
          color: "var(--text-dark-color)",
        },
      }),
    );

    dashboardContainer.appendChild(
      Dom.createElement({
        tagName: "h2",
        innerText: "Import/Export Project Images",
        styles: {
          margin: "2rem 0 0",
          fontSize: "1rem",
          fontWeight: "700",
          color: "var(--text-dark-color)",
        },
      }),
    );

    Dom.appendRootPage(container);
  }
}

import logger from "../../../utils/logger";
import UIState from "../../../utils/ui-state";
import Dom from "../../core/Dom";
import Component from "../../core/Component";
import ButtonText from "../../components/ButtonText";
import CustomAlert from "../../components/CustomAlert";
import Router from "../../core/Router";
import Pages from "../../core/Pages";
import { StatusCode, Strings } from "../../../globals/consts";
import { login } from "../../process/auth";
import Auth from "../../core/Auth";

export default class LoginPage {
  static async render(uiStateObservable) {
    uiStateObservable.emit(UIState.LOADING);

    if (Auth.authenticate()) {
      CustomAlert.Builder
        .setType(CustomAlert.TYPE.INFO)
        .setTitle(Strings.Alerts.Authenticated.Title)
        .setMessage(Strings.Alerts.Authenticated.Message)
        .setCancel(Strings.Alerts.Authenticated.ConfirmText, () => {
          Router.navigateTo(Pages.dashboardPage);
        })
        .build()
        .show();
      return;
    }

    Dom.appendRootPage(
      Component.createTitleApp({ text: "Login", variant: "h1" }),
    );

    const loginContainer = Component.createCustomCenterContainer("70%");
    const usernameInput = Component.createInputText({
      name: "username",
      placeholder: "Username (required)",
    });
    const passwordInput = Component.createInputText({
      name: "password",
      placeholder: "Password (required)",
      obscureText: "true",
    });
    const buttonContainer = Component.createCustomFlexEndContainer();
    const submitButton = Component.createButtonText({
      text: "Login",
      size: ButtonText.SIZE.BIG,
    });
    buttonContainer.appendChild(submitButton);

    loginContainer.appendChild(
      Component.createVerticalSpacer("3rem"),
    );
    loginContainer.appendChild(usernameInput);
    loginContainer.appendChild(
      Component.createVerticalSpacer("1rem"),
    );
    loginContainer.appendChild(passwordInput);
    loginContainer.appendChild(
      Component.createVerticalSpacer("2rem"),
    );
    loginContainer.appendChild(buttonContainer);

    Dom.appendRootPage(loginContainer);

    // Submi Event
    let isTryingToLogin = false;
    submitButton.addEventListener("click", () => {
      if (isTryingToLogin) return;

      const username = usernameInput.value;
      const password = passwordInput.value;

      if (username.length <= 0 || password.length <= 0) {
        CustomAlert.Builder
          .setType(CustomAlert.TYPE.WARNING)
          .setTitle(Strings.Alerts.FillOutAllTheRequiredFields.Title)
          .setMessage(Strings.Alerts.FillOutAllTheRequiredFields.Message)
          .setCancel(Strings.Alerts.FillOutAllTheRequiredFields.ConfirmText)
          .build()
          .show();
        return;
      }

      submitButton.loading = true;
      isTryingToLogin = true;

      login({
        body: {
          username, password,
        },
        onFailed: (status, error) => {
          passwordInput.value = "";
          submitButton.loading = false;
          isTryingToLogin = false;
          let title = null;
          let message = null;

          if (status === StatusCode.TimeOut) {
            title = Strings.Alerts.ConnectionTimeOut.Title;
            message = Strings.Alerts.ConnectionTimeOut.Message;
          } else if (status === StatusCode.BadRequest) {
            title = "Failed to login";
            message = error.message;
          } else {
            title = Strings.Alerts.LoginFailed.Title;
            message = Strings.Alerts.LoginFailed.Message;
          }

          CustomAlert.Builder
            .setType(CustomAlert.TYPE.ERROR)
            .setTitle(title)
            .setMessage(message)
            .setCancel(Strings.Alerts.LoginFailed.ConfirmText)
            .build()
            .show();
        },
        onSuccess: (data) => {
          usernameInput.value = "";
          passwordInput.value = "";
          submitButton.loading = false;
          isTryingToLogin = false;

          Auth.updateAuthenticationData(
            true,
            data.user.token,
            data.user.tokenCreatedAt,
          );

          CustomAlert.Builder
            .setType(CustomAlert.TYPE.SUCCESS)
            .setTitle(Strings.Alerts.LoginSuccess.Title)
            .setMessage(Strings.Alerts.LoginSuccess.Message)
            .setCancel(Strings.Alerts.LoginSuccess.ConfirmText, () => {
              Router.navigateTo(Pages.dashboardPage);
            })
            .build()
            .show();
        },
      });
    });

    uiStateObservable.emit(UIState.SUCCESS);
    logger.info("Login Page");
  }
}

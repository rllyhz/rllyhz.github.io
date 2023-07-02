import { EventState } from "../../../utils/event-helpers";
import UIState from "../../../utils/ui-state";
import { CustomAlert, CustomAlertBuilder } from "../../components/CustomAlert";
import { StatusCode, Strings } from "../../../globals/consts";
import { getProjectByIdController } from "../../controllers/projects";
import Router from "../../routes/router";

export default class ProjectDetailPage {
  static async render(uiStateObservable, id) {
    uiStateObservable.emit(UIState.LOADING);

    const { stream, retry } = getProjectByIdController(id);

    stream.observe((event) => {
      if (event.state === EventState.ERROR && event.result.error.status === StatusCode.NotFound) {
        CustomAlertBuilder
          .setTitle(Strings.Alerts.ProjectDetailNotFound.Title)
          .setMessage(Strings.Alerts.ProjectDetailNotFound.Message)
          .setType(CustomAlert.TYPE.ERROR)
          .setSize(CustomAlert.SIZE.SMALL)
          .setCancel(Strings.Alerts.ProjectDetailNotFound.ConfirmText, () => {
            // redirect to ProjectPage
            Router.navigateTo("/projects");
          })
          .build()
          .show();
        //
      } if (event.state === EventState.ERROR && event.result.error.status === StatusCode.TimeOut) {
        CustomAlertBuilder
          .setTitle(Strings.Alerts.FailedToFetchData.Title)
          .setMessage(Strings.Alerts.FailedToFetchData.Message)
          .setType(CustomAlert.TYPE.ERROR)
          .setSize(CustomAlert.SIZE.SMALL)
          .setCancel(Strings.Buttons.Retry, () => {
            // retry
            retry();
          })
          .build()
          .show();
        //
      } else if (event.state === EventState.HAS_DATA) {
        ProjectDetailPage.showHasData(event.result.data.project);
      }
    });
  }

  static showHasData() {
    // TODO create project detail UI
    // console.log("detail...");
  }
}

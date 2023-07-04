import { EventState } from "../../../utils/event-helpers";
import UIState from "../../../utils/ui-state";
import CustomAlert from "../../components/CustomAlert";
import { StatusCode, Strings } from "../../../globals/consts";
import { getProjectByIdController } from "../../controllers/projects";
import Router from "../../core/Router";
import Pages from "../../core/Pages";

export default class ProjectDetailPage {
  static async render(uiStateObservable, id) {
    uiStateObservable.emit(UIState.LOADING);

    const { stream, retry } = getProjectByIdController(id);

    stream.observe((event) => {
      if (event.state === EventState.ERROR && event.result.error.status === StatusCode.NotFound) {
        CustomAlert.Builder
          .setTitle(Strings.Alerts.ProjectDetailNotFound.Title)
          .setMessage(Strings.Alerts.ProjectDetailNotFound.Message)
          .setType(CustomAlert.TYPE.ERROR)
          .setSize(CustomAlert.SIZE.SMALL)
          .setCancel(Strings.Alerts.ProjectDetailNotFound.ConfirmText, () => {
            // redirect to ProjectPage
            Router.navigateTo(Pages.projectsPage);
          })
          .build()
          .show();
        //
      } if (event.state === EventState.ERROR && event.result.error.status === StatusCode.TimeOut) {
        CustomAlert.Builder
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

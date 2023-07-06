import { EventState } from "../../../utils/event-helpers";
import UIState from "../../../utils/ui-state";
import CustomAlert from "../../components/CustomAlert";
import { StatusCode, Strings } from "../../../globals/consts";
import { getProjectByIdController } from "../../controllers/projects";
import Router from "../../core/Router";
import Pages from "../../core/Pages";
import logger from "../../../utils/logger";
import Dom from "../../core/Dom";
import Component from "../../core/Component";

export default class ProjectDetailPage {
  static async render(uiStateObservable, data) {
    uiStateObservable.emit(UIState.LOADING);

    const header = document.querySelector("header-app");
    header.clearMenus();

    const { stream, retry } = getProjectByIdController(data.params.id);

    stream.observe((event) => {
      if (event.state === EventState.ERROR && event.result.error.status === StatusCode.NotFound) {
        uiStateObservable.emit(UIState.ERROR);
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
        uiStateObservable.emit(UIState.ERROR);
        CustomAlert.Builder
          .setTitle(Strings.Alerts.FailedToFetchData.Title)
          .setMessage(Strings.Alerts.FailedToFetchData.Message)
          .setType(CustomAlert.TYPE.ERROR)
          .setSize(CustomAlert.SIZE.SMALL)
          .setCancel(Strings.Buttons.Retry, () => {
            uiStateObservable.emit(UIState.LOADING);
            // retry
            retry();
          })
          .build()
          .show();
        //
      } else if (event.state === EventState.HAS_DATA) {
        uiStateObservable.emit(UIState.SUCCESS);
        ProjectDetailPage.showHasData(event.result.data.project);
      }
    });
  }

  static showHasData(projectDetail) {
    const projectDetailUI = Component.createProjectDetailUI();
    projectDetailUI.project = projectDetail;

    Dom.appendRootPage(projectDetailUI);

    logger.info("Detail page");
  }
}

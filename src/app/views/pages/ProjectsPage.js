import { Strings } from "../../../globals/consts";
import logger from "../../../utils/logger";
import { EventState } from "../../../utils/event-helpers";
import UIState from "../../../utils/ui-state";
import CustomAlert from "../../components/CustomAlert";
import { getProjectsController } from "../../controllers/projects";
import Component from "../../core/Component";
import Dom from "../../core/Dom";
import { isOnMobileScreen } from "../../../utils/ui/viewport-helpers";

export default class ProjectsPage {
  static async render(uiStateObservable) {
    // Loading
    uiStateObservable.emit(UIState.LOADING);

    const { stream, retry } = getProjectsController();

    stream.observe((event) => {
      if (event.state === EventState.ERROR) {
        uiStateObservable.emit(UIState.ERROR);

        CustomAlert.Builder
          .setType(CustomAlert.TYPE.ERROR)
          .setSize(CustomAlert.SIZE.SMALL)
          .setTitle(Strings.Alerts.FailedToFetchData.Title)
          .setMessage(Strings.Alerts.FailedToFetchData.Message)
          .setCancel("Retry", () => { retry(); })
          .build()
          .show();

        logger.info("Projects page rendered");
        //
      } else if (event.state === EventState.HAS_DATA) {
        uiStateObservable.emit(UIState.SUCCESS);
        const { projects } = event.result.data;

        if (projects.length <= 0) {
          ProjectsPage.showEmptyProjects();
        } else {
          ProjectsPage.showHasData(projects);
        }
        logger.info("Projects page rendered");
      }
    });
  }

  static showEmptyProjects() {
    Dom.appendRootPage(
      Component.createVerticalSpacer("3rem"),
    );

    const isOnMobile = isOnMobileScreen();

    Dom.appendRootPage(
      Dom.createElement({
        tagName: "p",
        innerHTML: `
          <box-icon name='outline' color="var(--message-color)" size="6rem"></box-icon>
          </br></br>
          ${Strings.Alerts.CurrentlyNoProjects.Message} 
        `,
        styles: {
          margin: 0,
          textAlign: "center",
          fontWeight: "400",
          fontSize: isOnMobile ? "1rem" : "1.1rem",
          color: "var(--message-dark-color)",
        },
      }),
    );
  }

  static showHasData(projects = []) {
    Dom.appendRootPage(
      Component.createVerticalSpacer("3rem"),
    );

    Dom.appendRootPage(
      Component.createTitleApp({ text: "All Projects", variant: "h1" }),
    );

    Dom.appendRootPage(
      Component.createVerticalSpacer("2rem"),
    );

    const projectList = Component.createProjectListUI({ heading: "h2" });
    Dom.appendRootPage(projectList);

    projectList.projects = projects;
  }
}

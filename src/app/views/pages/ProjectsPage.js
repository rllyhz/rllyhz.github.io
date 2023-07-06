import { Strings } from "../../../globals/consts";
import { EventState } from "../../../utils/event-helpers";
import UIState from "../../../utils/ui-state";
import CustomAlert from "../../components/CustomAlert";
import { getProjectsController } from "../../controllers/projects";
import Component from "../../core/Component";
import Dom from "../../core/Dom";
import { isOnMobileScreen } from "../../../utils/ui/viewport-helpers";
import { toPath } from "../../../utils/route-helper";

export default class ProjectsPage {
  static async render(uiStateObservable) {
    // Loading
    uiStateObservable.emit(UIState.LOADING);

    const header = document.querySelector("header-app");
    header.clearMenus();

    const { stream, retry } = getProjectsController();

    stream.observe((event) => {
      if (event.state === EventState.ERROR) {
        uiStateObservable.emit(UIState.ERROR);

        CustomAlert.Builder
          .setType(CustomAlert.TYPE.ERROR)
          .setSize(CustomAlert.SIZE.SMALL)
          .setTitle(Strings.Alerts.FailedToFetchData.Title)
          .setMessage(Strings.Alerts.FailedToFetchData.Message)
          .setCancel("Retry", () => {
            uiStateObservable.emit(UIState.LOADING);
            retry();
          })
          .build()
          .show();
        //
      } else if (event.state === EventState.HAS_DATA) {
        uiStateObservable.emit(UIState.SUCCESS);
        const { projects } = event.result.data;

        if (projects.length <= 0) {
          ProjectsPage.showEmptyProjects();
        } else {
          ProjectsPage.showHasData(projects);
        }
        //
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
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style="width:6rem;height:6rem;fill: var(--message-color);">
            <path d="M21 19v-9c0-1.103-.897-2-2-2h-3V5c0-1.103-.897-2-2-2H5c-1.103 0-2 .897-2 2v9c0 1.103.897 2 2 2h3v3c0 1.103.897 2 2 2h9c1.103 0 2-.897 2-2zM5 14V5h9v3h-4c-1.103 0-2 .897-2 2v4H5zm9.001 0H10v-4h4.001v4zM10 16h4c1.103 0 2-.897 2-2v-4h3l.001 9H10v-3z"></path>
          </svg>
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

    projectList.projects = projects.map((project) => ({
      title: project.title,
      imagePath: project.imagePath,
      url: toPath(`/projects/${project.id}`),
    }));

    Dom.appendRootPage(
      Component.createVerticalSpacer("3rem"),
    );
  }
}

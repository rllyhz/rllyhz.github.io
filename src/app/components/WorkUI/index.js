import ProjectItem from "../ProjectItem";
import ProjectModel from "../../model/ProjectModel";
import styles from "./styles";

export const Params = {
  projectMode: ProjectModel,
};

export default class WorkUI extends HTMLElement {
  static tagName = "work-ui";

  /**
  * Projects
  * @description **ProjectModel[]** used in work-ui component.
  */
  #projects = [];

  /**
  * Projects
  * @description **ProjectModel[]** used in work-ui component.
  * @returns {ProjectModel[]}
  */
  getProjects() {
    return this.#projects;
  }

  /**
  * Update Projects
  * @param {ProjectModel[]} newProjects
  * @description Update projects and re-render UI
  */
  set projects(newProjects = []) {
    this.#projects = newProjects;
    this._render();
  }

  /**
  * Add New Project
  * @param {ProjectModel} newProject
  * @description Add new project and re-render UI
  */
  addProject(newProject) {
    this.#projects.push(newProject);
    this._render();
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._render();
  }

  _render() {
    this.shadowRoot.innerHTML = `
      ${styles}
      <div class="projects">
        ${this.getProjects().map((project) => (`
          <${ProjectItem.tagName} url="${project.url}" title="${project.title}" imagePath="${project.imagePath}" heading="h4">
          </${ProjectItem.tagName}>
        `)).join("")}
      </div>
    `;
  }
}

if (!customElements.get(WorkUI.tagName)) {
  customElements.define(WorkUI.tagName, WorkUI);
}

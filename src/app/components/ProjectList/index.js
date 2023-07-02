import Dom from "../../core/Dom";
import ProjectModel from "../../model/ProjectModel";
import ProjectItem from "../ProjectItem";
import styles from "./styles";

export const _Params = {
  project: ProjectModel,
};

export default class ProjectList extends HTMLElement {
  static tagName = "project-list";

  #headingVariant = "h2";

  /**
   * Insert Projects and Re-render
   * @type {ProjectModel[]}
   */
  #projects = [];

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._render();
  }

  static get observedAttributes() {
    return ["heading"];
  }

  attributeChangedCallback(name, _, newValue) {
    if (name === "heading") {
      this.#headingVariant = newValue;
    }

    this._render();
  }

  /**
   * Insert Projects and Re-render
   * @param {ProjectModel[]} newProjects
   */
  set projects(newProjects) {
    this.#projects = newProjects;
    this._render();
  }

  /**
   * Add Project and Render
   * @param {ProjectModel} newProject
   */
  addProject(newProject) {
    this.#projects.push(newProject);
    // add project item node in html
    if (this.shadowRoot.querySelector(".project-list-container")) {
      this.shadowRoot.querySelector(".project-list-container")
        .appendChild(
          Dom.createElement({
            tagName: ProjectItem.tagName,
            props: {
              title: newProject.title,
              url: newProject.url,
              imagePath: newProject.imagePath,
              heading: this.#headingVariant,
            },
          }),
        );
    }
  }

  _render() {
    this.shadowRoot.innerHTML = `
      ${styles}
      <div class="project-list-container">
        ${this.#projects.map((project) => (`
          <${ProjectItem.tagName}
            title="${project.title}"
            url="${project.url}"
            imagePath="${project.imagePath}"
            heading="${this.#headingVariant}">
          </${ProjectItem.tagName}>
        `)).join(" ")}
      </div>
    `;
  }
}

if (!customElements.get(ProjectList.tagName)) {
  customElements.define(ProjectList.tagName, ProjectList);
}

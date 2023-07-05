import LazyImage from "../LazyImage";
import template from "./template";
import { toPublicPath } from "../../../utils/route-helper";
import { isArray } from "../../../utils/data-helpers";
import { Data } from "../../../globals/consts";

export default class ProjectDetailUI extends HTMLElement {
  static tagName = "project-detail-ui";

  #project = null;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = template;
  }

  set project(newProject) {
    this.#project = newProject;
    this.#updateUI();
  }

  get project() {
    return this.#project;
  }

  #updateUI() {
    this.shadowRoot.querySelector(":host > a")
      .href = this.#project.url;

    this.shadowRoot.querySelector(`:host > a ${LazyImage.tagName}`)
      .src = toPublicPath(this.#project.imagePath);

    this.shadowRoot.querySelector(":host .title")
      .href = this.#project.url;
    this.shadowRoot.querySelector(":host .title h1")
      .innerText = this.#project.title;

    this.shadowRoot.querySelector(":host .author-updatedAt")
      .innerHTML = this.#getFormattedAuthorAndUpdatedAt();

    const formattedType = Data.ProjectTypes
      .find((projectType) => projectType.type === this.#project.type) ?? {};
    this.shadowRoot.querySelector(":host .type span")
      .innerHTML = `${formattedType.name ?? "-"} <span class="icon">${formattedType.icon ?? ""}</span>`;

    this.shadowRoot.querySelector(":host .languages span")
      .innerHTML = this.#getFormatedLanguages();

    this.shadowRoot.querySelector(":host .description")
      .innerText = this.#project.description;

    this.shadowRoot.querySelector(":host .technologies-container .technologies-list")
      .innerHTML = this.#project.technologies.map((technology) => `
        <li>${technology}</li>
      `).join("");
  }

  #getFormattedAuthorAndUpdatedAt() {
    const splittedUpdatedAt = this.#project.updatedAt.split(" ");
    const timestamp = Date.parse(splittedUpdatedAt[0]);
    const dateUpdatedAt = new Date(timestamp).toDateString().slice(4);
    const timeUpdatedAt = splittedUpdatedAt[1].replace(".", ":");
    const updatedDateAt = `${dateUpdatedAt} - ${timeUpdatedAt}`;
    return `@${this.#project.author} • <span>${updatedDateAt}</span>`;
  }

  #formatLanguages(languages = []) {
    let result = "";

    if (languages.length > 0) {
      result = "";

      for (let i = 0; i < languages.length; i++) {
        const language = String(languages[i]).trim();
        if (i !== languages.length - 1) {
          result += `${language}, `;
        } else {
          result += `and ${language}.`;
        }
      }
    }

    return result;
  }

  #getFormatedLanguages(maxLanguagesDisplay = 3) {
    let formattedLanguages = "-";
    const { languages = [] } = this.#project;

    this.shadowRoot
      .querySelector(":host .languages .tooltip-ui").innerText = this.#formatLanguages(languages);

    if (languages && isArray(languages)) {
      const total = languages.length;
      if (total > maxLanguagesDisplay) {
        this.shadowRoot
          .querySelector(":host .languages").classList.add("tooltip-exists");

        const visibleLanguages = this.#project.languages.slice(0, maxLanguagesDisplay);
        formattedLanguages = `${this.#formatLanguages(visibleLanguages)} and <span class="tooltip-trigger">${total - maxLanguagesDisplay} more</span>.`;
      } else {
        formattedLanguages = this.#formatLanguages(languages);
      }
    }

    return formattedLanguages;
  }
}

if (!customElements.get(ProjectDetailUI.tagName)) {
  customElements.define(ProjectDetailUI.tagName, ProjectDetailUI);
}

import { toPublicPath } from "../../../utils/route-helper";
import styles from "./styles";

export default class ProjectItem extends HTMLElement {
  static tagName = "project-item";

  #title = "";

  #imagePath = "";

  #url = "";

  #headingVariant = "h3";

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._render();
  }

  static get observedAttributes() {
    return ["title", "url", "imagePath", "heading"];
  }

  attributeChangedCallback(name, _, newValue) {
    if (name === "title") {
      this.#title = newValue;
    } else if (name === "url") {
      this.#url = newValue;
    } else if (name === "imagePath") {
      this.#imagePath = newValue;
    } else if (name === "heading") {
      this.#headingVariant = newValue;
    }

    this._render();
  }

  connectedCallback() {
    const loadingPreviewElem = this.shadowRoot.querySelector(".project-container .loading-preview");
    const imgElem = this.shadowRoot.querySelector(".project-container .loading-preview img");

    function loaded() {
      loadingPreviewElem.classList.add("loaded");
      loadingPreviewElem.parentElement.style.boxShadow = "4px 2px 24px rgba(87, 87, 87, .2)";
    }
    function error() {
      imgElem.src = toPublicPath("/images/placeholders/work-photo-placeholder.png");
    }

    imgElem.onload = loaded;
    imgElem.onerror = error;

    if (imgElem.complete) {
      loaded();
    } else {
      imgElem.addEventListener("load", loaded);
    }
  }

  _render() {
    this.shadowRoot.innerHTML = `
      ${styles}
      <a class="project-container" href="${this.#url}">
        <div class="loading-preview">
          <img src="${this.#imagePath}" alt="${this.#title}" loading="lazy" />
        </div>
        <${this.#headingVariant} class="title">${this.#title}</${this.#headingVariant}>
      </a>
    `;
  }
}

if (!customElements.get(ProjectItem.tagName)) {
  customElements.define(ProjectItem.tagName, ProjectItem);
}

import LazyImage from "../LazyImage";
import template from "./template";

export default class ProjectItem extends HTMLElement {
  static tagName = "project-item";

  #title = "";

  #imagePath = "";

  #url = "";

  #headingVariant = "h3";

  static Heading = {
    H1: "h1",
    H2: "h2",
    H3: "h3",
    H4: "h4",
    H5: "h5",
    H6: "h6",
  };

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
    const container = this.shadowRoot.querySelector(".project-container");
    const lazyImageElem = this.shadowRoot.querySelector(`.project-container ${LazyImage.tagName}`);

    lazyImageElem.setOnLoadedImageCallback(() => {
      container.style.boxShadow = "4px 2px 24px rgba(87, 87, 87, .2)";
    });
  }

  _render() {
    this.shadowRoot.innerHTML = template(
      this.#headingVariant,
      this.#title,
      this.#imagePath,
      this.#url,
    );
  }
}

if (!customElements.get(ProjectItem.tagName)) {
  customElements.define(ProjectItem.tagName, ProjectItem);
}

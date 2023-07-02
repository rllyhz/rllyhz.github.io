import template from "./template";

export default class Loading extends HTMLElement {
  static tagName = "loading-wrapper";

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = template;
  }

  static get observedAttributes() {
    return ["width", "height", "padding", "margin"];
  }

  attributeChangedCallback(name, __, newValue) {
    switch (name) {
      case "width":
        this.style.width = newValue;
        break;
      case "height":
        this.style.height = newValue;
        break;
      case "margin":
        this.style.padding = newValue;
        break;
      case "padding":
        this.style.padding = newValue;
        break;
      default:
        break;
    }
  }
}

if (!customElements.get(Loading.tagName)) {
  customElements.define(Loading.tagName, Loading);
}

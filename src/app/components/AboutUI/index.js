import template from "./template";

export default class AboutUI extends HTMLElement {
  static tagName = "about-ui";

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = template;
  }
}

if (!customElements.get(AboutUI.tagName)) {
  customElements.define(AboutUI.tagName, AboutUI);
}

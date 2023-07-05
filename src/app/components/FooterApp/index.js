import template from "./template";

export default class FooterApp extends HTMLElement {
  static tagName = "footer-app";

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = template;
  }
}

if (!customElements.get(FooterApp.tagName)) {
  customElements.define(FooterApp.tagName, FooterApp);
}

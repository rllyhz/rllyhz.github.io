import template from "./template";

export default class WelcomeUI extends HTMLElement {
  static tagName = "welcome-ui";

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "closed" });
    shadow.innerHTML = template;
  }
}

if (!customElements.get(WelcomeUI.tagName)) {
  customElements.define(WelcomeUI.tagName, WelcomeUI);
}

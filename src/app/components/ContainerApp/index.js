import Dom from "../../core/Dom";
import template from "./template";

export default class ContainerApp extends HTMLElement {
  static tagName = Dom.containerAppTagName;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = template;
  }

  addNewChild(newNode) {
    this.shadowRoot.querySelector(".container-app").appendChild(newNode);
  }

  replaceChildren(newNode) {
    this.shadowRoot.querySelector(".container-app").innerHTML = "";
    this.shadowRoot.querySelector(".container-app").appendChild(newNode);
  }
}

if (!customElements.get(ContainerApp.tagName)) {
  customElements.define(ContainerApp.tagName, ContainerApp);
}

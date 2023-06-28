import styles from "./styles";
import Dom from "../../core/Dom";

export default class ContainerApp extends HTMLElement {
  static tagName = Dom.containerAppTagName;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._render();
  }

  _render() {
    this.shadowRoot.innerHTML = `
      ${styles}
      <div class="container-app"></div>
    `;
  }

  addNewChild(newNode) {
    this.shadowRoot.querySelector(".container-app").appendChild(newNode);
  }

  replaceChildren(newNode) {
    this.shadowRoot.querySelector(".container-app").innerHTML = "";
    this.shadowRoot.querySelector(".container-app").appendChild(newNode);
  }
}

customElements.define(ContainerApp.tagName, ContainerApp);

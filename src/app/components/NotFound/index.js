import styles from "./styles";
import Router from "../../routes/router";
import { toPath } from "../../../utils/route-helper";

export default class NotFound extends HTMLElement {
  static tagName = "not-found";

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._render();
  }

  connectedCallback() {
    this.shadowRoot.querySelector(".not-found-container button")
      .addEventListener("click", this.goHome);
  }

  disConnectedCallback() {
    this.shadowRoot.querySelector(".not-found-container button")
      .removeEventListener("click", this.goHome);
  }

  goHome = () => {
    Router.href(toPath("/"));
  };

  _render() {
    this.shadowRoot.innerHTML = `
      ${styles}
      <div class="not-found-container">
        <h1>404 - Not Found</h1>
        <p>Opss.. There is nothing here</p>
        <button type="button">Back Home</button>
      </div>
    `;
  }
}

if (!customElements.get(NotFound.tagName)) {
  customElements.define(NotFound.tagName, NotFound);
}

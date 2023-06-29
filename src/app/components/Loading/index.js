import styles from "./styles";

export default class Loading extends HTMLElement {
  static tagName = "loading-wrapper";

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._render();
  }

  static get observedAttributes() {
    return ["data-width", "data-height", "data-padding", "data-margin"];
  }

  attributeChangedCallback(name, __, newValue) {
    switch (name) {
      case "data-width":
        this.style.width = newValue;
        break;
      case "data-height":
        this.style.height = newValue;
        break;
      case "data-margin":
        this.style.padding = newValue;
        break;
      case "data-padding":
        this.style.padding = newValue;
        break;
      default:
        break;
    }
  }

  _render() {
    this.shadowRoot.innerHTML = `
      ${styles}
      <div class="loading-wrapper">
        <svg class="spinner" viewBox="0 0 50 50">
          <circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
        </svg>
      </div>
    `;
  }
}

if (!customElements.get(Loading.tagName)) {
  customElements.define(Loading.tagName, Loading);
}

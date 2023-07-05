import ButtonText from "../ButtonText";
import template from "./template";

export default class NotFound extends HTMLElement {
  static tagName = "not-found";

  #title = "Failed";

  #message = "Page not found!";

  #buttonText = "Back";

  #buttonCallback = null;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._render();
  }

  static get observedAttributes() {
    return ["title", "message", "button-text"];
  }

  attributeChangedCallback(name, _, newValue) {
    if (name === "title") {
      this.#title = newValue;
    } else if (name === "message") {
      this.#message = newValue;
    } else if (name === "button-text") {
      this.#buttonText = newValue;
    }

    this._render();
  }

  connectedCallback() {
    this.shadowRoot.querySelector(`.not-found-container > ${ButtonText.tagName}`)
      .addEventListener("click", this.goHome);
  }

  disConnectedCallback() {
    this.shadowRoot.querySelector(`.not-found-container > ${ButtonText.tagName}`)
      .removeEventListener("click", this.goHome);
  }

  goHome = () => {
    if (this.#buttonCallback && typeof this.#buttonCallback === "function") {
      this.#buttonCallback();
    }
  };

  set onButtonClick(callback) {
    this.#buttonCallback = callback;
  }

  _render() {
    this.shadowRoot.innerHTML = template(
      this.#title,
      this.#message,
      ButtonText.tagName,
      this.#buttonText,
      ButtonText.SIZE.MEDIUM,
    );
  }
}

if (!customElements.get(NotFound.tagName)) {
  customElements.define(NotFound.tagName, NotFound);
}

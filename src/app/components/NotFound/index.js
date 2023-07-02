import CustomButton from "../CustomButton";
import styles from "./styles";

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
    this.shadowRoot.querySelector(`.not-found-container > ${CustomButton.tagName}`)
      .addEventListener("click", this.goHome);
  }

  disConnectedCallback() {
    this.shadowRoot.querySelector(`.not-found-container > ${CustomButton.tagName}`)
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
    this.shadowRoot.innerHTML = `
      ${styles}
      <div class="not-found-container">
        <h1>${this.#title}</h1>
        <p>${this.#message}</p>

        <${CustomButton.tagName}
          text="${this.#buttonText}"
          size="${CustomButton.SIZE.MEDIUM}"
          title=""
          bg-color="var(--primary-color)">
        </${CustomButton.tagName}>
      </div>
    `;
  }
}

if (!customElements.get(NotFound.tagName)) {
  customElements.define(NotFound.tagName, NotFound);
}

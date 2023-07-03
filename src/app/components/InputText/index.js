import styles from "./styles";

export default class InputText extends HTMLElement {
  static tagName = "input-text";

  #multiLine = false;

  #obscure = false;

  #id = "";

  #title = "";

  #placeholder = "";

  #value = "";

  #name = "";

  #rows = "";

  #cols = "";

  #resize = "vertical";

  static get observedAttributes() {
    return [
      "multi-line", "obscure", "id", "resize",
      "placeholder", "value", "name", "title", "rows", "cols",
    ];
  }

  attributeChangedCallback(name, _, newValue) {
    if (name === "multi-line" && newValue !== "false") {
      this.#multiLine = true;
    } else if (name === "obscure" && newValue !== "false") {
      this.#obscure = true;
    } else if (name === "id") {
      this.#id = newValue;
    } else if (name === "placeholder") {
      this.#placeholder = newValue;
    } else if (name === "value") {
      this.#value = newValue;
    } else if (name === "name") {
      this.#name = newValue;
    } else if (name === "title") {
      this.#title = newValue;
    } else if (name === "rows") {
      this.#rows = newValue;
    } else if (name === "cols") {
      this.#cols = newValue;
    } else if (name === "resize") {
      this.#resize = newValue;
    }

    this._render();
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  set value(newValue = "") {
    this.shadowRoot.querySelector(this.#multiLine ? "textarea" : "input").value = newValue;
  }

  get value() {
    return this.shadowRoot.querySelector(this.#multiLine ? "textarea" : "input").value;
  }

  _render() {
    this.style.display = "block";
    this.shadowRoot.innerHTML = !this.#multiLine ? `
      ${styles}
      <input 
        id="${this.#id}"
        type="${this.#obscure ? "password" : "text"}"
        name="${this.#name}"
        title="${this.#title}"
        placeholder="${this.#placeholder}"
        value="${this.#value}" />
    ` : `
      ${styles}
      <textarea
      id="${this.#id}"
        name="${this.#name}"
        title="${this.#title}"
        placeholder="${this.#placeholder}"
        value="${this.#value}"
        rows="${this.#rows}"
        cols="${this.#cols}"
        ></textarea>
    `;

    if (this.#multiLine) {
      this.shadowRoot.querySelector("textarea").style.resize = this.#resize;
    }
  }
}

if (!customElements.get(InputText.tagName)) {
  customElements.define(InputText.tagName, InputText);
}

import styles from "./styles";

export default class CustomButton extends HTMLElement {
  static tagName = "custom-button";

  #text = "";

  #size = "";

  #bgColor = "var(--primary-color)";

  #color = "var(--primary-color)";

  #link = "";

  #type = "button";

  #showHref = false;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._render();
  }

  static get observedAttributes() {
    return ["text", "size", "bg-color", "color", "is-link", "href"];
  }

  attributeChangedCallback(name, _, newValue) {
    if (name === "text") {
      this.#text = newValue;
    } else if (name === "size") {
      this.#size = newValue;
    } else if (name === "bg-color") {
      this.#bgColor = newValue;
    } else if (name === "color") {
      this.#color = newValue;
    } else if (name === "is-link") {
      this.#showHref = newValue === "" || newValue !== "false";
    } else if (name === "href") {
      this.#link = newValue;
    } else if (name === "type") {
      this.#type = newValue ?? "button";
    }

    this._render();
  }

  _render() {
    const customTag = this.#showHref ? "a" : "button";

    this.shadowRoot.innerHTML = `
      ${styles}
      <${customTag}
        ${this.#showHref ? `href="${this.#link}"` : `type="${this.#type}"`}
        class="${this.#size}"
        style="color: ${this.#color}; background-color: ${this.#bgColor};"
        >
          ${this.#text}
      </${customTag}>
    `;
  }
}

if (!customElements.get(CustomButton.tagName)) {
  customElements.define(CustomButton.tagName, CustomButton);
}

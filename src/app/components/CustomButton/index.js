import styles from "./styles";

export default class CustomButton extends HTMLElement {
  static tagName = "custom-button";

  #text = "";

  #oldText = "";

  #size = "";

  #bgColor = "var(--accent-color)";

  #oldBgColor = "";

  #color = "var(--white-color)";

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

  set loading(isLoading = true) {
    if (isLoading) {
      this.#oldText = this.#text;
      this.#text = "Loading...";
      this.#oldBgColor = this.#bgColor;
      this.#bgColor = "grey";
    } else {
      this.#text = this.#oldText;
      this.#bgColor = this.#oldBgColor;
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

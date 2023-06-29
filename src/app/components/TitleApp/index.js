import { createStyles } from "./styles";

export default class TitleApp extends HTMLElement {
  static tagName = "title-app";

  #variant = "h1";

  #color = "inherit";

  #align = "start";

  #size = "small";

  #text = "";

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._render();
  }

  static get observedAttributes() {
    return ["variant", "color", "align", "size", "text"];
  }

  attributeChangedCallback(name, _, newValue) {
    let newVariant = this.#variant;
    let newColor = this.#color;
    let newSize = this.#size;
    let newText = this.#text;
    let newAlign = this.#align;

    if (name === "variant") {
      newVariant = newValue;
    } else if (name === "color") {
      newColor = newValue;
    } else if (name === "align") {
      newAlign = newValue;
    } else if (name === "size") {
      newSize = newValue;
    } else if (name === "text") {
      newText = newValue;
    }

    this._render(newVariant, newColor, newAlign, newSize, newText);
  }

  _render(variant, color, align, size, text) {
    this.#variant = variant;
    this.#color = color;
    this.#align = align;
    this.#size = size;
    this.#text = text;

    let fontSize = "1rem";
    let fontWeight = 300;

    if (size === "medium") {
      fontSize = "1.5rem";
      fontWeight = 600;
    } else if (size === "big") {
      fontSize = "2rem";
      fontWeight = 700;
    }

    const styles = createStyles(color, fontSize, fontWeight, align);

    this.shadowRoot.innerHTML = `
      ${styles}
      <${variant}>${text}</${variant}>
    `;
  }
}

if (!customElements.get(TitleApp.tagName)) {
  customElements.define(TitleApp.tagName, TitleApp);
}

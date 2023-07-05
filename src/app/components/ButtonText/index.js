import template from "./template";

export default class ButtonText extends HTMLElement {
  static tagName = "button-text";

  static SIZE = {
    SMALL: "small",
    MEDIUM: "medium",
    BIG: "big",
  };

  #isLoading = false;

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
      this.#showHref = newValue === "" || newValue !== "false" || !newValue;
    } else if (name === "href") {
      this.#link = newValue;
    }

    this._render();
  }

  set loading(isLoading = true) {
    this.#isLoading = isLoading;

    if (this.#isLoading) {
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

  get loading() {
    return this.#isLoading;
  }

  _render() {
    const customTag = this.#showHref ? "a" : "button";

    this.shadowRoot.innerHTML = template(
      customTag,
      this.#text,
      this.#showHref,
      this.#link,
      this.#type,
      this.#size,
      this.#color,
      this.#bgColor,
    );
  }
}

if (!customElements.get(ButtonText.tagName)) {
  customElements.define(ButtonText.tagName, ButtonText);
}

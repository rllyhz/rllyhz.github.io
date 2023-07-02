import template from "./template";

export default class LazyImage extends HTMLElement {
  static tagName = "lazy-image";

  #src = "";

  #srcAlternative = "";

  #errorMessage = "Failed to load image";

  #onLoadedCallback = null;

  #onErrorCallback = null;

  #srcAlternativeAlreadySet = false;

  #loadedCount = 1;

  #alt = "Image";

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = template(
      this.#src,
      this.#alt,
      this.#errorMessage,
    );
  }

  static get observedAttributes() {
    return ["src", "src-error", "alt", "width", "height", "radius", "ratio", "error-message"];
  }

  attributeChangedCallback(name, _, newValue) {
    switch (name) {
      case "src":
        if (!newValue) break;
        this.#src = newValue;
        break;
      case "src-error":
        if (!newValue) break;
        this.#srcAlternative = newValue;
        // do stuff
        break;
      case "error-message":
        if (!newValue) break;
        this.shadowRoot.querySelector("span").innerText = newValue;
        break;
      case "alt":
        if (!newValue) break;
        this.#alt = newValue;
        this.shadowRoot.querySelector("img").alt = newValue;
        break;
      case "radius":
        if (!newValue) break;
        this.#alt = newValue;
        this.style.borderRadius = newValue;
        break;
      case "width":
        if (!newValue) break;
        this.style.width = newValue;
        break;
      case "height":
        if (!newValue) break;
        this.style.height = newValue;
        break;
      case "ratio":
        if (!newValue) break;
        this.style.aspectRatio = newValue;
        break;
      default:
        break;
    }
  }

  connectedCallback() {
    this.#loadImage();
  }

  #loadImage = () => {
    const loaded = () => {
      this.classList.remove("error");
      this.classList.add("loaded");

      if (this.#onLoadedCallback && typeof this.#onLoadedCallback === "function") {
        this.#onLoadedCallback();
      }
    };

    const error = () => {
      this.classList.remove("loaded");

      if (!this.#srcAlternativeAlreadySet) {
        this.shadowRoot.querySelector("img").src = this.#srcAlternative;
        this.#srcAlternativeAlreadySet = true;
        return;
      }

      this.classList.add("error");

      if (this.#onErrorCallback && typeof this.#onErrorCallback === "function") {
        this.#onErrorCallback();
      }
    };

    this.shadowRoot.querySelector("img").onload = loaded;
    this.shadowRoot.querySelector("img").onerror = error;

    this.shadowRoot.querySelector("img").src = this.#src;
  };

  setOnLoadedImageCallback(callback) {
    this.#onLoadedCallback = callback;
  }

  setOnErrorImageCallback(callback) {
    this.#onErrorCallback = callback;
  }
}

if (!customElements.get(LazyImage.tagName)) {
  customElements.define(LazyImage.tagName, LazyImage);
}

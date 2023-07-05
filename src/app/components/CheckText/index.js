import template from "./template";

export default class CheckText extends HTMLElement {
  static tagName = "check-text";

  #valueChangedCallback = null;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = template;
  }

  static get observedAttributes() {
    return ["checked", "label", "name"];
  }

  attributeChangedCallback(name, _, newValue) {
    switch (name) {
      case "checked":
        this.shadowRoot
          .querySelector("input").checked = newValue || newValue !== "false";
        break;
      case "label":
        this.shadowRoot.querySelector("p").innerText = newValue;
        this.shadowRoot
          .querySelector("input").setAttribute("placeholder", newValue);
        break;
      case "name":
        this.shadowRoot
          .querySelector("input").setAttribute("name", newValue);
        break;
      default:
        break;
    }
  }

  setValueChangedListener(callback) {
    this.#valueChangedCallback = callback;
  }

  #inputListener = () => {
    if (this.#valueChangedCallback && typeof this.#valueChangedCallback === "function") {
      this.#valueChangedCallback(this.shadowRoot.querySelector("input").checked);
    }
  };

  connectedCallback() {
    this.shadowRoot.querySelector("input").addEventListener("change", this.#inputListener);
  }

  disconnectedCallback() {
    this.shadowRoot.querySelector("input").removeEventListener("change", this.#inputListener);
  }

  set checked(isChecked = false) {
    if (isChecked) {
      this.setAttribute("checked", true);
    } else {
      this.removeAttribute("checked");
    }
  }

  get checked() {
    return this.shadowRoot.querySelector("input").checked;
  }
}

if (!customElements.get(CheckText.tagName)) {
  customElements.define(CheckText.tagName, CheckText);
}

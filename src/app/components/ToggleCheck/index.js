import template from "./template";

export default class ToggleCheck extends HTMLElement {
  static tagName = "toggle-check";

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = template("");
  }

  static get observedAttributes() {
    return ["name", "checked"];
  }

  attributeChangedCallback(name, _, newValue) {
    switch (name) {
      case "name": {
        this.shadowRoot
          .querySelector("p").innerText = newValue;
        this.shadowRoot
          .querySelector("input").setAttribute("placeholder", newValue);
        break;
      }
      case "checked": {
        const isChecked = (newValue !== null && newValue !== "false");

        this.shadowRoot
          .querySelector("input").checked = isChecked;
        this.shadowRoot
          .querySelector("span").innerText = isChecked ? "Yes" : "No";

        if (isChecked) {
          this.classList.add("checked");
        } else {
          this.classList.remove("checked");
        }
        break;
      }
      default:
        break;
    }
  }

  set checked(isChecked = false) {
    if (isChecked) {
      this.setAttribute("checked", String(isChecked));
    } else {
      this.removeAttribute("checked");
    }
  }

  get checked() {
    return this.shadowRoot.querySelector("input").checked;
  }

  toggle() {
    this.checked = !this.shadowRoot.querySelector("input").checked;
  }
}

if (!customElements.get(ToggleCheck.tagName)) {
  customElements.define(ToggleCheck.tagName, ToggleCheck);
}

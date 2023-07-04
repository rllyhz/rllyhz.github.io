import { isOnMobileScreen } from "../../../utils/ui/viewport-helpers";
import ButtonText from "../ButtonText";
import { Callbacks, CustomAlertBuilder } from "./builder";
import template from "./template";

export default class CustomAlert extends HTMLElement {
  static tagName = "custom-alert";

  static Builder = CustomAlertBuilder;

  static TYPE = {
    SUCCESS: "success",
    INFO: "info",
    WARNING: "warning",
    ERROR: "error",
  };

  static SIZE = {
    SMALL: "small",
    MEDIUM: "medium",
    BIG: "big",
  };

  #type = "success";

  #size = "medium";

  #title = "";

  #message = "";

  #confirmText = "Oke";

  #cancelText = "Cancel";

  #singleConfirm = false;

  #singleBgColor = "var(--accent-color)";

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get observedAttributes() {
    return [
      "type", "size", "title", "message", "confirm-text", "cancel-text",
      "single-confirm", "single-bg-color",
    ];
  }

  attributeChangedCallback(name, _, newValue) {
    if (name === "type") {
      this.#type = newValue;
    } else if (name === "size") {
      this.#size = newValue;
    } else if (name === "title") {
      this.#title = newValue;
    } else if (name === "message") {
      this.#message = newValue;
    } else if (name === "confirm-text") {
      this.#confirmText = newValue;
    } else if (name === "cancel-text") {
      this.#cancelText = newValue;
    } else if (name === "single-confirm" && newValue !== "false") {
      this.#singleConfirm = true;
    } else if (name === "single-bg-color") {
      this.#singleBgColor = newValue;
    }

    this._render();
  }

  connectedCallback() {
    this.shadowRoot.querySelector(`${ButtonText.tagName}:first-child`)
      .addEventListener("click", () => {
        // run callback
        if (Callbacks.cancel && typeof Callbacks.cancel === "function") {
          Callbacks.cancel();
        }
        // remove alert
        this.removeAlert();
      });

    if (this.shadowRoot.querySelector(`${ButtonText.tagName}:nth-child(2)`)) {
      this.shadowRoot.querySelector(`${ButtonText.tagName}:nth-child(2)`)
        .addEventListener("click", () => {
          // run callback
          if (Callbacks.confirm && typeof Callbacks.confirm === "function") {
            Callbacks.confirm();
          }
          // remove alert
          this.removeAlert();
        });
    }
  }

  removeAlert() {
    CustomAlert.Builder.remove();
  }

  _render() {
    const isMobile = isOnMobileScreen();
    const xlargeSize = "82%";
    const largeSize = "72%";
    const mediumSize = "45%";
    const smallSize = "35%";

    let buttonsSize = ButtonText.SIZE.MEDIUM;

    if (this.#size === CustomAlert.SIZE.BIG) {
      this.style.width = isMobile ? xlargeSize : largeSize;
      buttonsSize = ButtonText.SIZE.MEDIUM;
    } else if (this.#size === CustomAlert.SIZE.MEDIUM) {
      this.style.width = isMobile ? largeSize : mediumSize;
      buttonsSize = isMobile ? ButtonText.SIZE.SMALL : ButtonText.SIZE.MEDIUM;
    } else {
      this.style.width = isMobile ? largeSize : smallSize;
      buttonsSize = ButtonText.SIZE.SMALL;
    }

    this.style.marginTop = "20vh";
    this.style.height = "min-content";

    let icon = `<box-icon name='error-circle' color="#CF7070" size="2.5rem">
    </box-icon>`;

    if (this.#type === CustomAlert.TYPE.SUCCESS) {
      icon = `<box-icon name='check-circle' color="#70D270" size="2.5rem">
    </box-icon>`;
    } else if (this.#type === CustomAlert.TYPE.INFO) {
      icon = `<box-icon name='info-circle' color="#B3B3B3" size="2.5rem">
    </box-icon>`;
    } else if (this.#type === CustomAlert.TYPE.WARNING) {
      icon = `<box-icon name='error-circle' color="#F7D95B" size="2.5rem">
    </box-icon>`;
    }

    let buttons = null;

    if (this.#singleConfirm) {
      buttons = `
        <${ButtonText.tagName}
        text="${this.#cancelText}"
        size="${buttonsSize}"
        bg-color="${this.#singleConfirm && !this.#singleBgColor ? this.#singleBgColor : "grey"}"
        color="var(--white-color)"
        title="Confirm"
        ></${ButtonText.tagName}>
      `;
    } else {
      buttons = `
      <${ButtonText.tagName}
        text="${this.#cancelText}"
        size="${buttonsSize}"
        bg-color="${this.#singleConfirm && !this.#singleBgColor ? this.#singleBgColor : "grey"}"
        color="var(--white-color)"
        title="Confirm"
        ></${ButtonText.tagName}>
      <${ButtonText.tagName}
        text="${this.#confirmText}"
        size="${buttonsSize}"
        bg-color="var(--accent-color)"
        color="var(--white-color)"
        title="Confirm"
        ></${ButtonText.tagName}>
      `;
    }

    this.shadowRoot.innerHTML = template(
      this.#title,
      this.#message,
      icon,
      buttons,
    );
  }
}

if (!customElements.get(CustomAlert.tagName)) {
  customElements.define(CustomAlert.tagName, CustomAlert);
}

import logger from "../../../utils/logger";
import { isOnMobileScreen } from "../../../utils/ui/viewport-helpers";
import Dom from "../../core/Dom";
import styles from "./styles";
import CustomButton from "../CustomButton";

class CustomAlertDetail {
  constructor(title, message, type, size) {
    this.title = title;
    this.message = message;
    this.type = type;
    this.size = size;
  }
}

const Callbacks = {
  confirm: null,
  cancel: null,
};

class CustomAlertBuilder {
  static #detail = null;

  static #title;

  static #message;

  static #type;

  static #size;

  static #cancelable = false;

  static #confirmText = "Oke";

  static #cancelText = "Cancel";

  static isShowing = false;

  static getDetail() {
    if (CustomAlertBuilder.#detail === null) {
      CustomAlertBuilder.#detail = new CustomAlertDetail("", "", "success");
    }
    return CustomAlertBuilder.#detail;
  }

  static setTitle(title = "") {
    CustomAlertBuilder.#title = title;
    return CustomAlertBuilder;
  }

  static setMessage(message = "") {
    CustomAlertBuilder.#message = message;
    return CustomAlertBuilder;
  }

  static setType(type = "succes") {
    CustomAlertBuilder.#type = type;
    return CustomAlertBuilder;
  }

  static setSize(size = "medium") {
    CustomAlertBuilder.#size = size;
    return CustomAlertBuilder;
  }

  static setConfirm(text, callback = null) {
    CustomAlertBuilder.#confirmText = text;
    if (callback === null) {
      Callbacks.confirm = () => {};
    } else {
      Callbacks.confirm = callback;
    }
    return CustomAlertBuilder;
  }

  static setCancel(text, callback = null) {
    CustomAlertBuilder.#cancelText = text;
    Callbacks.cancel = callback;
    return CustomAlertBuilder;
  }

  static setCancelable(cancelable = false) {
    CustomAlertBuilder.#cancelable = cancelable;
    return CustomAlertBuilder;
  }

  static build() {
    CustomAlertBuilder.#detail = new CustomAlertDetail(
      CustomAlertBuilder.#title,
      CustomAlertBuilder.#message,
      CustomAlertBuilder.#type,
      CustomAlertBuilder.#size,
    );
    return CustomAlertBuilder;
  }

  static show() {
    if (CustomAlertBuilder.#detail === null) {
      logger.error("CustomAlert not created yet!");
      return;
    }

    if (CustomAlertBuilder.isShowing) {
      logger.error("CustomAlert is already showing!");
      return;
    }

    // show
    const alertContainer = Dom.createElement({
      tagName: "div",
      styles: {
        position: "fixed",
        top: "0",
        right: "0",
        left: "0",
        bottom: "0",
        "z-index": "var(--z-alert)",
        backgroundColor: "rgba(82, 82, 82, .2)",
        display: "flex",
        justifyContent: "center",
      },
    });

    alertContainer.innerHTML = `
      <custom-alert
        title="${CustomAlertBuilder.#detail.title}"
        message="${CustomAlertBuilder.#detail.message}"
        type="${CustomAlertBuilder.#detail.type}"
        size="${CustomAlertBuilder.#detail.size}"
        cancel-text="${CustomAlertBuilder.#cancelText}"
        confirm-text="${CustomAlertBuilder.#confirmText}"
        ${Callbacks.confirm === null ? "single-confirm" : ""}
        >
      </custom-alert>
    `;

    if (document.body.style.overflowY !== "hidden") {
      document.body.style.overflowY = "hidden";
    }

    document.body.appendChild(alertContainer);
    CustomAlertBuilder.isShowing = true;

    // remove handler
    alertContainer.addEventListener("click", (e) => {
      if (!CustomAlertBuilder.#cancelable) return;

      const clickedNodeName = e.target.parentNode.nodeName;

      if (clickedNodeName === "BODY") { // only container
        if (document.body.style.overflowY === "hidden") {
          document.body.style.overflowY = "auto";
        }
        if (CustomAlertBuilder.isShowing) alertContainer.remove();
        CustomAlertBuilder.isShowing = false;
      }
    });

    this.#detail = null;
  }
}

class CustomAlert extends HTMLElement {
  static tagName = "custom-alert";

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
    this.shadowRoot.querySelector(`${CustomButton.tagName}:first-child`)
      .addEventListener("click", () => {
        // run callback
        if (Callbacks.cancel && typeof Callbacks.cancel === "function") {
          Callbacks.cancel();
        }
        // remove alert
        this.removeAlert();
      });

    if (this.shadowRoot.querySelector(`${CustomButton.tagName}:nth-child(2)`)) {
      this.shadowRoot.querySelector(`${CustomButton.tagName}:nth-child(2)`)
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
    const backdropAlert = document.body.childNodes[document.body.childNodes.length - 1];

    if (document.body.style.overflowY === "hidden") {
      document.body.style.overflowY = "auto";
    }
    if (CustomAlertBuilder.isShowing) backdropAlert.remove();
    CustomAlertBuilder.isShowing = false;
    Callbacks.confirm = null;
    Callbacks.cancel = null;
  }

  _render() {
    const isMobile = isOnMobileScreen();
    const xlargeSize = "82%";
    const largeSize = "72%";
    const mediumSize = "45%";
    const smallSize = "35%";

    let buttonsSize = CustomButton.SIZE.MEDIUM;

    if (this.#size === CustomAlert.SIZE.BIG) {
      this.style.width = isMobile ? xlargeSize : largeSize;
      buttonsSize = CustomButton.SIZE.MEDIUM;
    } else if (this.#size === CustomAlert.SIZE.MEDIUM) {
      this.style.width = isMobile ? largeSize : mediumSize;
      buttonsSize = isMobile ? CustomButton.SIZE.SMALL : CustomButton.SIZE.MEDIUM;
    } else {
      this.style.width = isMobile ? largeSize : smallSize;
      buttonsSize = CustomButton.SIZE.SMALL;
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
        <${CustomButton.tagName}
        text="${this.#cancelText}"
        size="${buttonsSize}"
        bg-color="${this.#singleConfirm && !this.#singleBgColor ? this.#singleBgColor : "grey"}"
        color="var(--white-color)"
        title="Confirm"
        ></${CustomButton.tagName}>
      `;
    } else {
      buttons = `
      <${CustomButton.tagName}
        text="${this.#cancelText}"
        size="${buttonsSize}"
        bg-color="${this.#singleConfirm && !this.#singleBgColor ? this.#singleBgColor : "grey"}"
        color="var(--white-color)"
        title="Confirm"
        ></${CustomButton.tagName}>
      <${CustomButton.tagName}
        text="${this.#confirmText}"
        size="${buttonsSize}"
        bg-color="var(--accent-color)"
        color="var(--white-color)"
        title="Confirm"
        ></${CustomButton.tagName}>
      `;
    }

    this.shadowRoot.innerHTML = `
      ${styles}
      <div class="alert-container">
        <p class="icon">${icon}</p>
        <p class="title">${this.#title}</p>
        <p class="message">${this.#message}</p>

        <div class=button-container>
          ${buttons}
        </div>
      </div>
    `;
  }
}

if (!customElements.get(CustomAlert.tagName)) {
  customElements.define(CustomAlert.tagName, CustomAlert);
}

export {
  CustomAlert,
  CustomAlertBuilder,
};

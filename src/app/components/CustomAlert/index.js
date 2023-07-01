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

class CustomAlertBuilder {
  static #detail = null;

  static #title;

  static #message;

  static #type;

  static #size;

  static #cancelable = false;

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

  #type = "success";

  #size = "medium";

  #title = "";

  #message = "";

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get observedAttributes() {
    return ["type", "size", "title", "message"];
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
    }

    this._render();
  }

  connectedCallback() {
    this.shadowRoot.querySelector(CustomButton.tagName).addEventListener("click", this.removeAlert);
  }

  removeAlert() {
    const backdropAlert = document.body.childNodes[document.body.childNodes.length - 1];

    if (document.body.style.overflowY === "hidden") {
      document.body.style.overflowY = "auto";
    }
    if (CustomAlertBuilder.isShowing) backdropAlert.remove();
    CustomAlertBuilder.isShowing = false;
  }

  _render() {
    const isMobile = isOnMobileScreen();
    const xlargeSize = "82%";
    const largeSize = "72%";
    const mediumSize = "45%";
    const smallSize = "35%";

    if (this.#size === "big") {
      this.style.width = isMobile ? xlargeSize : largeSize;
    } else if (this.#size === "medium") {
      this.style.width = isMobile ? largeSize : mediumSize;
    } else {
      this.style.width = isMobile ? largeSize : smallSize;
    }

    this.style.marginTop = "20vh";
    this.style.height = "min-content";

    let icon = `<box-icon name='error-circle' color="#CF7070" size="2.5rem">
    </box-icon>`;

    if (this.#type === "success") {
      icon = `<box-icon name='check-circle' color="#70D270" size="2.5rem">
    </box-icon>`;
    } else if (this.#type === "info") {
      icon = `<box-icon name='info-circle' color="#B3B3B3" size="2.5rem">
    </box-icon>`;
    } else if (this.#type === "warning") {
      icon = `<box-icon name='error-circle' color="#F7D95B" size="2.5rem">
    </box-icon>`;
    }

    this.shadowRoot.innerHTML = `
      ${styles}
      <div class="alert-container">
        <p class="icon">${icon}</p>
        <p class="title">${this.#title}</p>
        <p class="message">${this.#message}</p>
        
        <div class="button">
          <${CustomButton.tagName}
            text="Oke"
            size="medium"
            bg-color="grey"
            color="var(--white-color)"
            title="Confirm"
            ></${CustomButton.tagName}>
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

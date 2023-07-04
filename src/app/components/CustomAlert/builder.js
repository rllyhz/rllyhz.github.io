import logger from "../../../utils/logger";
import Dom from "../../core/Dom";

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

  static isShowing = false;

  static alertContainerId = "alert-container-id";

  static #title;

  static #message;

  static #type;

  static #size;

  static #cancelable = false;

  static #confirmText = "Oke";

  static #cancelText = "Cancel";

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
      id: CustomAlertBuilder.alertContainerId,
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

    // remove or cancel handler
    alertContainer.addEventListener("click", (e) => {
      if (!CustomAlertBuilder.#cancelable) return;

      const clickedNodeName = e.target.parentNode.nodeName;

      if (clickedNodeName === "BODY") { // only container
        CustomAlertBuilder.remove();
      }
    });

    this.#detail = null;
  }

  static reset() {
    CustomAlertBuilder.#detail = null;
    CustomAlertBuilder.isShowing = false;
    Callbacks.confirm = null;
    Callbacks.cancel = null;
  }

  static remove() {
    CustomAlertBuilder.reset();

    if (document.body.style.overflowY === "hidden") {
      document.body.style.overflowY = "auto";
    }

    if (document.querySelector(`#${CustomAlertBuilder.alertContainerId}`)) {
      document.querySelector(`#${CustomAlertBuilder.alertContainerId}`).remove();
    }
  }
}

export {
  CustomAlertBuilder,
  Callbacks,
};

import CheckText from "../CheckText";
import InputFile from "../InputFile";
import template from "./template";

export default class ImportFilesFormUI extends HTMLElement {
  static tagName = "import-files-form-ui";

  static get observedAttributes() {
    return [
      "upload-label", "upload-preview", "upload-name", "accept-files",
      "check-label", "check-name",
    ];
  }

  attributeChangedCallback(name, _, newValue) {
    switch (name) {
      case "upload-label":
        this.shadowRoot
          .querySelector(InputFile.tagName).setAttribute("label", newValue);
        break;
      case "upload-preview":
        this.shadowRoot
          .querySelector(InputFile.tagName).setAttribute("preview-label", newValue);
        break;
      case "upload-name":
        this.shadowRoot
          .querySelector(InputFile.tagName).setAttribute("name", newValue);
        break;
      case "accept-files":
        this.shadowRoot
          .querySelector(InputFile.tagName).setAttribute("accept-files", newValue);
        break;
      case "check-label":
        this.shadowRoot
          .querySelector(CheckText.tagName).setAttribute("label", newValue);
        break;
      case "check-name":
        this.shadowRoot
          .querySelector(CheckText.tagName).setAttribute("name", newValue);
        break;
      default:
        break;
    }
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = template;
  }

  get files() {
    return this.shadowRoot.querySelector(InputFile.tagName).files;
  }

  get shouldReplace() {
    return this.shadowRoot.querySelector(CheckText.tagName).checked;
  }
}

if (!customElements.get(ImportFilesFormUI.tagName)) {
  customElements.define(ImportFilesFormUI.tagName, ImportFilesFormUI);
}

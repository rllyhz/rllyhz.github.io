import template from "./template";

export default class InputFile extends HTMLElement {
  static tagName = "input-file";

  #filesChangedCallback = null;

  #uploadedPreviewLabelColor = "var(--dark-color)";

  #previewLabelColor = "var(--dark-color)";

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = template;
  }

  static get observedAttributes() {
    return [
      "name", "accept-files", "multiple",
      "label", "preview-label", "button-text",
      "label-color", "preview-label-color", "preview-label-uploaded-color",
    ];
  }

  attributeChangedCallback(name, _, newValue) {
    switch (name) {
      case "label":
        this.shadowRoot.querySelector(".preview p").innerText = newValue;
        this.shadowRoot.querySelector("input").setAttribute("placeholder", newValue);
        break;
      case "label-color":
        if (!newValue) return;
        this.shadowRoot.querySelector(".preview p").style.color = newValue;
        break;
      case "preview-label":
        this.shadowRoot
          .querySelector(".preview span .preview-label").innerText = newValue;
        break;
      case "preview-label-color":
        if (!newValue) return;
        this.#previewLabelColor = newValue;
        this.shadowRoot
          .querySelector(".preview span").style.color = newValue;
        break;
      case "preview-label-uploaded-color":
        if (!newValue) return;
        this.#uploadedPreviewLabelColor = newValue;
        break;
      case "button-text":
        this.shadowRoot.querySelector("button").innerText = newValue;
        break;
      case "name":
        this.shadowRoot.querySelector("input").setAttribute("name", newValue);
        break;
      case "accept-files":
        if (newValue) {
          this.shadowRoot.querySelector("input").setAttribute("accept", newValue);
        } else {
          this.shadowRoot.querySelector("input").removeAttribute("accept");
        }
        break;
      case "multiple":
        if (newValue === null) {
          this.shadowRoot.querySelector("input").removeAttribute("multiple");
        } else {
          this.shadowRoot.querySelector("input").setAttribute("multiple", newValue);
        }
        break;
      default:
        break;
    }
  }

  setFilesChangedListener(callback) {
    this.#filesChangedCallback = callback;
  }

  connectedCallback() {
    this.shadowRoot.querySelector("input").addEventListener("change", () => {
      const { files } = this.shadowRoot.querySelector("input");
      if (files.length > 0) {
        this.shadowRoot
          .querySelector(".preview span").style.color = this.#uploadedPreviewLabelColor;
        this.shadowRoot.querySelector(".preview span .preview-label")
          .innerText = files.length > 1 ? `${files.length} files` : files[0].name;
      } else {
        this.shadowRoot
          .querySelector(".preview span").style.color = this.#previewLabelColor;
      }

      if (this.#filesChangedCallback && typeof this.#filesChangedCallback === "function") {
        this.#filesChangedCallback(files);
      }
    });

    this.shadowRoot.querySelector("button").addEventListener("click", () => {
      this.shadowRoot.querySelector("input").click();
    });
  }

  disconnectedCallback() {
    this.shadowRoot.querySelector("input").removeEventListener("change");
    this.shadowRoot.querySelector("button").removeEventListener("click");
  }

  get files() {
    return this.shadowRoot.querySelector("input").files;
  }

  set files(newFiles = []) {
    this.shadowRoot.querySelector("input").files = newFiles;
  }
}

if (!customElements.get(InputFile.tagName)) {
  customElements.define(InputFile.tagName, InputFile);
}

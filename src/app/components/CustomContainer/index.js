export default class CustomContainer extends HTMLElement {
  static tagName = "custom-container";

  #styles = {
    display: "flex",
    justifyContent: "stretch",
    alignItems: "stretch",
    padding: "0",
    margin: "0",
  };

  #isNode = false;

  #content = "";

  #align = "";

  static get observedAttributes() {
    return ["align"];
  }

  attributeChangedCallback(name, _, newValue) {
    if (name === "align") {
      this.#align = newValue;
    }

    this._render();
  }

  set contentNode(node) {
    this._render(true, node);
  }

  set contentHTML(contentHTML) {
    this._render(false, contentHTML);
  }

  _render(isNode = false, content = "") {
    this.style.display = this.#styles.display;
    this.style.justifyContent = this.#styles.justifyContent;
    this.style.alignItems = this.#styles.alignItems;
    this.style.margin = this.#styles.margin;
    this.style.padding = this.#styles.padding;

    this.innerHTML = "";

    if (isNode) {
      this.appendChild(content);
    } else {
      this.innerHTML = content;
    }
  }
}

if (!customElements.get(CustomContainer.tagName)) {
  customElements.define(CustomContainer.tagName, CustomContainer);
}

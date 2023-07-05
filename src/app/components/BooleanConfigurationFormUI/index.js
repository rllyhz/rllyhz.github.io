import { camelCaseToCapitalize } from "../../../utils/general-helpers";
import Dom from "../../core/Dom";
import ToggleCheck from "../ToggleCheck";
import template from "./template";

export default class BooleanConfigurationFormUI extends HTMLElement {
  static tagName = "bool-config-form-ui";

  #values = [];

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = template;
  }

  setConfigurationData(configData = []) {
    configData.forEach((config) => {
      this.#values.push(config.value);

      this.shadowRoot.querySelector(".container").appendChild(
        Dom.createElement({
          tagName: ToggleCheck.tagName,
          props: {
            name: camelCaseToCapitalize(config.key),
            checked: config.value,
          },
          styles: {
            margin: ".25rem 0",
            padding: ".25rem 0",
          },
        }),
      );
    });

    this.shadowRoot.querySelectorAll(`.container ${ToggleCheck.tagName}`).forEach((toggleCheckElem) => {
      toggleCheckElem.addEventListener("click", () => { toggleCheckElem.toggle(); });
    });
  }

  resolveUpdatedCheckedValues() {
    let isUpdated = false;
    const newValues = [];

    this.shadowRoot.querySelectorAll(`.container ${ToggleCheck.tagName}`).forEach((elem, index) => {
      if (this.#values[index] !== elem.checked) {
        isUpdated = true;
      }
      newValues.push(elem.checked);
    });

    return isUpdated ? newValues : null;
  }
}

if (!customElements.get(BooleanConfigurationFormUI.tagName)) {
  customElements.define(BooleanConfigurationFormUI.tagName, BooleanConfigurationFormUI);
}

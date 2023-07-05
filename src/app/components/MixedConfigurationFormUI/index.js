import template from "./template";

export default class MixedConfigurationFormUI extends HTMLElement {
  static tagName = "mixed-config-form-ui";

  #values = {};

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = template;
  }

  connectedCallback() {
    this.shadowRoot.querySelector("#pinned-projects").value = this.#values.pinnedProjectsOrder.join(",");
    this.shadowRoot.querySelector("#token-expires").value = this.#values.tokenExpiresInHours;

    this.shadowRoot.querySelector("#pinned-projects").addEventListener("keyup", (e) => {
      const latestValue = this.shadowRoot.querySelector("#pinned-projects").value;
      const key = e.keyCode || e.which;

      // "Shift+", "Ctrl+" and "Alt+"
      if (e.shiftKey || e.altKey || e.ctrlKey) {
        this.shadowRoot.querySelector("#pinned-projects").value = latestValue.slice(0, latestValue.length - 1);
        return;
      }

      // 8 => "Backspace"
      if (key === 8) return;

      // Double ",,"
      if (latestValue.length > 1 && latestValue.slice(-2) === ",,") {
        this.shadowRoot.querySelector("#pinned-projects").value = latestValue.slice(0, latestValue.length - 1);
        return;
      }

      // 32 => " "
      if (key === 32) {
        this.shadowRoot.querySelector("#pinned-projects").value = latestValue.slice(0, latestValue.length - 1);
        return;
      }

      // Only "Shift", "Ctrl", Arrows, etc
      if (key >= 16 && key <= 40) return;

      // 188 => ","
      if (latestValue.length > 1 && key === 188) return;

      // and other than number chars
      if (Number.isNaN(Number(e.key))) {
        this.shadowRoot.querySelector("#pinned-projects").value = latestValue.slice(0, latestValue.length - 1);
      }
    });
  }

  setMixedConfigurationData(newConfigData = {}) {
    Object.keys(newConfigData).forEach((key) => {
      this.#values[key] = newConfigData[key];
    });
  }

  resolveUpdatedMixedValues() {
    let isUpdated = false;
    const newValues = {
      pinnedProjectsOrder: [],
      tokenExpiresInHours: 0,
    };

    // check if updated
    const newPinnedProjects = this.shadowRoot.querySelector("#pinned-projects").value;
    const newTokenExpires = this.shadowRoot.querySelector("#token-expires").value;

    if (newPinnedProjects !== this.#values.pinnedProjectsOrder.join(",")) {
      isUpdated = true;
    } else if (Number(newTokenExpires) !== this.#values.tokenExpiresInHours) {
      isUpdated = true;
    }

    // validate
    if (Number(newTokenExpires) === 0) {
      isUpdated = false;
    } else if (newPinnedProjects[newPinnedProjects.length - 1] === ",") {
      isUpdated = false;
    }

    newValues.tokenExpiresInHours = Number(newTokenExpires);
    newValues.pinnedProjectsOrder = newPinnedProjects
      .replace(" ", "")
      .split(",")
      .map((order) => Number(order));

    return isUpdated ? newValues : null;
  }
}

if (!customElements.get(MixedConfigurationFormUI.tagName)) {
  customElements.define(MixedConfigurationFormUI.tagName, MixedConfigurationFormUI);
}

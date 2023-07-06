import { EventType, broadcastEvent } from "../../../utils/ui/event-helpers";
import { isOnMobileScreen } from "../../../utils/ui/viewport-helpers";
import logger from "../../../utils/logger";
import Dom from "../../core/Dom";
import { Strings } from "../../../globals/consts";
import template from "./template";

export default class HeaderApp extends HTMLElement {
  static tagName = "header-app";

  #originalMenusHTML = null;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = template(
      Strings.App.Author,
      Strings.Menus.Home,
      Strings.Menus.About,
      Strings.Menus.Skills,
      Strings.Menus.Work,
      Strings.Menus.Contact,
    );

    this.#originalMenusHTML = this.shadowRoot.querySelector(".nav-list").innerHTML;
  }

  static get observedAttributes() {
    return ["data-open", "data-active-path"];
  }

  attributeChangedCallback(name) {
    if (name === "data-open") {
      this.shadowRoot.querySelector(".nav-list-container")
        .classList.toggle("show");
    }
  }

  connectedCallback() {
    this.shadowRoot.getElementById("nav-toggle").addEventListener(
      "click",
      this.toggleMenu,
    );
    this.setClickListenerToAllMenus();
  }

  disConnectedCallback() {
    this.shadowRoot.getElementById("nav-toggle").removeEventListener(
      "click",
      this.toggleMenu,
    );
    this.removeClickListenerFromAllMenus();
  }

  setClickListenerToAllMenus() {
    this.shadowRoot.querySelectorAll(".nav-list .nav-item[data-scroll='true']").forEach((navItem) => {
      navItem.addEventListener("click", () => {
        const { target } = navItem.children[0].dataset;
        const targetElem = Dom.getRootPage()
          .querySelector(Dom.containerAppTagName).shadowRoot.querySelector(target);

        if (targetElem) {
          targetElem.style.scrollMargin = "100px";
          targetElem.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        } else {
          logger.error(`Failed to scroll to the element with target ${target}`);
        }

        // toggle menu on mobile screen
        if (isOnMobileScreen()) {
          this.shadowRoot.getElementById("nav-toggle").click();
        }
        // update active menu
        this.updateActiveMenu(target);
      });
    });
  }

  removeClickListenerFromAllMenus() {
    this.shadowRoot.querySelectorAll(".nav-list .nav-item[data-scroll='true']").forEach((navItem) => {
      navItem.removeEventListener("click", null);
    });
  }

  toggleMenu = () => {
    const isOpen = this.getAttribute("data-open");
    if (isOpen !== null && isOpen !== "false") {
      this.removeAttribute("data-open");
      broadcastEvent(this, EventType.drawerMode, { isOpen: false });
    } else {
      this.setAttribute("data-open", "");
      broadcastEvent(this, EventType.drawerMode, { isOpen: true });
    }
  };

  updateActiveMenu(target) {
    const targetElem = this.shadowRoot.querySelector(`.nav-list .nav-item .nav-link[data-target="${target}"]`);
    if (targetElem) {
      this.shadowRoot.querySelectorAll(".nav-list .nav-item").forEach((navItem) => {
        navItem.classList.remove("active");
      });
      targetElem.parentElement.classList.add("active");
    } else {
      logger.error(`Failed to set the active status on menu target ${target}`);
    }
  }

  appendMenu(node, clickListener = null) {
    if (!node || !node.addEventListener) {
      logger.error(`Could not append menu to the ${HeaderApp.tagName}`);
      return;
    }

    this.shadowRoot.querySelector(".nav-list").appendChild(node);

    if (clickListener && typeof clickListener === "function") {
      node.addEventListener("click", () => clickListener());
    }
  }

  replaceMenusByInnerHTML(html = "") {
    this.removeClickListenerFromAllMenus();
    this.clearMenus();
    this.shadowRoot.querySelector(".nav-list").innerHTML = html;
  }

  replaceMenusByNodes(menuNodes = []) {
    this.removeClickListenerFromAllMenus();
    this.clearMenus();

    menuNodes.forEach((node) => {
      this.shadowRoot.querySelector(".nav-list").appendChild(node);
    });
  }

  clearMenus() {
    this.shadowRoot.querySelector(".nav-list").innerHTML = "";
  }

  resetMenus() {
    this.shadowRoot.querySelector(".nav-list").innerHTML = this.#originalMenusHTML;
    this.setClickListenerToAllMenus();
  }
}

if (!customElements.get(HeaderApp.tagName)) {
  customElements.define(HeaderApp.tagName, HeaderApp);
}

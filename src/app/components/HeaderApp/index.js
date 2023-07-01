import styles from "./styles";
import { EventType, broadcastEvent } from "../../../utils/ui/event-helpers";
import { isOnMobileScreen } from "../../../utils/ui/viewport-helpers";
import logger from "../../../utils/logger";
import { toPath } from "../../../utils/route-helper";
import Dom from "../../core/Dom";
import { Strings } from "../../../globals/consts";

export default class HeaderApp extends HTMLElement {
  static tagName = "header-app";

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._render();
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

  disConnectedCallback() {
    this.shadowRoot.getElementById("nav-toggle").removeEventListener(
      "click",
      this.toggleMenu,
    );
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

  _render() {
    this.shadowRoot.innerHTML = `
      ${styles}
      <header>
        <nav>
          <a href="${toPath("/")}" class="nav-logo">
            ${Strings.App.Author}
          </a>
          <div class="nav-list-container">
            <ul class="nav-list">
              <li class="nav-item active" data-scroll="true">
                <a class="nav-link" data-target="#home">
                  ${Strings.Menus.Home}
                </a>
              </li>
              <li class="nav-item" data-scroll="true">
                <a class="nav-link" data-target="#about">
                  ${Strings.Menus.About}
                </a>
              </li>
              <li class="nav-item" data-scroll="true">
                <a class="nav-link" data-target="#skills">
                  ${Strings.Menus.Skills}
                </a>
              </li>
              <li class="nav-item" data-scroll="true">
                <a class="nav-link" data-target="#work"">
                  ${Strings.Menus.Work}
                </a>
              </li>
              <li class="nav-item" data-scroll="true">
                <a class="nav-link" data-target="#contact">
                ${Strings.Menus.Contact}
                </a>
              </li>
            </ul>
          </div>
          <div class="nav-toggle" id="nav-toggle">
            <box-icon name='menu-alt-right' color="var(--primary-color)"></box-icon>
          </div>
        </nav>
      </header>
    `;
  }
}

if (!customElements.get(HeaderApp.tagName)) {
  customElements.define(HeaderApp.tagName, HeaderApp);
}

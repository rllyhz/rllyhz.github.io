import { getCssVariableValue } from "../../core/Style";
import styles from "./styles";
import { EventType, broadcastEvent } from "../../../utils/ui/event-helpers";
import { toPath } from "../../../utils/route-helper";

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
        const target = navItem.children[0].dataset.path;
        if (document.querySelector(target)) {
          document.querySelector(target).scrollIntoView({
            behavior: "smooth",
          });
        }
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

  _render() {
    const firstColor = getCssVariableValue("--first-color");

    this.shadowRoot.innerHTML = `
      ${styles}
      <header>
        <nav>
          <a href="${toPath("/")}" class="nav-logo">Rully Ihza Mahendra</a>
          <div class="nav-list-container">
            <ul class="nav-list">
              <li class="nav-item active" data-scroll="true">
                <a class="nav-link" data-path="#home">Home</a>
              </li>
              <li class="nav-item" data-scroll="true">
                <a class="nav-link" data-path="#about">About</a>
              </li>
              <li class="nav-item" data-scroll="true">
                <a class="nav-link" data-path="#skills">Skills</a>
              </li>
              <li class="nav-item" data-scroll="true">
                <a class="nav-link" data-path="#work"">Work</a>
              </li>
              <li class="nav-item" data-scroll="true">
                <a class="nav-link" data-path="#contact">Contact</a>
              </li>
            </ul>
          </div>
          <div class="nav-toggle" id="nav-toggle">
            <box-icon name='menu-alt-right' color="${firstColor}"></box-icon>
          </div>
        </nav>
      </header>
    `;
  }
}

customElements.define(HeaderApp.tagName, HeaderApp);

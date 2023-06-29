import { toPublicPath } from "../../../utils/route-helper";
import styles from "./styles";
import TitleApp from "../TitleApp";
import { isOnMobileScreen } from "../../../utils/ui/viewport-helpers";

export default class SkillsUI extends HTMLElement {
  static tagName = "skills-ui";

  #skillsData = [
    {
      icon: "<box-icon color='var(--primary-color)' name='mobile'></box-icon>",
      name: "Android Dev (Kotlin)",
    },
    {
      icon: "<box-icon color='var(--primary-color)' name='devices'></box-icon>",
      name: "Multi-Platform App Dev (Flutter)",
    },
    {
      icon: "<box-icon color='var(--primary-color)' name='laptop'></box-icon>",
      name: "Web Dev (HTML, CSS3, JS)",
    },
    {
      icon: "<box-icon color='var(--primary-color)' name='react' type='logo' ></box-icon>",
      name: "ReactJs (TypeScript)",
    },
    {
      icon: "<box-icon color='var(--primary-color)' name='paint'></box-icon>",
      name: "UI Design (Figma)",
    },
  ];

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._render();
  }

  _render() {
    const align = isOnMobileScreen() ? "center" : "start";

    this.shadowRoot.innerHTML = `
      ${styles}
      <${TitleApp.tagName} variant="h3" align="${align}" text="Professional Skills" size="medium"></${TitleApp.tagName}>
      <div class="container-skills">
        <div class="skills-detail">
          <p class="skills-description">I am working with some of programming skills and all of my projects I've ever done built on top of them. Such as:</p>
          ${this.#skillsData.map((skill) => (`
            <div class="skills-data">
              <div class="skills-data-description">
                ${skill.icon}
                <span class="skills-data-name">${skill.name}</span>
              </div>
              <div class="skills-data-bar"></div>
            </div>
          `)).join("")}
        </div>
        <div class="skills-illustration">
          <img src="${toPublicPath("/images/landing/skills.jpg")}" />
        </div>
      </div>
    `;
  }
}

if (!customElements.get(SkillsUI.tagName)) {
  customElements.define(SkillsUI.tagName, SkillsUI);
}

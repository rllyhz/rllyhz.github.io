import TitleText from "../TitleText";
import { isOnMobileScreen } from "../../../utils/ui/viewport-helpers";
import template from "./template";

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
    const shadow = this.attachShadow({ mode: "closed" });

    const align = isOnMobileScreen() ? TitleText.ALIGN.CENTER : TitleText.ALIGN.START;

    shadow.innerHTML = template(
      this.#skillsData,
      align,
    );
  }
}

if (!customElements.get(SkillsUI.tagName)) {
  customElements.define(SkillsUI.tagName, SkillsUI);
}

import TitleText from "../TitleText";
import { toPublicPath } from "../../../utils/route-helper";
import styles from "./styles";

const template = (skillsData, align) => /* html */`
  ${styles}

  <${TitleText.tagName}
    variant="${TitleText.VARIANT.H3}"
    align="${align}"
    text="Professional Skills"
    size="${TitleText.SIZE.MEDIUM}">
  </${TitleText.tagName}>

  <div class="container-skills">
    <div class="skills-detail">
      <p class="skills-description">I am working with some of programming skills and all of my projects I've ever done built on top of them. Such as:</p>
      ${skillsData.map((skill) => /* html */`
        <div class="skills-data">
          <div class="skills-data-description">
            ${skill.icon}
            <span class="skills-data-name">${skill.name}</span>
          </div>
          <div class="skills-data-bar"></div>
        </div>
      `).join("")}
    </div>
    <div class="skills-illustration">
      <img src="${toPublicPath("/images/landing/skills.jpg")}" />
    </div>
  </div>
`;

export default template;

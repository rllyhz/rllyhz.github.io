import styles from "./styles";
import { toPath } from "../../../utils/route-helper";

const template = (
  appBrandName,
  menuHomeText,
  menuAboutText,
  menuSkillsText,
  menuWorkText,
  menuContactText,
) => /* html */`
  ${styles}
  <header>
    <nav>
      <a href="${toPath("/")}" class="nav-logo">
        ${appBrandName}
      </a>
      <div class="nav-list-container">
        <ul class="nav-list">
          <li class="nav-item active" data-scroll="true">
            <a class="nav-link" data-target="#home">
              ${menuHomeText}
            </a>
          </li>
          <li class="nav-item" data-scroll="true">
            <a class="nav-link" data-target="#about">
              ${menuAboutText}
            </a>
          </li>
          <li class="nav-item" data-scroll="true">
            <a class="nav-link" data-target="#skills">
              ${menuSkillsText}
            </a>
          </li>
          <li class="nav-item" data-scroll="true">
            <a class="nav-link" data-target="#work"">
              ${menuWorkText}
            </a>
          </li>
          <li class="nav-item" data-scroll="true">
            <a class="nav-link" data-target="#contact">
            ${menuContactText}
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

export default template;

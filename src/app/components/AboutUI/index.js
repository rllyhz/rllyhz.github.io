import { Links } from "../../../globals/consts";
import { toPublicPath } from "../../../utils/route-helper";
import TitleApp from "../TitleApp";
import styles from "./styles";

export default class AboutUI extends HTMLElement {
  static tagName = "about-ui";

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._render();
  }

  _render() {
    this.shadowRoot.innerHTML = `
      ${styles}
      <div class="about-container">
        <div class="image">
          <img src="${toPublicPath("/images/landing/about.png")}" loading="lazy" alt="About Picture" />
        </div>
        <div class="about">
          <${TitleApp.tagName} variant="h3" text="Rully Ihza Mahendra" size="medium"></${TitleApp.tagName}>
          <p>I am a <a href="${Links.googleCertified}">Google Certified Associate Android Developer</a>, based in Semarang, Indonesia. And also one of 3000 selected Mobile Programming students at <a href="${Links.bangkit}">Bangkit Academy 2021 led by Google, Tokopedia, Gojek & Traveloka</a> graduated with distinction status. I really love programming, especially in Android Dev. And I mainly and mostly work with Kotlin and Flutter. However, I'm crazy with web tech as well, just for my hobbies.</p>
        </div>
      </div>
    `;
  }
}

if (!customElements.get(AboutUI.tagName)) {
  customElements.define(AboutUI.tagName, AboutUI);
}

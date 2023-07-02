import styles from "./styles";
import { toPublicPath } from "../../../utils/route-helper";
import TitleText from "../TitleText";
import { Links } from "../../../globals/consts";

const template = /* html */`
  ${styles}
  <div class="about-container">
    <div class="image">
      <img src="${toPublicPath("/images/landing/about.png")}"
        loading="lazy" alt="About Picture" />
    </div>
    <div class="about">
      <${TitleText.tagName}
        variant="${TitleText.VARIANT.H3}"
        text="Rully Ihza Mahendra"
        size="${TitleText.SIZE.MEDIUM}">
      </${TitleText.tagName}>

      <p>I am a <a href="${Links.googleCertified}">Google Certified Associate Android Developer</a>, based in Semarang, Indonesia. And also one of 3000 selected Mobile Programming students at <a href="${Links.bangkit}">Bangkit Academy 2021 led by Google, Tokopedia, Gojek & Traveloka</a> graduated with distinction status. I really love programming, especially in Android Dev. And I mainly and mostly work with Kotlin and Flutter. However, I'm crazy with web tech as well, just for my hobbies.</p>
    </div>
  </div>
`;

export default template;

import { toPublicPath } from "../../../utils/route-helper";
import LazyImage from "../LazyImage";
import styles from "./styles";

const template = /* html */`
  ${styles}
  <div class="project-container">
    <p class="author-updatedAt">
      rllyhz - <span>updatedAt</span>
    </p>
    <a class="title" target="_blank" href="">
      <h1>Project title</h1>
    </a>
    <p class="type">
      Type: <span>library</span>
    </p>
    <p class="languages">
      Languages: <span>kotlin, xml, and gradle</span>
      <span class="tooltip-ui">kotlin, xml, and gradle</span>
    </p>
    <p class="description">
      Description project goes here..
    </p>

    <div class="technologies-container">
      <h2>Stack</h2>

      <ul class="technologies-list">
        <!-- <li>Android</li>
        <li>MVVM</li>
        <li>Coroutines</li> -->
      </ul>
    </div>
  </div>
  <a href="" target="_blank">
    <${LazyImage.tagName}
      radius="8px"
      src-error="${toPublicPath("images/placeholders/work-photo-placeholder.png")}"
      ratio="3/2">
    </${LazyImage.tagName}>
  </a>
`;

export default template;

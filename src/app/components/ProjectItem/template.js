import styles from "./styles";
import LazyImage from "../LazyImage";
import { toPublicPath } from "../../../utils/route-helper";

const template = (headingVariant, title, imagePath, url) => /* html */`
  ${styles}
  <a class="project-container" href="${url}">
    <${LazyImage.tagName}
      src="${imagePath}"
      src-error="${toPublicPath("images/placeholders/work-photo-placeholder.png")}"
      alt="${title}">
    </${LazyImage.tagName}>
    <${headingVariant} class="title">${title}</${headingVariant}>
  </a>
`;

export default template;

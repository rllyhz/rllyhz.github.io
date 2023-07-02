import ProjectItem from "../ProjectItem";
import styles from "./styles";

const template = (projects, headingVariant) => /* html */`
  ${styles}
  <div class="project-list-container">
    ${projects.map((project) => (`
      <${ProjectItem.tagName}
        title="${project.title}"
        url="${project.url}"
        imagePath="${project.imagePath}"
        heading="${headingVariant}">
      </${ProjectItem.tagName}>
    `)).join(" ")}
  </div>
`;

export default template;

import styles from "./styles";

const template = (headingVariant, title, imagePath, url) => /* html */`
  ${styles}
  <a class="project-container" href="${url}">
    <div class="loading-preview">
      <img src="${imagePath}" alt="${title}" loading="lazy" />
    </div>
    <${headingVariant} class="title">${title}</${headingVariant}>
  </a>
`;

export default template;

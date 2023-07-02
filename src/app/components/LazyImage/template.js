import styles from "./styles";

const template = (src, alt, errorMessage) => /* html */`
  ${styles}
  <span>${errorMessage}</span>
  <div class="loading-preview">
    <img src="${src}" alt="${alt}" loading="lazy" />
  </div>
`;

export default template;

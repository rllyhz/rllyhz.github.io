import styles from "./styles";

const template = (title, message, buttonTag, buttonText, buttonSize) => /* html */`
  ${styles}
  <div class="not-found-container">
    <h1>${title}</h1>
    <p>${message}</p>

    <${buttonTag}
      text="${buttonText}"
      size="${buttonSize}"
      title=""
      bg-color="var(--primary-color)">
    </${buttonTag}>
  </div>
`;

export default template;

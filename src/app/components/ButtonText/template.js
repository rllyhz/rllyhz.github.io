import styles from "./styles";

const template = (
  tag,
  text,
  isLink,
  linkHref,
  type,
  size,
  color,
  bgColor,
) => /* html */`
  ${styles}

  <${tag}
    ${isLink ? `href="${linkHref}"` : `type="${type}"`}
    class="${size}"
    style="color: ${color}; background-color: ${bgColor};"
    >
      ${text}
  </${tag}>
`;

export default template;

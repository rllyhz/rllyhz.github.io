import styles from "./styles";

const template = (name, checked = false, toggleButtonText = "Toggle") => /* html */`
  ${styles}
  <input type="check" placeholder="${name}" />
  <p>${name}</p>
  <span>${checked ? "Yes" : "No"}</span>
  <button type="button">${toggleButtonText}</button>
`;

export default template;

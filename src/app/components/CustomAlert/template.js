import styles from "./styles";

const template = (title, message, icon, buttons) => /* html */`
  ${styles}
  <div class="alert-container">
    <p class="icon">${icon}</p>
    <p class="title">${title}</p>
    <p class="message">${message}</p>

    <div class=button-container>
      ${buttons}
    </div>
  </div>
`;

export default template;

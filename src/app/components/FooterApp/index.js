import styles from "./styles";
import { Social } from "../../../globals/consts";

export default class FooterApp extends HTMLElement {
  static tagName = "footer-app";

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._render();
  }

  _render() {
    const yearNow = new Date().getFullYear();

    this.shadowRoot.innerHTML = `
      ${styles}
      <footer>
        <p class="appreciation">Thank you</p>
        <p class="connect-with-me">Get connection with me</p>
        <div class="social">
          <a href="${Social.facebook}" target="_blank">
            <box-icon type='logo' name='facebook' color="white"></box-icon>
          </a>
          <a href="${Social.instagram}" target="_blank">
            <box-icon type='logo' name='instagram' color="white"></box-icon>
          </a>
          <a href="${Social.twitter}" target="_blank">
            <box-icon type='logo' name='twitter' color="white"></box-icon>
          </a>
        </div>
        <p class="built-by-me">Built with <box-icon type='solid' name='heart' color="white" size="16px"></box-icon> by Rully Ihza Mahendra</p>
        <p class="copyright">© ${yearNow} copyright all right reserved</p>
      </footer>
    `;
  }
}

customElements.define(FooterApp.tagName, FooterApp);

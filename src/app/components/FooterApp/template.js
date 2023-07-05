import styles from "./styles";
import { Social, Strings } from "../../../globals/consts";

const template = /* html */`
  ${styles}
  <footer>
    <p class="appreciation">${Strings.ThankYou}</p>
    <p class="connect-with-me">${Strings.GetConnectionWithMe}</p>
    <div class="social">
      <a href="${Social.facebook}" target="_blank" title="facebook">
        <box-icon type='logo' name='facebook' color="var(--white-color)"></box-icon>
      </a>
      <a href="${Social.instagram}" target="_blank" title="instagram">
        <box-icon type='logo' name='instagram' color="var(--white-color)"></box-icon>
      </a>
      <a href="${Social.twitter}" target="_blank" title="twitter">
        <box-icon type='logo' name='twitter' color="var(--white-color)"></box-icon>
      </a>
    </div>
    <p class="built-by-me">
      ${Strings.BuiltCopyright("<box-icon type='solid' name='heart' color='var(--white-color)' size='16px'></box-icon>")}
    </p>
    <p class="copyright">
      ${Strings.Copyright(new Date().getFullYear())}
    </p>
  </footer>
`;

export default template;

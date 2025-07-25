import styles from "./styles";
import { Social, Strings } from "../../../globals/consts";
import ButtonText from "../ButtonText";
import { toPublicPath } from "../../../utils/route-helper";

const template = /* html */`
  ${styles}

  <h1>Hello, <br/>I am <span class='heading-color'>Rully</span> <br/>Android Dev</h1>

  <${ButtonText.tagName}
    text="${Strings.Buttons.ContactMe}"
    is-link
    href="mailto:${Social.email}"
    size="${ButtonText.SIZE.BIG}"
    ></${ButtonText.tagName}>

  <div class="social-connection">
    <a href="${Social.linkedIn}" target="_blank" title="linkedin">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"><circle cx="4.983" cy="5.009" r="2.188"></circle><path d="M9.237 8.855v12.139h3.769v-6.003c0-1.584.298-3.118 2.262-3.118 1.937 0 1.961 1.811 1.961 3.218v5.904H21v-6.657c0-3.27-.704-5.783-4.526-5.783-1.835 0-3.065 1.007-3.568 1.96h-.051v-1.66H9.237zm-6.142 0H6.87v12.139H3.095z"></path></svg>
    </a>
    <a href="${Social.github}" target="_blank" title="github">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 0);transform: ;msFilter:;"><path fill-rule="evenodd" clip-rule="evenodd" d="M12.026 2c-5.509 0-9.974 4.465-9.974 9.974 0 4.406 2.857 8.145 6.821 9.465.499.09.679-.217.679-.481 0-.237-.008-.865-.011-1.696-2.775.602-3.361-1.338-3.361-1.338-.452-1.152-1.107-1.459-1.107-1.459-.905-.619.069-.605.069-.605 1.002.07 1.527 1.028 1.527 1.028.89 1.524 2.336 1.084 2.902.829.091-.645.351-1.085.635-1.334-2.214-.251-4.542-1.107-4.542-4.93 0-1.087.389-1.979 1.024-2.675-.101-.253-.446-1.268.099-2.64 0 0 .837-.269 2.742 1.021a9.582 9.582 0 0 1 2.496-.336 9.554 9.554 0 0 1 2.496.336c1.906-1.291 2.742-1.021 2.742-1.021.545 1.372.203 2.387.099 2.64.64.696 1.024 1.587 1.024 2.675 0 3.833-2.33 4.675-4.552 4.922.355.308.675.916.675 1.846 0 1.334-.012 2.41-.012 2.737 0 .267.178.577.687.479C19.146 20.115 22 16.379 22 11.974 22 6.465 17.535 2 12.026 2z"></path></svg>
    </a>
    <a href="${Social.playStore}" target="_blank" title="playstore">
      <svg width="24px" height="24px" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" stroke-width="4" stroke="#000000" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"><path d="M12.36,53.33V10.67a1,1,0,0,1,1.56-.91L51.11,31a1,1,0,0,1,0,1.81L13.93,54.24A1.05,1.05,0,0,1,12.36,53.33Z"/><line x1="12.36" y1="10.67" x2="42.07" y2="38.02"/><line x1="12.36" y1="53.33" x2="41.24" y2="25.35"/></svg>
    </a>
    <a href="${Social.stackOverflow}" target="_blank" title="stack-overflow">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"><path d="M17.24 19.399v-4.804h1.6V21H4.381v-6.405h1.598v4.804H17.24zM7.582 17.8h8.055v-1.604H7.582V17.8zm.195-3.64 7.859 1.641.34-1.552-7.861-1.642-.338 1.553zm1.018-3.794 7.281 3.398.678-1.463-7.281-3.399-.678 1.454v.01zm2.037-3.589 6.166 5.142 1.018-1.216-6.162-5.14-1.016 1.213-.006.001zm3.982-3.778-1.311.969 4.803 6.454 1.313-.971-4.807-6.452h.002z"></path></svg>
    </a>
  </div>

  <img 
    loading="lazy"
    src="${toPublicPath("/images/landing/profile.png")}"
    class="profile"
    alt="Profile Picture" />
`;

export default template;

import { css } from "../../core/Style";
import InputFile from "../InputFile";

const styles = /* css */`
  :host {
    display: block;
    padding: .85rem;
    background-color: var(--loading-color);
    border-radius: 8px;
  }
  :host > * {
    width: 100%;
  }

  :host > ${InputFile.tagName} {
    margin-bottom: .35rem;
  }

  @media only screen and (min-width: 620px) {
    :host > * {
      width: 70%;
    }
  }
  @media only screen and (min-width: 820px) {
    :host > * {
      width: 600px;
    }
  }
`;

export default css(styles);

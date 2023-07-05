import { css } from "../../core/Style";

const styles = /* css */`
  :host {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    font-size: .8rem;
  }
  :host p {
    font-size: inherit;
  }
  :host input {
    cursor: pointer;
  }
`;

export default css(styles);

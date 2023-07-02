import { css } from "../../core/Style";

const styles = /* css */`
  input,textarea {
    box-sizing: border-box;
    display: block;
    width: 100%;
    margin: 0;
    padding: 1rem;
    border: 1.5px solid var(--dark-2-color);
    border-radius: 8px;
    outline: none;
    font-family: var(--body-font);
    font-size: var(--normal-font-size);
    color: var(--dark-color);
  }
`;

export default css(styles);

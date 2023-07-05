import { css } from "../../core/Style";

const styles = /* css */`
  :host input { display: none; }
  :host {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    font-size: .85rem;
  }
  :host .preview p,
  :host .preview span:not(.preview-label) {
    display: block;
    margin: 0;
  }
  :host .preview p {
    font-size: .85rem;
    color: var(--dark-color);
  }
  :host .preview span {
    font-size: .75rem;
    color: var(--grey-color);
  }
  :host .preview span span {
    font-size: inherit;
    color: inherit;
  }
  :host button {
    border: none;
    max-width: 70px;
    height: max-content;
    padding: .3rem .75rem;
    color: var(--white-color);
    background-color: var(--dark-color);
    font-size: .85rem;
    cursor: pointer;
    border-radius: 4px;
    transition: filter var(--duration-medium) ease-in-out;
  }
  :host button:hover {
    filter: brightness(90%);
  }
`;

export default css(styles);

import { css } from "../../core/Style";

const styles = /* css */`
  :host {
    display: grid;
    grid-template-columns: 60% 2fr 1fr;
    align-items: center;
  }
  :host p,
  :host span {
    font-size: .85rem;
    font-weight: 400;
  }
  :host p {
    margin: 0;
    color: var(--dark-color);
  }
  :host span {
    color: #8F2727;
  }
  :host input {
    display: none;
  }
  :host(.checked) span {
    color: #175517;
  }
  :host button {
    border: none;
    max-width: 70px;
    padding: .3rem .4rem;
    color: var(--white-color);
    background-color: var(--dark-color);
    font-size: .8rem;
    cursor: pointer;
    border-radius: 4px;
    transition: filter var(--duration-medium) ease-in-out;
  }
  :host button:hover {
    filter: brightness(90%);
  }

  @media only screen and (min-width: 820px) {
    :host {
      grid-template-columns: 420px 120px 120px;
    }
  }
`;

export default css(styles);

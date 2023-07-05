import { css } from "../../core/Style";

const styles = /* css */`
  input {
    width: 100%;
    border: none;
    padding: .5rem;
    border-radius: 4px;
    outline: none;
  }
  :host {
    display: block;
    padding: .85rem;
    background-color: var(--loading-color);
    border-radius: 8px;
  }
  :host .form-group {
    width: 100%;
    display: flex;
    align-items: center;
    margin: 0.25rem 0px;
    padding: 0.25rem 0px;
    gap: 1rem;
    color: var(--dark-color);
  }
  :host .form-group > label {
    flex: 200px 1 1;
    font-size: .85rem;
    font-weight: 400;
  }
  :host .form-group > input {
    flex: 100px 1 1;
  }

  @media only screen and (min-width: 620px) {
    :host .form-group {
      width: 70%;
    }
  }
  @media only screen and (min-width: 820px) {
    :host .form-group {
      width: 600px;
    }
  }
`;

export default css(styles);

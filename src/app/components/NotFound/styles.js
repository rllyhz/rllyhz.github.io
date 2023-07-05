import { css } from "../../core/Style";

const styles = /* css */`
  .not-found-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100vh;
  }
  .not-found-container h1 {
    background: -webkit-linear-gradient(45deg, var(--primary-color), var(--secondary-color));
    background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    font-size: 1.6rem;
    font-weight: 500;
    text-align: center;
  }
  .not-found-container p {
    margin: 0;
    font-size: 1.1rem;
    font-weight: 300;
    text-align: center;
    color: var(--dark-color);
  }
  .not-found-container > :last-child {
    margin: 2.5rem 0 0 0;
  }
`;

export default css(styles);

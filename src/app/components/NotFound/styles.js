import { css } from "../../core/Style";

export default css`
  .not-found-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100vh;
  }
  .not-found-container h1 {
    background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
    background: -webkit-linear-gradient(45deg, var(--primary-color), var(--secondary-color));
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-size: 1.6rem;
    font-weight: 500;
    text-align: center;
  }
  .not-found-container p {
    margin: 0;
    font-size: 1.2rem;
    font-weight: 300;
    text-align: center;
    color: var(--dark-color);
  }
  .not-found-container button {
    margin: 2rem 0 0 0;
    border: none;
    cursor: pointer;
    padding: .8rem 2rem;
    background-color: var(--primary-color);
    color: var(--white-color);
    border-radius: 8px;
    transition: filter var(--duration-medium) ease-in-out;
  }
  .not-found-container button:hover {
    filter: brightness(.8);
  }
`;

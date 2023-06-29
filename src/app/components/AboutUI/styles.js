import { css } from "../../core/Style";

export default css`
  img {
    width: 100%;
  }
  .about-container {
    display: grid;
    grid-template-columns: 1fr;
  }
  .image {
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .image img {
    width: 200px;
    border-radius: 8px;
  }
  .about {
    text-align: center;
  }
  .about a {
    color: var(--primary-color);
  }

  @media only screen and (min-width: 620px) {
    .image img {
      width: 300px;
    }
  }

  @media only screen and (min-width: 820px) {
    .about-container {
      grid-template-columns: repeat(2, 1fr);
      align-items: center;
    }
    .about {
      text-align: start;
    }
  }
`;

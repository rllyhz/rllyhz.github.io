import { css } from "../../core/Style";

export default css`
  .project-list-container {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  @media only screen and (min-width: 720px) {
    .project-list-container {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media only screen and (min-width: 1120px) {
    .project-list-container {
      grid-template-columns: repeat(3, 1fr);
    }
  }
`;

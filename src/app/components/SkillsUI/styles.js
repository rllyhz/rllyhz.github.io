import { css } from "../../core/Style";

export default css`
  img {
    width: 100%;
    border-radius: 8px;
  }
  .container-skills {
    display: grid;
    grid-template-columns: 1fr;
    text-align: center;
    gap: 3rem;
  }
  .container-skills .skills-description {
    margin: 1rem 0 0 0;
  }
  .container-skilss .skills-illustration {
    margin: 1rem 0 0 0;
  }
  .container-skills .skills-detail {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .skills-data {
    display: flex;
    row-gap: 2rem;
    justify-content: space-between;
    position: relative;
    font-weight: var(--font-semi);
    padding: .5rem 1rem;
    margin-bottom: var(--mb-4);
    border-radius: .5rem;
    box-shadow: 0 3px 4px rgba(14,36,49,.08);
  }

  .skills-data::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: -webkit-linear-gradient(45deg, var(--primary-color), var(--secondary-color));
    background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
  }

  .skills-data-description {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
  }
  .skills-data-names {
    display: flex;
    align-items: center;
    color: var(--primary-color);
  }

  @media only screen and (min-width: 820px) {
    .container-skills {
      grid-template-columns: repeat(2, 1fr);
      text-align: start;
    }
  }

  @media only screen and (min-width: 1080px) {
    .container-skills {
      align-items: center;
    }
  }
`;

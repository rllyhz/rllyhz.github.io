import { css } from "../../core/Style";

export default css`
  h1 {
    margin: 0;
    color: var(--dark-color);
    font-size: 2rem;
    margin-bottom: 3rem;
  }

  h1 .heading-color {
    background: -webkit-linear-gradient(45deg, var(--primary-color), var(--secondary-color));
    background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    text-fill-color: transparent;
    transition: filter var(--duration-short) ease-in-out;
  }

  .social-connection {
    display: flex;
    flex-direction: column;
    justify-content: start;
    gap: 2rem;
    margin-top: 5rem;
  }
  .social-connection a svg {
    fill: var(--dark-color) !important;
    transition: fill var(--duration-short) ease-in-out;
  }
  .social-connection a svg:hover {
    fill: var(--accent-color) !important;
  }

  .profile {
    position: absolute;
    right: 0;
    top: 54.5%;
    width: 18rem;
    cursor: pointer;
  }

  @media only screen and (min-width: 620px) {
    .social-connection {
      flex-direction: row;
      align-items: center;
    }

    .profile {
      top: calc(var(--header-height) + 4rem);
      right: 2rem;
      width: 20rem;
    }
  }

  @media only screen and (min-width: 720px) {
    .profile {
      width: 22rem;
    }
  }

  @media only screen and (min-width: 820px) {
    h1 {
      font-size: 3.5rem;
    }

    .profile {
      top: calc(var(--header-height) + 1rem);
      right: 3rem;
      width: 38%;
    }
  }

  @media only screen and (min-width: 900px) {
    .profile {
      right: 6rem;
    }
  }
`;

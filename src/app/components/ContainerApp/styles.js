import { css } from "../../core/Style";

const styles = /* css */`
  img {
    width: 100%;
  }

  .container-app {
    width: 92vw;
    margin: auto;
    padding: 1rem 0;
  }

  @media only screen and (min-width: 820px) {
    .container-app {
      width: 85vw;
    }
  }
`;

export default css(styles);

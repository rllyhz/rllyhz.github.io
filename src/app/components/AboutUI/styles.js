import { css } from "../../core/Style";
import LazyImage from "../LazyImage";

const styles = /* css */`
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
  .image > ${LazyImage.tagName} {
    aspect-ratio: 1/1.3;
    width: 200px;
    border-radius: 8px;
  }
  .about {
    margin-top: 2.4rem;
    text-align: center;
  }
  .about a {
    color: var(--primary-color);
  }

  @media only screen and (min-width: 620px) {
    .image > ${LazyImage.tagName} {
      width: 300px;
    }
  }

  @media only screen and (min-width: 820px) {
    .about-container {
      grid-template-columns: repeat(2, 1fr);
      align-items: center;
    }
    .about {
      margin-top: 0;
      text-align: start;
    }
  }
`;

export default css(styles);

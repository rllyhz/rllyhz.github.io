import { css } from "../../core/Style";
import LazyImage from "../LazyImage";

const styles = /* css */`
  .project-container {
    min-width: 100%;
    aspect-ratio: 3/2;
    border-radius: 8px;
    overflow: hidden;
    position: relative;
    display: flex;
    justify-content: stretch;
    align-items: stretch;
  }
  .project-container ${LazyImage.tagName} {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .project-container .title {
    position: absolute;
    bottom: -100%;
    left: 0;
    right: 0;
    height: auto;
    padding: .8rem 1rem;
    margin: 0;
    font-size: 1rem;
    font-weight: 400;
    background-color: var(--white-color);
    color: var(--dark-color);
    transition: bottom var(--duration-medium) ease-in-out;
  }
  .project-container:hover .title {
    bottom: 0;
  }
`;

export default css(styles);

import { css } from "../../core/Style";

const styles = /* css */`
  :host {
    display: block;
    width: 100%;
    overflow: hidden;
    position: relative;
    object-fit: contain;
    aspect-ratio: 1/1;
  }
  :host span {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: var(--message-color);
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    opacity: 0;
    transition: opacity var(--duration-medium) ease-in-out
  }
  :host(.error) span {
    opacity: 1;
  }
  :host(.error) .loading-preview {
    animation: unset;
  }
  :host(.error) .loading-preview img {
    opacity: 0;
  }
  :host .loading-preview {
    width: 100%;
    height: 100%;
    background-color: var(--loading-color);
    object-fit: inherit;
    aspect-ratio: inherit;
    animation: skeleton-loading 1s linear infinite alternate;
  }
  :host .loading-preview img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0;
    transform: scale(1);
    transition: opacity var(--duration-medium) ease-in-out,
      transform var(--duration-medium) ease-in-out;
  }
  :host(:hover) .loading-preview img {
    transform: scale(1.05);
  }
  :host(.loaded) span {
    opacity: 0;
  }
  :host(.loaded) .loading-preview {
    animation: unset;
  }
  :host(.loaded) .loading-preview img {
    opacity: 1;
  }

  @keyframes skeleton-loading {
    0% {
      filter: brightness(100%);
    }
    100% {
      filter: brightness(95%);
    }
  }
`;

export default css(styles);

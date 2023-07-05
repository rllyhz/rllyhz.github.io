import { css } from "../../core/Style";

const styles = /* css */`
  p, h1, h2 {
    margin: 0;
    padding: 0;
  }
  :host {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 2rem;
    padding-top: .5rem;
  }
  :host .project-container {
    order: 2;
    font-size: .9rem;
    color: var(--dark-color);
  }
  :host > a {
    flex: 1 1 72vw;
  }
  :host .author-updatedAt {
    font-weight: 400;
    font-size: .65rem;
  }
  :host .author-updatedAt span {
    font-weight: 300;
  }
  :host .title {
    text-decoration: none;
  }
  :host .title h1 {
    font-size: 1.3rem;
    font-weight: 600;
    color: var(--primary-color);
    transition: color var(--duration-medium) ease-in-out;
  }
  :host .title:hover h1 {
    color: var(--dark-color);
  }
  :host .type {
    margin-top: 1rem;
  }
  :host .type span .icon {
    font-style: normal;
  }
  :host .languages {
    margin-top: 0rem;
  }
  :host .type, :host .languages,
  :host .technologies-container h2 {
    font-weight: 500;
    font-size: .9rem;
  }
  :host .type span, :host .languages span,
  :host .technologies-container ul {
    font-style: italic;
    font-weight: 300;
    font-size: .85rem;
  }
  :host .type span, :host .languages {
    position: relative;
  }
  :host .languages .tooltip-ui {
    position: absolute;
    max-width: 200px;
    top: 1.5rem;
    left: 20%;
    font-style: normal;
    padding: .8rem;
    text-align: center;
    border-radius: 4px;
    background-color: var(--white-color);
    box-shadow: 3px 3px 8px rgba(120, 120, 120, .15);
    border: 1px solid var(--grey-light-color);
    opacity: 0;
    pointer-events: none;
    transform: scale(.8);
    transition: all var(--duration-flash) var(--duration-medium) ease-in;
  }
  :host .languages .tooltip-trigger {
    color: var(--secondary-color);
  }
  :host .languages.tooltip-exists span {
    cursor: pointer;
  }
  :host .languages.tooltip-exists span:hover + .tooltip-ui {
    opacity: 1;
    transform: scale(1);
  }
  :host .description {
    margin: 1.5rem 0 1rem;
    font-size: .9rem;
    font-weight: 300;
  }
  :host .technologies-container ul {
    list-style: none;
    margin: .45rem 0 0 .8rem;
    padding: 0;
  }
  :host .technologies-container ul li::before {
    content: "•";
    font-size: 130%;
    font-style: normal;
    line-height: 0;
    margin: 0 0.5rem 0 0;
    position: relative;
    top: 0.08rem;
    color: var(--primary-color);
  }
  
  @media (min-width: 768px) {
    :host {
      flex-wrap: unset;
      padding-top: 2rem;
    }
    :host .project-container {
      flex: 1 0 50%;
      order: unset;
    }
    :host > a {
      flex: 1 1 50%;
      height: max-content;
    }
  }
`;

export default css(styles);

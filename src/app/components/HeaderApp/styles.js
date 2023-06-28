import { css } from "../../core/Style";

const styles = css`
  header {
    width: 100vw;
    margin: 0;
    position: fixed;
    top: 0;
    box-shadow: 1px 1px 12px #eaeaea;
    z-index: 100;
  }

  a {
    text-decoration: none;
    color: var(--dark-color);
  }

  nav {
    width: var(--nav-width-in-sm);
    padding: 1rem 0;
    height: var(--header-height);
    margin: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  a.nav-logo {
    font-weight: 600;
    background: -webkit-linear-gradient(45deg, var(--primary-color), var(--secondary-color));
    background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    transition: filter var(--duration-short) ease-in-out;
  }
  a.nav-logo:hover {
    filter: brightness(.8);
  }

  .nav-list-container.show a {
    color: var(--white-color);
  }

  .nav-list-container .nav-list {
    position: absolute;
    top: calc(var(--header-height) + 1.1rem);
    right: -100%;
    width: 65vw;
    height: 95vh;
    padding: 2rem;
    background: -webkit-linear-gradient(to top, var(--primary-color), var(--dark-color));
    background: linear-gradient(to top, var(--primary-color), var(--dark-color));
    transition: .3s;
    list-style: none;
  }
  .nav-list-container.show .nav-list {
    right: 0;
  }

  .nav-list-container .nav-list .nav-item {
    font-weight: 500;
    position: relative;
    width: max-content;
    cursor: pointer;
  }
  .nav-list-container .nav-list .nav-item:not(:last-child) {
    margin-bottom: var(--nav-item-space-size);
  }
  .nav-list-container .nav-list .nav-item::after {
    content: "";
    width: 100%;
    height: 4px;
    position: absolute;
    bottom: -.5rem;
    left: 0;
    right: 0;
    background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
    background: -webkit-linear-gradient(45deg, var(--primary-color), var(--secondary-color));
    border-radius: 1rem;
    transition: filter var(--duration-short) ease-in-out;
    visibility: hidden;
  }
  .nav-list-container .nav-list .nav-item.active::after,
  .nav-list-container .nav-list .nav-item:hover::after {
    visibility: visible;
  }

  box-icon {
    cursor: pointer;
  }

  @media only screen and (min-width: 820px) {
    nav {
      width: var(--nav-width-in-md);
    }
    .nav-toggle {
      display: none;
    }
    .nav-list-container .nav-list {
      display: flex;
      position: unset;
      top: none;
      width: unset;
      height: unset;
      padding: unset;
      background: unset;
    }
    .nav-list-container .nav-list .nav-item:not(:last-child) {
      margin-right: var(--nav-item-space-size);
      margin-bottom: 0;
    }
  }
`;

export default styles;

import { css } from "../../core/Style";

export default css`
  a,button {
    text-decoration: none;
    border: none;
    border-radius: .3rem;
    cursor: pointer;
    padding: .45rem 1.2rem;
    font-weight: 300;
    font-size: .6rem;
    box-shadow: 0 0 0 unset;
    transition: all var(--duration-medium) ease-in-out;
  }
  a:hover,button:hover {
    box-shadow: 2px 8px 24px rgba(174, 174, 174, .65);
  }

  a.medium,button.medium {
    border-radius: .3rem;
    padding: .65rem 1.75rem;
    font-weight: 400;
    font-size: .8rem;
  }
  a.big,button.big {
    border-radius: .5rem;
    padding: .75rem 2.5rem;
    font-weight: 600;
    font-size: 1rem;
  }
`;

import { css } from "../../core/Style";

export default css`
  p {
    margin: 0;
  }
  .alert-container {
    background-color: var(--white-color);
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 1px 1px 12px rgba(82, 82, 82, .25);
    position: relative;
    background-color: var(--loading-color);
    -webkit-animation: fade var(--duration-short) linear forwards;
    animation: fade var(--duration-short) linear forwards;
  }
  .alert-container .icon {
    background-color: var(--white-color);
    display: flex;
    flex-direction: column;
    justify-content: center; 
    align-items: center;
    padding: .5rem 0;
  }
  .alert-container .title {
    margin-top: 1rem;
    padding: 0 2rem;
    font-size: 1.2rem;
    font-weight: 500;
  }
  .alert-container .title box-icon {
    margin-bottom: .5rem;
  }
  .alert-container .message {
    margin-top: .5rem;
    padding: 0 2rem;
    text-align: start;
    font-size: .9rem;
    font-weight: 300;
  }
  .alert-container .button-container {
    margin: 1.5rem 1.2rem 1.2rem;
    display: flex;
    justify-content: end;
    column-gap: .35rem;
  }

  @keyframes fade {
    0% { opacity: 0; transform: translateY(-20%); scale(.5); }
    30% { opacity: 0; transform: translateY(-20%); scale(.5); }
    100% { opacity: 1; transform: translateY(0); scale(1); }
  }
`;

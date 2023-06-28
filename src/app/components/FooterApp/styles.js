import { css } from "../../core/Style";

export default css(`
footer {
  background-color: var(--dark-color);
  color: var(--white-color);
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

footer p {
  margin: 0;
}

footer .appreciation {
  display: block;
  font-weight: 700;
  font-size: 2rem;
}

footer .connect-with-me {
  display: block;
  font-weight: 500;
  font-size: 1rem;
  margin-top: 2rem;
  margin-bottom: 1rem;
}

footer .social {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;
}
footer .social > a:not(:last-child) {
  margin-right: 1rem;
}
footer .social > a {
  transition: opacity var(--duration-flash) ease-in-out;
}
footer .social > a:hover {
  opacity: .8;
}

footer .built-by-me {
  display: block;
  font-weight: 300;
  font-size: 1rem;
  margin-bottom: 1rem;
}

footer .copyright {
  display: block;
  font-weight: 200;
  font-size: .8rem;
}
`);

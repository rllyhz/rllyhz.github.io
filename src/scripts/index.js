import "regenerator-runtime";

import "lazysizes";
import "lazysizes/plugins/parent-fit/ls.parent-fit";

import App from "../app/views/App";
import swRegister from "../utils/sw-register";

window.addEventListener("load", () => {
  App.init();
  swRegister();
});

window.addEventListener("hashchange", () => {
  App.updateAppShell();
  // re-render page
  App.renderPage();
});

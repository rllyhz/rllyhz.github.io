/*
 * author: rllyhz <rullyihza00@gmail.com>
 * github_page: https://github.com/rllyhz
 * instagram: rllyhz <https://instagram.com/rllyhz>
 * twitter: rllyhz <https://twitter.com/rllyhz>
 */

import "regenerator-runtime";

import "../styles/main.css";

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
  // re-trigger app router
  App.runRouter();
});

/*

Copyright 2021 Rully Ihza Mahendra

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

 */

import {
  getElem as _get,
  getElems as _getAll,
  createElement as _create,
  getRootLoadingPage,
  getRootPage,
  createRootLoadingPage,
  createRootPage,
  appendRootPageWithContainer,
  replaceChildrenRootPageWithContainer,
  appendChild as _appendChild,
  appendBody,
  appendRootLoadingPage,
  containerAppTagName,
} from "../../utils/ui/dom-helpers";

import {
  createHorizontalSpacer,
  createVerticalSpacer,
  createTitleApp,
} from "../../utils/ui/component-helpers";

const Dom = {
  containerAppTagName,

  getElem: (cssSelector) => _get(cssSelector),

  getElems: (cssSelector) => _getAll(cssSelector),

  createElement: ({
    tagName = "div", id = "", classNames = "",
    datasets = {}, props = {}, styles = {},
    innerText = "",
  }) => _create({
    tagName, id, classNames, props, datasets, styles, innerText,
  }),

  appendChild: _appendChild,

  appendBody,

  getRootPage,
  getRootLoadingPage,

  createRootLoadingPage,
  appendRootLoadingPage,

  createRootPage,
  appendRootPage: (newNode) => appendRootPageWithContainer(newNode),
  replaceRootPageChildrenNode: (newNode) => replaceChildrenRootPageWithContainer(newNode),

  // Components
  createHorizontalSpacer,
  createVerticalSpacer,
  createTitleApp,
};

export default Dom;

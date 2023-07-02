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

const Dom = {
  containerAppTagName,

  getElem: (cssSelector) => _get(cssSelector),

  getElems: (cssSelector) => _getAll(cssSelector),

  createElement: ({
    tagName = "div", id = "", classNames = "",
    datasets = {}, props = {}, styles = {},
    innerText = "", innerHTML = "",
  }) => _create({
    tagName, id, classNames, props, datasets, styles, innerText, innerHTML,
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
};

export default Dom;

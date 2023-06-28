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
    dataset = {}, data = {}, styles = {},
    innerText = "",
  }) => _create({
    tagName, id, classNames, data, dataset, styles, innerText,
  }),

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

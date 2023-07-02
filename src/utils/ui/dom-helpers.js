const getElem = (cssSelector) => document.querySelector(cssSelector);
const getElems = (cssSelector) => document.querySelectorAll(cssSelector);

const rootPageElementId = "root-page";
const containerAppTagName = "container-app";

const getRootPage = () => getElem(`#${rootPageElementId}`);
const createRootPage = () => {
  const rootPageElem = document.createElement("main");
  rootPageElem.id = rootPageElementId;
  return rootPageElem;
};

const rootLoadingPageElementId = "loading-page";
const getRootLoadingPage = () => getElem(`#${rootLoadingPageElementId}`);
const createRootLoadingPage = () => {
  const rootPageElem = document.createElement("div");
  rootPageElem.id = rootLoadingPageElementId;
  return rootPageElem;
};

const createElement = ({
  tagName = "div", id = "", classNames = "",
  datasets = {}, props = {}, styles = {},
  innerText = "", innerHTML = "",
}) => {
  const newElement = document.createElement(tagName);

  if (classNames.length > 0) newElement.classList.add(classNames);
  if (id.length > 0) newElement.id = id;

  if (typeof datasets === "object" && Object.entries(datasets).length > 0) {
    Object.entries(datasets).forEach((keyValue) => {
      const [key, value] = keyValue;
      newElement.dataset[key] = value;
    });
  }

  if (typeof styles === "object" && Object.entries(styles).length > 0) {
    Object.entries(styles).forEach((keyValue) => {
      const [key, value] = keyValue;
      newElement.style[key] = value;
    });
  }

  if (typeof props === "object" && Object.entries(props).length > 0) {
    Object.entries(props).forEach((keyValue) => {
      const [key, value] = keyValue;
      newElement.setAttribute(key, value);
    });
  }

  if (innerText.length > 0) {
    newElement.innerText = innerText;
  }

  if (innerHTML.length > 0) {
    newElement.innerHTML = innerHTML;
  }

  return newElement;
};

const appendChild = (nodeOrigin, newNode) => {
  if (nodeOrigin) nodeOrigin.appendChild(newNode);
};

const appendBody = (newNode) => {
  appendChild(document.body, newNode);
};

const appendRootPage = (child) => {
  appendChild(getRootPage(), child);
};

const appendRootPageWithContainer = (child) => {
  getElem(`#${rootPageElementId} ${containerAppTagName}`).addNewChild(child);
};

const replaceChildrenRootPageWithContainer = (child) => {
  getElem(`#${rootPageElementId} ${containerAppTagName}`).replaceChildren(child);
};

const appendRootLoadingPage = (child) => {
  appendChild(getRootLoadingPage(), child);
};

export {
  getElem,
  getElems,
  getRootPage,
  createRootPage,
  getRootLoadingPage,
  containerAppTagName,
  createRootLoadingPage,
  createElement,
  appendChild,
  appendBody,
  appendRootPage,
  appendRootPageWithContainer,
  appendRootLoadingPage,
  replaceChildrenRootPageWithContainer,
};

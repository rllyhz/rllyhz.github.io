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
  dataset = {}, data = {}, styles = {},
  innerText = "",
}) => {
  const newElement = document.createElement(tagName);

  if (classNames.length > 0) newElement.classList.add(classNames);
  if (id.length > 0) newElement.id = id;

  if (typeof dataset === "object" && Object.entries(dataset).length > 0) {
    Object.entries(dataset).forEach((keyValue) => {
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

  if (typeof data === "object" && Object.entries(data).length > 0) {
    Object.entries(data).forEach((keyValue) => {
      const [key, value] = keyValue;
      newElement[key] = value;
    });
  }

  if (innerText.length > 0) {
    newElement.innerText = innerText;
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

const getPropertyValueOf = (node, propertyName) => getComputedStyle(node)
  .getPropertyValue(propertyName);

const getAppBarHeight = () => getPropertyValueOf(document.body, "--app-bar-height");

const convertRemToPixels = (rem = "1rem") => parseFloat(rem) * parseFloat(getComputedStyle(document.documentElement).fontSize);

const addRemValue = (first = "0rem", second = "0rem") => `${parseFloat(first) + parseFloat(second)}rem`;

export {
  getPropertyValueOf,
  getAppBarHeight,
  convertRemToPixels,
  addRemValue,
};

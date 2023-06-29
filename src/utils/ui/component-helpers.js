import { createElement } from "./dom-helpers";

const createSpacer = ({ orientation = "horizontal", size = "1rem" }) => createElement({
  tagName: "div",
  props: {
    title: "spacer",
  },
  styles: {
    width: orientation === "horizontal" ? size : "unset",
    height: orientation === "vertical" ? size : "unset",
  },
});

const createHorizontalSpacer = (size = "1rem") => createSpacer({
  orientation: "horizontal",
  size,
});

const createVerticalSpacer = (size = "1rem") => createSpacer({
  orientation: "vertical",
  size,
});

export {
  createHorizontalSpacer,
  createVerticalSpacer,
};

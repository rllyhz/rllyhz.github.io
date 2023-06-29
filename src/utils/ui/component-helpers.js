import TitleApp from "../../app/components/TitleApp";
import WelcomeUI from "../../app/components/WelcomeUI";
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

const createWelcomeUI = () => createElement({
  tagName: WelcomeUI.tagName,
});

const createTitleApp = ({
  text = "",
  color = "inherit",
  align = "center",
  size = "big",
  classNames = "",
}) => createElement({
  tagName: TitleApp.tagName,
  classNames,
  props: {
    variant: "h2",
    color,
    size,
    align,
    text,
  },
});

export {
  createHorizontalSpacer,
  createVerticalSpacer,
  createWelcomeUI,
  createTitleApp,
};

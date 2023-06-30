import AboutUI from "../../app/components/AboutUI";
import CustomButton from "../../app/components/CustomButton";
import SkillsUI from "../../app/components/SkillsUI";
import TitleApp from "../../app/components/TitleApp";
import WelcomeUI from "../../app/components/WelcomeUI";
import WorkUI from "../../app/components/WorkUI";
import { createElement } from "./dom-helpers";
import { isOnMobileScreen } from "./viewport-helpers";

const createSpacer = ({ orientation = "horizontal", size = "1rem", sizeOnMobile = null }) => {
  let actualSize = size;

  if (sizeOnMobile !== null && isOnMobileScreen()) {
    actualSize = sizeOnMobile;
  }

  return createElement({
    tagName: "div",
    props: {
      title: "spacer",
    },
    styles: {
      width: orientation === "horizontal" ? actualSize : "unset",
      height: orientation === "vertical" ? actualSize : "unset",
    },
  });
};

const createHorizontalSpacer = (size = "1rem", sizeOnMobile = null) => createSpacer({
  orientation: "horizontal",
  size,
  sizeOnMobile,
});

const createVerticalSpacer = (size = "1rem", sizeOnMobile = null) => createSpacer({
  orientation: "vertical",
  size,
  sizeOnMobile,
});

const createTitleApp = ({
  text = "",
  color = "inherit",
  align = "center",
  size = "big",
  classNames = "",
  id = "",
}) => createElement({
  tagName: TitleApp.tagName,
  id,
  classNames,
  props: {
    variant: "h2",
    color,
    size,
    align,
    text,
  },
});

const createCustomButton = ({
  text, size, bgColor = "var(--accent-color)", color = "var(--white-color)",
  isLink = false, href = "", type,
}) => createElement({
  tagName: CustomButton.tagName,
  props: {
    text, size, "bg-color": bgColor, color, "is-link": isLink, href, type,
  },
});

const createWelcomeUI = () => createElement({
  tagName: WelcomeUI.tagName,
});

const createAboutUI = () => createElement({
  tagName: AboutUI.tagName,
});

const createSkillsUI = () => createElement({
  tagName: SkillsUI.tagName,
});

const createWorkUI = () => createElement({
  tagName: WorkUI.tagName,
});

export {
  createHorizontalSpacer,
  createVerticalSpacer,
  createTitleApp,
  createCustomButton,
  createWelcomeUI,
  createAboutUI,
  createSkillsUI,
  createWorkUI,
};

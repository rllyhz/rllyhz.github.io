import AboutUI from "../../app/components/AboutUI";
import CustomButton from "../../app/components/CustomButton";
import CustomInputText from "../../app/components/CustomInputText";
import SkillsUI from "../../app/components/SkillsUI";
import CustomTitle from "../../app/components/CustomTitle";
import WelcomeUI from "../../app/components/WelcomeUI";
import { createElement } from "./dom-helpers";
import { isOnMobileScreen } from "./viewport-helpers";
import ProjectList from "../../app/components/ProjectList";

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

const createCustomTitle = ({
  text = "",
  color = "",
  variant = "h1",
  align = CustomTitle.ALIGN.START,
  size = CustomTitle.SIZE.SMALL,
  classNames = "",
  id = "",
  styles,
}) => createElement({
  tagName: CustomTitle.tagName,
  id,
  classNames,
  props: {
    variant,
    color,
    size,
    align,
    text,
  },
  styles,
});

const createCustomButton = ({
  text, size, bgColor = "var(--accent-color)", color = "var(--white-color)",
  isLink = false, href = "", type, styles,
}) => createElement({
  tagName: CustomButton.tagName,
  props: {
    text, size, "bg-color": bgColor, color, "is-link": isLink, href, type,
  },
  styles,
});

const createCustomInputText = ({
  multiLineText = "false", obscureText = "false", placeholder = "", value = "", name = "",
  title = "", rows = "", cols = "", id = "", resize = "vertical", styles,
}) => createElement({
  tagName: CustomInputText.tagName,
  props: {
    "multi-line": multiLineText,
    obscure: obscureText,
    placeholder,
    value,
    name,
    title,
    rows,
    cols,
    resize,
    id,
  },
  styles,
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

const createProjectListUI = ({ heading = "h2" }) => createElement({
  tagName: ProjectList.tagName,
  props: {
    heading,
  },
});

export {
  createHorizontalSpacer,
  createVerticalSpacer,
  createCustomTitle,
  createCustomButton,
  createCustomInputText,
  createWelcomeUI,
  createAboutUI,
  createSkillsUI,
  createProjectListUI,
};

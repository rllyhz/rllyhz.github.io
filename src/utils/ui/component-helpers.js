import AboutUI from "../../app/components/AboutUI";
import ButtonText from "../../app/components/ButtonText";
import InputText from "../../app/components/InputText";
import SkillsUI from "../../app/components/SkillsUI";
import TitleText from "../../app/components/TitleText";
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

const createTitleText = ({
  text = "",
  color = "",
  variant = "h1",
  align = TitleText.ALIGN.START,
  size = TitleText.SIZE.SMALL,
  classNames = "",
  id = "",
  styles,
}) => createElement({
  tagName: TitleText.tagName,
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

const createButtonText = ({
  text, size, bgColor = "var(--accent-color)", color = "var(--white-color)",
  isLink = false, href = "", type, styles,
}) => createElement({
  tagName: ButtonText.tagName,
  props: {
    text, size, "bg-color": bgColor, color, "is-link": isLink, href, type,
  },
  styles,
});

const createInputText = ({
  multiLineText = "false", obscureText = "false", placeholder = "", value = "", name = "",
  title = "", rows = "", cols = "", id = "", resize = "vertical", styles,
}) => createElement({
  tagName: InputText.tagName,
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
  createTitleText,
  createButtonText,
  createInputText,
  createWelcomeUI,
  createAboutUI,
  createSkillsUI,
  createProjectListUI,
};

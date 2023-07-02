import {
  createHorizontalSpacer,
  createVerticalSpacer,
  createTitleText,
  createButtonText,
  createInputText,
  createWelcomeUI,
  createAboutUI,
  createSkillsUI,
  createProjectListUI,
} from "../../utils/ui/component-helpers";
import { createElement } from "../../utils/ui/dom-helpers";
import TitleText from "../components/TitleText";

const createCustomCenterContainer = (width = "90%") => createElement({
  tagName: "div",
  styles: {
    width,
    margin: "auto",
  },
});

const createCustomFlexContainer = ({
  justifyContent,
  alignItems,
  flexDirection = "row",
  margin = "0",
  padding = "0",
}) => createElement({
  tagName: "div",
  styles: {
    display: "flex",
    flexDirection,
    justifyContent,
    alignItems,
    margin,
    padding,
  },
});

const createCustomFlexEndContainer = () => createCustomFlexContainer({
  justifyContent: "end",
});

const createTitleApp = ({
  text, id, styles, classNames,
  color = "var(--primary-color)",
  align = TitleText.ALIGN.CENTER,
  size = TitleText.SIZE.BIG,
  variant = TitleText.VARIANT.H2,
}) => createTitleText({
  text, id, size, align, styles, classNames, color, variant,
});

const Component = {
  createHorizontalSpacer,
  createVerticalSpacer,
  createCustomCenterContainer,
  createCustomFlexContainer,
  createCustomFlexEndContainer,
  createTitleApp,
  createButtonText,
  createInputText,
  createWelcomeUI,
  createAboutUI,
  createSkillsUI,
  createProjectListUI,
};

export default Component;

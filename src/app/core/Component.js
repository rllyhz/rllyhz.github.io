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
import BooleanConfigurationFormUI from "../components/BooleanConfigurationFormUI";
import MixedConfigurationFormUI from "../components/MixedConfigurationFormUI";
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

const createDashboardTitle = ({
  margin, padding,
  text, size = "big", color = "var(--text-dark-color)", align,
}) => createElement({
  tagName: size === "big" ? "h1" : "h2",
  innerText: text,
  styles: {
    margin,
    padding,
    fontSize: size === "big" ? "1.4rem" : "1rem",
    textAlign: align,
    fontWeight: "700",
    color,
  },
});

const createBooleanConfigurationFormUI = () => createElement({
  tagName: BooleanConfigurationFormUI.tagName,
});

const createMixedConfigurationFormUI = () => createElement({
  tagName: MixedConfigurationFormUI.tagName,
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
  createDashboardTitle,
  createBooleanConfigurationFormUI,
  createMixedConfigurationFormUI,
};

export default Component;

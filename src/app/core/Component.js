import {
  createHorizontalSpacer,
  createVerticalSpacer,
  createCustomTitle,
  createCustomButton,
  createCustomInputText,
  createWelcomeUI,
  createAboutUI,
  createSkillsUI,
  createProjectListUI,
} from "../../utils/ui/component-helpers";
import { createElement } from "../../utils/ui/dom-helpers";
import CustomTitle from "../components/CustomTitle";

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
  align = CustomTitle.ALIGN.CENTER,
  size = CustomTitle.SIZE.BIG,
  variant = CustomTitle.VARIANT.H2,
}) => createCustomTitle({
  text, id, size, align, styles, classNames, color, variant,
});

const Component = {
  createHorizontalSpacer,
  createVerticalSpacer,
  createCustomCenterContainer,
  createCustomFlexContainer,
  createCustomFlexEndContainer,
  createTitleApp,
  createCustomButton,
  createCustomInputText,
  createWelcomeUI,
  createAboutUI,
  createSkillsUI,
  createProjectListUI,
};

export default Component;

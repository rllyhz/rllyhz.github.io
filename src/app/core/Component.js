import {
  createHorizontalSpacer,
  createVerticalSpacer,
  createTitleApp,
  createCustomButton,
  createCustomInputText,
  createWelcomeUI,
  createAboutUI,
  createSkillsUI,
  createWorkUI,
} from "../../utils/ui/component-helpers";
import { createElement } from "../../utils/ui/dom-helpers";

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
  flexDirection,
  margin,
  padding,
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
  createWorkUI,
};

export default Component;

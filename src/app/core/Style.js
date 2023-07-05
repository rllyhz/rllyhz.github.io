import { getPropertyValueOf } from "../../utils/ui/style-helpers";

const getCssVariableValue = (variableName) => getPropertyValueOf(document.body, variableName);

const css = (values) => `<style>${values}</style>`;

const html = (values) => `<>${values}</>`;

export {
  getCssVariableValue,
  html,
  css,
};

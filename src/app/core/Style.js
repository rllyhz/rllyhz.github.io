import { getPropertyValueOf } from "../../utils/ui/style-helpers";

const getCssVariableValue = (variableName) => getPropertyValueOf(document.body, variableName);

const css = (values) => `<style>${values}</style>`;

export {
  getCssVariableValue,
  css,
};

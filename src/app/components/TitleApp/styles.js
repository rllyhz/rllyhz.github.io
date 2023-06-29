import { css } from "../../core/Style";

const createStyles = (fontColor, fontSize, fontWeight, align) => css(`
  h1,h2,h3,h4,h5,h6 {
    margin: 0;
    color: ${fontColor};
    font-size: ${fontSize};
    font-weight: ${fontWeight};
    text-align: ${align};
  }
`);

export {
  createStyles,
  css,
};

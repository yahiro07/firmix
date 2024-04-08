import { css } from "@linaria/core";

export const globalStyle = css`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  div.markdown-body,
  body,
  button,
  input,
  textarea,
  select,
  option {
    /* font-family: "M PLUS 1p", sans-serif; */
    font-family: "M PLUS 2", sans-serif !important;
    /* font-family: "Murecho", sans-serif; */
    /* font-family: "Sawarabi Gothic", sans-serif; */
  }

  body h1,
  body h2,
  body h3,
  body h4,
  body h5,
  body h6 {
    font-weight: 500 !important;
    margin: 0;
  }

  body {
    line-height: 1.5;
  }
`;

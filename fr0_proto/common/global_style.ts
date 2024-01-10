import { css } from "~/aux/resin/resin_css.ts";

export const globalStyle = css`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  a {
    color: inherit;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }

  body{
    background: #68a;
  }

  ul,
  li {
    list-style: none;
  }

  body,
  button,
  input,
  textarea,
  select,
  option {
    /* font-family: "M PLUS 1p", sans-serif; */
    font-family: "M PLUS 2", sans-serif;
    /* font-family: "Murecho", sans-serif; */
    /* font-family: "Sawarabi Gothic", sans-serif; */
    line-height: 1.5;
  }
`;

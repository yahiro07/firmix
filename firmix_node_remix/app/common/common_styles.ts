import { css } from "@acab/ecsstatic";

export const styleTextLinkInheritColor = css`
  color: inherit;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

export const cssTransitionCommon = css`
  transition: all 0.1s linear;
`;

export const uiStyleClickable = css`
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
  ${cssTransitionCommon};
`;

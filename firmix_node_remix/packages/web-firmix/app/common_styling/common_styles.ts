export const styleObj_TextLinkInheritColor = {
  color: "inherit",
  textDecoration: "none",
  "&:hover": {
    textDecoration: "underline",
  },
};

export const uiStyleClickable = `
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
  transition: all 0.1s linear;
`;

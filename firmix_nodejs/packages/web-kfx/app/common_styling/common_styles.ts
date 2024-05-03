export const styleObj_TextLinkInheritColor = {
  color: "inherit",
  textDecoration: "none",
  _hover: {
    textDecoration: "underline",
  },
};

export const styleObj_uiStyleClickable = {
  cursor: "pointer",
  " &:hover": {
    opacity: 0.7,
  },
  transition: "all 0.1s linear",
};

export const uiStyleClickable = `
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
  transition: all 0.1s linear;
`;

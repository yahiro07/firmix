import { FC } from "react";

export function createFCE<P extends object>(
  baseFC: FC<P>
): FC<P & { sx?: object }> {
  return ({ sx, ...restProps }) => {
    const props = restProps as P;
    if (!sx) {
      return baseFC(props);
    } else {
      const jsxNode = baseFC(props) as JSX.Element;
      return {
        ...jsxNode,
        props: {
          ...jsxNode.props,
          sx: { ...jsxNode.props.sx, ...sx },
        },
      };
    }
  };
  return baseFC;
}

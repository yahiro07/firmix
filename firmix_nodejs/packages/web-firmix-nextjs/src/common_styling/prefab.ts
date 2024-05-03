import { BoxProps } from "@mui/system";
import { FC } from "react";

export function prefab<P = {}>(jsxNode: JSX.Element): FC<BoxProps & P> {
  return (props) => {
    return {
      ...jsxNode,
      props: {
        ...jsxNode.props,
        ...props,
      },
    };
  };
}

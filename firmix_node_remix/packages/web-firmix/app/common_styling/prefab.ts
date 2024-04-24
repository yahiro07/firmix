import { FC } from "react";
import { BoxProps } from "../../styled-system/jsx";

export function prefab(jsxNode: JSX.Element): FC<BoxProps> {
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

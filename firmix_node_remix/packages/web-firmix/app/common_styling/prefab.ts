import { BoxProps } from "@chakra-ui/react";
import { FC } from "react";

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

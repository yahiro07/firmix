import { BoxProps } from "@chakra-ui/react";
import { FC } from "react";
import { isCssProperty } from "./is-valid-prop";

export function createFCE<P extends object>(
  baseFC: FC<P & BoxProps>
): FC<P & BoxProps> {
  return baseFC;
}

export function createFCE2<P extends object>(baseFC: FC<P>): FC<P & BoxProps> {
  return (props) => {
    const _props = props as any;

    const cssPropKeys = Object.keys(props).filter((key) => isCssProperty(key));

    if (cssPropKeys.length > 0) {
      const cssProps = Object.fromEntries(
        cssPropKeys.map((key) => [key, _props[key]])
      );

      const jsxNode = baseFC(props) as JSX.Element;

      return {
        ...jsxNode,
        props: {
          ...jsxNode.props,
          ...cssProps,
        },
      };
    } else {
      return baseFC(props);
    }
  };
}
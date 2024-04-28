import { FC } from "react";
import { BoxProps } from "../../styled-system/jsx";
import { isCssProperty } from "./is-valid-prop";

export function createFCE_deprecated<P extends object>(
  baseFC: FC<P & BoxProps>
): FC<P & BoxProps> {
  return baseFC;
}

export function createFCE_EX_deprecated<P extends object>(
  baseFC: FC<P>
): FC<P & BoxProps> {
  return (props) => {
    const _props = props as any;

    const cssPropKeys = Object.keys(props).filter(
      (key) => isCssProperty(key) || key.match(/^on[A-Z]/)
    );

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

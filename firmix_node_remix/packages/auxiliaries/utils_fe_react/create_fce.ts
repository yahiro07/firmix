import { BoxProps } from "@chakra-ui/react";
import { FC } from "react";

export function createFCE<P extends object>(
  baseFC: FC<P & BoxProps>
): FC<P & BoxProps> {
  return baseFC;
}

export function createFCE2<P extends object>(baseFC: FC<P>): FC<P & BoxProps> {
  return (props) => {
    const _props = props as any;
    const consumed: Record<string, boolean> = {};
    const propsProxy = new Proxy(
      {},
      {
        get(_, name: string) {
          consumed[name] = true;
          return _props[name];
        },
      }
    ) as P;

    const jsxNode = baseFC(propsProxy) as JSX.Element;

    const restProps = Object.fromEntries(
      Object.keys(props)
        .filter((key) => !consumed[key])
        .map((key) => [key, _props[key]])
    );
    return {
      ...jsxNode,
      props: {
        ...jsxNode.props,
        ...restProps,
      },
    };
  };
}

import { FC } from "react";

export function createFCS<TProps, TStyles>(
  baseFn: (props: TProps, styles: TStyles) => JSX.Element,
  styles?: TStyles
): FC<TProps> {
  if (!styles) return baseFn;
  return (props: TProps) => {
    return baseFn(props, styles);
  };
}

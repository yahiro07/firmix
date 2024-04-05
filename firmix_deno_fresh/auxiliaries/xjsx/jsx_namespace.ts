import type { JSX } from "preact";

type JSXIntrinsicElements = JSX.IntrinsicElements;

type PropsIfValue = object | string | boolean | undefined;
type PropsQValue = string | boolean | (string | boolean | undefined)[];

export namespace JsxExtendedCustomJSXNamespace {
  export type ElementType = JSX.ElementType;

  export type Element = JSX.Element;

  export type ElementChildrenAttribute = JSX.ElementChildrenAttribute;

  export type IntrinsicAttributes = JSX.IntrinsicAttributes & {
    if?: PropsIfValue;
    q?: PropsQValue;
  };

  export type IntrinsicElements = {
    [K in keyof JSXIntrinsicElements]: JSXIntrinsicElements[K] & {
      if?: PropsIfValue;
      q?: PropsQValue;
    };
  };
}

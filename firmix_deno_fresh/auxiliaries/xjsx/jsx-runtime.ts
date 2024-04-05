import * as jsxRuntime from "preact/jsx-runtime";
import { customJsxAdapter } from "./custom_jsx_adapter.ts";
export { Fragment } from "preact";
export type { JsxExtendedCustomJSXNamespace as JSX } from "./jsx_namespace.ts";

export function jsx(tag: string | Function, props: object, key?: string) {
  return customJsxAdapter(jsxRuntime.jsx, tag, props, key);
}

export function jsxs(tag: string | Function, props: object, key?: string) {
  return customJsxAdapter(jsxRuntime.jsxs, tag, props, key);
}

export function jsxDEV(tag: string | Function, props: object, key?: string) {
  return customJsxAdapter(jsxRuntime.jsxDEV, tag, props, key);
}

import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

export function createPage(
  fn: (args: { params: Params }) => JSX.Element | Promise<JSX.Element>
) {
  return fn;
}

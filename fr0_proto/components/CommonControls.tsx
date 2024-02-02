import { FunctionalComponent } from "preact";
import { JSX, jsx } from "~/aux/xjsx/jsx-runtime.ts";

type JSXIntrinsicElements = JSX.IntrinsicElements;

export function bindTagWithClassNames<K extends keyof JSXIntrinsicElements>(
  tag: Extract<K, string>,
  classes: string,
  classes2?: string
): FunctionalComponent<JSXIntrinsicElements[K]> {
  return (props: JSXIntrinsicElements[K]) => {
    const classNames = [props.q, classes, classes2 ?? ""].join(" ");
    return jsx(tag, { ...props, q: classNames }, props.key);
  };
}

type XDom<K extends keyof JSXIntrinsicElements> = FunctionalComponent<
  JSXIntrinsicElements[K]
>;

type IComponentFlavorWrapper = {
  CssFrameworkAssetsImporter: FunctionalComponent;
  Button: XDom<"button">;
  Card: XDom<"div">;
};

const componentFlavorWrapper_UiKit: IComponentFlavorWrapper = {
  CssFrameworkAssetsImporter() {
    return (
      <>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/uikit@3.18.0/dist/css/uikit.min.css"
        />
        <script src="https://cdn.jsdelivr.net/npm/uikit@3.18.0/dist/js/uikit.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/uikit@3.18.0/dist/js/uikit-icons.min.js"></script>
      </>
    );
  },
  Button: bindTagWithClassNames("button", "uk-button uk-button-default"),
  Card: bindTagWithClassNames("div", "uk-card uk-card-default"),
};

const componentFlavor = componentFlavorWrapper_UiKit;

export const { CssFrameworkAssetsImporter, Button, Card } = componentFlavor;

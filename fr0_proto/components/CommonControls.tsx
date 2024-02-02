import { FunctionalComponent } from "preact";
import { JSX, jsx } from "~/aux/xjsx/jsx-runtime.ts";

type JSXIntrinsicElements = JSX.IntrinsicElements;

export function bindTagWithClassNames<K extends keyof JSXIntrinsicElements>(
  tag: Extract<K, string>,
  classes?: string,
  classes2?: string
): FunctionalComponent<JSXIntrinsicElements[K]> {
  return (props: JSXIntrinsicElements[K]) => {
    const classNames = [props.q, classes, classes2 ?? ""].join(" ").trim();
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
  FormLabel: XDom<"label">;
  FormTextInput: XDom<"input">;
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
  FormLabel: bindTagWithClassNames("label"),
  FormTextInput: bindTagWithClassNames("input", "uk-input"),
};

const componentFlavorWrapper_Bootstrap: IComponentFlavorWrapper = {
  CssFrameworkAssetsImporter() {
    return (
      <>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@4.1.3/dist/css/bootstrap.min.css"
          integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO"
          crossorigin="anonymous"
        />
      </>
    );
  },
  Button: bindTagWithClassNames("button", "btn btn-primary"),
  Card: bindTagWithClassNames("div", "card"),
  FormLabel: bindTagWithClassNames("label", ""),
  FormTextInput: bindTagWithClassNames("input", ""),
};

const componentFlavor = componentFlavorWrapper_UiKit;

export const {
  CssFrameworkAssetsImporter,
  Button,
  Card,
  FormLabel,
  FormTextInput,
}: IComponentFlavorWrapper = componentFlavor;

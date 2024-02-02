import { FunctionComponent } from "preact";
import { css, domStyled } from "resin";
import { JSX, jsx } from "~/aux/xjsx/jsx-runtime.ts";
import { styleTextLinkInheritColor } from "~/common/common_styles.ts";
import { useSiteContext } from "~/common/site_context.ts";

type JSXIntrinsicElements = JSX.IntrinsicElements;

type FC<T = {}> = FunctionComponent<T>;

export function bindTagWithClassNames<K extends keyof JSXIntrinsicElements>(
  tag: Extract<K, string>,
  classes?: string,
  classes2?: string
): FC<JSXIntrinsicElements[K]> {
  return (props: JSXIntrinsicElements[K]) => {
    const classNames = [props.q, classes, classes2 ?? ""].join(" ").trim();
    return jsx(tag, { ...props, q: classNames }, props.key);
  };
}

type XDom<K extends keyof JSXIntrinsicElements> = FC<JSXIntrinsicElements[K]>;

type IComponentFlavorWrapper = {
  CssFrameworkAssetsImporter: FC;
  Button: XDom<"button">;
  Card: XDom<"div">;
  FormLabel: XDom<"label">;
  FormTextInput: XDom<"input">;
  Nav: XDom<"ul">;
  NavItem: FC<{ path: string; title: string }>;
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
  Nav: bindTagWithClassNames("ul", "uk-nav uk-nav-default"),
  NavItem: ({ path, title }) => {
    const { pagePath } = useSiteContext();
    const active = path === pagePath;
    return domStyled(
      <li q={active && "uk-active"}>
        <a href={path}>
          <span>{title}</span>
        </a>
      </li>,
      css`
        font-size: 18px;
      `
    );
  },
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
  Nav: bindTagWithClassNames("ul", "nav flex-column nav-pills"),
  NavItem: ({ path, title }) => {
    const { pagePath } = useSiteContext();
    const active = path === pagePath;
    return (
      <li q="nav-item">
        <a
          href={path}
          q={["nav-link", active && "active", styleTextLinkInheritColor]}
        >
          <span>{title}</span>
        </a>
      </li>
    );
  },
};

// const componentFlavor = componentFlavorWrapper_UiKit;
const componentFlavor = componentFlavorWrapper_Bootstrap;

export const {
  CssFrameworkAssetsImporter,
  Button,
  Card,
  FormLabel,
  FormTextInput,
  Nav,
  NavItem,
} = componentFlavor;

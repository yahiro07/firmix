import { FunctionComponent } from "preact";
import { css, domStyled } from "resin";
import { JSX, jsx } from "~/aux/xjsx/jsx-runtime.ts";
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
    const customCss = `
  body {
    --bs-border-radius: 0;
    --bs-nav-pills-border-radius: 0;
  }
`;
    return (
      <>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM"
          crossorigin="anonymous"
          if={false}
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/bootswatch/5.3.2/cosmo/bootstrap.min.css"
          crossorigin="anonymous"
          if={true}
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootswatch@4.5.2/dist/superhero/bootstrap.min.css"
          crossorigin="anonymous"
          if={false}
        />
        <style dangerouslySetInnerHTML={{ __html: customCss }} />
      </>
    );
  },
  Button: bindTagWithClassNames("button", "btn btn-primary"),
  Card: bindTagWithClassNames("div", "card"),
  FormLabel: bindTagWithClassNames("label", "form-label"),
  FormTextInput: bindTagWithClassNames("input", "form-control"),
  Nav: bindTagWithClassNames("ul", "nav flex-column nav-pills"),
  NavItem: ({ path, title }) => {
    const { pagePath } = useSiteContext();
    const active = path === pagePath;
    return (
      <li q="nav-item">
        <a href={path} q={["nav-link", active && "active"]}>
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

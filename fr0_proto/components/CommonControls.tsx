import { FunctionComponent } from "preact";
import { css, domStyled } from "resin";
import { createFC } from "~/aux/utils_fe/create_fc.ts";
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
  ButtonSmall: XDom<"button">;
  Card: XDom<"div">;
  FormLabel: XDom<"label">;
  FormTextInput: XDom<"input">;
  Nav: XDom<"ul">;
  NavItem: FC<{ path: string; title: string }>;
};

const componentFlavorWrapper_UiKit: IComponentFlavorWrapper = {
  CssFrameworkAssetsImporter() {
    const customCss = `
`;
    return (
      <>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/uikit@3.18.0/dist/css/uikit.min.css"
        />
        <script src="https://cdn.jsdelivr.net/npm/uikit@3.18.0/dist/js/uikit.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/uikit@3.18.0/dist/js/uikit-icons.min.js"></script>
        <style dangerouslySetInnerHTML={{ __html: customCss }} />
      </>
    );
  },
  Button: bindTagWithClassNames("button", "uk-button uk-button-default"),
  ButtonSmall: bindTagWithClassNames("button", ""),
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
    --bs-body-font-family: "M PLUS 2", sans-serif;
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
  ButtonSmall: bindTagWithClassNames("button", ""),
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

const componentFlavorWrapper_Materialize: IComponentFlavorWrapper = {
  CssFrameworkAssetsImporter() {
    const customCss = `
`;
    return (
      <>
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css"
        />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>

        <style dangerouslySetInnerHTML={{ __html: customCss }} />
      </>
    );
  },
  Button: bindTagWithClassNames("button", "btn"),
  ButtonSmall: bindTagWithClassNames("button", ""),
  Card: bindTagWithClassNames("div", "card"),
  FormLabel: bindTagWithClassNames("label"),
  FormTextInput: bindTagWithClassNames("input", "input"),
  Nav: bindTagWithClassNames("ul", ""),
  NavItem: ({ path, title }) => {
    const { pagePath } = useSiteContext();
    const active = path === pagePath;
    return domStyled(
      <li q={active && "--active"}>
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

const componentFlavorWrapper_Bulma: IComponentFlavorWrapper = {
  CssFrameworkAssetsImporter() {
    const customCss = `
`;
    return (
      <>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css"
        />
        <style dangerouslySetInnerHTML={{ __html: customCss }} />
      </>
    );
  },
  Button: bindTagWithClassNames("button", "button is-primary"),
  ButtonSmall: bindTagWithClassNames("button", ""),
  Card: bindTagWithClassNames("div", "card"),
  FormLabel: bindTagWithClassNames("label"),
  FormTextInput: bindTagWithClassNames("input", "input"),
  Nav: bindTagWithClassNames("ul", "menu-list"),
  NavItem: ({ path, title }) => {
    const { pagePath } = useSiteContext();
    const active = path === pagePath;
    return (
      <li>
        <a href={path} q={active && "is-active"}>
          <span>{title}</span>
        </a>
      </li>
    );
  },
};

const componentFlavorWrapper_Foundation: IComponentFlavorWrapper = {
  CssFrameworkAssetsImporter() {
    const customCss = `
`;
    return (
      <>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/foundation-sites@6.8.1/dist/css/foundation.min.css"
          crossorigin="anonymous"
        />
        <style dangerouslySetInnerHTML={{ __html: customCss }} />
      </>
    );
  },
  Button: bindTagWithClassNames("button", "button primary"),
  ButtonSmall: bindTagWithClassNames("button", ""),
  Card: bindTagWithClassNames("div", "card"),
  FormLabel: bindTagWithClassNames("label"),
  FormTextInput: bindTagWithClassNames(
    "input",
    "input",
    css`
      margin: 0 !important;
    `
  ),
  Nav: bindTagWithClassNames("ul", "menu vertical"),
  NavItem: ({ path, title }) => {
    const { pagePath } = useSiteContext();
    const active = path === pagePath;
    return (
      <li q={active && "is-active"}>
        <a href={path}>
          <span>{title}</span>
        </a>
      </li>
    );
  },
};

const componentFlavorWrapper_Spectre: IComponentFlavorWrapper = {
  CssFrameworkAssetsImporter() {
    const customCss = `
`;
    return (
      <>
        <link
          rel="stylesheet"
          href="https://unpkg.com/spectre.css/dist/spectre.min.css"
        />
        <link
          rel="stylesheet"
          href="https://unpkg.com/spectre.css/dist/spectre-exp.min.css"
        />
        <link
          rel="stylesheet"
          href="https://unpkg.com/spectre.css/dist/spectre-icons.min.css"
        />
        <style dangerouslySetInnerHTML={{ __html: customCss }} />
      </>
    );
  },
  Button: bindTagWithClassNames("button", "btn btn-primary"),
  ButtonSmall: bindTagWithClassNames("button", ""),
  Card: bindTagWithClassNames("div", "card"),
  FormLabel: bindTagWithClassNames("label", "form-label"),
  FormTextInput: bindTagWithClassNames("input", "form-input"),
  Nav: bindTagWithClassNames("ul", "nav"),
  NavItem: ({ path, title }) => {
    const { pagePath } = useSiteContext();
    const active = path === pagePath;
    return (
      <li q={["nav-item", active && "active"]}>
        <a href={path}>
          <span>{title}</span>
        </a>
      </li>
    );
  },
};

const componentFlavorWrapper_SemanticUI: IComponentFlavorWrapper = {
  CssFrameworkAssetsImporter() {
    const customCss = `
`;
    return (
      <>
        <script
          src="https://code.jquery.com/jquery-3.1.1.min.js"
          integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8="
          crossorigin="anonymous"
        ></script>
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css"
        />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.js"></script>
        <style dangerouslySetInnerHTML={{ __html: customCss }} />
      </>
    );
  },
  Button: bindTagWithClassNames("button", "ui button"),
  ButtonSmall: bindTagWithClassNames("button", ""),
  Card: bindTagWithClassNames(
    "div",
    "ui segment",
    css`
      margin: 0 !important;
    `
  ),
  FormLabel: bindTagWithClassNames("label"),
  FormTextInput: createFC<JSXIntrinsicElements["input"]>((props) => (
    <div q="ui input">
      <input type="text" {...props} />
    </div>
  )),
  Nav: bindTagWithClassNames("ul", "ui secondary vertical menu"),
  NavItem: ({ path, title }) => {
    const { pagePath } = useSiteContext();
    const active = path === pagePath;
    return (
      <a href={path} q={["item", active && "active"]}>
        <span>{title}</span>
      </a>
    );
  },
};

const componentFlavorWrapper_Tailwind_Flowbite: IComponentFlavorWrapper = {
  CssFrameworkAssetsImporter() {
    const customCss = `
  .markdown-body {
    ul, li{
      list-style: disc;
    }
  }
`;
    return (
      <>
        <script src="https://cdn.tailwindcss.com"></script>
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.2.1/flowbite.min.css"
          rel="stylesheet"
        />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.2.1/flowbite.min.js"></script>

        <style dangerouslySetInnerHTML={{ __html: customCss }} />
      </>
    );
  },
  Button: bindTagWithClassNames(
    "button",
    "bg-indigo-500 p-2 text-white focus:outline-none text-white focus:ring-4 focus:ring-indigo-300 font-medium text-sm px-5 py-2.5 mb-2",
    css`
      &:hover {
        opacity: 0.8;
      }
      &:disabled {
        opacity: 0.3;
      }
    `
  ),
  ButtonSmall: bindTagWithClassNames(
    "button",
    css`
      padding: 4px 8px;
      background: #ccc;
      font-size: 14px;
      &:hover {
        opacity: 0.8;
      }
      &:disabled {
        opacity: 0.3;
      }
    `
  ),
  Card: bindTagWithClassNames("div", "bg-white shadow"),
  FormLabel: bindTagWithClassNames("label", ""),
  FormTextInput: bindTagWithClassNames(
    "input",
    "bg-gray-50 border border-gray-300 text-gray-900 focus:border-indigo-300 focus:ring-indigo-300 p-2.5"
  ),
  Nav: bindTagWithClassNames("ul", "nav"),
  NavItem: ({ path, title }) => {
    const { pagePath } = useSiteContext();
    const active = path === pagePath;
    return (
      <li>
        <a
          href={path}
          q={[
            "flex items-center p-2 text-gray-900 group",
            active && "--active",
            css`
              &.--active {
                font-weight: 500;
              }
              &:hover {
                opacity: 0.7;
              }
            `,
          ]}
        >
          <span>{title}</span>
        </a>
      </li>
    );
  },
};

// const componentFlavor = componentFlavorWrapper_UiKit;
// const componentFlavor = componentFlavorWrapper_Bootstrap;
// const componentFlavor = componentFlavorWrapper_Materialize;
// const componentFlavor = componentFlavorWrapper_Bulma;
// const componentFlavor = componentFlavorWrapper_Foundation;
// const componentFlavor = componentFlavorWrapper_Spectre;
// const componentFlavor = componentFlavorWrapper_SemanticUI;
const componentFlavor = componentFlavorWrapper_Tailwind_Flowbite;
export const {
  CssFrameworkAssetsImporter,
  Button,
  ButtonSmall,
  Card,
  FormLabel,
  FormTextInput,
  Nav,
  NavItem,
} = componentFlavor;

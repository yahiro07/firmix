/* eslint-disable @typescript-eslint/no-unused-vars */
import { css } from "@linaria/core";
import { Link } from "@remix-run/react";
import { FC } from "auxiliaries/fe-deps-react";
import { createFC } from "auxiliaries/utils_fe_react/create_fc";
import { domStyled } from "auxiliaries/utils_fe_react/fcx";
import { reflectInputChecked } from "auxiliaries/utils_fe_react/form_helper";
import { jsx, JSX } from "jsxq/jsx-runtime";
import { flexAligned } from "shared/common/utility_styles";
import { IconIconifyZ } from "shared/components/IconIconifyZ.tsx";
// import { useSiteContext } from "~/common/site_context";

type JSXIntrinsicElements = JSX.IntrinsicElements;

export function bindClasses<K extends keyof JSXIntrinsicElements>(
  tag: Extract<K, string>,
  classes?: string,
  classes2?: string
): FC<JSXIntrinsicElements[K]> {
  // eslint-disable-next-line react/display-name
  return (props: JSXIntrinsicElements[K]) => {
    const classNames = [props.q, classes, classes2 ?? ""].join(" ").trim();
    return jsx(tag, { ...props, q: classNames }, props.key?.toString());
  };
}

export function bindClassesF<T>(
  tag: FC<T>,
  classes?: string,
  classes2?: string
): FC<T & { q?: string; key?: string }> {
  // eslint-disable-next-line react/display-name
  return (props: T & { q?: string; key?: string }) => {
    const classNames = [props.q, classes, classes2 ?? ""].join(" ").trim();
    return jsx(tag, { ...props, q: classNames }, props.key?.toString());
  };
}

type XDom<K extends keyof JSXIntrinsicElements> = FC<JSXIntrinsicElements[K]>;

type IComponentFlavorWrapper = {
  CssFrameworkAssetsImporter: FC;
  Button: XDom<"button">;
  LinkButton: typeof Link;
  ButtonSmall: XDom<"button">;
  Card: XDom<"div">;
  FormLabel: XDom<"label">;
  FormTextInput: XDom<"input">;
  Nav: XDom<"ul">;
  NavItem: FC<{ path: string; title: string; iconSpec: string }>;
  NavItem_Button: FC<{ path: string; title: string; iconSpec: string }>;
};

/*
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
  Button: bindClasses("button", "uk-button uk-button-default"),
  LinkButton: bindClasses("a", "uk-button uk-button-default"),
  ButtonSmall: bindClasses("button", ""),
  Card: bindClasses("div", "uk-card uk-card-default"),
  FormLabel: bindClasses("label"),
  FormTextInput: bindClasses("input", "uk-input"),
  Nav: bindClasses("ul", "uk-nav uk-nav-default"),
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
  NavItem_Button: ({ path, title, iconSpec }) => {
    const onClick = () => (location.href = path);
    return (
      <li>
        <div q={styleNavItem} onClick={onClick}>
          <IconIconifyZ spec={iconSpec as any} q="icon" />
          <span>{title}</span>
        </div>
      </li>
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
          crossOrigin="anonymous"
          if={false}
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/bootswatch/5.3.2/cosmo/bootstrap.min.css"
          crossOrigin="anonymous"
          if={true}
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootswatch@4.5.2/dist/superhero/bootstrap.min.css"
          crossOrigin="anonymous"
          if={false}
        />
        <style dangerouslySetInnerHTML={{ __html: customCss }} />
      </>
    );
  },
  Button: bindClasses("button", "btn btn-primary"),
  LinkButton: bindClasses("a", "btn btn-primary"),
  ButtonSmall: bindClasses("button", ""),
  Card: bindClasses("div", "card"),
  FormLabel: bindClasses("label", "form-label"),
  FormTextInput: bindClasses("input", "form-control"),
  Nav: bindClasses("ul", "nav flex-column nav-pills"),
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
  NavItem_Button: ({ path, title, iconSpec }) => {
    const onClick = () => (location.href = path);
    return (
      <li>
        <div q={styleNavItem} onClick={onClick}>
          <IconIconifyZ spec={iconSpec as any} q="icon" />
          <span>{title}</span>
        </div>
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
  Button: bindClasses("button", "btn"),
  LinkButton: bindClasses("a", "btn"),
  ButtonSmall: bindClasses("button", ""),
  Card: bindClasses("div", "card"),
  FormLabel: bindClasses("label"),
  FormTextInput: bindClasses("input", "input"),
  Nav: bindClasses("ul", ""),
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
  NavItem_Button: ({ path, title, iconSpec }) => {
    const onClick = () => (location.href = path);
    return (
      <li>
        <div q={styleNavItem} onClick={onClick}>
          <IconIconifyZ spec={iconSpec as any} q="icon" />
          <span>{title}</span>
        </div>
      </li>
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
  Button: bindClasses("button", "button is-primary"),
  LinkButton: bindClasses("a", "button is-primary"),
  ButtonSmall: bindClasses("button", ""),
  Card: bindClasses("div", "card"),
  FormLabel: bindClasses("label"),
  FormTextInput: bindClasses("input", "input"),
  Nav: bindClasses("ul", "menu-list"),
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
  NavItem_Button: ({ path, title, iconSpec }) => {
    const onClick = () => (location.href = path);
    return (
      <li>
        <div q={styleNavItem} onClick={onClick}>
          <IconIconifyZ spec={iconSpec as any} q="icon" />
          <span>{title}</span>
        </div>
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
          crossOrigin="anonymous"
        />
        <style dangerouslySetInnerHTML={{ __html: customCss }} />
      </>
    );
  },
  Button: bindClasses("button", "button primary"),
  LinkButton: bindClasses("a", "button primary"),
  ButtonSmall: bindClasses("button", ""),
  Card: bindClasses("div", "card"),
  FormLabel: bindClasses("label"),
  FormTextInput: bindClasses(
    "input",
    "input",
    css`
      margin: 0 !important;
    `
  ),
  Nav: bindClasses("ul", "menu vertical"),
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
  NavItem_Button: ({ path, title, iconSpec }) => {
    const onClick = () => (location.href = path);
    return (
      <li>
        <div q={styleNavItem} onClick={onClick}>
          <IconIconifyZ spec={iconSpec as any} q="icon" />
          <span>{title}</span>
        </div>
      </li>
    );
  },
};
*/

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
  Button: bindClasses("button", "btn btn-primary"),
  LinkButton: bindClassesF(Link, "btn btn-primary") as any,
  ButtonSmall: bindClasses("button", ""),
  Card: bindClasses("div", "card"),
  FormLabel: bindClasses("label", "form-label"),
  FormTextInput: bindClasses("input", "form-input"),
  Nav: bindClasses("ul", "nav"),
  NavItem: ({ path, title, iconSpec }) => {
    // const { pagePath } = useSiteContext();
    // const active = path === pagePath;
    // const active = path === location.href;
    const active = false;
    return (
      <li q={["nav-item", active && "active"]}>
        <Link to={path} q={styleNavItem}>
          <IconIconifyZ spec={iconSpec as any} q="icon" />
          <span>{title}</span>
        </Link>
      </li>
    );
  },
  NavItem_Button: ({ path, title, iconSpec }) => {
    const onClick = () => (location.href = path);
    return (
      <li>
        <div q={styleNavItem} onClick={onClick}>
          <IconIconifyZ spec={iconSpec as any} q="icon" />
          <span>{title}</span>
        </div>
      </li>
    );
  },
};

/*
const componentFlavorWrapper_SemanticUI: IComponentFlavorWrapper = {
  CssFrameworkAssetsImporter() {
    const customCss = `
`;
    return (
      <>
        <script
          src="https://code.jquery.com/jquery-3.1.1.min.js"
          integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8="
          crossOrigin="anonymous"
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
  Button: bindClasses("button", "ui button"),
  LinkButton: bindClasses("a", "ui button"),
  ButtonSmall: bindClasses("button", ""),
  Card: bindClasses(
    "div",
    "ui segment",
    css`
      margin: 0 !important;
    `
  ),
  FormLabel: bindClasses("label"),
  FormTextInput: createFC<JSXIntrinsicElements["input"]>((props) => (
    <div q="ui input">
      <input type="text" {...props} />
    </div>
  )),
  Nav: bindClasses("ul", "ui secondary vertical menu"),
  NavItem: ({ path, title }) => {
    const { pagePath } = useSiteContext();
    const active = path === pagePath;
    return (
      <a href={path} q={["item", active && "active"]}>
        <span>{title}</span>
      </a>
    );
  },
  NavItem_Button: ({ path, title, iconSpec }) => {
    const onClick = () => (location.href = path);
    return (
      <li>
        <div q={styleNavItem} onClick={onClick}>
          <IconIconifyZ spec={iconSpec as any} q="icon" />
          <span>{title}</span>
        </div>
      </li>
    );
  },
};
*/

const styleNavItem = [
  "flex items-center p-2 text-gray-900 group",
  css`
    font-size: 18px;
    ${flexAligned(8)};
    cursor: pointer;
    > .icon {
      font-size: 22px;
    }
    &[data-current] {
      font-weight: 500;
    }
    &:hover {
      opacity: 0.7;
    }
  `,
];

const styleButton = [
  "bg-indigo-500 p-2 text-white focus:outline-none text-white focus:ring-4 focus:ring-indigo-300 font-medium text-sm px-5 py-2.5 mb-2",
  css`
    &:hover {
      opacity: 0.8;
    }
    &:disabled {
      opacity: 0.3;
    }
  `,
];

/*
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
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.2.1/flowbite.min.css"
          rel="stylesheet"
        />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.2.1/flowbite.min.js"></script>
        <style dangerouslySetInnerHTML={{ __html: customCss }} />
      </>
    );
  },
  Button: bindClasses("button", ...styleButton),
  LinkButton: bindClasses("a", ...styleButton),
  ButtonSmall: bindClasses(
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
  Card: bindClasses("div", "bg-white shadow"),
  FormLabel: bindClasses("label", ""),
  FormTextInput: bindClasses(
    "input",
    "bg-gray-50 border border-gray-300 text-gray-900 focus:border-indigo-300 focus:ring-indigo-300 p-2.5"
  ),
  Nav: bindClasses("ul", "nav"),
  NavItem: ({ path, title, iconSpec }) => {
    return (
      <li>
        <a href={path} q={styleNavItem}>
          <IconIconifyZ spec={iconSpec as any} q="icon" />
          <span>{title}</span>
        </a>
      </li>
    );
  },
  NavItem_Button: ({ path, title, iconSpec }) => {
    const onClick = () => (location.href = path);
    return (
      <li>
        <div q={styleNavItem} onClick={onClick}>
          <IconIconifyZ spec={iconSpec as any} q="icon" />
          <span>{title}</span>
        </div>
      </li>
    );
  },
};
*/

// const componentFlavor = componentFlavorWrapper_UiKit;
// const componentFlavor = componentFlavorWrapper_Bootstrap;
// const componentFlavor = componentFlavorWrapper_Materialize;
// const componentFlavor = componentFlavorWrapper_Bulma;
// const componentFlavor = componentFlavorWrapper_Foundation;
const componentFlavor = componentFlavorWrapper_Spectre;
// const componentFlavor = componentFlavorWrapper_SemanticUI;
// const componentFlavor = componentFlavorWrapper_Tailwind_Flowbite;
export const {
  CssFrameworkAssetsImporter,
  Button,
  LinkButton,
  ButtonSmall,
  Card,
  FormLabel,
  FormTextInput,
  Nav,
  NavItem,
  NavItem_Button,
} = componentFlavor;

export const ToggleButtonLarge = createFC<{
  checked: boolean;
  setChecked(): void;
  text: string;
}>(({ checked, setChecked, text }) => {
  return domStyled(
    <label>
      <input
        type="checkbox"
        value=""
        checked={checked}
        onChange={reflectInputChecked(setChecked)}
      />
      <div />
      <span>{text}</span>
    </label>,
    css`
      position: relative;
      cursor: pointer;
      ${flexAligned(8)};

      > input {
        position: absolute;
        width: 1px;
        height: 1px;
      }

      > div {
        position: relative;
        width: 60px;
        height: 30px;
        background: #ccc;
        border-radius: 99px;

        &:before {
          position: absolute;
          top: 2px;
          left: 2px;
          content: "";
          width: 26px;
          height: 26px;
          background: #fff;
          border-radius: 99px;
          transition: left 0.5s;
        }
      }

      > input:checked + div {
        background-color: #7ca;
        &:before {
          left: 32px;
        }
      }
    `
  );
});

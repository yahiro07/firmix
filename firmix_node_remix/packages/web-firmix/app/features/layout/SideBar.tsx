import { css } from "@linaria/core";
import { appConfig } from "@m/web-firmix/base/app_config.ts";
import { useSiteContext } from "@m/web-firmix/common/site_context.ts";
import { LoginUserBox } from "@m/web-firmix/features/layout/LoginUserBox.tsx";
import { createFCX } from "auxiliaries/utils_fe_react/fcx";
import { flexVertical } from "shared/common/utility_styles.ts";
import {
  Nav,
  NavItem,
  NavItem_Button,
} from "shared/components/CommonControls.tsx";

export const SideBar = createFCX(
  () => {
    const { loginUser } = useSiteContext();
    const loggedIn = !!loginUser;
    return (
      <div>
        <Nav>
          <NavItem
            path="/"
            iconSpec="lucide:package"
            title="プロジェクト一覧"
          />
          <NavItem
            path="/self-projects"
            iconSpec="ph:toolbox"
            title="自分のプロジェクト"
            if={loggedIn}
          />
          <NavItem
            path="/local-work"
            iconSpec="grommet-icons:personal-computer"
            title="ローカル開発"
          />
          <NavItem
            path="/settings"
            iconSpec="material-symbols:settings"
            title="設定"
            if={loggedIn}
          />
          <NavItem
            path="/development"
            iconSpec="carbon:debug"
            title="development"
            if={appConfig.isDevelopment}
          />
          <NavItem_Button
            path="/auth/github"
            iconSpec="material-symbols:login"
            title="ログイン(github)"
            if={!loggedIn}
          />
          <NavItem_Button
            path="/auth/logout"
            iconSpec="material-symbols:logout"
            title="ログアウト"
            if={loggedIn}
          />
        </Nav>
        <LoginUserBox
          user={loginUser!}
          if={loginUser ?? undefined}
          q="login-user-box"
        />
      </div>
    );
  },
  css`
    width: 260px;
    background: var(--cl-side-bar-fill);
    /* border-right: solid 1px var(--cl-side-bar-edge); */
    padding: 20px 16px;
    ${flexVertical(16)};
  `
);

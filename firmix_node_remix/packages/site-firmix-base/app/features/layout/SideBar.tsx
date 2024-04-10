import { css } from "@linaria/core";
import { createFC } from "auxiliaries/utils_fe_react/create_fc";
import { appConfig } from "~/base/app_config.ts";
import { useSiteContext } from "~/common/site_context.ts";
import { colors } from "~/common/ui_theme.ts";
import { flexVertical } from "~/common/utility_styles.ts";
import { Nav, NavItem, NavItem_Button } from "~/components/CommonControls.tsx";
import { LoginUserBox } from "~/features/layout/LoginUserBox.tsx";

export const SideBar = createFC(() => {
  const { loginUser } = useSiteContext();
  const loggedIn = !!loginUser;
  return (
    <div q={style}>
      <Nav>
        <NavItem path="/" iconSpec="lucide:package" title="プロジェクト一覧" />
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
});

const style = css`
  width: 240px;
  background: ${colors.sideBarFill};
  border-right: solid 1px ${colors.sideBarEdge};
  padding: 20px 8px;
  ${flexVertical(8)};

  > .login-user-box {
    padding: 8px;
  }
`;

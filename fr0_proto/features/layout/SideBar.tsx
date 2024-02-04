import { css } from "resin";
import { createFC } from "~/aux/utils_fe/create_fc.ts";
import { appConfig } from "~/base/app_config.ts";
import { useSiteContext } from "~/common/site_context.ts";
import { colors } from "~/common/ui_theme.ts";
import { Nav, NavItem } from "~/components/CommonControls.tsx";

export const SideBar = createFC(() => {
  const { loginUser } = useSiteContext();
  const loggedIn = !!loginUser;
  return (
    <div q={style}>
      <Nav>
        <NavItem path="/" iconSpec="lucide:package" title="プロジェクト一覧" />
        <NavItem
          path="/user-projects/__user_id__"
          iconSpec="ph:toolbox"
          title="自分のプロジェクト"
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
        <NavItem
          path="/auth/github"
          iconSpec="material-symbols:login"
          title="ログイン(github)"
          if={!loggedIn}
        />
        <NavItem
          path="/auth/logout"
          iconSpec="material-symbols:logout"
          title="ログアウト"
          if={loggedIn}
        />
      </Nav>
      <div>
        <div if={loggedIn}>logged in as {loginUser?.userName}</div>
        <div if={!loggedIn}>not logged in</div>
      </div>
    </div>
  );
});

const style = css`
  width: 240px;
  background: ${colors.sideBarFill};
  border-right: solid 1px ${colors.sideBarEdge};
  padding: 20px 8px;
`;

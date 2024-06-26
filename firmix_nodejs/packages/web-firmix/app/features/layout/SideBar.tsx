import { createFC } from "@mx/auxiliaries/utils_fe_react/create_fc";
import { appConfig } from "@mx/web-firmix/app/base/app_config";
import { useSiteContext } from "@mx/web-firmix/app/common/site_context";
import { LoginUserBox } from "@mx/web-firmix/app/features/layout/LoginUserBox";
import { Stack } from "../../../styled-system/jsx";
import { Nav, NavItem, NavItem_Button } from "../../components/CommonControls";

export const SideBar = createFC(() => {
  const { loginUser } = useSiteContext();
  const loggedIn = !!loginUser;
  return (
    <Stack
      gap={4}
      width="260px"
      p="20px 16px"
      background="var(--cl-side-bar-fill)"
      // borderRight="solid 1px var(--cl-side-bar-edge)"
    >
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
      <LoginUserBox user={loginUser!} if={loginUser ?? undefined} />
    </Stack>
  );
});

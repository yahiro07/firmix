import { appConfig } from "../../base/app_config";
import { useSiteContext } from "../../common/site_context";
import { createFCE } from "../../common_styling/create_fce";
import { VStack } from "../../common_styling/utility_components";
import { Nav, NavItem, NavItem_Button } from "../../components/CommonControls";
import { LoginUserBox } from "./LoginUserBox";

export const SideBar = createFCE(() => {
  const { loginUser } = useSiteContext();
  const loggedIn = !!loginUser;
  return (
    <VStack
      gap="16px"
      width="260px"
      p="20px 16px"
      bgcolor="var(--cl-side-bar-fill)"
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
    </VStack>
  );
});

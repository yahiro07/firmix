import { css } from "resin";
import { createFC } from "~/aux/utils_fe/create_fc.ts";
import { LoginUser } from "~/base/types_dto_internal.ts";
import {
  flexHorizontalAligned,
  flexVertical,
} from "~/common/utility_styles.ts";
import { IconIconify } from "~/components/IconIconify.tsx";

type Props = {
  loginUser: LoginUser | undefined;
};

export const MainLayout = createFC<Props>(({ loginUser, children }) => {
  const loggedIn = !!loginUser;
  return (
    <div q={style}>
      <div q="header-bar">
        <IconIconify spec="mdi:chip" q="icon" />
        <h1>Firmix</h1>
      </div>
      <div q="main-row">
        <div q="side-bar">
          <nav>
            <a href="/">プロジェクト一覧</a>
            <a href="/user-projects/__user_id__">自分のプロジェクト</a>
            <a href="/local-work">ローカル開発</a>
            <a href="/settings" if={loggedIn}>
              設定
            </a>
            <a href="/development">development</a>
            <a href="/auth/github" if={!loggedIn}>
              ログイン(github)
            </a>
            <a href="/auth/logout" if={loggedIn}>
              ログアウト
            </a>
            <div if={loggedIn}>logged in as {loginUser?.userName}</div>
            <div if={!loggedIn}>not logged in</div>
          </nav>
        </div>
        <div q="main-column">
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
});

const style = css`
  height: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #ddd;
  > .header-bar {
    background: #76d;
    color: #fff;
    padding: 0 12px;
    flex-shrink: 0;
    ${flexHorizontalAligned(2)};
    > .icon {
      font-size: 38px;
    }
  }
  > .main-row {
    background: #eee;
    flex-grow: 1;
    display: flex;
    > .side-bar {
      width: 200px;
      background: #ccc;
      border-right: solid 1px #aaa;
      padding: 20px 12px;
      flex-shrink: 0;
      > nav {
        ${flexVertical(12)};
      }
    }
    > .main-column {
      flex-grow: 1;
      display: flex;
      justify-content: center;
      /* border: solid 1px red; */
      > div {
        flex-grow: 1;
        max-width: 900px;
        /* border: solid 1px blue; */
      }
    }
  }
`;

import { ComponentChildren } from "preact";
import { css } from "~/aux/resin/resin_css.ts";
import { createFC } from "~/aux/utils_fe/create_fc.ts";
import { flexVertical } from "~/common/utility_styles.ts";

type Props = {
  children: ComponentChildren;
};

export const MainLayout = createFC(({ children }) => {
  return (
    <div q={style}>
      <div q="header-bar">
        <h1>Firmix</h1>
      </div>
      <div q="main-row">
        <div q="side-bar">
          <nav>
            <a href="/">プロジェクト一覧</a>
            <a href="/user-projects/__user_id__">自分のプロジェクト</a>
            <a href="/local-work">ローカル開発</a>
            <a href="/settings">設定</a>
          </nav>
        </div>
        <div q="main-column">{children}</div>
      </div>
    </div>
  );
});

const style = css`
  height: 100vh;
  display: flex;
  flex-direction: column;
  > .header-bar {
    background: #76d;
    color: #fff;
    padding: 0 12px;
    flex-shrink: 0;
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
      > nav {
        ${flexVertical(12)};
      }
    }
    > .main-column {
      flex-grow: 1;
    }
  }
`;

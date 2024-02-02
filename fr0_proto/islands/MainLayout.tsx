import { css } from "resin";
import { createFC } from "~/aux/utils_fe/create_fc.ts";
import { LoginUser } from "~/base/types_dto_internal.ts";
import { flexHorizontalAligned } from "~/common/utility_styles.ts";
import { IconIconify } from "~/components/IconIconify.tsx";
import { SideBar } from "~/features/layout/SideBar.tsx";

type Props = {
  loginUser: LoginUser | undefined;
};

export const MainLayout = createFC<Props>(({ loginUser, children }) => {
  return (
    <div q={style}>
      <div q="header-bar">
        <IconIconify spec="mdi:chip" q="icon" />
        <h1>Firmix</h1>
      </div>
      <div q="main-row">
        <SideBar q="side-bar" loginUser={loginUser} />
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
      flex-shrink: 0;
    }
    > .main-column {
      flex-grow: 1;
      display: flex;
      justify-content: center;
      /* padding: 16px 0; */
      > div {
        flex-grow: 1;
        max-width: 900px;
      }
    }
  }
`;

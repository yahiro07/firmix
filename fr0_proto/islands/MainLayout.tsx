import { css } from "resin";
import { createFC } from "~/auxiliaries/utils_fe/create_fc.ts";
import { colors } from "~/common/ui_theme.ts";
import { flexAligned } from "~/common/utility_styles.ts";
import { IconIconifyZ } from "~/components/IconIconifyZ.tsx";
import { SideBar } from "~/features/layout/SideBar.tsx";

export const MainLayout = createFC(({ children }) => {
  return (
    <div q={[style, "main-layout-root"]}>
      <div q="header-bar">
        <IconIconifyZ spec="mdi:chip" q="site-icon" />
        <h1>
          Firmix <span q="beta">(beta)</span>
        </h1>
      </div>
      <div q="main-row">
        <SideBar q="side-bar" />
        <div q="main-column">
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
});

const style = css`
  /* height: 100%; */
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${colors.pageBackground};
  color: ${colors.foregroundText};

  > .header-bar {
    position: sticky;
    width: 100%;
    top: 0;
    z-index: 100;
    background: ${colors.topBarFill};
    color: ${colors.topBarText};
    height: 60px;
    padding: 0 12px;
    flex-shrink: 0;
    ${flexAligned(2)};
    > .site-icon {
      font-size: 44px;
      margin-top: 3px;
    }
    > h1 {
      ${flexAligned(8)};
      font-size: 36px;
      font-weight: bold;
      color: ${colors.topBarText};

      > .beta {
        font-size: 28px;
        font-weight: normal;
        margin-top: 5px;
      }
    }
  }
  > .main-row {
    flex-grow: 1;
    display: flex;
    > .side-bar {
      position: sticky;
      top: 60px;
      height: calc(100vh - 60px);
      flex-shrink: 0;
    }
    > .main-column {
      flex-grow: 1;
      display: flex;
      justify-content: center;
      /* padding: 16px 0; */
      > div {
        flex-grow: 1;
        max-width: 800px;
      }
    }
  }
`;

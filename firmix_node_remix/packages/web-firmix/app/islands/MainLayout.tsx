import { css } from "@linaria/core";
import { createFCX } from "auxiliaries/utils_fe_react/fcx";
import { ReactNode } from "react";
import { flexAligned } from "shared/common/utility_styles.ts";
import { IconIconifyZ } from "shared/components/IconIconifyZ.tsx";
import { SideBar } from "web-firmix/app/features/layout/SideBar.tsx";

const SiteTitle = createFCX(
  () => {
    return (
      <div>
        <IconIconifyZ spec="mdi:chip" q="site-icon" />
        <h1>
          Firmix <span q="beta">(beta)</span>
        </h1>
      </div>
    );
  },
  css`
    ${flexAligned(2)};
    color: var(--cl-top-bar-text);

    > .site-icon {
      font-size: 44px;
      margin-top: 3px;
    }
    > h1 {
      ${flexAligned(8)};
      font-size: 36px;
      font-weight: bold;
      margin: 0;

      > .beta {
        font-size: 28px;
        font-weight: normal;
        margin-top: 5px;
      }
    }
  `
);

const TopBar = createFCX(
  () => (
    <div>
      <SiteTitle />
    </div>
  ),
  css`
    background: var(--cl-top-bar-fill);
    height: 60px;
    padding: 0 12px;
    ${flexAligned()};
  `
);

const MainRow = createFCX<{ children: ReactNode }>(
  ({ children }) => {
    return (
      <div>
        <SideBar q="side-bar" />
        <div q="main-column">
          <div>{children}</div>
        </div>
      </div>
    );
  },
  css`
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
  `
);

export const MainLayout = createFCX(
  ({ children }: { children: ReactNode }) => {
    return (
      <div q={["main-layout-root"]}>
        <TopBar q="site-top-bar" />
        <MainRow q="main-row">{children}</MainRow>
      </div>
    );
  },
  css`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background: var(--cl-page-background);
    color: var(--cl-foreground-text);

    > .site-top-bar {
      position: sticky;
      width: 100%;
      top: 0;
      z-index: 100;
      flex-shrink: 0;
    }

    > .main-row {
      flex-grow: 1;
    }
  `
);
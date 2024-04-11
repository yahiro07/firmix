import { css } from "@linaria/core";
import { createFCX } from "auxiliaries/utils_fe_react/fcx";
import { uiStyleClickable } from "shared/common/common_styles.ts";
import { uiSystem } from "shared/common/ui_system.ts";
import { flexAligned } from "shared/common/utility_styles.ts";
import { ProjectRealm } from "web-firmix/app/base/types_app_common.ts";
import { coactiveStateWriter } from "web-firmix/app/common/coactive_state_writer.ts";
import { useSiteContext } from "web-firmix/app/common/site_context.ts";

export const HomeTargetSelectionBar = createFCX(
  () => {
    const { coactiveState } = useSiteContext();

    const handleSelect = (realm: ProjectRealm) => {
      coactiveStateWriter.setValue({ homeTargetRealm: realm });
      uiSystem.reload();
    };

    const realm = coactiveState.homeTargetRealm;

    return (
      <div>
        <div
          q={realm === "keyboard" && "--active"}
          onClick={() => handleSelect("keyboard")}
        >
          自作キーボード
        </div>
        <div
          q={realm === "general" && "--active"}
          onClick={() => handleSelect("general")}
        >
          電子工作
        </div>
      </div>
    );
  },
  css`
    ${flexAligned(16)};
    > div {
      ${uiStyleClickable};
      &.--active {
        font-weight: bold;
      }
    }
  `
);

import { css } from "@linaria/core";
import { uiSystem } from "@mx/shared/common/ui_system";
import { ProjectRealm } from "@mx/web-kfx/app/base/types_app_common";
import { coactiveStateWriter } from "@mx/web-kfx/app/common/coactive_state_writer";
import { createFCX } from "@mx/web-kfx/app/common/fcx";
import { useSiteContext } from "@mx/web-kfx/app/common/site_context";
import { uiStyleClickable } from "../../common_styling/common_styles";
import { flexAligned } from "../../common_styling/utility_styles";

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

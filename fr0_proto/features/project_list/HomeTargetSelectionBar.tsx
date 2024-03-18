import { createFCX, css } from "resin";
import { ProjectRealm } from "~/base/types_app_common.ts";
import { coactiveStateWriter } from "~/common/coactive_state_writer.ts";
import { uiStyleClickable } from "~/common/common_styles.ts";
import { uiSystem } from "~/common/ui_system.ts";
import { flexAligned } from "~/common/utility_styles.ts";

export const HomeTargetSelectionBar = createFCX(
  () => {
    const handleSelect = (realm: ProjectRealm) => {
      coactiveStateWriter.setValue({ homeTargetRealm: realm });
      uiSystem.reload();
    };

    return (
      <div>
        <div onClick={() => handleSelect("general")}>一般</div>
        <div onClick={() => handleSelect("keyboard")}>キーボード</div>
      </div>
    );
  },
  css`
    ${flexAligned(16)};
    > div {
      ${uiStyleClickable};
    }
  `
);

import { uiSystem } from "@mx/shared/common/ui_system";
import { ProjectRealm } from "@mx/web-kfx/app/base/types_app_common";
import { coactiveStateWriter } from "@mx/web-kfx/app/common/coactive_state_writer";
import { createFCX } from "@mx/web-kfx/app/common/fcx";
import { useSiteContext } from "@mx/web-kfx/app/common/site_context";
import { css } from "../../../styled-system/css";
import { Box, HStack } from "../../../styled-system/jsx";
import { styleObj_uiStyleClickable } from "../../common_styling/common_styles";

export const HomeTargetSelectionBar = createFCX(() => {
  const { coactiveState } = useSiteContext();

  const handleSelect = (realm: ProjectRealm) => {
    coactiveStateWriter.setValue({ homeTargetRealm: realm });
    uiSystem.reload();
  };

  const realm = coactiveState.homeTargetRealm;

  return (
    <HStack gap="16px">
      <Box
        {...styleObj_uiStyleClickable}
        q={realm === "keyboard" && css({ fontWeight: "bold" })}
        onClick={() => handleSelect("keyboard")}
      >
        自作キーボード
      </Box>
      <Box
        {...styleObj_uiStyleClickable}
        q={realm === "general" && css({ fontWeight: "bold" })}
        onClick={() => handleSelect("general")}
      >
        電子工作
      </Box>
    </HStack>
  );
});

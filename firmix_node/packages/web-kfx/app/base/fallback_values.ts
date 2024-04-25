import { appConfig } from "@mx/web-kfx/app/base/app_config";
import { CoactiveState } from "@mx/web-kfx/app/base/types_dto";

const typed = <T>(value: T) => value;

export const fallbackValues = {
  coactiveState: typed<CoactiveState>({
    homeTargetRealm: appConfig.defaultRealm,
  }),
};

import { appConfig } from "@m/web-firmix/base/app_config.ts";
import { CoactiveState } from "@m/web-firmix/base/types_dto.ts";

const typed = <T>(value: T) => value;

export const fallbackValues = {
  coactiveState: typed<CoactiveState>({
    homeTargetRealm: appConfig.defaultRealm,
  }),
};

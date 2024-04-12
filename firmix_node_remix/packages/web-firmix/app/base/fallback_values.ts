import { appConfig } from "web-firmix/app/base/app_config";
import { CoactiveState } from "web-firmix/app/base/types_dto";

const typed = <T>(value: T) => value;

export const fallbackValues = {
  coactiveState: typed<CoactiveState>({
    homeTargetRealm: appConfig.defaultRealm,
  }),
};

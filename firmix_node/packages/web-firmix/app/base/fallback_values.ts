import { CoactiveState } from "./types_dto";

const typed = <T>(value: T) => value;

export const fallbackValues = {
  coactiveState: typed<CoactiveState>({
    homeTargetRealm_deprecated: "unused",
  }),
};

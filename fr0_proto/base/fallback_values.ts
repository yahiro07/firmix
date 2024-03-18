import { CoactiveState } from "~/base/types_dto.ts";

const typed = <T>(value: T) => value;

export const fallbackValues = {
  coactiveState: typed<CoactiveState>({
    homeTargetRealm: "general",
  }),
};

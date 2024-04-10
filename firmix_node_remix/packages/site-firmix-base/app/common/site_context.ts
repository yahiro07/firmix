import { createContext, useContext } from "~/auxiliaries/fe-deps-react";
import { CoactiveState } from "~/base/types_dto.ts";
import { LoginUser } from "~/base/types_dto_internal.ts";

export type SiteContextValue = {
  pagePath: string;
  loginUser: LoginUser | null;
  coactiveState: CoactiveState;
};

export const siteContext = createContext<SiteContextValue>({} as any);
export const useSiteContext = () => useContext(siteContext);

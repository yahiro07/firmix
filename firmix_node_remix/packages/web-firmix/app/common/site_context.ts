import { CoactiveState } from "@m/web-firmix/base/types_dto.ts";
import { LoginUser } from "@m/web-firmix/base/types_dto_internal.ts";
import { createContext, useContext } from "auxiliaries/fe-deps-react";

export type SiteContextValue = {
  pagePath: string;
  loginUser: LoginUser | null;
  coactiveState: CoactiveState;
};

export const siteContext = createContext<SiteContextValue>({} as any);
export const useSiteContext = () => useContext(siteContext);

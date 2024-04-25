import { createContext, useContext } from "react";
import { CoactiveState } from "../base/types_dto";
import { LoginUser } from "../base/types_dto_internal";

export type SiteContextValue = {
  pagePath: string;
  loginUser: LoginUser | null;
  coactiveState: CoactiveState;
};

export const siteContext = createContext<SiteContextValue>({} as any);
export const useSiteContext = () => useContext(siteContext);

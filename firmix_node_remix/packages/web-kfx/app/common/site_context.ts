import { createContext, useContext } from "auxiliaries/fe-deps-react";
import { CoactiveState } from "web-kfx/app/base/types_dto";
import { LoginUser } from "web-kfx/app/base/types_dto_internal";

export type SiteContextValue = {
  pagePath: string;
  loginUser: LoginUser | null;
  coactiveState: CoactiveState;
};

export const siteContext = createContext<SiteContextValue>({} as any);
export const useSiteContext = () => useContext(siteContext);

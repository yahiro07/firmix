import { createContext, useContext } from "@mx/auxiliaries/fe-deps-react";
import { CoactiveState } from "@mx/web-kfx/app/base/types_dto";
import { LoginUser } from "@mx/web-kfx/app/base/types_dto_internal";

export type SiteContextValue = {
  pagePath: string;
  loginUser: LoginUser | null;
  coactiveState: CoactiveState;
};

export const siteContext = createContext<SiteContextValue>({} as any);
export const useSiteContext = () => useContext(siteContext);

import { createContext } from "preact";
import { useContext } from "preact/hooks";
import { CoactiveState } from "~/base/types_dto.ts";
import { LoginUser } from "~/base/types_dto_internal.ts";

export type SiteContextValue = {
  pagePath: string;
  loginUser: LoginUser | undefined;
  coactiveState: CoactiveState;
};

export const siteContext = createContext<SiteContextValue>({} as any);
export const useSiteContext = () => useContext(siteContext);

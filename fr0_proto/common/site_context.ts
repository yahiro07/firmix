import { createContext } from "preact";
import { useContext } from "preact/hooks";
import { LoginUser } from "~/base/types_dto_internal.ts";

export type SiteContextValue = {
  pagePath: string;
  loginUser: LoginUser | undefined;
};

export const siteContext = createContext<SiteContextValue>({} as any);
export const useSiteContext = () => useContext(siteContext);

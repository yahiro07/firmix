import {
  SiteContextValue,
  siteContext,
} from "@m/web-firmix/common/site_context.ts";
import { FC, ReactNode } from "auxiliaries/fe-deps-react";

export const SiteContextProvider: FC<{
  value: SiteContextValue;
  children: ReactNode;
}> = ({ value, children }) => {
  return <siteContext.Provider value={value}>{children}</siteContext.Provider>;
};

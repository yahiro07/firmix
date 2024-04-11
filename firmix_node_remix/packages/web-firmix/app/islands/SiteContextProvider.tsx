import { FC, ReactNode } from "auxiliaries/fe-deps-react";
import {
  SiteContextValue,
  siteContext,
} from "web-firmix/app/common/site_context.ts";

export const SiteContextProvider: FC<{
  value: SiteContextValue;
  children: ReactNode;
}> = ({ value, children }) => {
  return <siteContext.Provider value={value}>{children}</siteContext.Provider>;
};

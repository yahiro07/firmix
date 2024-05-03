import { FC, ReactNode } from "@mx/auxiliaries/fe-deps-react";
import {
  SiteContextValue,
  siteContext,
} from "@mx/web-firmix/app/common/site_context";

export const SiteContextProvider: FC<{
  value: SiteContextValue;
  children: ReactNode;
}> = ({ value, children }) => {
  return <siteContext.Provider value={value}>{children}</siteContext.Provider>;
};

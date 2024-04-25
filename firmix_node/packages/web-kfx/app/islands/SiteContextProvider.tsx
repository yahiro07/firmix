import { FC, ReactNode } from "auxiliaries/fe-deps-react";
import { SiteContextValue, siteContext } from "web-kfx/app/common/site_context";

export const SiteContextProvider: FC<{
  value: SiteContextValue;
  children: ReactNode;
}> = ({ value, children }) => {
  return <siteContext.Provider value={value}>{children}</siteContext.Provider>;
};

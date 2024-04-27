"use client";
import { FC, ReactNode } from "react";
import { SiteContextValue, siteContext } from "../common/site_context";

export const SiteContextProvider: FC<{
  value: SiteContextValue;
  children: ReactNode;
}> = ({ value, children }) => {
  return <siteContext.Provider value={value}>{children}</siteContext.Provider>;
};

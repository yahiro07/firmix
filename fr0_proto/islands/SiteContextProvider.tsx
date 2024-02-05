import { createFC } from "~/auxiliaries/utils_fe/create_fc.ts";
import { SiteContextValue, siteContext } from "~/common/site_context.ts";

export const SiteContextProvider = createFC<{
  value: SiteContextValue;
}>(({ value, children }) => {
  return <siteContext.Provider value={value}>{children}</siteContext.Provider>;
});

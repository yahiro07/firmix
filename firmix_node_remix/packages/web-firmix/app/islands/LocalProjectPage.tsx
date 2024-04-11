import { LocalProjectPageImpl } from "@m/web-firmix/features/local_project/LocalProjectPageImpl.tsx";
import { createFC } from "auxiliaries/utils_fe_react/create_fc";

type Props = {
  loggedIn: boolean;
};

export const LocalProjectPage = createFC<Props>(({ loggedIn }) => {
  return <LocalProjectPageImpl loggedIn={loggedIn} />;
});

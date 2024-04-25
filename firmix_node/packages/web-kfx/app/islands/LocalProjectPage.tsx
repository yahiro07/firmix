import { createFC } from "@mx/auxiliaries/utils_fe_react/create_fc";
import { LocalProjectPageImpl } from "web-kfx/app/features/local_project/LocalProjectPageImpl";

type Props = {
  loggedIn: boolean;
};

export const LocalProjectPage = createFC<Props>(({ loggedIn }) => {
  return <LocalProjectPageImpl loggedIn={loggedIn} />;
});

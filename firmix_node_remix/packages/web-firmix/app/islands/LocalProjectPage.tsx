import { createFC } from "auxiliaries/utils_fe_react/create_fc";
import { LocalProjectPageImpl } from "web-firmix/app/features/local_project/LocalProjectPageImpl.tsx";

type Props = {
  loggedIn: boolean;
};

export const LocalProjectPage = createFC<Props>(({ loggedIn }) => {
  return <LocalProjectPageImpl loggedIn={loggedIn} />;
});

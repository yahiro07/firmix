import { createFC } from "~/auxiliaries/utils_fe/create_fc.ts";
import { LocalProjectPageImpl } from "~/features/local_project/LocalProjectPageImpl.tsx";

type Props = {
  loggedIn: boolean;
};

export const LocalProjectPage = createFC<Props>(({ loggedIn }) => {
  return <LocalProjectPageImpl loggedIn={loggedIn} />;
});

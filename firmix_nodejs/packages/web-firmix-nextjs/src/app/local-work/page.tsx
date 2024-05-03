import { clientStorageImpl } from "../../central/system/client_storage_impl";
import { LocalProjectPage } from "../../screens/LocalProjectPage";
import { createPage } from "../route_helper";

export default createPage(() => {
  const loggedIn = !!clientStorageImpl.readCookieLoginUserClue();
  return <LocalProjectPage loggedIn={loggedIn} />;
});

"use client";
import { createFC } from "@mx/auxiliaries/utils_fe_react/create_fc";
import { LocalProjectPageImpl } from "../features/local_project/LocalProjectPageImpl";

type Props = {
  loggedIn: boolean;
};

export const LocalProjectPage = createFC<Props>(({ loggedIn }) => {
  return <LocalProjectPageImpl loggedIn={loggedIn} />;
});

import { createFC } from "~/aux/utils_fe/create_fc.ts";
import { LocalProjectPageImpl } from "~/features/local_project/LocalProjectPageImpl.tsx";

export const LocalProjectPage = createFC(() => {
  return <LocalProjectPageImpl />;
});

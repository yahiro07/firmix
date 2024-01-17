import { createFC } from "~/aux/utils_fe/create_fc.ts";
import { LocalProjectPageImpl } from "~/features/local_project/LocalProjectPage.tsx";
import { useLocalProjectPageStore } from "~/features/local_project/local_project_page_store.ts";

export const LocalProjectDevelopmentPage = createFC(() => {
  const store = useLocalProjectPageStore();
  return <LocalProjectPageImpl store={store} />;
});

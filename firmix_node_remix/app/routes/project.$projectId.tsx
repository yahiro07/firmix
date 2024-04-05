import { useLoaderData } from "@remix-run/react";
import { serverShell } from "~/central/server_shell.ts";
import { clientStorageImpl } from "~/central/system/client_storage_impl.ts";
import { ProjectDetailPage } from "~/islands/ProjectDetailPage.tsx";
import { createLoader, createPage } from "~/system/route_helper";

export const loader = createLoader(async ({ request, params }) => {
  const loginUserClue = clientStorageImpl.readCookieLoginUserClue(request);
  const projectId = params.projectId!;
  const project = await serverShell.projectListService.getProjectDetail(
    projectId,
    loginUserClue?.userId ?? ""
  );
  return { project };
});

export default createPage(() => {
  const { project } = useLoaderData<typeof loader>();
  return <ProjectDetailPage project={project} />;
});

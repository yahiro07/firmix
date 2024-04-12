import { useLoaderData } from "@remix-run/react";
import { createLoader, createPage } from "shared/system/route_helper";
import { serverShell } from "web-firmix/app/central/server_shell";
import { clientStorageImpl } from "web-firmix/app/central/system/client_storage_impl";
import { ProjectDetailPage } from "web-firmix/app/islands/ProjectDetailPage";

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

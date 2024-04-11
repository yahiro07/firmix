import { useLoaderData } from "@remix-run/react";
import { createLoader, createPage } from "shared/system/route_helper";
import { serverShell } from "~/central/server_shell.ts";
import { clientStorageImpl } from "~/central/system/client_storage_impl.ts";
import { ProjectDetailPage } from "~/islands/ProjectDetailPage.tsx";

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

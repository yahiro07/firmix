import { serverShell } from "@mx/web-kfx/app/central/server_shell";
import { clientStorageImpl } from "@mx/web-kfx/app/central/system/client_storage_impl";
import { ProjectDetailPage } from "@mx/web-kfx/app/islands/ProjectDetailPage";
import { createLoader, createPage } from "@mx/web-kfx/app/system/route_helper";
import { MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const loader = createLoader(async ({ request, params }) => {
  const loginUserClue = clientStorageImpl.readCookieLoginUserClue(request);
  const projectId = params.projectId!;
  const project = await serverShell.projectListService.getProjectDetail(
    projectId,
    loginUserClue?.userId ?? ""
  );
  return { project };
});

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (data?.project) {
    const {
      projectName: title,
      thumbnailUrl: imageUrl,
      introduction,
    } = data.project;
    return [
      { title },
      { property: "og:title", content: title },
      { property: "og:image", content: imageUrl },
      { property: "og:description", content: introduction },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:image", content: imageUrl },
      { name: "twitter:description", content: introduction },
    ];
  } else {
    return [{ title: "failed to load project" }];
  }
};

export default createPage(() => {
  const { project } = useLoaderData<typeof loader>();
  return <ProjectDetailPage project={project} />;
});

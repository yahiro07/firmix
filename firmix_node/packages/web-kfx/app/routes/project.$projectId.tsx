import { MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { createLoader, createPage } from "shared/system/route_helper";
import { serverShell } from "web-kfx/app/central/server_shell";
import { clientStorageImpl } from "web-kfx/app/central/system/client_storage_impl";
import { ProjectDetailPage } from "web-kfx/app/islands/ProjectDetailPage";

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

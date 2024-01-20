import { createProjectListService } from "~/be/services/project_list_service.ts";
import { createProjectService } from "~/be/services/project_service.ts";

function createServerShell() {
  const projectService = createProjectService();
  const projectListService = createProjectListService();
  return {
    projectService,
    projectListService,
  };
}

export const serverShell = createServerShell();

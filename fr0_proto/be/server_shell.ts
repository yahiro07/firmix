import { createFirmwareService } from "~/be/services/firmware_service.ts";
import { createProjectListService } from "~/be/services/project_list_service.ts";
import { createProjectService } from "~/be/services/project_service.ts";
import { createUserService } from "~/be/services/user_service.ts";

function createServerShell() {
  const projectService = createProjectService();
  const projectListService = createProjectListService();
  const firmwareService = createFirmwareService();
  const userService = createUserService();
  return {
    projectService,
    projectListService,
    firmwareService,
    userService,
  };
}

export const serverShell = createServerShell();

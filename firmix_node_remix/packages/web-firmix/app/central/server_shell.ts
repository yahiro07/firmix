import { createFirmwareService } from "web-firmix/app/central/services/firmware_service.ts";
import { createProjectListService } from "web-firmix/app/central/services/project_list_service.ts";
import { createProjectService } from "web-firmix/app/central/services/project_service.ts";
import { createUserService } from "web-firmix/app/central/services/user_service.ts";

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

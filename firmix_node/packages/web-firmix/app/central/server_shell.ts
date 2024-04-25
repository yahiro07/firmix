import { createFirmwareService } from "@mx/web-firmix/app/central/services/firmware_service";
import { createProjectListService } from "@mx/web-firmix/app/central/services/project_list_service";
import { createProjectService } from "@mx/web-firmix/app/central/services/project_service";
import { createUserService } from "@mx/web-firmix/app/central/services/user_service";

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

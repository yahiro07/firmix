import { createFirmwareService } from "./services/firmware_service";
import { createProjectListService } from "./services/project_list_service";
import { createProjectService } from "./services/project_service";
import { createUserService } from "./services/user_service";

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

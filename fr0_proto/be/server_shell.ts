import { createFirmwareService } from "./services/firmware_service.ts";
import { createProjectService } from "./services/project_service.ts";

function createServerShell() {
  const projectService = createProjectService();
  const firmwareService = createFirmwareService();
  return {
    projectService,
    firmwareService,
  };
}

export const serverShell = createServerShell();

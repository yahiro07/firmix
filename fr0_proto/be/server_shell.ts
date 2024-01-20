import { createFirmwareService } from "~/be/services/firmware_service.ts";
import { createProjectService } from "~/be/services/project_service.ts";

function createServerShell() {
  const projectService = createProjectService();
  const firmwareService = createFirmwareService();
  return {
    projectService,
    firmwareService,
  };
}

export const serverShell = createServerShell();

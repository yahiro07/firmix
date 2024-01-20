import { createFirmwareService } from "~/server/services/firmware_service.ts";
import { createProjectService } from "~/server/services/project_service.ts";

function createServerShell() {
  const projectService = createProjectService();
  const firmwareService = createFirmwareService();
  return {
    projectService,
    firmwareService,
  };
}

export const serverShell = createServerShell();

import { ServerRpcRouterWithContext } from "auxiliaries/chibi_rpc/types";
import { raiseError } from "auxiliaries/utils/error_util";
import { AppRpcContext, AppRpcSignatures } from "web-firmix/app/base/types_rpc";
import { serverShell } from "web-firmix/app/central/server_shell";

export const appRpcRouter: ServerRpcRouterWithContext<
  AppRpcSignatures,
  AppRpcContext
> = {
  async greet({ message }, { loginUserId }) {
    console.log("greet", message);
    return { resMessage: message + " world " + loginUserId };
  },
  async upsertProjectFromLocal({ projectPayload }, { loginUserId }) {
    if (!loginUserId) raiseError(`login required`);
    await serverShell.projectService.upsertProjectFromLocal(
      projectPayload,
      loginUserId
    );
  },
  async generatePatchedFirmware({ projectId }) {
    return await serverShell.firmwareService.generatePatchedFirmware(projectId);
  },
  async setApiKeyAvailability({ enabled }, { loginUserId }) {
    if (!loginUserId) raiseError(`login required`);
    return await serverShell.userService.setApiKeyAvailability(
      loginUserId,
      enabled
    );
  },
  async setProjectPublicity({ projectId, published }, { loginUserId }) {
    if (!loginUserId) raiseError(`login required`);
    return await serverShell.projectService.setProjectPublicity(
      projectId,
      published,
      loginUserId
    );
  },
  async deleteProject({ projectId }, { loginUserId }) {
    if (!loginUserId) raiseError(`login required`);
    return await serverShell.projectService.deleteProject(
      projectId,
      loginUserId
    );
  },
};

import {
  AppRpcContext,
  AppRpcSignatures,
} from "@m/web-firmix/base/types_rpc.ts";
import { serverShell } from "@m/web-firmix/central/server_shell.ts";
import { ServerRpcRouterWithContext } from "auxiliaries/chibi_rpc/types.ts";
import { raiseError } from "auxiliaries/utils/error_util.ts";

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
  async generatePatchedFirmware({ projectId, editItems }) {
    return await serverShell.firmwareService.generatePatchedFirmware(
      projectId,
      editItems
    );
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

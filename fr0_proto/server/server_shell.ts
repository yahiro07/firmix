import { serverFetchHelper } from "~/aux/utils_be/server_fetch_helper.ts";
import { CustomDataEditItem, ProjectDetail } from "~/base/domain_types.ts";

export const serverShell = {
  async loadProjectDetail(projectId: string): Promise<ProjectDetail> {
    const metaData = await serverFetchHelper.fetchJson(
      "http://localhost:3000/gadget1/metadata.json",
      {},
    ) as ProjectDetail["metaData"];
    return {
      projectId,
      projectName: "gadget1",
      metaData,
    };
  },
  async downloadPatchedFirmware(
    _projectId: string,
    _customDataEditItems: CustomDataEditItem[],
  ): Promise<ArrayBuffer> {
    const _metaData = await serverFetchHelper.fetchJson(
      "http://localhost:3000/gadget1/metadata.json",
      {},
    ) as ProjectDetail["metaData"];
    const firmwareBinary = await serverFetchHelper.fetchBinary(
      "http://localhost:3000/gadget1/firmware.uf2",
      {},
    );
    return firmwareBinary;
  },
};

import { filePathHelper } from "@mx/auxiliaries/utils/file_path_helper";
import { serverFetchHelper } from "@mx/auxiliaries/utils_be/server_fetch_helper";

type ProjectPartial = {
  projectId: string;
  firmwareBinaryUrl: string;
};

export const firmixPresenter_firmwarePatching = {
  async generatePatchedFirmware(
    project: ProjectPartial
  ): Promise<{ fileName: string; fileContentBytes: Uint8Array }> {
    const firmwareBinary = await serverFetchHelper.fetchBinary(
      project.firmwareBinaryUrl,
      {}
    );
    const fileName = filePathHelper.getFileNameFromFilePath(
      project.firmwareBinaryUrl
    );
    return {
      fileName,
      fileContentBytes: firmwareBinary,
    };
  },
};

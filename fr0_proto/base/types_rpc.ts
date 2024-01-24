import { LocalProjectSubmissionInputDto } from "~/base/types_dto.ts";
import { ConfigurationEditItem } from "~/base/types_project_edit.ts";

type AsyncFn<P, R> = (payload: P) => Promise<R>;

export type AppRpcSignatures = {
  greet: AsyncFn<{ message: string }, { resMessage: string }>;
  createProjectFromLocal: AsyncFn<
    { projectInput: LocalProjectSubmissionInputDto },
    void
  >;
  generatePatchedFirmware: AsyncFn<
    { projectId: string; editItems: ConfigurationEditItem[] },
    { fileName: string; fileContentBytes_base64: string }
  >;
};

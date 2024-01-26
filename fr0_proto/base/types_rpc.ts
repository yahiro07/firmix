import { LocalProjectSubmissionPayload } from "~/base/types_dto_internal.ts";
import { ConfigurationEditItem } from "~/base/types_project_edit.ts";

type AsyncFn<P, R> = (payload: P) => Promise<R>;

export type AppRpcContext = {
  loginUserId: string;
};

export type AppRpcSignatures = {
  greet: AsyncFn<{ message: string }, { resMessage: string }>;
  upsertProjectFromLocal: AsyncFn<
    { projectPayload: LocalProjectSubmissionPayload },
    void
  >;
  generatePatchedFirmware: AsyncFn<
    { projectId: string; editItems: ConfigurationEditItem[] },
    { fileName: string; fileContentBytes_base64: string }
  >;
};
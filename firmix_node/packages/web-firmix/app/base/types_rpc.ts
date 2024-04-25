import { LocalProjectSubmissionPayload } from "./types_dto_internal";

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
    { projectId: string },
    { fileName: string; fileContentBytes_base64: string }
  >;
  setApiKeyAvailability: AsyncFn<{ enabled: boolean }, void>;
  setProjectPublicity: AsyncFn<{ projectId: string; published: boolean }, void>;
  deleteProject: AsyncFn<{ projectId: string }, void>;
};

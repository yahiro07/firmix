import { LocalProjectSubmissionInputDto } from "~/base/types_dto.ts";

type AsyncFn<P, R> = (payload: P) => Promise<R>;

export type AppRpcSignatures = {
  greet: AsyncFn<{ message: string }, { resMessage: string }>;
  createProjectFromLocal: AsyncFn<
    { projectInput: LocalProjectSubmissionInputDto },
    void
  >;
};

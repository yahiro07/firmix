import { LocalProjectSubmissionInputDto } from "~/base/dto_types.ts";

type AsyncFn<P, R> = (payload: P) => Promise<R>;

export type AppRpcSignatures = {
  greet: AsyncFn<{ message: string }, { resMessage: string }>;
  createProjectFromLocal: AsyncFn<
    { projectInput: LocalProjectSubmissionInputDto },
    void
  >;
};

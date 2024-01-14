type AsyncFn<P, R> = (payload: P) => Promise<R>;

export type AppRpcSignatures = {
  greet: AsyncFn<{ message: string }, { resMessage: string }>;
};

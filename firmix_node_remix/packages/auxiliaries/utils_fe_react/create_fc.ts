import { FC, ReactNode } from "auxiliaries/fe-deps-react";

export function createFC<P extends object>(
  baseFC: FC<P & { children?: ReactNode }>
): FC<P> {
  return baseFC;
}

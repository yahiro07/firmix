import type { FunctionComponent as FC } from "preact";

export function createFC<P extends object>(baseFC: FC<P>): FC<P> {
  return baseFC;
}

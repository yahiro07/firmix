import { useMemo } from "preact/hooks";
import { ProjectRepositoryInfo } from "~/base/types_app_common.ts";

export function useRepositoryDisplayInfo(
  sourceCodeUrl: string | undefined
): ProjectRepositoryInfo | undefined {
  return useMemo(() => {
    if (sourceCodeUrl?.startsWith("https://github.com/")) {
      const [, ownerName, repositoryName] = sourceCodeUrl
        .replace("https://", "")
        .split("/");
      if (ownerName && repositoryName) {
        const ownerIconUrl = `https://github.com/${ownerName}.png?size=48`;
        return {
          sourceCodeUrl,
          repositoryName,
          ownerName,
          ownerIconUrl,
        };
      }
    }
    return undefined;
  }, [sourceCodeUrl]);
}

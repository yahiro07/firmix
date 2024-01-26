import { useMemo } from "preact/hooks";
import { ProjectRepositoryInfo } from "~/base/types_app_common.ts";

export function useRepositoryDisplayInfo(
  repositoryUrl: string | undefined
): ProjectRepositoryInfo | undefined {
  return useMemo(() => {
    if (repositoryUrl?.startsWith("https://github.com/")) {
      const [, ownerName, repositoryName] = repositoryUrl
        .replace("https://", "")
        .split("/");
      if (ownerName && repositoryName) {
        const ownerIconUrl = `https://github.com/${ownerName}.png?size=48`;
        return {
          repositoryUrl,
          repositoryName,
          ownerName,
          ownerIconUrl,
        };
      }
    }
    return undefined;
  }, [repositoryUrl]);
}

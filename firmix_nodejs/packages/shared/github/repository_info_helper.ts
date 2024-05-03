import { useMemo } from "react";
import { ProjectRepositoryInfo } from "./types_github";

export function useRepositoryDisplayInfo(
  repositoryUrl: string | undefined
): ProjectRepositoryInfo | undefined {
  return useMemo(() => {
    if (repositoryUrl?.startsWith("https://github.com/")) {
      const ownerName = repositoryUrl
        .replace("https://github.com/", "")
        .split("/")[0];
      const repositoryProjectPath = repositoryUrl
        .replace("https://github.com/", "")
        .replace(/\/tree\/\w+/g, "");
      if (ownerName && repositoryProjectPath) {
        const ownerIconUrl = `https://github.com/${ownerName}.png?size=48`;
        return {
          repositoryUrl,
          repositoryProjectPath,
          ownerName,
          ownerIconUrl,
        };
      }
    }
    return undefined;
  }, [repositoryUrl]);
}

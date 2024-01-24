import { getEnvVariable } from "~/aux/utils_be/env_helper.ts";
import { ProjectEntity } from "~/base/types_db_entity.ts";

export const projectHelper = {
  getThumbnailImageUrl(project: ProjectEntity): string {
    const r2PublicUrl = getEnvVariable("R2_PUBLIC_URL");
    return `${r2PublicUrl}/${project.projectId}/${project.thumbnailFileName}?rev=1`;
  },
  getFirmwareBinaryUrl(project: ProjectEntity): string {
    const r2PublicUrl = getEnvVariable("R2_PUBLIC_URL");
    return `${r2PublicUrl}/${project.projectId}/${project.firmwareFileName}?rev=2`;
  },
};

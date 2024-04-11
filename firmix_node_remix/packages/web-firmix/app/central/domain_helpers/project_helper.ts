import { ProjectEntity } from "@m/web-firmix/base/types_db_entity.ts";
import { getEnvVariable } from "@m/web-firmix/central/base/envs.ts";

export const projectHelper = {
  getThumbnailImageUrl(project: ProjectEntity): string {
    const r2PublicUrl = getEnvVariable("R2_PUBLIC_URL");
    const { projectId, thumbnailFileName, thumbnailRevision } = project;
    return `${r2PublicUrl}/${projectId}/${thumbnailFileName}?rev=${thumbnailRevision}`;
  },
  getFirmwareBinaryUrl(project: ProjectEntity): string {
    const r2PublicUrl = getEnvVariable("R2_PUBLIC_URL");
    const { projectId, firmwareFileName, firmwareRevision } = project;
    return `${r2PublicUrl}/${projectId}/${firmwareFileName}?rev=${firmwareRevision}`;
  },
};

import { ProjectEntity } from "web-kfx/app/base/types_db_entity";
import { getEnvVariable } from "web-kfx/app/central/base/envs";

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

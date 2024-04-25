import { ProjectEntity } from "@mx/web-firmix/app/base/types_db_entity";
import { getEnvVariable } from "@mx/web-firmix/app/central/base/envs";

export const projectHelper = {
  getThumbnailImageUrl(project: ProjectEntity): string {
    const r3PublicUrl = getEnvVariable("S3_PUBLIC_URL");
    const { projectId, thumbnailFileName, thumbnailRevision } = project;
    return `${r3PublicUrl}/${projectId}/${thumbnailFileName}?rev=${thumbnailRevision}`;
  },
  getFirmwareBinaryUrl(project: ProjectEntity): string {
    const r3PublicUrl = getEnvVariable("S3_PUBLIC_URL");
    const { projectId, firmwareFileName, firmwareRevision } = project;
    return `${r3PublicUrl}/${projectId}/${firmwareFileName}?rev=${firmwareRevision}`;
  },
};

import { ProjectEntity } from "@mx/web-kfx/app/base/types_db_entity";
import { getEnvVariable } from "@mx/web-kfx/app/central/base/envs";

export const projectHelper = {
  getThumbnailImageUrl(project: ProjectEntity): string {
    const s3PublicUrl = getEnvVariable("S3_PUBLIC_URL");
    const { projectId, thumbnailFileName, thumbnailRevision } = project;
    return `${s3PublicUrl}/${projectId}/${thumbnailFileName}?rev=${thumbnailRevision}`;
  },
  getFirmwareBinaryUrl(project: ProjectEntity): string {
    const s3PublicUrl = getEnvVariable("S3_PUBLIC_URL");
    const { projectId, firmwareFileName, firmwareRevision } = project;
    return `${s3PublicUrl}/${projectId}/${firmwareFileName}?rev=${firmwareRevision}`;
  },
};

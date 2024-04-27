import { ProjectEntity } from "../../base/types_db_entity";
import { getEnvVariable } from "../base/envs";

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

import { ProjectEntity } from "~/base/types_db_entity.ts";
import { getEnvVariable } from "~/be/base/envs.ts";

export const projectHelper = {
  getFirmwareBinaryUrl(project: ProjectEntity): string {
    const r2PublicUrl = getEnvVariable("R2_PUBLIC_URL");
    const { projectId, firmwareFileName, firmwareRevision } = project;
    return `${r2PublicUrl}/${projectId}/${firmwareFileName}?rev=${firmwareRevision}`;
  },
};

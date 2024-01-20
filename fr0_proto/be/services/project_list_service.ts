import { getEnvVariable } from "~/aux/utils_be/env_helper.ts";
import { ProjectEntity } from "~/base/types_db_entity.ts";
import { ProjectListItemDto } from "~/base/types_dto.ts";
import { storehouse } from "~/be/depot/storehouse.ts";

export function createProjectListService() {
  return {
    async getProjectList_recent(): Promise<ProjectListItemDto[]> {
      const projects = await storehouse.colProject
        .aggregate([{ $sort: { projectId: -1 } }])
        .toArray();
      return projects.map(local.mapProjectEntityToListItemDto);
    },
  };
}

const local = {
  mapProjectEntityToListItemDto(project: ProjectEntity): ProjectListItemDto {
    const r2PublicUrl = getEnvVariable("R2_PUBLIC_URL");
    const thumbnailUrl = `${r2PublicUrl}/${project.projectId}/${project.thumbnailFileName}?rev=1`;
    return {
      projectId: project.projectId,
      projectName: project.projectName,
      introduction: project.introduction,
      targetMcu: project.targetMcu,
      primaryTargetBoard: project.primaryTargetBoard,
      thumbnailUrl,
    };
  },
};

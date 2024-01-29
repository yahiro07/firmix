import { ProjectEntity } from "~/base/types_db_entity.ts";
import { ProjectListItemDto } from "~/base/types_dto.ts";
import { storehouse } from "~/central/depot/storehouse.ts";

export function createProjectListService() {
  return {
    async getProjectList_recent(): Promise<ProjectListItemDto[]> {
      const projects = await storehouse.projectCollection
        .aggregate([{ $sort: { projectId: -1 } }])
        .toArray();
      return projects.map(local.mapProjectEntityToListItemDto);
    },
  };
}

const local = {
  mapProjectEntityToListItemDto(project: ProjectEntity): ProjectListItemDto {
    return {
      projectId: project.projectId,
      projectName: project.projectName,
      introduction: project.introduction,
      targetMcu: project.targetMcu,
      primaryTargetBoard: project.primaryTargetBoard,
      tags: project.tags,
      repositoryUrl: project.repositoryUrl,
      thumbnailUrl: project.thumbnailUrl,
    };
  },
};
import { specifyGithubAvatarUrlSize } from "~/base/avatar_size_modifier.ts";
import { ProjectRealm } from "~/base/types_app_common.ts";
import { ProjectEntity, UserEntity } from "~/base/types_db_entity.ts";
import { ProjectListItemDto } from "~/base/types_dto.ts";
import { storehouse } from "~/central/depot/storehouse.ts";
import { projectHelper } from "~/central/domain_helpers/project_helper.ts";

type ProjectUserAggregateResult = ProjectEntity & {
  user: UserEntity;
};

const projectUserLookups = [
  {
    $lookup: {
      from: "user",
      localField: "userId",
      foreignField: "userId",
      as: "user",
    },
  },
  { $unwind: "$user" },
];

export function createProjectListService() {
  return {
    async getProjectList_recent(
      realm: ProjectRealm
    ): Promise<ProjectListItemDto[]> {
      const projects = await storehouse.projectCollection
        .aggregate<ProjectUserAggregateResult>([
          { $match: { published: true, realm } },
          { $sort: { projectId: -1 } },
          ...projectUserLookups,
        ])
        .toArray();
      return projects.map(local.mapProjectEntityToListItemDto);
    },
    async getProjectList_self(userId: string): Promise<ProjectListItemDto[]> {
      const projects = await storehouse.projectCollection
        .aggregate<ProjectUserAggregateResult>([
          { $match: { userId } },
          { $sort: { projectId: -1 } },
          ...projectUserLookups,
        ])
        .toArray();
      return projects.map(local.mapProjectEntityToListItemDto);
    },
  };
}

const local = {
  mapProjectEntityToListItemDto(
    project: ProjectUserAggregateResult
  ): ProjectListItemDto {
    return {
      projectId: project.projectId,
      projectName: project.projectName,
      introduction: project.introduction,
      targetMcu: project.targetMcu,
      primaryTargetBoard: project.primaryTargetBoard,
      realm: project.realm,
      tags: project.tags,
      repositoryUrl: project.repositoryUrl,
      thumbnailUrl: projectHelper.getThumbnailImageUrl(project),
      published: project.published,
      userName: project.user.userName,
      userAvatarUrl: specifyGithubAvatarUrlSize(project.user.avatarUrl, 48),
    };
  },
};

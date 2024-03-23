import { specifyGithubAvatarUrlSize } from "~/base/avatar_size_modifier.ts";
import { ProjectRealm } from "~/base/types_app_common.ts";
import { ProjectEntity, UserEntity } from "~/base/types_db_entity.ts";
import { ProjectDetailDto, ProjectListItemDto } from "~/base/types_dto.ts";
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
          {
            $match: {
              published: true,
              realm,
              parentProjectId: "",
            },
          } as any,
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
    async getProjectList_children(
      projectId: string
    ): Promise<ProjectListItemDto[]> {
      const project = await storehouse.projectCabinet.get(projectId);
      const childProjectIds = project.childProjectIds ?? [];
      const projects = await storehouse.projectCollection
        .aggregate<ProjectUserAggregateResult>([
          { $match: { projectId: { $in: childProjectIds } } },
          { $sort: { projectId: -1 } },
          ...projectUserLookups,
        ])
        .toArray();
      return projects.map(local.mapProjectEntityToListItemDto);
    },
    async getProjectDetail(projectId: string): Promise<ProjectDetailDto> {
      const projects = await storehouse.projectCollection
        .aggregate<ProjectUserAggregateResult>([
          { $match: { projectId } },
          ...projectUserLookups,
        ])
        .toArray();
      return local.mapProjectEntityToDetailDto(projects[0]);
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
      parentProjectId: project.parentProjectId,
      variationName: project.variationName,
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
      numChildProjects: project.childProjectIds.length,
    };
  },
  mapProjectEntityToDetailDto(
    project: ProjectUserAggregateResult
  ): ProjectDetailDto {
    return {
      projectId: project.projectId,
      projectGuid: project.projectGuid,
      userId: project.userId,
      projectName: project.projectName,
      parentProjectId: project.parentProjectId,
      variationName: project.variationName,
      introduction: project.introduction,
      targetMcu: project.targetMcu,
      primaryTargetBoard: project.primaryTargetBoard,
      realm: project.realm,
      tags: project.tags,
      repositoryUrl: project.repositoryUrl,
      readmeFileContent: project.readmeFileContent,
      dataEntries: project.dataEntries,
      editUiItems: project.editUiItems,
      thumbnailUrl: projectHelper.getThumbnailImageUrl(project),
      firmwareBinaryUrl: projectHelper.getFirmwareBinaryUrl(project),
      firmwareUpdateAt: project.firmwareUpdateAt,
      published: project.published,
      automated: project.automated,
      firmwareRevision: project.firmwareRevision,
      updateAt: project.updateAt,
      userName: project.user.userName,
      userAvatarUrl: specifyGithubAvatarUrlSize(project.user.avatarUrl, 48),
      numChildProjects: project.childProjectIds.length,
    };
  },
};

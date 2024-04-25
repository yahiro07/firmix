import { raiseError } from "auxiliaries/utils/error_util";
import { specifyGithubAvatarUrlSize } from "shared/foreign/avatar_size_modifier";
import { ProjectRealm } from "web-kfx/app/base/types_app_common";
import { ProjectEntity, UserEntity } from "web-kfx/app/base/types_db_entity";
import {
  ProjectDetailDto,
  ProjectListItemDto,
} from "web-kfx/app/base/types_dto";
import { storehouse } from "web-kfx/app/central/depot/storehouse";
import { projectHelper } from "web-kfx/app/central/domain_helpers/project_helper";

type ProjectUserAggregateResult = ProjectEntity & {
  user: UserEntity;
  childProjects?: {
    projectId: string;
    userId: string;
    published: boolean;
  }[];
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

const projectChildProjectsLookups = [
  {
    $lookup: {
      from: "project",
      let: { cp_ids: "$childProjectIds" },
      pipeline: [
        { $match: { $expr: { $in: ["$projectId", "$$cp_ids"] } } },
        { $project: { _id: 0, projectId: 1, userId: 1, published: 1 } },
      ],
      as: "childProjects",
    },
  },
];

export function createProjectListService() {
  return {
    async getProjectList_recent(
      realm: ProjectRealm,
      readerUserId: string
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
          ...projectChildProjectsLookups,
        ])
        .toArray();
      return projects.map((project) =>
        local.mapProjectEntityToListItemDto(project, readerUserId)
      );
    },
    async getProjectList_self(userId: string): Promise<ProjectListItemDto[]> {
      const projects = await storehouse.projectCollection
        .aggregate<ProjectUserAggregateResult>([
          { $match: { userId } },
          { $sort: { projectId: -1 } },
          ...projectUserLookups,
          ...projectChildProjectsLookups,
        ])
        .toArray();
      return projects.map((project) =>
        local.mapProjectEntityToListItemDto(project, userId)
      );
    },
    async getProjectList_children(
      projectId: string,
      readerUserId: string
    ): Promise<ProjectListItemDto[]> {
      const project = await storehouse.projectCabinet.get(projectId);
      const childProjectIds = project.childProjectIds ?? [];
      const projects = await storehouse.projectCollection
        .aggregate<ProjectUserAggregateResult>([
          {
            $match: {
              projectId: { $in: childProjectIds },
              $or: [{ published: true }, { userId: readerUserId }],
            },
          },
          { $sort: { projectId: -1 } },
          ...projectUserLookups,
        ])
        .toArray();
      return projects.map((project) =>
        local.mapProjectEntityToListItemDto(project, readerUserId)
      );
    },
    async getProjectDetail(
      projectId: string,
      readerUserId: string
    ): Promise<ProjectDetailDto> {
      const projects = await storehouse.projectCollection
        .aggregate<ProjectUserAggregateResult>([
          { $match: { projectId } },
          ...projectUserLookups,
          ...projectChildProjectsLookups,
        ])
        .toArray();
      const project = projects[0];
      if (!project.published && project.userId !== readerUserId) {
        raiseError(`no access rights to show draft project`);
      }
      return local.mapProjectEntityToDetailDto(projects[0], readerUserId);
    },
  };
}

const local = {
  getNumChildProjects(
    project: ProjectUserAggregateResult,
    readerUserId: string
  ) {
    return (
      project.childProjects?.filter(
        (child) =>
          child.published || (!child.published && child.userId === readerUserId)
      ).length ?? 0
    );
  },
  mapProjectEntityToListItemDto(
    project: ProjectUserAggregateResult,
    readerUserId: string
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
      numChildProjects: local.getNumChildProjects(project, readerUserId),
    };
  },
  mapProjectEntityToDetailDto(
    project: ProjectUserAggregateResult,
    readerUserId: string
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
      numChildProjects: local.getNumChildProjects(project, readerUserId),
      pinNumbersMap: project.pinNumbersMap,
    };
  },
};

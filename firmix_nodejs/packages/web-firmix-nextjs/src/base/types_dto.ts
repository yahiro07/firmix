export type ProjectDetailDto = {
  projectId: string;
  projectGuid: string;
  userId: string;
  projectName: string;
  parentProjectId: string;
  variationName: string;
  introduction: string;
  targetMcu: string;
  targetBoardLabel: string;
  tags: string[];
  repositoryUrl: string;
  readmeFileContent: string;
  thumbnailUrl: string;
  firmwareBinaryUrl: string;
  published: boolean;
  automated: boolean;
  firmwareRevision: number;
  firmwareUpdateAt: number;
  updateAt: number;
  userName: string;
  userAvatarUrl: string;
  numChildProjects: number;
  pinNumbersMap: Record<string, number>;
};

export type ProjectListItemDto = {
  projectId: string;
  projectName: string;
  parentProjectId: string;
  variationName: string;
  introduction: string;
  targetMcu: string;
  targetBoardLabel: string;
  tags: string[];
  repositoryUrl: string;
  thumbnailUrl: string;
  published: boolean;
  userName: string;
  userAvatarUrl: string;
  numChildProjects: number;
};

export type CoactiveState = {
  homeTargetRealm_deprecated: "unused";
};

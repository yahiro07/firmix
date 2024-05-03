export type UserEntity = {
  userId: string;
  userName: string;
  avatarUrl: string;
  loginSourceSignature: string;
  createAt: number;
  apiKey: string;
  apiKeyActive: boolean;
};

export type ProjectEntity = {
  projectId: string;
  userId: string;
  projectGuid: string;
  projectName: string;
  parentProjectId: string;
  parentProjectGuid: string;
  childProjectIds: string[];
  variationName: string;
  introduction: string;
  targetMcu: string;
  targetBoardLabel: string;
  tags: string[];
  //Github上のプロジェクトフォルダのURL,リポジトリ内のサブ階層のフォルダパスを含む
  repositoryUrl: string;
  readmeFileContent: string;
  firmwareFileName: string;
  firmwareFileHash: string;
  firmwareRevision: number;
  thumbnailFileName: string;
  thumbnailFileHash: string;
  thumbnailRevision: number;
  firmwareUpdateAt: number;
  revision: number;
  published: boolean;
  automated: boolean;
  createAt: number;
  updateAt: number;
  pinNumbersMap: Record<string, number>;
};

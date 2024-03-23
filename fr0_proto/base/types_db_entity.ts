import { ProjectRealm } from "~/base/types_app_common.ts";
import { CustomDataEntry, EditUiItem } from "~/base/types_core_entity.ts";

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
  primaryTargetBoard: string;
  realm: ProjectRealm;
  tags: string[];
  //Github上のプロジェクトフォルダのURL,リポジトリ内のサブ階層のフォルダパスを含む
  repositoryUrl: string;
  readmeFileContent: string;
  dataEntries: CustomDataEntry[];
  editUiItems: EditUiItem[];
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
};

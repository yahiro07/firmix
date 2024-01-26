import { CustomDataEntry, EditUiItem } from "~/base/types_core_entity.ts";

export type UserEntity = {
  userId: string;
  userName: string;
  avatarUrl: string;
  loginSourceSignature: string;
  createAt: number;
  apiKey: string;
};

export type ProjectEntity = {
  projectId: string;
  userId: string;
  projectGuid: string;
  projectName: string;
  introduction: string;
  targetMcu: string;
  primaryTargetBoard: string;
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
  revision: number;
  published: boolean;
  automated: boolean;
  createAt: number;
  updateAt: number;
};

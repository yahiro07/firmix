import { CustomDataEntry, EditUiItem } from "~/base/types_core_entity.ts";

export type ProjectEntity = {
  projectId: string;
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
  thumbnailFileName: string;
};

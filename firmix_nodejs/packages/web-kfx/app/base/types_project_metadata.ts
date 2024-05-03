import { ProjectRealm } from "@mx/web-kfx/app/base/types_app_common";
import {
  CustomDataEntry,
  EditUiItem,
} from "@mx/web-kfx/app/base/types_core_entity";

export type ProjectMetadataEditUiItemInput = {
  key: string;
  label: string;
};

export type ProjectBoardJsonFileContent = {
  pinNumbersMap: Record<string, number>;
};

export type ProjectMetadataFirmwareSpec = {
  path: string;
  uf2gen_options?: { family: string; base?: string };
};

export type ProjectMetadataJsonFileContent = {
  projectGuid: string;
  projectName: string;
  parentProjectGuid?: string;
  variationName?: string;
  introductionLines: string[];
  targetMcu: string;
  targetBoardLabel: string;
  realm: ProjectRealm;
  tags: string[];
  repositoryUrl: string;
  dataEntries: CustomDataEntry[];
  editUiItems: ProjectMetadataEditUiItemInput[];
  firmwareSpec: ProjectMetadataFirmwareSpec;
};

export type ProjectMetadataInput = {
  projectGuid: string;
  projectName: string;
  parentProjectGuid: string;
  variationName: string;
  introduction: string;
  targetMcu: string;
  targetBoardLabel: string;
  realm: ProjectRealm;
  tags: string[];
  repositoryUrl: string;
  dataEntries: CustomDataEntry[];
  editUiItems: EditUiItem[];
  pinNumbersMap: Record<string, number>;
  firmwareSpec: ProjectMetadataFirmwareSpec;
};

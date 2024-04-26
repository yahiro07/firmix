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
  primaryTargetBoard: string;
  tags: string[];
  repositoryUrl: string;
  firmwareSpec: ProjectMetadataFirmwareSpec;
};

export type ProjectMetadataInput = {
  projectGuid: string;
  projectName: string;
  parentProjectGuid: string;
  variationName: string;
  introduction: string;
  targetMcu: string;
  primaryTargetBoard: string;
  tags: string[];
  repositoryUrl: string;
  pinNumbersMap: Record<string, number>;
  firmwareSpec: ProjectMetadataFirmwareSpec;
};

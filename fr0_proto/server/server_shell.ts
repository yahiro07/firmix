import { serverFetchHelper } from "~/aux/utils_be/server_fetch_helper.ts";
import {
  ConfigurationEditItem,
  ConfigurationSourceItem,
  ProjectDetailDto,
} from "~/base/dto_types.ts";
import { ProjectEntity } from "~/base/entity_types.ts";
import { firmwareDataInjector } from "~/server/firmware_data_injector.ts";

const debugDummyProject: ProjectEntity = {
  projectId: "__proj1",
  projectName: "スイッチでLEDが光るだけ",
  introduction: `
スイッチを押すとLEDが光ります
LED1 点滅します
LED2 スイッチの状態をオン状態に反映します。
`,
  targetMcu: "RP2040",
  primaryTargetBoard: "WaveShare RP2040 Zero",
  dataEntries: [{
    marker: "pindefs",
    items: [
      { key: "pin_leds", dataKind: "pin", dataCount: 2 },
      { key: "pin_button", dataKind: "pin", dataCount: 1 },
    ],
  }],
  editUiItems: [
    {
      key: "pin_leds",
      label: "LEDのピン",
      instruction: "LEDは抵抗を介してGNDにつないでください",
    },
    {
      key: "pin_button",
      label: "ボタンのピン",
      instruction: "スイッチを介してGNDにつないでください",
    },
  ],
};

export const serverShell = {
  // deno-lint-ignore require-await
  async getProjectDetail(_projectId: string): Promise<ProjectDetailDto> {
    return local.mapProjectEntityToDetailDto(debugDummyProject);
  },
  async generatePatchedFirmware(
    _projectId: string,
    editItems: ConfigurationEditItem[],
  ): Promise<{ fileName: string; fileContentBytes: Uint8Array }> {
    const project = debugDummyProject;
    const firmwareBinary = await serverFetchHelper.fetchBinary(
      "http://localhost:3000/gadget1/firmware.uf2",
      {},
    );
    const modFirmwareBinary = firmwareDataInjector.patchFirmwareBinary(
      firmwareBinary,
      project,
      editItems,
    );
    return {
      fileName: "firmware.uf2",
      fileContentBytes: modFirmwareBinary,
    };
  },
};

const local = {
  buildProjectConfigurationSourceItems(
    project: ProjectEntity,
  ): ConfigurationSourceItem[] {
    const dataItems = project.dataEntries.map((it) => it.items).flat();
    return project.editUiItems.map((editUiItem) => {
      const { key, label, instruction } = editUiItem;
      const dataItem = dataItems.find((it) => it.key === key);
      if (!dataItem) {
        return { key, dataKind: "error" };
      }
      const { dataKind, dataCount } = dataItem;
      return {
        key,
        dataKind,
        dataCount,
        label,
        instruction,
      };
    });
  },
  mapProjectEntityToDetailDto(project: ProjectEntity): ProjectDetailDto {
    return {
      projectId: project.projectId,
      projectName: project.projectName,
      introduction: project.introduction,
      targetMcu: project.targetMcu,
      primaryTargetBoard: project.primaryTargetBoard,
      configurationSourceItems: local.buildProjectConfigurationSourceItems(
        project,
      ),
    };
  },
};

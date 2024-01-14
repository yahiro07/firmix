import { generateIdTimeSequential } from "~/aux/utils_be/id_generator.ts";
import { serverFetchHelper } from "~/aux/utils_be/server_fetch_helper.ts";
import {
  ConfigurationEditItem,
  LocalProjectSubmissionInputDto,
  ProjectDetailDto,
} from "~/base/dto_types.ts";
import { ProjectEntity } from "~/base/entity_types.ts";
import { firmwareDataInjector } from "~/cathedral/firmix_core/firmware_data_injector.ts";
import { firmixPresenter } from "~/cathedral/firmix_presenter/mod.ts";
import { storehouse } from "~/server/depot/storehouse.ts";

const debugDummyProject: ProjectEntity = {
  projectId: "__proj1",
  projectGuid: "909019bf-9ac2-4f4a-8ef9-6ecf8854db6a",
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
      { key: "pin_leds", dataKind: "pins", pinCount: 2 },
      { key: "pin_button", dataKind: "pins", pinCount: 1 },
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
  async createProjectFromLocal(projectInput: LocalProjectSubmissionInputDto) {
    const projectId = generateIdTimeSequential();
    await storehouse.projectCabinet.insert({ projectId, ...projectInput });
  },
};

const local = {
  mapProjectEntityToDetailDto(project: ProjectEntity): ProjectDetailDto {
    return {
      projectId: project.projectId,
      projectName: project.projectName,
      introduction: project.introduction,
      targetMcu: project.targetMcu,
      primaryTargetBoard: project.primaryTargetBoard,
      configurationSourceItems: firmixPresenter.buildConfigurationSourceItems(
        project,
      ),
    };
  },
};

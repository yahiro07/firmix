import { css } from "resin";
import { raiseError } from "~/aux/utils/error_util.ts";
import { createFC } from "~/aux/utils_fe/create_fc.ts";
import { downloadBinaryFileBlob } from "~/aux/utils_fe/downloading_link.ts";
import { ConfigurationSourceItem, ProjectDetailDto } from "~/base/types_dto.ts";
import { ConfigurationEditItem } from "~/base/types_project_edit.ts";
import { serverShell } from "~/be/server_shell.ts";
import { firmixCore_firmwareConfiguration } from "~/cardinal/firmix_core_firmware_configuration/mod.ts";

type Props = {
  project: ProjectDetailDto;
};

export const ProjectDetailPage = createFC<Props>(({ project }: Props) => {
  const hasError = project.configurationSourceItemWrappers.some(
    (it) => it.dataKind === "error"
  );
  const configurationSourceItems =
    project.configurationSourceItemWrappers as ConfigurationSourceItem[];

  const inputIdPrefix = `config-input-`;

  const handleDownload = async () => {
    try {
      const configurationEditItems: ConfigurationEditItem[] =
        configurationSourceItems.map((sourceItem) => {
          const { key } = sourceItem;
          const inputElementId = `${inputIdPrefix}${key}`;
          const element = document.getElementById(
            inputElementId
          ) as HTMLInputElement;
          if (!element) {
            raiseError(`target element not found for ${inputElementId}`);
          }
          const text = element.value;
          const values =
            firmixCore_firmwareConfiguration.splitSourceItemEditTextValues(
              sourceItem,
              text
            );
          return { key, values };
        });
      const { fileName, fileContentBytes } =
        await serverShell.firmwareService.generatePatchedFirmware(
          project.projectId,
          configurationEditItems
        );
      downloadBinaryFileBlob(fileName, fileContentBytes);
    } catch (error) {
      alert(error.message ?? error.toString());
    }
  };

  return (
    <div q={style}>
      <div>project name: {project.projectName}</div>
      <div>introduction: {project.introduction}</div>
      <div>target mcu: {project.targetMcu}</div>
      {hasError && <div>カスタムデータの定義にエラーがあります</div>}
      {!hasError && (
        <div>
          {configurationSourceItems.map((item) => (
            <div key={item.key}>
              {/* <label>{item.label} (gpio x{item.dataCount})</label> */}
              <span>{item.instruction}</span>
              <input id={`${inputIdPrefix}${item.key}`}></input>
            </div>
          ))}
        </div>
      )}
      <button onClick={handleDownload} disabled={hasError}>
        download
      </button>
    </div>
  );
});

const style = css`
  border: solid 1px #888;
  padding: 10px;
  background: #fff;
`;

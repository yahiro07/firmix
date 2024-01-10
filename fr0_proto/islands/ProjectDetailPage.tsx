import { css } from "~/aux/resin/resin_css.ts";
import { raiseError } from "~/aux/utils/error_util.ts";
import {
  ConfigurationEditItem,
  ConfigurationSourceItem_Valid,
  ProjectDetailDto,
} from "~/base/dto_types.ts";
import { pinNameToPinNumberMap_RP2040 } from "~/base/platform_definitions.ts";
import { serverShell } from "~/server/server_shell.ts";

type Props = {
  project: ProjectDetailDto;
};

export default function ProjectDetailPage({ project }: Props) {
  const hasError = project.configurationSourceItems.some((it) =>
    it.dataKind === "error"
  );
  const configurationSourceItems = project
    .configurationSourceItems as ConfigurationSourceItem_Valid[];

  const inputIdPrefix = `config-input-`;

  const handleDownload = async () => {
    try {
      const configurationEditItems: (ConfigurationEditItem)[] =
        configurationSourceItems.map(
          (sourceItem) => {
            const { key, label } = sourceItem;
            const inputElementId = `${inputIdPrefix}${key}`;
            const element = document.getElementById(
              inputElementId,
            ) as HTMLInputElement;
            if (!element) {
              raiseError(`target element not found for ${inputElementId}`);
            }
            const text = element.value;
            if (!text) {
              raiseError(
                `${label}: 値を入力してください`,
              );
            }
            const values = text.split(",").map((it) => it.trim());
            if (values.length !== sourceItem.dataCount) {
              if (values.length === 1 && sourceItem.dataCount >= 2) {
                raiseError(
                  `${label}: ピンの数が定義と一致しません ${values.length}/${sourceItem.dataCount} ピン名をコンマ区切りで入力してください`,
                );
              } else {
                raiseError(
                  `${label}: ピンの数が定義と一致しません ${values.length}/${sourceItem.dataCount}`,
                );
              }
            }
            if (sourceItem.dataKind === "pin") {
              for (const pinName of values) {
                const pinNumber = pinNameToPinNumberMap_RP2040[pinName];
                if (pinNumber === undefined) {
                  raiseError(
                    `${label}: ${pinName}はピンの名前として正しくありません。gp0,gp1などの形式で入力してください。`,
                  );
                }
              }
            }
            return { key, values };
          },
        );
      const { fileName, fileContentBytes } = await serverShell
        .generatePatchedFirmware(
          project.projectId,
          configurationEditItems,
        );
      const blob = new Blob([fileContentBytes.buffer], {
        type: "application-octet-binary",
      });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = fileName;
      link.click();
    } catch (error) {
      alert(error.message ?? error.toString());
    }
  };

  return (
    <div q={style}>
      <div>
        project name: {project.projectName}
      </div>
      <div>
        introduction: {project.introduction}
      </div>
      <div>
        target mcu: {project.targetMcu}
      </div>
      {hasError && (
        <div>
          カスタムデータの定義にエラーがあります
        </div>
      )}
      {!hasError && (
        <div>
          {configurationSourceItems.map((item) => (
            <div key={item.key}>
              <label>{item.label} (gpio x{item.dataCount})</label>
              <span>{item.instruction}</span>
              <input id={`${inputIdPrefix}${item.key}`}></input>
            </div>
          ))}
        </div>
      )}
      <button onClick={handleDownload} disabled={hasError}>download</button>
    </div>
  );
}

const style = css`
  border: solid 1px #888;
  padding: 10px;
  background: #fff;
`;
